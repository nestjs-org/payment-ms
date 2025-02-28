import { Module } from '@nestjs/common';
import { PaymnetService } from './paymnet.service';
import { PaymnetController } from './paymnet.controller';

@Module({
  controllers: [PaymnetController],
  providers: [PaymnetService],
})
export class PaymnetModule {}
