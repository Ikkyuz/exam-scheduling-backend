import prisma from "../../providers/database/database.provider";
import {  ClassCreateUpdateSchema } from "./class.schema";

export namespace ClassRepository {
    export async function createMany(
        classes: ClassCreateUpdateSchema[]
    ) {
        return await prisma.class.createMany({
            data: classes,
            skipDuplicates: true,
        });
    }

    export async function findAll() {
        return await prisma.class.findMany();
    }

    export async function findById(id: string) {
        return await prisma.class.findUnique({
            where: {
                id: id,
            },
        });
    }

    export async function updateById(
        id: string,
        classData: Partial<ClassCreateUpdateSchema>
    ) {
        return await prisma.class.update({
            where: {
                id: id,
            },
            data: classData,
        });
    }

    export async function deleteAll() {
        return await prisma.class.deleteMany();
    }

    export async function deleteById(id: string) {
        return await prisma.class.delete({
            where: {
                id: id,
            },
        });
    }
}