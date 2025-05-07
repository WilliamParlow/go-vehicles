package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"fmt"

	"github.com/gorilla/mux"
)

type Vehicle struct {
	ID    string
	Maker string
	Model string
	Year  int
	Price float64
}

var vehicles []Vehicle = []Vehicle{
	{ID: "1", Maker: "Toyota", Model: "Camry", Year: 2020, Price: 24000.00},
	{ID: "2", Maker: "Honda", Model: "Civic", Year: 2019, Price: 22000.00},
	{ID: "3", Maker: "Ford", Model: "Mustang", Year: 2021, Price: 30000.00},
	{ID: "4", Maker: "Chevrolet", Model: "Malibu", Year: 2018, Price: 20000.00},
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/vehicle", VehiclesHandler).Methods("GET")
	r.HandleFunc("/vehicle", CreateVehicleHandler).Methods("POST")
	r.HandleFunc("/vehicle/{id}", UpdateVehicleHandler).Methods("PUT")
	r.HandleFunc("/vehicle/{id}", DeleteVehicleHandler).Methods("DELETE")
	r.HandleFunc("/vehicle/{id}", VehicleHandler).Methods("GET")

	log.Println("Starting server on :8000...")

	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func VehicleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for _, vehicle := range vehicles {
		if vehicle.ID == id {
			json.NewEncoder(w).Encode(vehicle)
			log.Printf("Find By ID:\nVehicle ID: %s, Maker: %s, Model: %s, Year: %d, Price: %.2f\n", vehicle.ID, vehicle.Maker, vehicle.Model, vehicle.Year, vehicle.Price)
			return
		}
	}
	http.Error(w, "Vehicle not found", http.StatusNotFound)
}

func VehiclesHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Find All:\n")
	json.NewEncoder(w).Encode(vehicles)
}

func CreateVehicleHandler(w http.ResponseWriter, r *http.Request) {
	var vehicle Vehicle
	if err := json.NewDecoder(r.Body).Decode(&vehicle); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	vehicle.ID = fmt.Sprint(len(vehicles) + 1)
	vehicles = append(vehicles, vehicle)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(vehicle)
	log.Printf("Create:\nVehicle ID: %s, Maker: %s, Model: %s, Year: %d, Price: %.2f\n", vehicle.ID, vehicle.Maker, vehicle.Model, vehicle.Year, vehicle.Price)
}

func UpdateVehicleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var updatedVehicle Vehicle
	if err := json.NewDecoder(r.Body).Decode(&updatedVehicle); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	for i, vehicle := range vehicles {
		if vehicle.ID == id {
			vehicles[i] = updatedVehicle
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(updatedVehicle)
			log.Printf("Update:\nVehicle ID: %s, Maker: %s, Model: %s, Year: %d, Price: %.2f\n", updatedVehicle.ID, updatedVehicle.Maker, updatedVehicle.Model, updatedVehicle.Year, updatedVehicle.Price)
			return
		}
	}
	http.Error(w, "Vehicle not found", http.StatusNotFound)
}

func DeleteVehicleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for i, vehicle := range vehicles {
		if vehicle.ID == id {
			vehicles = append(vehicles[:i], vehicles[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			log.Printf("Delete:\nVehicle ID: %s", vehicle.ID)
			return
		}
	}
	http.Error(w, "Vehicle not found", http.StatusNotFound)
}
