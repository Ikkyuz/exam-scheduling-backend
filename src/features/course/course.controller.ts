import { CourseService } from "./course.service";

export namespace CourseController {
  export const findAll = async ({ set }: any) => {
    try {
      const courses = await CourseService.findAll();
      set.status = "OK";
      return { success: true, data: courses, message: "Courses fetched successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to fetch courses" };
    }
  };

  export const findById = async ({ params, set }: any) => {
    try {
      const course = await CourseService.findById(params.id);
      if (!course) {
        set.status = "Not Found";
        return { success: false, message: "Course not found" };
      }
      set.status = "OK";
      return { success: true, data: course, message: "Course fetched successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to fetch course" };
    }
  };

  export const createMany = async ({ body, set }: any) => {
    try {
      const createdCourses = await CourseService.createMany(body);
      set.status = "Created";
      return { success: true, data: createdCourses, message: "Courses created successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to create courses" };
    }
  };

  export const updateById = async ({ params, body, set }: any) => {
    try {
      const updated = await CourseService.updateById(params.id, body);
      set.status = "OK";
      return { success: true, data: updated, message: "Course updated successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to update course" };
    }
  };

  export const deleteAll = async ({ set }: any) => {
    try {
      await CourseService.deleteAll();
      set.status = "OK";
      return { success: true, message: "All courses deleted successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to delete courses" };
    }
  };

  export const deleteById = async ({ params, set }: any) => {
    try {
      await CourseService.deleteById(params.id);
      set.status = "OK";
      return { success: true, message: "Course deleted successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to delete course" };
    }
  };
}
