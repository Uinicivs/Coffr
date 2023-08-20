import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Wallet } from './entities/wallet';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('/wallet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getWallets(): Promise<Wallet[]> {
    return await this.appService.getWallets();
  }

  @Get(':id')
  async getWallet(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Wallet> {
    return await this.appService.getWallet(id);
  }

  @Post()
  async createWallet(
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<string> {
    return await this.appService.createWallet(createWalletDto);
  }

  @Patch(':id')
  async updateWallet(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<string> {
    return await this.appService.updateWallet(updateWalletDto, id);
  }

  @Delete(':id')
  async deleteWallet(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.appService.deleteWallet(id);
  }
}
