import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * DTO (Data Transfer Object) para actualizar un producto.
 * Extiende de CreateProductDto y define las reglas de validación para los campos del producto.
*/
export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString({ message: 'El nombre debe ser un String' })
        @IsNotEmpty({ message: 'El producto debe contener un nombre.' })
        name: string;
        
        @IsString({ message: 'El nombre debe ser un String' })
        @IsNotEmpty({ message: 'El producto debe contener una descripción.' })
        description: string;
        
        @IsNotEmpty({ message: 'El producto debe contener un precio.' })
        @IsNumber({}, { message: 'El precio debe ser un número.' })
        @Min(0, { message: 'El precio no puede ser negativo.' })
        price: number;
        
        @IsNotEmpty({ message: 'El producto debe contener un stock.' })
        @IsNumber({}, { message: 'El stock debe ser un número.' })
        @Min(0, { message: 'El stock no puede ser negativo.' })
        stock: number;
        
        @IsOptional()
        @IsBoolean({ message: 'El estado debe ser un booleano.' })
        @IsNotEmpty({ message: 'El producto debe contener un estado.' })
        isActive?: boolean;
}
