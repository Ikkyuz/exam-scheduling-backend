import { CourseGroupService } from "./courseGroup.service";

export namespace CourseGroupController {
    export async function findAll({ set }: any) {
        try {
            const courseGroups = await CourseGroupService.findAll();
            set.status = "OK";
            return { success: true, data: courseGroups, message: "CourseGroups fetched successfully" };
        } catch(error) {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to fetch courseGroups" };
        }
    }

    export async function findById({ params, set }: any) {
        try {
            const courseGroup = await CourseGroupService.findById(params.id);
            if (!courseGroup) {
                set.status = "Not Found";
                return { success: false, message: "CourseGroup not found" };
            }
            set.status = "OK";
            return { success: true, data: courseGroup, message: "CourseGroup fetched successfully" };
        } catch(error) {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to fetch courseGroup" };
        }
    }

    export async function createMany({ body, set }: any) {
        try {
            const courseGroup = await CourseGroupService.createMany(body);
            set.status = "OK";
            return { success: true, data: courseGroup, message: "CourseGroup created successfully" };
        } catch(error) {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to create courseGroup" };
        }
    }

    export async function updateById({ params, body, set }: any) {
        try {
            const courseGroup = await CourseGroupService.updateById(params.id, body);
            set.status = "OK";
            return { success: true, data: courseGroup, message: "CourseGroup updated successfully" };
        } catch(error) {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to update courseGroup" };
        }
    }

    export async function deleteAll({ set }: any) {
        try {
            await CourseGroupService.deleteAll();
            set.status = "OK";
            return { success: true, message: "All courseGroups deleted successfully" };
        } catch(error) {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to delete courseGroups" };
        }
    }

    export async function deleteById({ params, set }: any) {
        try {
            await CourseGroupService.deleteById(params.id);
            set.status = "OK";
            return { success: true, message: "CourseGroup deleted successfully" };
        } catch(error) {
            set.status = "Internal Server Error";
            return { success: false, message: "Failed to delete courseGroup" };
        }
    }
}