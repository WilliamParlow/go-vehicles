import { Vehicle } from "@/store/vehicle_store"

export const VehicleItem = ({ vehicle }: { vehicle: Vehicle }) => {
    return (
        <div className="border border-gray-100 rounded p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold">{vehicle.maker} {vehicle.model}</h2>
            <p className="text-gray-600">Year: {vehicle.year}</p>
            <p className="text-gray-600">Price: ${vehicle.price}</p>
        </div>
    )
}