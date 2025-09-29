import Elysia, { t } from "elysia";
import { TeacherController } from "./teacher.controller";
import { teacherSchema, teacherCreateUpdateSchema } from "./teacher.schema";

export const TeacherRoutes = new Elysia({ prefix: "/teachers" })
  .get("/all", TeacherController.findAll, {
    tags: ["Teachers"],
    response: {
      200: t.Object({ success: t.Boolean(), data: t.Array(teacherSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .get("/:id", TeacherController.findById, {
    tags: ["Teachers"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), data: teacherSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .post("/many", TeacherController.createMany, {
    tags: ["Teachers"],
    body: t.Array(teacherCreateUpdateSchema),
    response: {
      201: t.Object({ success: t.Boolean(), data: t.Array(teacherSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .put("/:id", TeacherController.updateById, {
    tags: ["Teachers"],
    params: t.Object({ id: t.String() }),
    body: teacherCreateUpdateSchema,
    response: {
      200: t.Object({ success: t.Boolean(), data: teacherSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .delete("/all", TeacherController.deleteAll, {
    tags: ["Teachers"],
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .delete("/:id", TeacherController.deleteById, {
    tags: ["Teachers"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  });
