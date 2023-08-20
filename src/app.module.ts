import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma.service';
import { PrismaWalletRepository } from './repositories/prisma/prisma-wallet-repository';
import { WalletRepository } from './repositories/database/wallet-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: WalletRepository,
      useClass: PrismaWalletRepository,
    },
  ],
})
export class AppModule {}
