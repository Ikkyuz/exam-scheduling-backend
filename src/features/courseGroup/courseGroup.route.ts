import Elysia, { t } from "elysia";
import { courseGroupSchema, courseGroupCreateUpdateSchema } from "./courseGroup.schema";
import { CourseGroupController } from "./courseGroup.controller";

export const CourseGroupRoute = new Elysia({ prefix: "/courseGroups" })

    // Get all courseGroups
    .get("/all", CourseGroupController.findAll, {
        tags: ["CourseGroups"],
        response: {
            200: t.Object({ success: t.Boolean(), data: t.Array(courseGroupSchema) }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // Get courseGroup by id
    .get("/:id", CourseGroupController.findById, {
        tags: ["CourseGroups"],
        params: t.Object({ id: t.String() }),
        response: {
            200: t.Object({ success: t.Boolean(), data: courseGroupSchema }),
            404: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // Create many courseGroups
    .post("/many", CourseGroupController.createMany, {
        tags: ["CourseGroups"],
        body: t.Array(courseGroupCreateUpdateSchema),
        response: {
            201: t.Object({ success: t.Boolean(), data: t.Array(courseGroupSchema) }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // Update courseGroup
    .put("/:id", CourseGroupController.updateById, {
        tags: ["CourseGroups"],
        params: t.Object({ id: t.String() }),
        body: t.Object(courseGroupCreateUpdateSchema),
        response: {
            200: t.Object({ success: t.Boolean(), data: courseGroupSchema }),
            404: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // Delete all courseGroups
    .delete("/all", CourseGroupController.deleteAll, {
        tags: ["CourseGroups"],
        response: {
            200: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // Delete courseGroup
    .delete("/:id", CourseGroupController.deleteById, {
        tags: ["CourseGroups"],
        params: t.Object({ id: t.String() }),
        response: {
            200: t.Object({ success: t.Boolean(), message: t.String() }),
            404: t.Object({ success: t.Boolean(), message: t.String() }),
            500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    });