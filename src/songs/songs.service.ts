import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  create(createSongDto: Prisma.SongUncheckedCreateInput) {
    return this.prisma.song.create({ data: createSongDto });
  }

  findAll() {
    return this.prisma.song.findMany({ include: { artist: true } });
  }

  findOne(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.findUnique({ where });
  }

  update(
    where: Prisma.SongWhereUniqueInput,
    updateSongDto: Prisma.SongUncheckedUpdateInput,
  ) {
    return this.prisma.song.update({ where, data: updateSongDto });
  }

  remove(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.delete({ where });
  }
}
