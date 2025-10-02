import { t } from "elysia"

export const UserSchema = t.Object({
    id: t.String(),
    firstname: t.String(),
    lastname: t.String(),
    username: t.String(),
    email: t.Optional(t.String()),
    password: t.String(),
    role: t.UnionEnum(["USER", "ADMIN"]),
    createdAt:t.Date(),
    updatedAt:t.Date()
})

export type User = typeof UserSchema.static

export const UserCreateUpdateSchema = t.Omit(UserSchema, [
    "id",
    "createdAt",
    "updatedAt"
])

export type UserCreateUpdate = typeof UserCreateUpdateSchema.static