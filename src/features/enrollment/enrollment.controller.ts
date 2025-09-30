import { Enrollment } from "./../../providers/database/generated/client";
import Elysia, { t } from "elysia";
import {
  EnrollmentSchema,
  EnrollmentCreateUpdateSchema,
  EnrollmentWithRelationsSchema,
} from "./enrollment.schema";
import { EnrollmentService } from "./enrollment.service";

export const enrollmentController = new Elysia({ prefix: "/enrollments" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const newEnrollments = await EnrollmentService.createMany(body);
        set.status = "Created";
        return {
          data: newEnrollments,
          message: "Enrollments created successfully",
        };
      } catch (error: any) {
        if (error.message.includes("already exists")) {
          set.status = "Conflict";
          return { message: error.message };
        }
        set.status = "Internal Server Error";
        return { message: error.message || "Internal Server Error" };
      }
    },
    {
      body: t.Array(EnrollmentCreateUpdateSchema),
      response: {
        201: t.Object({
          newEnrollments: t.Array(EnrollmentSchema),
          message: t.String(),
        }),
        409: t.String(),
        500: t.String(),
      },
      tags: ["Enrollments"],
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

        const result = await EnrollmentService.findAll({
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
        200: t.Object({ data: t.Array(EnrollmentWithRelationsSchema) }),
        204: t.Object({ message: t.String() }),
        500: t.String(),
      },
      tags: ["Enrollments"],
    }
  )

  .get(
    "/:id",
    async ({ params, set }) => {
      try {
        const result = await EnrollmentService.findById(params.id);
        return result;
      } catch (error: any) {
        if (error.message === "CourseGroup not found") {
          set.status = "Not Found";
          return error.message;
        }
        set.status = "Internal Server Error";
        if ("message" in error) return error.message;
        return "Internal Server Error";
      }
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: t.Object({ data: EnrollmentWithRelationsSchema }),
        404: t.Object({ message: t.String() }),
        500: t.String(),
      },
      tags: ["Enrollments"],
    }
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      try {
        const updatedCourseGroup = await EnrollmentService.update(
          params.id,
          body
        );
        set.status = "OK"; // 200
        return {
          data: updatedCourseGroup,
          message: "Enrollments updated successfully",
        };
      } catch (error: any) {
        if (error.message.includes("not found")) {
          set.status = "Not Found"; // 404
          return "Enrollments not found"; // string
        }
        if (error.message.includes("already exists")) {
          set.status = "Conflict"; // 409
          return error.message; // string
        }
        set.status = "Internal Server Error"; // 500
        return error.message || "Internal Server Error"; // string
      }
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(EnrollmentCreateUpdateSchema),
      response: {
        200: t.Object({
          data: EnrollmentWithRelationsSchema, // ต้อง match relations
          message: t.String(),
        }),
        404: t.Object({ message: t.String() }),
        409: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Enrollments"],
    }
  )

  .delete(
    "/",
    async ({ set }) => {
      try {
        const result = await EnrollmentService.deleteAll();
        return result;
      } catch (error: any) {
        set.status = "Internal Server Error";
        if ("message" in error) return error.message;
        return "Internal Server Error";
      }
    },
    {
      response: {
        200: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
      tags: ["Enrollments"],
    }
  )

  .delete(
    "/:id",
    async ({ params, set }) => {
      try {
        const result = await EnrollmentService.deleteById(params.id);
        return result;
      } catch (error: any) {
        if (error.message === "Enrollment not found") {
          set.status = "Not Found";
          return error.message;
        }
        set.status = "Internal Server Error";
        if ("message" in error) return error.message;
        return "Internal Server Error";
      }
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: t.Object({ message: t.String() }),
        404: t.Object({ message: t.String() }),
        500: t.String(),
      },
      tags: ["Enrollments"],
    }
  );
