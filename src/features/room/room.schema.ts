import { t } from "elysia";

export const roomSchema = t.Object({
  id: t.String({ format: "cuid", min: 25, max: 25 }),
  roomNumber: t.String({ max: 100 }),
  building: t.String({ max: 10 }),
  floor: t.String({ max: 10 }),
  capacity: t.Number({ min: 1 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const roomCreateUpdateSchema = t.Omit(roomSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type RoomSchema = typeof roomSchema.static;
export type RoomCreateUpdateSchema = typeof roomCreateUpdateSchema.static;
