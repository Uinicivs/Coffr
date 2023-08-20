import { CreateWalletDto } from 'src/dto/create-wallet.dto';
import { UpdateWalletDto } from 'src/dto/update-wallet.dto';
import { Wallet } from 'src/entities/wallet';

export abstract class WalletRepository {
  abstract findAll(): Promise<Wallet[]>;
  abstract findOne(id: string): Promise<Wallet>;
  abstract create(wallet: CreateWalletDto): Promise<string>;
  abstract update(wallet: UpdateWalletDto, id: string): Promise<string>;
  abstract delete(id: string): Promise<void>;
}
