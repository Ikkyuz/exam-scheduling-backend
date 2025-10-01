import { t } from "elysia";
import { TeacherSchema } from "@/features/teacher/teacher.schema";

export const ProctorPairSchema = t.Object({
    id: t.String(),
    teacher_id: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
});

export type ProctorPair = typeof ProctorPairSchema.static;

// Schema for Relations
export const ProctorPairWithRelationsSchema = t.Composite([
    ProctorPairSchema,
    t.Object({
        teacher: t.Omit(TeacherSchema, ['proctorPairs']),
    }),
]);

export type ProctorPairWithRelations = typeof ProctorPairWithRelationsSchema.static;

export const ProctorPairCreateUpdateSchema = t.Omit(ProctorPairSchema, [
    "id",
    "createdAt",
    "updatedAt",
]);

export type ProctorPairCreateUpdate = typeof ProctorPairCreateUpdateSchema.static;