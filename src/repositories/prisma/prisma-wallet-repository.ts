import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../database/wallet-repository';
import { Wallet } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CreateWalletDto } from 'src/dto/create-wallet.dto';
import { UpdateWalletDto } from 'src/dto/update-wallet.dto';

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Wallet[]> {
    const wallets = await this.prisma.wallet.findMany();
    return wallets;
  }

  async findOne(id: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findFirst({
      where: { id: id },
    });
    return wallet;
  }

  async create(wallet: CreateWalletDto): Promise<string> {
    await this.prisma.wallet.create({
      data: wallet,
    });
    return wallet.title;
  }

  async update(wallet: UpdateWalletDto, id: string): Promise<string> {
    const currentWallet = await this.getWallet(id);
    if (wallet.wallet) {
      if (wallet.wallet + currentWallet < 0) {
        throw new Error('Wallet cannot be negative');
      } else {
        await this.prisma.wallet.update({
          where: { id: id },
          data: { wallet: wallet.wallet + currentWallet },
        });
        return id;
      }
    } else {
      await this.prisma.wallet.update({
        where: { id: id },
        data: wallet,
      });
      return id;
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.wallet.delete({
      where: { id: id },
    });
  }

  private async getWallet(id: string): Promise<number> {
    const wallet = await this.prisma.wallet.findFirst({
      where: { id: id },
      select: { wallet: true },
    });
    return wallet.wallet;
  }
}
