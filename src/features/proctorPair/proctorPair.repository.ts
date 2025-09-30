import prisma from "@/providers/database/database.provider";
import { ProctorPairCreateUpdate } from "./proctorPair.schema";

export namespace ProctorPairRepository {
  export async function createMany(
    proctorPairs: ProctorPairCreateUpdate[]
  ) {
    for (const proctorPair of proctorPairs) {
      const teacherId = await prisma.proctorPair.findUnique({
        where: { id: proctorPair.teacherId },
      });

      if (!teacherId) {
        throw new Error(`teacherId with id ${proctorPair.teacherId} not found`);
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
    // ตรวจสอบ Foreign Key หากมีการส่ง teacherIdId มาอัปเดต
    if (proctorPair.teacherId) {
      const teacherId = await prisma.teacher.findUnique({
        where: { id: proctorPair.teacherId },
      });
      if (!teacherId) {
        throw new Error(`teacherId with id ${proctorPair.teacherId} not found`);
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
            { teacherId: { contains: search } },
          ],
        }
      : {};
    return await prisma.proctorPair.count({ where });
  }
}
