import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // To pozwoli innym modułom używać Prismy
})
export class PrismaModule {}
