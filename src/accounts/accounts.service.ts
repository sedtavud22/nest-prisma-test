import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { TransferAccountDTO } from './dto/transfer-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: Prisma.AccountCreateInput) {
    return this.prisma.account.create({ data: createAccountDto });
  }

  transfer(transferAccountDTO: TransferAccountDTO) {
    const { sender: from, receiver: to, amount } = transferAccountDTO;

    return this.prisma.$transaction(async (tx) => {
      // 1.Decrement sender's balance
      const sender = await tx.account.update({
        data: {
          balance: {
            decrement: amount,
          },
        },
        where: {
          id: from,
        },
      });

      // 2.Verify that sender has enough money
      if (sender.balance < 0) {
        throw new Error(`${from} does not have enough money`);
      }

      // 3.Increment receiver's balance
      const recipient = await tx.account.update({
        data: {
          balance: {
            increment: amount,
          },
        },
        where: {
          id: to,
        },
      });

      return recipient;
    });
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
