import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building,
  Square,
  Trash2,
  Pencil,
} from "lucide-react";
import { getProperties, cancelProperty } from "../services/authServices";
import { BASE_URL } from "../services/constants";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getProperties();
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const confirmDelete = (property) => {
    setSelectedProperty(property);
    setShowDialog(true);
  };

  const handleCancel = async () => {
    if (!selectedProperty) return;
    const id = selectedProperty.id;
    setShowDialog(false);
    setProperties((prev) => prev.filter((property) => property.id !== id));

    try {
      const result = await cancelProperty(id);
      if (!result.success) {
        showSnackbar(result.message || "Failed to delete the property.");
      } else {
        showSnackbar("Property deleted successfully.");
      }
    } catch (error) {
      console.error("Error canceling property:", error);
      showSnackbar("Failed to delete the property. Please try again.");
      setProperties(await getProperties());
    }
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="container mx-auto px-3 pt-2 pb-20 sm:pt-16 sm:pb-4"
      style={{ fontFamily: "initial" }}
    >
      <button
        onClick={() => navigate("/add-property")}
        className="flex items-center text-gray-700 mb-4 hover:text-gray-900 mt-4"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span className="text-lg font-semibold">Back</span>
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
          {properties
            .filter((property) => property.status !== 0)
            .map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-3 flex min-h-[180px]"
              >
                {/* Left Side: Image */}
                <div className="w-1/3">
                  <img
                    src={`${BASE_URL}/uploads/${property.image}`}
                    alt={property.title || "Property Image"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Right Side: Details */}
                <div className="w-2/3 pl-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {property.title || "No Title"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-3">
                      {truncateText(
                        property.description || "No description available.",
                        70
                      )}
                    </p>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        <p className="text-sm text-gray-600 mb-1 line-clamp-3">
                          {truncateText(property.location || "Unknown", 30)}
                        </p>
                      </span>
                    </div>

                    {/* Single Row with Year, Floors, Sqft */}
                    <div className="flex items-center text-gray-600 space-x-4 mt-2">
                      <div className="flex items-center">
                        {/* <Calendar className="h-4 w-4 mr-1" /> */}
                        <span className="text-sm">
                          {property.year_built || "N/A"} Year
                        </span>
                      </div>
                      <span className="text-gray-400">|</span>
                      <div className="flex items-center">
                        {/* <Building className="h-4 w-4 mr-1" /> */}
                        <span className="text-sm">
                          {property.floors || "N/A"} Floors
                        </span>
                      </div>
                      <span className="text-gray-400">|</span>
                      <div className="flex items-center">
                        {/* <Square className="h-4 w-4 mr-1" /> */}
                        <span className="text-sm">
                          {property.square_feet || "N/A"} sqft
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Delete Button Row */}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-indigo-600">
                      {property.price ? `$${property.price}` : "N/A"}
                    </p>

                    <div className="flex items-center space-x-2">
                      <button
                        className="inline-flex justify-center items-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        style={{ fontFamily: "initial" }}
                        onClick={() => confirmDelete(property)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>

                      <button
                        className="inline-flex justify-center items-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        style={{ fontFamily: "initial" }}
                        onClick={() => navigate(`/edit/${property.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDialog && selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-10">
          {/* Background Overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
          ></div>

          {/* Dialog Box */}
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>
              Are you sur you want to delete the property "
              <strong>{selectedProperty.title}</strong>"?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
