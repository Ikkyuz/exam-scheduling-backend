import Elysia, { t } from "elysia";
import { EnrollmentController } from "./enrollment.controller";
import { enrollmentSchema, enrollmentCreateUpdateSchema } from "./enrollment.schema";

export const EnrollmentRoutes = new Elysia({ prefix: "/enrollments" })

    // GET /enrollments/all 
    .get("/all", EnrollmentController.findAll, {
        tags: ["Enrollments"],
        body: t.Object({
            id: t.String({ format: "cuid", min: 25, max: 25 }),
            classId: t.String({ min: 25, max: 25 }),
            courseId: t.String({ min: 25, max: 25 }),
            createdAt: t.Date(),
            updatedAt: t.Date(),
        }),
    })

    // GET /enrollments/:id
    .get("/:id", EnrollmentController.findById, {
        tags: ["Enrollments"],
        params: t.Object({ id: t.String() }),
        response: {
            200: t.Object({ success: t.Boolean(), data: enrollmentSchema }),
            404: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // POST /enrollments/many
    .post("/many", EnrollmentController.createMany, {
        tags: ["Enrollments"],
        body: t.Array(enrollmentCreateUpdateSchema),
        response: {
            201: t.Object({ success: t.Boolean(), data: t.Array(enrollmentSchema) }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // PUT /enrollments/:id
    .put("/:id", EnrollmentController.updateById, {
        tags: ["Enrollments"],
        params: t.Object({ id: t.String() }),
        body: t.Object(enrollmentCreateUpdateSchema),
        response: {
            200: t.Object({ success: t.Boolean(), data: enrollmentSchema }),
            404: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // DELETE /enrollments/all
    .delete("/all", EnrollmentController.deleteAll, {
        tags: ["Enrollments"],
        response: {
            200: t.Object({ success: t.Boolean() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // DELETE /enrollments/:id
    .delete("/:id", EnrollmentController.deleteById, {
        tags: ["Enrollments"],
        params: t.Object({ id: t.String() }),
        response: {
            200: t.Object({ success: t.Boolean() }),
            404: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    });