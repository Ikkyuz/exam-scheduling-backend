import { CourseGroupCreateUpdateSchema } from "./courseGroup.schema";
import { CourseGroupRepository } from "./courseGroup.repository";

export namespace CourseGroupService {
    export async function createMany(data: CourseGroupCreateUpdateSchema) {
        return await CourseGroupRepository.createMany(data);
    }

    export async function findAll() {
        return await CourseGroupRepository.findAll();
    }

    export async function findById(id: string) {
        return await CourseGroupRepository.findById(id);
    }

    export async function updateById(id: string, data: CourseGroupCreateUpdateSchema) {
        return await CourseGroupRepository.updateById(id, data);
    }

    export async function deleteAll() {
        return await CourseGroupRepository.deleteAll();
    }

    export async function deleteById(id: string) {
        return await CourseGroupRepository.deleteById(id);
    }
}