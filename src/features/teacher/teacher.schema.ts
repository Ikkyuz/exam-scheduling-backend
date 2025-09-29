import { t } from "elysia";

export const teacherSchema = t.Object({
  id: t.String({ format: "cuid", min: 25, max: 25 }),
  name: t.String({ max: 255 }),
  departmentId: t.String({ min: 25, max: 25 }),
  tel: t.String({ max: 255 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const teacherCreateUpdateSchema = t.Omit(teacherSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type TeacherSchema = typeof teacherSchema.static;
export type TeacherCreateUpdateSchema = typeof teacherCreateUpdateSchema.static;
