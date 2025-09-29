import { t } from "elysia";

export const courseGroupSchema = t.Object({
    id: t.String({ format: "cuid", minLength: 25, maxLength: 25 }),
    courseId: t.String({ minLength: 25, maxLength: 25 }),
    createdAt: t.Date(),
    updatedAt: t.Date(),
});

export const courseGroupCreateUpdateSchema = t.Omit(courseGroupSchema, [
    "id",
    "createdAt",
    "updatedAt",
]);

export type CourseGroupSchema = typeof courseGroupSchema.static
export type CourseGroupCreateUpdateSchema = typeof courseGroupCreateUpdateSchema.static