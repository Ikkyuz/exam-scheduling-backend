import { t } from "elysia";

export enum Level {
  Pvoc = "ปวช.",
  Pvs = "ปวส.",
}

export const classSchema = t.Object({
  id: t.String({ format: "cuid", min: 25, max: 25 }),
  name: t.String({ max: 100 }),
  level: t.Union([t.Literal(Level.Pvoc), t.Literal(Level.Pvs)]),
  classYear: t.String({ min: 4, max: 4 }),
  departmentId: t.String({ min: 25, max: 25 }),
  amount: t.Number({ min: 1, max: 40 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

// สำหรับการสร้างหรืออัปเดต Class (ไม่ต้องมี id, createdAt, updatedAt)
export const classCreateUpdateSchema = t.Omit(classSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type ClassSchema = typeof classSchema.static;
export type ClassCreateUpdateSchema = typeof classCreateUpdateSchema.static;
