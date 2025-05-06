import { useVehicleStore, Vehicle } from "@/store/vehicle_store";

export default function Home() {

  const vehicles: Vehicle[] = useVehicleStore(state => state.vehicles);

  return (
    <div className="">
      {vehicles?.map((vehicle: Vehicle) => (
        <div key={vehicle.id} className="border p-4 m-2">
          <h2 className="text-xl font-bold">{vehicle.maker} {vehicle.model}</h2>
          <p>Year: {vehicle.year}</p>
          <p>Price: ${vehicle.price}</p>
        </div>
      ))}
    </div>
  );
}
