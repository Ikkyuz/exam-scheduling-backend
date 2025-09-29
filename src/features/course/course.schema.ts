import { t } from "elysia";

export const courseSchema = t.Object({
  id: t.String({ format: "cuid", minLength: 25, maxLength: 25 }),
  code: t.String({ maxLength: 10 }),
  name: t.String({ maxLength: 100 }),
  duration: t.Integer({ min: 1, max: 12 }),
  examType: t.UnionEnum(["InSchedule", "OutSchedule"]),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const courseCreateUpdateSchema = t.Omit(courseSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type CourseSchema = typeof courseSchema.static;
export type CourseCreateUpdateSchema = typeof courseCreateUpdateSchema.static;
