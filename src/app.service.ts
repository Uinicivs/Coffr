import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repositories/database/wallet-repository';
import { Wallet } from './entities/wallet';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class AppService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async getWallets(): Promise<Wallet[]> {
    return await this.walletRepository.findAll();
  }

  async getWallet(id: string): Promise<Wallet> {
    return await this.walletRepository.findOne(id);
  }

  async createWallet(wallet: CreateWalletDto): Promise<string> {
    return await this.walletRepository.create(wallet);
  }

  async updateWallet(wallet: UpdateWalletDto, id: string): Promise<string> {
    return await this.walletRepository.update(wallet, id);
  }

  async deleteWallet(id: string): Promise<void> {
    return await this.walletRepository.delete(id);
  }
}
