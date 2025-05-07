"use client";

import { Form, FormControl, FormField } from "@/components/form";
import { Input } from "@/components/input";
import { useVehicleStore } from "@/store/vehicle_store";
import axios from "axios";
import { use, useEffect, useState } from "react";

export const VehiclePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [price, setPrice] = useState<number>(0);

  const { updateVehicle } = useVehicleStore(state => state);

  useEffect(() => {
    axios.get(`http://localhost:8000/vehicle/${id}`).then((response) => {
      const vehicle = response.data;
      setMaker(vehicle.Maker);
      setModel(vehicle.Model);
      setYear(vehicle.Year);
      setPrice(vehicle.Price);
    }).catch((error) => {
      console.error("Error fetching vehicle:", error);
    });
  }, [id]);

  const handleSubmit = () => {
    axios.post(`http://localhost:8000/vehicle/${id}`, {
      Maker: maker,
      Model: model,
      Year: year,
      Price: price,
    }).then((response) => {
      const updatedVehicle = response.data;
      updateVehicle(updatedVehicle.ID, updatedVehicle);
    }).catch((error) => {
      console.error("Error updating vehicle:", error);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Vehicle</h1>
      </header>
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
  );
}

export default VehiclePage;