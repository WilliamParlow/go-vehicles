import { Menu } from "lucide-react";

export const Navbar = () => (
  <nav className="bg-gray-800 text-white py-4 h-20 flex">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Menu className="text-white w-8 h-8 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
        <h1 className="text-2xl font-bold">Vehicle Inventory</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-300 text-black font-bold px-4 py-2 rounded cursor-pointer transition-colors duration-300 hover:bg-blue-400">Add Vehicle</button>
      </div>
    </div>
  </nav>
)