import { TeacherService } from "./teacher.service";

export namespace TeacherController {
  export const findAll = async ({ set }: any) => {
    try {
      const teachers = await TeacherService.findAll();
      set.status = "OK";
      return { success: true, data: teachers };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const findById = async ({ params, set }: any) => {
    try {
      const teacher = await TeacherService.findById(params.id);
      if (!teacher) {
        set.status = "Not Found";
        return { success: false, message: "Teacher not found" };
      }
      set.status = "OK";
      return { success: true, data: teacher };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const createMany = async ({ body, set }: any) => {
    try {
      const newTeachers = await TeacherService.createMany(body);
      set.status = 'Created';
      return { success: true, data: newTeachers };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const updateById = async ({ params, body, set }: any) => {
    try {
      const updated = await TeacherService.updateById(params.id, body);
      set.status = 'OK';
      return { success: true, data: updated };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const deleteAll = async ({ set }: any) => {
    try {
      await TeacherService.deleteAll();
      set.status = 'OK';
      return { success: true, message: "All teachers deleted successfully" };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const deleteById = async ({ params, set }: any) => {
    try {
      await TeacherService.deleteById(params.id);
      set.status = 'OK';
      return { success: true, message: "Teacher deleted successfully" };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };
}
