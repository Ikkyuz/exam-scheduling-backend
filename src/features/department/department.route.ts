import Elysia, { t } from "elysia";
import { departmentSchema, departmentCreateUpdateSchema } from "../department/department.schema";
import { DepartmentController } from "./department.controller";

export const DepartmentRoutes = new Elysia({ prefix: "/departments" })

  // GET /departments/all
  .get("/all", DepartmentController.findAll, {
    tags: ["Departments"],
    response: {
      200: t.Object({ success: t.Boolean(), data: t.Array(departmentSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // GET /departments/:id
  .get("/:id", DepartmentController.findById, {
    tags: ["Departments"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), data: departmentSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // POST /departments/many
  .post("/many", DepartmentController.createMany, {
    tags: ["Departments"],
    body: t.Array(departmentCreateUpdateSchema),
    response: {
      201: t.Object({ success: t.Boolean(), count: t.Number() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // PUT /departments/:id
  .put("/:id", DepartmentController.updateById, {
    tags: ["Departments"],
    params: t.Object({ id: t.String() }),
    body: departmentCreateUpdateSchema,
    response: {
      200: t.Object({ success: t.Boolean(), data: departmentSchema }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // DELETE /departments/all
  .delete("/all", DepartmentController.deleteAll, {
    tags: ["Departments"],
    response: {
      200: t.Object({ success: t.Boolean(), count: t.Number() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // DELETE /departments/:id
  .delete("/:id", DepartmentController.deleteById, {
    tags: ["Departments"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  });
