import prisma from "@/providers/database/database.provider";
import { DepartmentCreateUpdate } from "./department.schema";

export namespace DepartmentRepository {
  export async function createMany(department: DepartmentCreateUpdate[]) {
    return prisma.department.createMany({ data: department });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.department.findMany({
      include: {
        classes: true,
        teachers: true,
      },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(departmentId: string) {
    return await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function update(
    departmentId: string,
    department: Partial<DepartmentCreateUpdate>
  ) {
    return prisma.department.update({
      where: { id: departmentId },
      data: department,
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function deleteAll() {
    return prisma.department.deleteMany();
  }

  export async function deleteById(departmentId: string) {
    return prisma.department.delete({
      where: { id: departmentId },
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          OR: [{ name: { contains: search } }],
        }
      : {};
    return await prisma.department.count({ where });
  }
}
