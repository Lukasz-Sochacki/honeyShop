import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  public getAll(): any {
    return this.ordersService.getAll();
  }

  @Post('/')
  public create(@Body() orderData: any) {
    return this.ordersService.create(orderData);
  }
}
