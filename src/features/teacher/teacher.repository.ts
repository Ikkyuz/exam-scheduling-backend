import prisma from "../../providers/database/database.provider";
import { TeacherCreateUpdateSchema } from "./teacher.schema";

export namespace TeacherRepository {
  export async function createMany(teachers: TeacherCreateUpdateSchema[]) {
    return await prisma.teacher.createMany({
      data: teachers,
      skipDuplicates: true,
    });
  }

  export async function findAll() {
    return await prisma.teacher.findMany();
  }

  export async function findById(id: string) {
    return await prisma.teacher.findUnique({ where: { id } });
  }

  export async function updateById(id: string, data: Partial<TeacherCreateUpdateSchema>) {
    return await prisma.teacher.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.teacher.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.teacher.delete({ where: { id } });
  }
}
