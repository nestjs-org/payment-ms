import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, RawBodyRequest, Headers } from '@nestjs/common';
import { PaymnetService } from './paymnet.service';
import { CreatePaymnetDto } from './dto/create-paymnet.dto';
import { UpdatePaymnetDto } from './dto/update-paymnet.dto';
import { Request, Response } from 'express';
import Stripe from 'stripe';

@Controller('payment')
export class PaymnetController {

  constructor(private readonly paymnetService: PaymnetService) {}

  @Post()
  createSession(@Body() createPaymnetDto: CreatePaymnetDto) {
    
    return this.paymnetService.createSession(createPaymnetDto);
  }

  @Get('success')
  findAll() {
    return 'done'
  }

  @Get('cancel')
  findOne() {
    return 'cancel'
  }

  @Post('webhooks')
  async webhooks(
    @Req() req: Request,
    @Res() res: Response){
      
    return this.paymnetService.webhooks(req,res)
  }
}
