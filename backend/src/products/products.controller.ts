import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  public getAll() {
    return this.productService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const prod = await this.productService.getById(id);
    if (!prod) throw new NotFoundException('Product not found...');
    return prod;
  }
}
