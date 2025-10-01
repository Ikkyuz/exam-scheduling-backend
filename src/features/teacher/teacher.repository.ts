import prisma from "@/providers/database/database.provider";
import { TeacherCreateUpdate } from "./teacher.schema";

export namespace TeacherRepository {
  export async function createMany(
    teachers: TeacherCreateUpdate[]
  ) {
    for (const teacher of teachers) {
      const department = await prisma.department.findUnique({
        where: { id: teacher.department_id },
      });

      if (!department) {
        throw new Error(`Department with id ${teacher.department_id} not found`);
      }
    }

    await prisma.teacher.createMany({
      data: teachers, 
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    const where = options.search
      ? {
          OR: [
            { name: { contains: options.search } },
            { department: { name: { contains: options.search } } },
          ],
        }
      : {};

    return prisma.teacher.findMany({
      where,
      include: {
        department: true,
      },
      take: options.take,
      skip: options.skip,
      orderBy: { createdAt: "desc" },
    });
  }

  export async function findById(teacherId: string) {
    return await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        department: true,
      },
    });
  }

  export async function update(
    teacherId: string,
    teacher: Partial<TeacherCreateUpdate>
  ) {
    // ตรวจสอบ Foreign Key หากมีการส่ง department_id มาอัปเดต
    if (teacher.department_id) {
      const department = await prisma.department.findUnique({
        where: { id: teacher.department_id },
      });
      if (!department) {
        throw new Error(`Department with id ${teacher.department_id} not found`);
      }
    }

    return prisma.teacher.update({
      where: { id: teacherId },
      data: teacher,
      include: {
        department: true,
      },
    });
  }

  export async function deleteAll() {
    return prisma.teacher.deleteMany();
  }

  export async function deleteById(teacherId: string) {
    return prisma.teacher.delete({
      where: { id: teacherId },
      include: {
        department: true,
      },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { tel: { contains: search } },
            { department: { name: { contains: search } } },
          ],
        }
      : {};
    return await prisma.teacher.count({ where });
  }
}
