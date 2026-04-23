import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { products: { include: { product: true } } },
    });
  }

  public async create(orderData: any): Promise<Order> {
    const { products, ...addressData } = orderData;

    try {
      return await this.prismaService.order.create({
        data: {
          ...addressData,
          products: {
            create: products.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              comment: item.comment,
            })),
          },
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException(
        'An error has occurred while placing your order',
      );
    }
  }
}
