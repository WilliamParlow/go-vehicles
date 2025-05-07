import { useVehicleStore, Vehicle } from "@/store/vehicle_store"
import axios from "axios"
import { X } from "lucide-react"

export const VehicleItem = ({ vehicle }: { vehicle: Vehicle }) => {
    const { removeVehicle } = useVehicleStore(state => state)
    const handleDeleteVehicle = () => {

        if (vehicle.id) {
            axios.delete(`http://localhost:8000/vehicle/${vehicle.id}`).then(() => {
                removeVehicle(vehicle.id as string)
            })
        }
    }
    return (
        <div className="border border-gray-100 rounded p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold">
                <span>{vehicle.maker} {vehicle.model}</span>
                <X className="text-red-500 cursor-pointer float-right" onClick={handleDeleteVehicle} />
            </h2>
            <p className="text-gray-600">Year: {vehicle.year}</p>
            <p className="text-gray-600">Price: {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(vehicle.price)}</p>
        </div>
    )
}