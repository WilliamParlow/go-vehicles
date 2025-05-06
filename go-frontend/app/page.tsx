"use client"

import { Navbar } from "@/components/Navbar/navbar";
import { VehicleGrid } from "@/components/vehicle-grid/vehicle-table";
import { useVehicleStore } from "@/store/vehicle_store";
import axios from "axios";
import { Menu } from "lucide-react";
import { useEffect } from "react";

export default function Home() {

  const { vehicles, setVehicles } = useVehicleStore(state => state);

  useEffect(() => {
    axios.get("http://localhost:8000/vehicle").then((response) => {
      console.log(response)
      const vehicles = response.data;
      setVehicles(vehicles?.map((vehicle: any) => ({
        id: vehicle.ID,
        maker: vehicle.Maker,
        model: vehicle.Model,
        year: vehicle.Year,
        price: vehicle.Price,
      })));
    }).catch((error) => {
      console.error("Error fetching vehicles:", error);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <VehicleGrid vehicles={vehicles} />
      </main>
    </div>
  );
}
