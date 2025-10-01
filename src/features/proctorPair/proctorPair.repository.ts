import prisma from "@/providers/database/database.provider";
import { ProctorPairCreateUpdate } from "./proctorPair.schema";

export namespace ProctorPairRepository {
  export async function createMany(
    proctorPairs: ProctorPairCreateUpdate[]
  ) {
    for (const proctorPair of proctorPairs) {
      const teacher_id = await prisma.proctorPair.findUnique({
        where: { id: proctorPair.teacher_id },
      });

      if (!teacher_id) {
        throw new Error(`teacher_id with id ${proctorPair.teacher_id} not found`);
      }
    }

    await prisma.proctorPair.createMany({
      data: proctorPairs,
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.proctorPair.findMany({
      include: {
        teacher: true,
      },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(proctorPairId: string) {
    return await prisma.proctorPair.findUnique({
      where: { id: proctorPairId },
      include: {
        teacher: true,
      },
    });
  }

  export async function update(
    proctorPairId: string,
    proctorPair: Partial<ProctorPairCreateUpdate>
  ) {
    // ตรวจสอบ Foreign Key หากมีการส่ง teacher_idId มาอัปเดต
    if (proctorPair.teacher_id) {
      const teacher_id = await prisma.teacher.findUnique({
        where: { id: proctorPair.teacher_id },
      });
      if (!teacher_id) {
        throw new Error(`teacher_id with id ${proctorPair.teacher_id} not found`);
      }
    }

    return prisma.proctorPair.update({
      where: { id: proctorPairId },
      data: proctorPair,
      include: {
        teacher: true,
      }
    });
  }

  export async function deleteAll() {
    return prisma.proctorPair.deleteMany();
  }

  export async function deleteById(proctorPairId: string) {
    return prisma.proctorPair.delete({
      where: { id: proctorPairId },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          OR: [
            { teacher_id: { contains: search } },
          ],
        }
      : {};
    return await prisma.proctorPair.count({ where });
  }
}
