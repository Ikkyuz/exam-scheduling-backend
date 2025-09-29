import { t } from "elysia";

export const proctorPairSchema = t.Object({
  id: t.String({ format: "cuid", min: 25, max: 25 }),
  teacherId: t.String({ min: 25, max: 25 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const proctorPairCreateUpdateSchema = t.Omit(proctorPairSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type ProctorPairSchema = typeof proctorPairSchema.static;
export type ProctorPairCreateUpdateSchema = typeof proctorPairCreateUpdateSchema.static;
