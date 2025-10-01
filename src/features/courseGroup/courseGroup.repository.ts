import prisma from "../../providers/database/database.provider";
import { CourseGroupCreateUpdate } from "./courseGroup.schema";

export namespace CourseGroupRepository {
  export async function createMany(courseGroups: CourseGroupCreateUpdate[]) {
    // ตรวจสอบว่า course_id มีอยู่จริง
    for (const cg of courseGroups) {
      const course = await prisma.course.findUnique({
        where: { id: cg.course_id },
      });

      if (!course) {
        throw new Error(`Course with id ${cg.course_id} not found`);
      }
    }

    await prisma.courseGroup.createMany({
      data: courseGroups,
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.courseGroup.findMany({
      include: { course: true },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function countAll(search?: string) {
    const where = search ? { course_id: { contains: search } } : {};
    return prisma.courseGroup.count({ where });
  }

  export async function findById(id: string) {
    return await prisma.courseGroup.findMany({ where: { id } });
  }

  export async function update(
    id: string,
    data: Partial<CourseGroupCreateUpdate>
  ) {
    return await prisma.courseGroup.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.courseGroup.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.courseGroup.delete({ where: { id } });
  }
}
