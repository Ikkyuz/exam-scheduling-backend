import { DepartmentCreateUpdate } from './department.schema';
import { DepartmentRepository } from './department.repository';

export namespace DepartmentService {
    export async function createMany(departments: DepartmentCreateUpdate[]) {
        return await DepartmentRepository.createMany(departments);
    }

    export async function findAll() {
        return await DepartmentRepository.findAll();
    }

    export async function findById(departmentId: string) {
        return await DepartmentRepository.findById(departmentId);
    }

    export async function updateById(departmentId: string, department: DepartmentCreateUpdate) {
        return await DepartmentRepository.updateById(departmentId, department);
    }

    export async function deleteById(departmentId: string) {
        return await DepartmentRepository.deleteById(departmentId);
    }

    export async function deleteAll() {
        return await DepartmentRepository.deleteAll();
    }
}