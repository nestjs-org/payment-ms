import { Module } from '@nestjs/common';
import { PaymnetService } from './paymnet.service';
import { PaymnetController } from './paymnet.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/constants';
import { envs } from 'src/config/env.var';

@Module({
  imports:[
    ClientsModule.register([
      {name:NATS_SERVICE,transport:Transport.NATS,options:{
        servers: [envs.nats_servers]
      }}
    ]),
  ],
  controllers: [PaymnetController],
  providers: [PaymnetService],
})
export class PaymnetModule {}
