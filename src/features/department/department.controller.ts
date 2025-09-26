import { DepartmentService } from "../department/department.service";

export namespace DepartmentController {
  export const findAll = async ({ set }: any) => {
    try {
      const departments = await DepartmentService.findAll();
      set.status = "OK";
      return { success: true, data: departments, message: "Departments retrieved successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to retrieve departments" };
    }
  };

  export const findById = async ({ params, set }: any) => {
    const department = await DepartmentService.findById(params.id);
    if (!department) {
      set.status = 404;
      return { success: false, message: "Department not found" };
    }
    set.status = "OK";
    return { success: true, data: department, message: "Department retrieved successfully" };
  };

  export const createMany = async ({ body, set }: any) => {
    try {
      const result = await DepartmentService.createMany(body);
      set.status = 201;
      return { success: true, count: result.count,  message: "Departments created successfully" };
    } catch {
      set.status = 500;
      return { success: false, message: "Failed to create departments" };
    }
  };

  export const updateById = async ({ params, body, set }: any) => {
    try {
      const updated = await DepartmentService.updateById(params.id, body);
      set.status = "OK";
      return { success: true, data: updated , message: "Department updated successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to update department" };
    }
  };

  export const deleteAll = async ({ set }: any) => {
    try {
      const result = await DepartmentService.deleteAll();
      set.status = "OK";
      return { success: true, count: result.count , message: "All departments deleted successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to delete departments" };
    }
  };

  export const deleteById = async ({ params, set }: any) => {
    try {
      await DepartmentService.deleteById(params.id);
      set.status = "OK";
      return { success: true, message: "Department deleted successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Failed to delete department" };
    }
  };
}
