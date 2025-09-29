import prisma from "../../providers/database/database.provider";
import { RoomCreateUpdateSchema } from "./room.schema";

export namespace RoomRepository {
  export async function createMany(rooms: RoomCreateUpdateSchema[]) {
    return await prisma.room.createMany({
      data: rooms,
      skipDuplicates: true,
    });
  }

  export async function findAll() {
    return await prisma.room.findMany();
  }

  export async function findById(id: string) {
    return await prisma.room.findUnique({ where: { id } });
  }

  export async function updateById(id: string, data: Partial<RoomCreateUpdateSchema>) {
    return await prisma.room.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.room.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.room.delete({ where: { id } });
  }
}
