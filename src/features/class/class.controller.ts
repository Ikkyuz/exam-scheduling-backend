import { ClassService } from "./class.service";

export namespace ClassController {
    export const findAll = async ({ set }: any) => {
        try {
            const classes = await ClassService.findAll();
            set.status = 200;
            return { success: true, data: classes, message: "Classes fetched successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Internal Server Error" };
        }
    }

    export const findById = async ({ params, set }: any) => {
        try {
            const classItem = await ClassService.findById(params.id);
            if (!classItem) {
                set.status = 404;
                return { success: false, message: "Class not found" };
            }
            set.status = 200;
            return { success: true, data: classItem, message: "Class fetched successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Internal Server Error" };
        }
    }

    export const createMany = async ({ body, set }: any) => {
        try {
            const newClasses = await ClassService.createMany(body);
            set.status = 201;
            return { success: true, data: newClasses, message: "Classes created successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Internal Server Error" };
        }
    }

    export const updateById = async ({ params, body, set }: any) => {
        try {
            const updated = await ClassService.updateById(params.id, body);
            if (!updated) {
                set.status = 404;
                return { success: false, message: "Class not found" };
            }
            set.status = 200;
            return { success: true, message: "Class updated successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Internal Server Error" };
        }
    }   

    export const deleteAll = async ({ set }: any) => {
        try {
            await ClassService.deleteAll();
            set.status = 200;
            return { success: true, message: "All classes deleted successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Internal Server Error" };
        }
    }

    export const deleteById = async ({ params, set }: any) => {
        try {
            const deleted = await ClassService.deleteById(params.id);
            if (!deleted) {
                set.status = 404;
                return { success: false, message: "Class not found" };
            }
            set.status = 200;
            return { success: true, message: "Class deleted successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: "Internal Server Error" };
        }
    }
}
