import Elysia, { t } from "elysia";
import { RoomController } from "./room.controller";
import { roomSchema, roomCreateUpdateSchema } from "./room.schema";

export const RoomRoutes = new Elysia({ prefix: "/rooms" })
  .get("/all", RoomController.findAll, {
    tags: ["Rooms"],
    response: {
      200: t.Object({ success: t.Boolean(), data: t.Array(roomSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .get("/:id", RoomController.findById, {
    tags: ["Rooms"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), data: roomSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .post("/many", RoomController.createMany, {
    tags: ["Rooms"],
    body: t.Array(roomCreateUpdateSchema),
    response: {
      201: t.Object({ success: t.Boolean(), data: t.Array(roomSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .put("/:id", RoomController.updateById, {
    tags: ["Rooms"],
    params: t.Object({ id: t.String() }),
    body: roomCreateUpdateSchema,
    response: {
      200: t.Object({ success: t.Boolean(), data: roomSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .delete("/all", RoomController.deleteAll, {
    tags: ["Rooms"],
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    }
  })
  .delete("/:id", RoomController.deleteById, {
    tags: ["Rooms"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  });
