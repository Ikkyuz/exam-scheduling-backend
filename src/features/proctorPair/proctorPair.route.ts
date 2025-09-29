import Elysia, { t } from "elysia";
import { ProctorPairController } from "./proctorPair.controller";
import {
  proctorPairSchema,
  proctorPairCreateUpdateSchema,
} from "./proctorPair.schema";

export const ProctorPairRoutes = new Elysia({ prefix: "/proctor-pairs" })
  .get("/all", ProctorPairController.findAll, {
    tags: ["ProctorPairs"],
    response: {
      200: t.Object({ success: t.Boolean(), data: t.Array(proctorPairSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .get("/:id", ProctorPairController.findById, {
    tags: ["ProctorPairs"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), data: proctorPairSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .post("/many", ProctorPairController.createMany, {
    tags: ["ProctorPairs"],
    body: t.Array(proctorPairCreateUpdateSchema),
    response: {
      201: t.Object({ success: t.Boolean(), data: t.Array(proctorPairSchema) }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .put("/:id", ProctorPairController.updateById, {
    tags: ["ProctorPairs"],
    params: t.Object({ id: t.String() }),
    body: proctorPairCreateUpdateSchema,
    response: {
      200: t.Object({ success: t.Boolean(), data: proctorPairSchema }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .delete("/all", ProctorPairController.deleteAll, {
    tags: ["ProctorPairs"],
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    },
  })
  .delete("/:id", ProctorPairController.deleteById, {
    tags: ["ProctorPairs"],
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ success: t.Boolean(), message: t.String() }),
      404: t.Object({ success: t.Boolean(), message: t.String() }),
      500: t.Object({ success: t.Boolean(), message: t.String() }),
    }
  });
