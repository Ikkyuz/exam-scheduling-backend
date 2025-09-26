import { CourseCreateUpdateSchema } from "./course.schema";
import { CourseRepository } from "./course.repository";

export namespace CourseService {
  export async function createMany(courses: CourseCreateUpdateSchema[]) {
    return await CourseRepository.createMany(courses);
  }

  export async function findAll() {
    return await CourseRepository.findAll();
  }

  export async function findById(id: string) {
    return await CourseRepository.findById(id);
  }

  export async function updateById(
    id: string,
    course: CourseCreateUpdateSchema
  ) {
    return await CourseRepository.updateById(id, course);
  }

  export async function deleteAll() {
    return await CourseRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await CourseRepository.deleteById(id);
  }
}
