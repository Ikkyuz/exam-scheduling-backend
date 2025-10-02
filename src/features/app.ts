import { Elysia } from "elysia";
import { DepartmentController } from "./department/department.controller";
import { CourseController } from "./course/course.controller";
import { ClassController } from "./class/class.controller";
import { CourseGroupController } from "./courseGroup/courseGroup.controller";
import { EnrollmentController } from "./enrollment/enrollment.controller";
import { RoomController } from "./room/room.controller";
import { TeacherController } from "./teacher/teacher.controller";
import { ProctorPairController } from "./proctorPair/proctorPair.controller";
import { TokenController } from "./token/token.controller";

export const app = () => {
  return new Elysia({ name: "app", prefix: "/api" })
    .use(DepartmentController.departmentController)
    .use(CourseController.courseController)
    .use(ClassController.classController)
    .use(CourseGroupController.courseGroupController)
    .use(EnrollmentController.enrollmentController)
    .use(RoomController.roomController)
    .use(TeacherController.teacherController)
    .use(ProctorPairController.proctorPairController)
    .use(TokenController.tokenController);
};