import prisma from "../../providers/database/database.provider";
import { EnrollmentCreateUpdateSchema } from "./enrollment.schema";

export namespace EnrollmentRepository {
  export async function createMany(data: EnrollmentCreateUpdateSchema[]) {
    return await prisma.enrollment.createMany({ data });
  }

  export async function findAll() {
    return await prisma.enrollment.findMany();
  }

  export async function findById(id: string) {
    return await prisma.enrollment.findUnique({ where: { id } });
  }

  export async function updateById(
    id: string,
    data: EnrollmentCreateUpdateSchema
  ) {
    return await prisma.enrollment.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.enrollment.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.enrollment.delete({ where: { id } });
  }
}
