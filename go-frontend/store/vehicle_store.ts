import { create } from "zustand";

export interface Vehicle {
  id: string
  maker: string
  model: string
  year: number
  price: number
}

export interface VehicleStore {
  vehicles: Vehicle[]
  addVehicle: (vehicle: Vehicle) => void
  removeVehicle: (id: string) => void
  updateVehicle: (id: string, updatedVehicle: Vehicle) => void
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [] as Vehicle[],
  addVehicle: (vehicle: Vehicle) => set((state: VehicleStore) => ({ vehicles: [...state.vehicles, vehicle] })),
  removeVehicle: (id: string) => set((state: VehicleStore) => ({ vehicles: state.vehicles.filter(vehicle => vehicle.id !== id) })),
  updateVehicle: (id: string, updatedVehicle: Vehicle) => set((state: VehicleStore) => {
    const index = state.vehicles.findIndex(vehicle => vehicle.id === id);
    if (index !== -1) {
      const vehicles = [...state.vehicles];
      vehicles[index] = { ...vehicles[index], ...updatedVehicle };
      return { vehicles };
    }
    return state;
  }),
}))