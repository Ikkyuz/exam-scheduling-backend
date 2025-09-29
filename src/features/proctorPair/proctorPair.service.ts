import { ProctorPairCreateUpdateSchema } from "./proctorPair.schema";
import { ProctorPairRepository } from "./proctorPair.repository";

export namespace ProctorPairService {
  export async function createMany(pairs: ProctorPairCreateUpdateSchema[]) {
    return await ProctorPairRepository.createMany(pairs);
  }

  export async function findAll() {
    return await ProctorPairRepository.findAll();
  }

  export async function findById(id: string) {
    return await ProctorPairRepository.findById(id);
  }

  export async function updateById(id: string, data: Partial<ProctorPairCreateUpdateSchema>) {
    return await ProctorPairRepository.updateById(id, data);
  }

  export async function deleteAll() {
    return await ProctorPairRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await ProctorPairRepository.deleteById(id);
  }
}
