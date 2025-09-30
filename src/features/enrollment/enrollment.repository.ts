import prisma from "../../providers/database/database.provider";
import { EnrollmentCreateUpdate } from "./enrollment.schema";

export namespace EnrollmentRepository {
  export async function createMany(enrollments: EnrollmentCreateUpdate[]) {
    for (const enrollment of enrollments) {
      const course = await prisma.course.findUnique({
        where: { id: enrollment.courseId },
      });

      if (!course) {
        throw new Error(`Course with id ${enrollment.courseId} not found`);
      }

      const classed = await prisma.class.findUnique({
        where: { id: enrollment.classId },
      });

      if (!classed) {
        throw new Error(`Class with id ${enrollment.classId} not found`);
      }
    }

    await prisma.enrollment.createMany({
      data: enrollments,
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.enrollment.findMany({
      include: { course: true, class: true },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function countAll(search?: string) {
    const where = search ? { courseId: { contains: search }, classId: { contains: search } } : {};
    return prisma.enrollment.count({ where });
  }

  export async function findById(id: string) {
    return await prisma.enrollment.findMany({ where: { id } });
  }

  export async function update(
    id: string,
    data: Partial<EnrollmentCreateUpdate>
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
