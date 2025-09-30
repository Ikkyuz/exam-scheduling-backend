import { Elysia } from "elysia";
import { departmentController } from "./department/department.controller";
import { courseController } from "./course/course.controller";
import { classController } from "./class/class.controller";
import { courseGroupController } from "./courseGroup/courseGroup.controller";
import { enrollmentController } from "./enrollment/enrollment.controller";
import { roomController } from "./room/room.controller";
import { teacherController } from "./teacher/teacher.controller";
import { proctorPairController } from "./proctorPair/proctorPair.controller";

export const app = () => {
  return new Elysia({ name: "app", prefix: "/api" })
    .use(departmentController)
    .use(courseController)
    .use(classController)
    .use(courseGroupController)
    .use(enrollmentController)
    .use(roomController)
    .use(teacherController)
    .use(proctorPairController)
};