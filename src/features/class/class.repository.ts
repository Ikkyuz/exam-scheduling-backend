import prisma from "../../providers/database/database.provider";
import { ClassCreateUpdate } from "./class.schema";

export namespace ClassRepository {
  export async function createMany(classes: ClassCreateUpdate[]) {
    for (const classData of classes) {
      const department = await prisma.department.findUnique({
        where: { id: classData.departmentId },
      });

      if (!department) {
        throw new Error(
          `Department with id ${classData.departmentId} not found`
        );
      }
    }

    await prisma.class.createMany({
      data: classes,
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.class.findMany({
      include: { department: true, enrollments: true },
      skip: options.skip,
      take: options.take,
      where: options.search
        ? { name: { contains: options.search } }
        : undefined,
    });
  }

  export async function countAll(search?: string) {
    const where = search ? { name: { contains: search } } : {};
    return prisma.class.count({ where });
  }

  export async function findById(id: string) {
    return await prisma.class.findUnique({ where: { id } });
  }

  export async function update(
    id: string,
    classData: Partial<ClassCreateUpdate>
  ) {
    const department = await prisma.department.findUnique({
      where: { id: classData.departmentId },
    });

    if (!department) {
      throw new Error(`Department with id ${classData.departmentId} not found`);
    }

    return await prisma.class.update({ where: { id }, data: classData });
  }

  export async function deleteAll() {
    return await prisma.class.deleteMany({ where: {} });
  }

  export async function deleteById(id: string) {
    return await prisma.class.delete({ where: { id } });
  }
}
