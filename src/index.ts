import "dotenv/config";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { env } from "./shared/config/env.js";
import { appConfig } from "./shared/config/app.config.js";
import { errorHandler } from "./shared/middleware/error-handler";
import { corsMiddleware } from "./shared/middleware/cors";
import { loggerMiddleware } from "./shared/middleware/logger";
import { app as features } from "./features/app.js";

const app = new Elysia()
	.use(errorHandler)
	.use(corsMiddleware)
	.use(loggerMiddleware)
  	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "exam-scheduling documentation",
					version: appConfig.version,
				},
			},
		}),
	)
	.use(features())
	.get("/", () => "Hello Elysia")
	.listen(env.APP_PORT);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/docs successfully`,
);

process.on("SIGINT", () => {
	console.log("Received SIGINT. Shutting down gracefully...");
	app.stop();
	process.exit(0);
});