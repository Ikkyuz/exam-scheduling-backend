import prisma from "../../providers/database/database.provider";
import { DepartmentCreateUpdate } from "./department.schema";

export namespace DepartmentRepository {
  export async function createMany(departments: DepartmentCreateUpdate[]) {
    return await prisma.department.createMany({
      data: departments,
      skipDuplicates: true, // กัน insert ซ้ำ (ถ้ามี unique constraint)
    });
  }

  export async function findAll() {
    return await prisma.department.findMany();
  }

  export async function findById(departmentId: string) {
    return await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });
  }

  export async function updateById(
    departmentId: string,
    department: DepartmentCreateUpdate,
  ) {
    return await prisma.department.update({
      where: {
        id: departmentId,
      },
      data: department,
    });
  }

  export async function deleteById(departmentId: string) {
    return await prisma.department.delete({
      where: {
        id: departmentId,
      },
    });
  }

  export async function deleteAll() {
    return await prisma.department.deleteMany();
  }
}
