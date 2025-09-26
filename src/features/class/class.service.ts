import { ClassCreateUpdateSchema } from "./class.schema";
import { ClassRepository } from "./class.repository";

export namespace ClassService {
    export async function createMany(classes: ClassCreateUpdateSchema[]) {
        return await ClassRepository.createMany(classes);
    }

    export async function findAll() {
        return await ClassRepository.findAll();
    }

    export async function findById(id: string) {
        return await ClassRepository.findById(id);
    }

    export async function updateById(id: string, classData: Partial<ClassCreateUpdateSchema>) {
        return await ClassRepository.updateById(id, classData);
    }

    export async function deleteAll() {
        return await ClassRepository.deleteAll();
    }

    export async function deleteById(id: string) {
        return await ClassRepository.deleteById(id);
    }
}