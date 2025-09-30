import Elysia, { t } from "elysia";
import {
  CourseSchema,
  CourseWithRelationsSchema,
  CourseCreateUpdateSchema,
} from "../course/course.schema";
import { CourseService } from "../course/course.service";

export const courseController = new Elysia({ prefix: "/courses" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const newCourse = await CourseService.createMany(body);
        set.status = "Created";
        return { newCourse, message: "Course created successfully" };
      } catch (error: any) {
        if (error.message.includes("already exists")) {
          set.status = "Conflict"; // 409
          return { message: error.message };
        }
        set.status = "Internal Server Error"; // 500
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      body: t.Array(
        t.Pick(CourseSchema, ["code", "name", "duration", "examType"])
      ),
      response: {
        201: t.Object({
          newCourse: CourseSchema,
          message: t.String(),
        }),
        409: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Courses"],
    }
  )
  .get(
    "/",
    async ({ query, set }) => {
      try {
        const page = query.page ? Number(query.page) : 1;
        const itemsPerPage = query.itemsPerPage
          ? Number(query.itemsPerPage)
          : 10;
        const search = query.search;

        const result = await CourseService.findAll({
          page,
          itemsPerPage,
          search,
        });

        if (result.data.length === 0 && result.meta_data.total > 0) {
          set.status = "No Content"; // 204
          return { message: "No content for this page/query." };
        }

        return result;
      } catch (error: any) {
        set.status = "Internal Server Error"; // 500
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric()),
        itemsPerPage: t.Optional(t.Numeric()),
        search: t.Optional(t.String()),
      }),
      response: {
        200: t.Object({
          data: t.Array(CourseWithRelationsSchema),
          meta_data: t.Object({
            page: t.Number(),
            itemsPerPage: t.Number(),
            total: t.Number(),
            totalPages: t.Number(),
            nextPage: t.Boolean(),
            previousPage: t.Boolean(),
          }),
        }),
        204: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Courses"],
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      try {
        const course = await CourseService.findById(params.id);
        if (course) {
          return {
            id: course.id,
            code: course.code,
            name: course.name,
            duration: course.duration,
            examType: course.examType,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            courseGroups: course.courseGroups,
            enrollments: course.enrollments,
          };
        } else {
          set.status = "Not Found"; // 404
          return { message: "Course not found" };
        }
      } catch (error: any) {
        set.status = "Internal Server Error"; // 500
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: t.Object({
          id: t.String(),
          code: t.String(),
          name: t.String(),
          duration: t.Number(),
          examType: t.UnionEnum(["InSchedule", "OutSchedule"]),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          courseGroups: t.Array(
            t.Object({
              id: t.String(),
              courseId: t.String(),
            })
          ),
          enrollments: t.Array(
            t.Object({
              id: t.String(),
              courseId: t.String(),
              classId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            })
          ),
        }),
        404: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Courses"],
    }
  )
  .patch(
    "/:id",
    async ({ params, body, set }) => {
      try {
        const updatedCourse = await CourseService.update(params.id, body);
        set.status = "OK"; // 200
        return { updatedCourse, message: "Course updated successfully" };
      } catch (error: any) {
        if (error.message.includes("not found")) {
          set.status = "Not Found"; // 404
          return { message: error.message };
        }
        if (
          error.message.includes("Unique constraint violated") ||
          error.message.includes("already exists")
        ) {
          set.status = "Conflict"; // 409
          return { message: error.message };
        }
        set.status = "Internal Server Error"; // 500
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      params: t.Object({ id: t.String() }),
      body: CourseCreateUpdateSchema,
      response: {
        200: t.Object({
          updatedCourse: CourseWithRelationsSchema,
          message: t.String(),
        }),
        404: t.Object({ message: t.String() }),
        409: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Courses"],
    }
  )
  .delete(
    "/",
    async ({ set }) => {
      try {
        await CourseService.deleteAll();
        set.status = "OK"; // 200
        return { message: "All courses deleted successfully" };
      } catch (error: any) {
        set.status = "Internal Server Error"; // 500
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      response: {
        200: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Courses"],
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      try {
        const deletedCourse = await CourseService.deleteById(params.id);
        set.status = "OK"; // 200
        return { deletedCourse, message: "Course deleted successfully" };
      } catch (error: any) {
        if (error.message.includes("not found")) {
          set.status = "Not Found"; // 404
          return { message: error.message };
        }
        if (
          error.message.includes(
            "Cannot delete course because it has related records"
          )
        ) {
          set.status = "Conflict"; // 409
          return { message: error.message };
        }
        set.status = "Internal Server Error"; // 500
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: t.Object({
          deletedCourse: CourseWithRelationsSchema,
          message: t.String(),
        }),
        404: t.Object({ message: t.String() }),
        409: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Courses"],
    }
  );
