import { Vehicle } from "@/store/vehicle_store";
import { VehicleItem } from "./vehicle-item/vehicle-item";

export const VehicleGrid = ({ vehicles }: { vehicles: Vehicle[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {vehicles.map((vehicle) => <VehicleItem key={vehicle.id} vehicle={vehicle} />)}
        </div>
    )
}
