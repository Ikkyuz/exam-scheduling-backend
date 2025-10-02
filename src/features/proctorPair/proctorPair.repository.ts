import prisma from "@/providers/database/database.provider";
import { ProctorPairCreateUpdate } from "./proctorPair.schema";

export namespace ProctorPairRepository {
  export async function createMany(proctorPairs: ProctorPairCreateUpdate[]) {
    // ตรวจสอบว่า teacher_id มีอยู่จริง
    for (const pair of proctorPairs) {
      const teacher = await prisma.teacher.findUnique({
        where: { id: pair.teacher_id },
      });
      if (!teacher)
        throw new Error(`Teacher with id ${pair.teacher_id} not found`);
    }

    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const pairsWithTime = proctorPairs.map((p) => ({ ...p, createdAt: now }));

    // bulk insert
    await prisma.proctorPair.createMany({ data: pairsWithTime });

    // query objects ใหม่ พร้อม relation teacher
    return prisma.proctorPair.findMany({
      where: { createdAt: now },
      include: { teacher: true },
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
        throw new Error(
          `teacher_id with id ${proctorPair.teacher_id} not found`
        );
      }
    }

    return prisma.proctorPair.update({
      where: { id: proctorPairId },
      data: proctorPair,
      include: {
        teacher: true,
      },
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
    const where = search ? { teacher_id: { contains: search } } : {};
    return await prisma.proctorPair.count({ where });
  }
}
