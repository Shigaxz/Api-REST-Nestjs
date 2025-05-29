import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    // Inyectamos el modelo de Mongoose para el esquema Product
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  // Método para crear un nuevo producto
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }
  // Método para obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  // Método para obtener un producto por su ID
  async findOne(id: string): Promise<Product> {
    // Verificamos si el ID existe
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      // Si no se encuentra el producto, lanzamos una excepción NotFoundException
      throw new NotFoundException(`Producto con ID "${id}" no encontrado.`);
    }
    // Si se encuentra, retornamos el producto
    return product;
  }
  // Método para actualizar un producto por su ID
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> { 
    const updatedProduct = await this.productModel
    // Utilizamos findByIdAndUpdate para encontrar y actualizar el producto
      .findByIdAndUpdate(id, updateProductDto, { new: true, runValidators: true })
      .exec();

    if (!updatedProduct) {
      // Si no se encuentra el producto, lanzamos una excepción NotFoundException
      throw new NotFoundException(`Producto con la ID: "${id}" no encontrado.`);
    }
    // Retornamos el producto actualizado
    return updatedProduct;
  }
  // Método para eliminar un producto por su ID
  async remove(id: string): Promise<void> {
    // Utilizamos deleteOne para eliminar el producto por su ID
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    // Verificamos si se eliminó algún producto
    if (result.deletedCount === 0) {
      // Si no se eliminó ningún producto, lanzamos una excepción NotFoundException
      throw new NotFoundException(`Producto con la ID: "${id}" no encontrado.`);
    }
  }
}
