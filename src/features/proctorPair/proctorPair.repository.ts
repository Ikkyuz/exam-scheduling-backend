import prisma from "../../providers/database/database.provider";
import { ProctorPairCreateUpdateSchema } from "./proctorPair.schema";

export namespace ProctorPairRepository {
  export async function createMany(pairs: ProctorPairCreateUpdateSchema[]) {
    return await prisma.proctorPair.createMany({
      data: pairs,
      skipDuplicates: true,
    });
  }

  export async function findAll() {
    return await prisma.proctorPair.findMany({
      include: { teacher: true },
    });
  }

  export async function findById(id: string) {
    return await prisma.proctorPair.findUnique({
      where: { id },
      include: { teacher: true },
    });
  }

  export async function updateById(id: string, data: Partial<ProctorPairCreateUpdateSchema>) {
    return await prisma.proctorPair.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.proctorPair.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.proctorPair.delete({ where: { id } });
  }
}
