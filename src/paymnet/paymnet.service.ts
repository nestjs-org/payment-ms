import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymnetDto } from './dto/create-paymnet.dto';
import { UpdatePaymnetDto } from './dto/update-paymnet.dto';
import { Stripe } from "stripe";
import { envs } from 'src/config/env.var';
import { Request, Response } from 'express';
import { NATS_SERVICE } from 'src/config/constants';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class PaymnetService {
  private stripe = new Stripe(envs.api_key_stripe);
  private endpointSecret = envs.secret_endpoint_webhook_key;
  constructor(@Inject(NATS_SERVICE) readonly client: ClientProxy){}

  createSession(createPaymnetDto: CreatePaymnetDto) {
    const {currency, items,orderId} = createPaymnetDto;
    const line_items = items.map((item)=>(
      {
        price_data:{
          unit_amount: Math.round((item.price * 100)),
          product_data:{
            name:item.name
          },
          currency:currency
        },
        quantity:item.quantity,
      }
    ))
    return this.stripe.checkout.sessions.create({
    line_items,
      mode:'payment',
      payment_intent_data:{
        metadata:{
          orderId: orderId
        },

      },
      success_url: envs.success_url,
      cancel_url: envs.cancel_url
    })
  }

  webhooks(req:Request, res:Response){
    let event : Stripe.Event;
    const sig = req.headers['stripe-signature'];
    if (!sig) {
      res.status(400).send('Webhook Error: Missing stripe-signature header');
      return;
    }
    try {
      event = this.stripe.webhooks.constructEvent(req['rawBody'], sig, this.endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
      case 'charge.succeeded':
        const payload = {
          stripeReceipt:event.data.object.receipt_url,
          stripeId:event.data.object.id,
          orderId:event.data.object.metadata.orderId
        }
        this.client.emit('complete.payment.order',payload)
        break;
      default:
        break;
    }

    res.send(sig)
  }
}
