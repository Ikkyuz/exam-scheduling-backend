import { EnrollmentCreateUpdateSchema } from "./enrollment.schema";
import { EnrollmentRepository } from "./enrollment.repository";

export namespace EnrollmentService {
    export async function createMany(data: EnrollmentCreateUpdateSchema[]) {
        return await EnrollmentRepository.createMany(data);
    }

    export async function findAll() {
        return await EnrollmentRepository.findAll();
    }

    export async function findById(id: string) {
        return await EnrollmentRepository.findById(id);
    }

    export async function updateById(id: string, data: EnrollmentCreateUpdateSchema) {
        return await EnrollmentRepository.updateById(id, data);
    }

    export async function deleteAll() {
        return await EnrollmentRepository.deleteAll();
    }

    export async function deleteById(id: string) {
        return await EnrollmentRepository.deleteById(id);
    }
}

