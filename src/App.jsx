import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Navbar from "./components/navbar";
import LandingPage from "./pages/landing";
import PropertyDetails from "./pages/propertiesDetails";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./admin/login";
import AddProperty from "./admin/addproperty";
import Register from "./admin/register";
import PropertyList from "./admin/property_list";
import EditPropertyForm from "./admin/edit";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* Add Toaster here */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property_list" element={<PropertyList />} />
        <Route path="/edit/:id" element={<EditPropertyForm />} />
      </Routes>
    </div>
  );
}

//Run DBeaver command
//sudo /usr/local/mysql/support-files/mysql.server start

export default App;
