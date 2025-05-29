// Importamos las dependencias necesarias de nestjs, el service, DTOs y esquemas de Mongoose
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  /**
   * Controlador para manejar las operaciones CRUD de productos.
   * Utiliza el servicio ProductsService para interactuar con la base de datos.
   */

  //Metodo POST para crear un nuevo producto
  @Post()
  @HttpCode(HttpStatus.CREATED)// Establece el código de estado HTTP 201 Created
  // Utiliza el ValidationPipe para validar el DTO de creación de producto
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {// Recibe el DTO de creación de producto desde el cuerpo de la solicitud
    return this.productsService.create(createProductDto);// Llama al servicio para crear el producto
  }
  // Método GET para obtener todos los productos
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  // Método GET para obtener un producto por su ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }
  // Método PATCH para actualizar solo una parte de un producto por su ID
  @Patch(':id')
  // Utiliza el ValidationPipe para validar el DTO de actualización de producto
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // Recibe el ID del producto a actualizar y el DTO de actualización desde el cuerpo de la solicitud
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
  // Método DELETE para eliminar un producto por su ID
  @Delete(':id')
  // Establece el código de estado HTTP 204 No Content para indicar que la operación fue exitosa sin contenido de respuesta
  @HttpCode(HttpStatus.NO_CONTENT)
  // Elimina el producto con el ID proporcionado
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
