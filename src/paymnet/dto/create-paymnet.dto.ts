import { ArrayMinSize, IsArray, IsNumber, IsPositive, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
export class CreatePaymnetDto {
    @IsString()
    currency: string;
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(()=> Item)
    items: Item[]
}

class Item {
    @IsString()
    name: string;
    @IsNumber()
    @IsPositive()
    price: number;
    @IsNumber()
    @IsPositive()
    @Type(()=> Number)
    quantity: number;
}