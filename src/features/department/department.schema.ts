import { t } from "elysia";

export const departmentSchema = t.Object({
  id: t.String({ format: "cuid", minLength: 25, maxLength: 25 }),
  name: t.String({ maxLength: 100 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const departmentCreateUpdateSchema = t.Omit(departmentSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type DepartmentSchema = typeof departmentSchema.static;
export type DepartmentCreateUpdate = typeof departmentCreateUpdateSchema.static;
