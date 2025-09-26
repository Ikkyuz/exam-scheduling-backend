import prisma from "../../providers/database/database.provider";
import { CourseCreateUpdateSchema } from "./course.schema";

export namespace CourseRepository {
    export async function createMany(
        courses: CourseCreateUpdateSchema[]
    ) {
        return await prisma.course.createMany({
            data: courses,
            skipDuplicates: true,
        });
    }

    export async function findAll() {
        return await prisma.course.findMany();
    }

    export async function findById(id: string) {
        return await prisma.course.findUnique({
            where: {
                id: id,
            },
        });
    }

    export async function updateById(
        id: string,
        course: CourseCreateUpdateSchema
    ) {
        return await prisma.course.update({
            where: {
                id: id,
            },
            data: course,
        });
    }

    export async function deleteAll() {
        return await prisma.course.deleteMany();
    }

    export async function deleteById(id: string) {
        return await prisma.course.delete({
            where: {
                id: id,
            },
        });
    }
}