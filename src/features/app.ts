import { Elysia } from "elysia";
import { DepartmentRoutes } from "./department/department.route";
import { CourseRoutes } from "./course/course.route";
import { ClassRoutes } from "./class/class.route";
import { EnrollmentRoutes } from "./enrollment/enrollment.route";
import { CourseGroupRoute } from "./courseGroup/courseGroup.route";
import { RoomRoutes } from "./room/room.route";
import { TeacherRoutes } from "./teacher/teacher.route";
import { ProctorPairRoutes } from "./proctorPair/proctorPair.route";

export const app = () => {
  return new Elysia({ name: "app" })
    .use(DepartmentRoutes)
    .use(CourseRoutes)
    .use(ClassRoutes)
    .use(EnrollmentRoutes)
    .use(CourseGroupRoute)
    .use(RoomRoutes)
    .use(TeacherRoutes)
    .use(ProctorPairRoutes); 
};