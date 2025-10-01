import prisma from "@/providers/database/database.provider";
import { RoomCreateUpdate } from "./room.schema";

export namespace RoomRepository {
  export async function createMany(rooms: RoomCreateUpdate[]) {
    // ไม่มี Foreign Key ที่ต้องตรวจสอบ
    return prisma.room.createMany({
      data: rooms,
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.room.findMany({
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(id: string) {
    return await prisma.room.findUnique({
      where: { id: id },
    });
  }

  export async function update(
    id: string,
    room: Partial<RoomCreateUpdate>
  ) {
    return prisma.room.update({
      where: { id: id },
      data: {
        ...room,
      },
    });
  }

  export async function deleteAll() {
    return prisma.room.deleteMany({});
  }

  export async function deleteById(id: string) {
    return prisma.room.delete({
      where: { id: id },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          OR: [
            { roomNumber: { contains: search } },
            { building: { contains: search } },
          ],
        }
      : {};
    return await prisma.room.count({ where });
  }
}
