import prisma from "../../providers/database/database.provider";
import { CourseGroupCreateUpdateSchema } from "./courseGroup.schema";

export namespace CourseGroupRepository {
    export async function createMany(data: CourseGroupCreateUpdateSchema) {
        return await prisma.courseGroup.createMany({ data });
    }

    export async function findAll() {
        return await prisma.courseGroup.findMany();
    }

    export async function findById(id: string) {
        return await prisma.courseGroup.findMany({ where: { id } });
    }

    export async function updateById(id: string, data: CourseGroupCreateUpdateSchema) {
        return await prisma.courseGroup.update({ where: { id }, data });
    }

    export async function deleteAll() {
        return await prisma.courseGroup.deleteMany();
    }

    export async function deleteById(id: string) {
        return await prisma.courseGroup.delete({ where: { id } });
    }
}