import { ProctorPairService } from "./proctorPair.service";

export namespace ProctorPairController {
  export const findAll = async ({ set }: any) => {
    try {
      const pairs = await ProctorPairService.findAll();
      set.status = 'OK';
      return { success: true, data: pairs };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const findById = async ({ params, set }: any) => {
    try {
      const pair = await ProctorPairService.findById(params.id);
      if (!pair) {
        set.status = 'Not Found';
        return { success: false, message: "ProctorPair not found" };
      }
      set.status = 'OK';
      return { success: true, data: pair };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const createMany = async ({ body, set }: any) => {
    try {
      const newPairs = await ProctorPairService.createMany(body);
      set.status = 'Created';
      return { success: true, data: newPairs };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const updateById = async ({ params, body, set }: any) => {
    try {
      const updated = await ProctorPairService.updateById(params.id, body);
      set.status = 'OK';
      return { success: true, data: updated };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const deleteAll = async ({ set }: any) => {
    try {
      await ProctorPairService.deleteAll();
      set.status = 'OK';
      return { success: true, message: "All proctor pairs deleted successfully" };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const deleteById = async ({ params, set }: any) => {
    try {
      await ProctorPairService.deleteById(params.id);
      set.status = 'OK';
      return { success: true, message: "ProctorPair deleted successfully" };
    } catch {
      set.status = 'Internal Server Error';
      return { success: false, message: "Internal Server Error" };
    }
  };
}
