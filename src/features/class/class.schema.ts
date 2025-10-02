import { t } from "elysia";
import { EnrollmentSchema } from "../enrollment/enrollment.schema";

export const ClassSchema = t.Object({
    id: t.String(),
    name: t.String(),
    // Level เป็น enum ใน Prisma แต่ Elysia ต้องใช้ t.UnionEnum
    level: t.UnionEnum(["Pvoc", "Pvs"]),
    classYear: t.String(),
    department_id: t.String(),
    amount: t.Number(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
});

export type Class = typeof ClassSchema.static;

// Schema for Relations
export const ClassWithRelationsSchema = t.Composite([
    ClassSchema,
    t.Object({
        department: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
        })),
        enrollments: t.Array(t.Omit(EnrollmentSchema, ["createdAt", "updatedAt"])),
    }),
]);

export type ClassWithRelations = typeof ClassWithRelationsSchema.static;

export const ClassCreateUpdateSchema = t.Omit(ClassSchema, [
    "id",
    "createdAt",
    "updatedAt",
]);

export type ClassCreateUpdate = typeof ClassCreateUpdateSchema.static;