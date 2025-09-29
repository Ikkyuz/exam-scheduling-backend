import { TeacherCreateUpdateSchema } from "./teacher.schema";
import { TeacherRepository } from "./teacher.repository";

export namespace TeacherService {
  export async function createMany(teachers: TeacherCreateUpdateSchema[]) {
    return await TeacherRepository.createMany(teachers);
  }

  export async function findAll() {
    return await TeacherRepository.findAll();
  }

  export async function findById(id: string) {
    return await TeacherRepository.findById(id);
  }

  export async function updateById(id: string, data: Partial<TeacherCreateUpdateSchema>) {
    return await TeacherRepository.updateById(id, data);
  }

  export async function deleteAll() {
    return await TeacherRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await TeacherRepository.deleteById(id);
  }
}
