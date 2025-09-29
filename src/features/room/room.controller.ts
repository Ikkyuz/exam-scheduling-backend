import { RoomService } from "./room.service";

export namespace RoomController {
  export const findAll = async ({ set }: any) => {
    try {
      const rooms = await RoomService.findAll();
      set.status = "OK";
      return { success: true, data: rooms };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const findById = async ({ params, set }: any) => {
    try {
      const room = await RoomService.findById(params.id);
      if (!room) {
        set.status = "Not Found";
        return { success: false, message: "Room not found" };
      }
      set.status = "OK";
      return { success: true, data: room };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const createMany = async ({ body, set }: any) => {
    try {
      const newRooms = await RoomService.createMany(body);
      set.status = "Created";
      return { success: true, data: newRooms };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const updateById = async ({ params, body, set }: any) => {
    try {
      const updated = await RoomService.updateById(params.id, body);
      set.status = "OK";
      return { success: true, data: updated };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const deleteAll = async ({ set }: any) => {
    try {
      const deleted = await RoomService.deleteAll();
      set.status = "OK";
      return { success: true, data: deleted, message: "All rooms deleted successfully" };
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };

  export const deleteById = async ({ params, set }: any) => {
    try {
      const deleted = await RoomService.deleteById(params.id);
      set.status = "OK";
      return { success: true, data: deleted, message: "Room deleted successfully" };      
    } catch {
      set.status = "Internal Server Error";
      return { success: false, message: "Internal Server Error" };
    }
  };
}
