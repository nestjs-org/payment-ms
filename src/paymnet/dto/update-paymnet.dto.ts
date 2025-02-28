import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymnetDto } from './create-paymnet.dto';

export class UpdatePaymnetDto extends PartialType(CreatePaymnetDto) {}
