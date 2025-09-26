import { Elysia } from "elysia";
import { DepartmentRoutes } from "./department/department.route";
import { CourseRoutes } from "./course/course.route";
import { ClassRoutes } from "./class/class.route";
import { EnrollmentRoutes } from "./enrollment/enrollment.route";

export const app = () => {
  return new Elysia({ name: "app" })
    .use(DepartmentRoutes)
    .use(CourseRoutes)
    .use(ClassRoutes)
    .use(EnrollmentRoutes)
};