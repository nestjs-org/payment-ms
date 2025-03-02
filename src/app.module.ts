import { Module } from '@nestjs/common';
import { PaymnetModule } from './paymnet/paymnet.module';

@Module({
  imports: [PaymnetModule,]
})
export class AppModule {}
