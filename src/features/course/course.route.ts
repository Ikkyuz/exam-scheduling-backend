import Elysia, { t } from "elysia";
import { CourseController } from "./course.controller";
import { courseSchema, courseCreateUpdateSchema } from "./course.schema";

export const CourseRoutes = new Elysia({ prefix: "/courses" })

  // GET /courses/all
  .get("/all", CourseController.findAll, {
    tags: ["Courses"],
    response: {
      200: t.Object({ success: t.Boolean(), data: t.Array(courseSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // GET /courses/:id
  .get("/:id", CourseController.findById, {
    tags: ["Courses"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), data: courseSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // POST /courses/many
  .post("/many", CourseController.createMany, {
    tags: ["Courses"],
    body: t.Array(courseCreateUpdateSchema),
    response: {
      201: t.Object({ success: t.Boolean(), data: t.Array(courseSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // PUT /courses/:id
  .put("/:id", CourseController.updateById, {
    tags: ["Courses"],
    params: t.Object({ id: t.String() }),
    body: courseCreateUpdateSchema,
    response: {
      200: t.Object({ success: t.Boolean(), data: courseSchema }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // DELETE /courses/all
  .delete("/all", CourseController.deleteAll, {
    tags: ["Courses"],
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })

  // DELETE /courses/:id
  .delete("/:id", CourseController.deleteById, {
    tags: ["Courses"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  });
