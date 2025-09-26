import { t } from "elysia";

export const enrollmentSchema = t.Object({
  id: t.String({ format: "cuid", min: 25, max: 25 }),
  classId: t.String({ min: 25, max: 25 }),
  courseId: t.String({ min: 25, max: 25 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

// สำหรับการสร้างหรืออัปเดต Enrollment (ไม่ต้องมี id, createdAt, updatedAt)
export const enrollmentCreateUpdateSchema = t.Omit(enrollmentSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type EnrollmentSchema = typeof enrollmentSchema.static;
export type EnrollmentCreateUpdateSchema = typeof enrollmentCreateUpdateSchema.static;
