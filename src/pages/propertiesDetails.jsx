import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bath,
  BedDouble,
  Square,
  MapPin,
  Calendar,
  Home,
  Building,
  ArrowLeft,
} from "lucide-react";
import { BASE_URL } from "../services/constants";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get_property/${id}`);
        if (!response.ok) throw new Error("Property not found");
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base md:text-xl font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-lg md:text-2xl font-bold text-gray-900">
          {error || "Property not found"}
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-4 md:pt-20 pb-20">
      <div className="max-w-full mx-0 px-4 md:px-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 mb-4 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Back</span>
        </button>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-64 md:h-[450px]">
            <img
              src={`${BASE_URL}/uploads/${property.image}`}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="p-5 md:p-10" style={{ fontFamily: "initial" }}>
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>
              <p className="text-2xl md:text-4xl font-bold text-indigo-600 mt-4 md:mt-0">
                ₹ {property.price}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Building className="h-5 w-5 md:h-7 md:w-7 text-indigo-600 mr-3" />
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Floors</p>
                  <p className="font-semibold text-sm md:text-lg">
                    {property.floors || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Square className="h-5 w-5 md:h-7 md:w-7 text-indigo-600 mr-3" />
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Sq Ft</p>
                  <p className="font-semibold text-sm md:text-lg">
                    {property.square_feet || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 md:h-7 md:w-7 text-indigo-600 mr-3" />
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Year Built</p>
                  <p className="font-semibold text-sm md:text-lg">
                    {property.year_built || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {property.description || "Empty"}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-8 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {[
                    property.parking,
                    property.amenities,
                    property.property_type,
                    property.property_condition,
                  ]
                    .filter(Boolean)
                    .map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Home className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 mr-3" />
                        <span className="text-sm md:text-base">{item}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleButtonClick}
              className="w-full bg-indigo-600 text-white py-3 md:py-4 rounded-lg hover:bg-indigo-700 transition-colors text-base md:text-lg font-semibold"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
