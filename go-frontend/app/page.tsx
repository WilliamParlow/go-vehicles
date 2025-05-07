"use client"

import { Form, FormControl, FormField } from "@/components/form";
import { Input } from "@/components/input";
import { Navbar } from "@/components/navbar/navbar";
import { VehicleGrid } from "@/components/vehicle-grid/vehicle-table";
import { useVehicleStore, Vehicle } from "@/store/vehicle_store";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [price, setPrice] = useState<number>(0);

  const { vehicles, setVehicles, addVehicle } = useVehicleStore(state => state);

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

  const handleSubmit = () => {
    if (!maker || !model || !year || !price) {
      alert("Please fill in all fields");
      return;
    }
    const newVehicle: Vehicle = {
      maker,
      model,
      year,
      price,
    };

    axios.post("http://localhost:8000/vehicle", newVehicle).then((response) => {
      addVehicle(newVehicle);
      setMaker("");
      setModel("");
      setYear(new Date().getFullYear());
      setPrice(0);
    }).catch((error) => {
      console.error("Error adding vehicle:", error);
    });
  }

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <FormField label="Maker">
              <Input value={maker} onChange={(e) => setMaker(e.target.value)} />
            </FormField>
            <FormField label="Model">
              <Input value={model} onChange={(e) => setModel(e.target.value)} />
            </FormField>
          </FormControl>
          <FormControl>
            <FormField label="Year">
              <Input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
            </FormField>
            <FormField label="Price">
              <Input type="number" value={price} placeholder="Enter price" onChange={(e) => setPrice(parseFloat(e.target.value))} />
            </FormField>
          </FormControl>
          <FormControl>
            <button type="submit" className="bg-emerald-500 font-bold text-white px-4 py-2 rounded">Submit</button>
          </FormControl>
        </Form>
        <VehicleGrid vehicles={vehicles} />
      </main>
    </div>
  );
}
