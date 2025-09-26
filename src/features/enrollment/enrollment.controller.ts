import { EnrollmentService } from "./enrollment.service";

export namespace EnrollmentController {
    export const findAll = async ({ set }: any) => {
        try {
            const enrollments = await EnrollmentService.findAll();
            set.status = "OK";
            return { success: true, data: enrollments, message: "Enrollments fetched successfully" };
        } catch {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to fetch enrollments" };
        }
    }

    export const findById = async ({ params, set }: any) => {
        try {
            const enrollment = await EnrollmentService.findById(params.id);
            if (!enrollment) {
                set.status = "Not Found";
                return { success: false, message: "Enrollment not found" };
            }
            set.status = "OK";
            return { success: true, data: enrollment, message: "Enrollment fetched successfully" };
        } catch {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to fetch enrollment" };
        }
    }

    export const createMany = async ({ body, set }: any) => {
        try {
            const createdEnrollments = await EnrollmentService.createMany(body);
            set.status = "Created";
            return { success: true, data: createdEnrollments, message: "Enrollments created successfully" };
        } catch {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to create enrollments" };
        }
    }

    export const updateById = async ({ params, body, set }: any) => {
        try {
            const updated = await EnrollmentService.updateById(params.id, body);
            set.status = "OK";
            return { success: true, data: updated, message: "Enrollment updated successfully" };
        } catch {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to update enrollment" };
        }
    }

    export const deleteAll = async ({ set }: any) => {
        try {
            await EnrollmentService.deleteAll();
            set.status = "OK";
            return { success: true, message: "All enrollments deleted successfully" };
        } catch {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to delete enrollments" };
        }
    }

    export const deleteById = async ({ params, set }: any) => {
        try {
            await EnrollmentService.deleteById(params.id);
            set.status = "OK";
            return { success: true, message: "Enrollment deleted successfully" };
        } catch {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to delete enrollment" };
        }
    }
}