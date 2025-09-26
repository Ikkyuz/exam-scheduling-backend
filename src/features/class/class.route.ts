import Elysia, { t } from "elysia";
import { ClassController } from "./class.controller";
import { classSchema, classCreateUpdateSchema } from "./class.schema";

export const classRoutes = new Elysia({ prefix: "/classes" })

    // GET /classes/all
    .get("/all", ClassController.findAll, {
        tags: ["Classes"],
        response: {
          200: t.Object({ success: t.Boolean(), data: t.Array(classSchema) }),
          500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // GET /classes/:id
    .get("/:id", ClassController.findById, {
        tags: ["Classes"],
        params: t.Object({ id: t.String() }),
        response: {
          200: t.Object({ success: t.Boolean(), data: classSchema }),
          404: t.Object({ success: t.Boolean(), message: t.String() }),
          500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // POST /classes/many
    .post("/many", ClassController.createMany, {
        tags: ["Classes"],
        body: t.Array(classCreateUpdateSchema),
        response: {
          201: t.Object({ success: t.Boolean(), data: t.Array(classSchema) }),
          500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // PUT /classes/:id
    .put("/:id", ClassController.updateById, {
        tags: ["Classes"],
        params: t.Object({ id: t.String() }),
        body: classCreateUpdateSchema,
        response: {
          200: t.Object({ success: t.Boolean(), data: classSchema }),
          500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // DELETE /classes/all
    .delete("/all", ClassController.deleteAll, {
        tags: ["Classes"],
        response: {
          200: t.Object({ success: t.Boolean() }),
          500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    })

    // DELETE /classes/:id
    .delete("/:id", ClassController.deleteById, {
        tags: ["Classes"],
        params: t.Object({ id: t.String() }),
        response: {
          200: t.Object({ success: t.Boolean() }),
          404: t.Object({ success: t.Boolean(), message: t.String() }),
          500: t.Object({ success: t.Boolean(), message: t.String() }),
        },
    });
