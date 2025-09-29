import { RoomCreateUpdateSchema } from "./room.schema";
import { RoomRepository } from "./room.repository";

export namespace RoomService {
  export async function createMany(rooms: RoomCreateUpdateSchema[]) {
    return await RoomRepository.createMany(rooms);
  }

  export async function findAll() {
    return await RoomRepository.findAll();
  }

  export async function findById(id: string) {
    return await RoomRepository.findById(id);
  }

  export async function updateById(id: string, data: Partial<RoomCreateUpdateSchema>) {
    return await RoomRepository.updateById(id, data);
  }

  export async function deleteAll() {
    return await RoomRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await RoomRepository.deleteById(id);
  }
}
