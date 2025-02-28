import { Injectable } from '@nestjs/common';
import { CreatePaymnetDto } from './dto/create-paymnet.dto';
import { UpdatePaymnetDto } from './dto/update-paymnet.dto';
import { Stripe } from "stripe";
import { envs } from 'src/config/env.var';
import { Request, Response } from 'express';
@Injectable()
export class PaymnetService {
  private stripe = new Stripe(envs.api_key_stripe);
  // private endpointSecret = "whsec_940ec8582d3455f444204d6b0ea1af4e5780b6e5c62d22fd729eb763df91a8c7";
  private endpointSecret = "whsec_n5nmREiZUNu82b2kuye2EJVkclwWTQla"

  createSession(createPaymnetDto: CreatePaymnetDto) {
    const {currency, items} = createPaymnetDto;
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
      phone_number_collection:{
        enabled: true
      },
      setup_intent_data: {
        metadata:{}
      },
      success_url:'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/error'
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
    if(event.type === 'charge.succeeded'){
      console.log(event.data.object)
    }

    res.send(event)
  }
}
