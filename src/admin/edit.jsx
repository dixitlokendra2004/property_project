import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, MapPin, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../services/constants";
import { editProperty } from "../services/authServices";
import { useParams } from "react-router-dom";
import { getProperties } from "../services/authServices";

function EditPropertyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    location: "",
    price: "",
    square_feet: "",
    year_built: "",
    description: "",
    property_type: "",
    parking: "",
    amenities: "",
    property_condition: "",
    floors: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");
  const [propertyId, setPropertyId] = useState(null);
  const { id } = useParams();

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const properties = await getProperties();
        console.log("Fetched Properties:", properties);
        const property = properties.find((prop) => prop.id === Number(id));
        if (property) {
          setFormData({
            image: property.image || "",
            title: property.title || "",
            location: property.location || "",
            price: property.price || "",
            square_feet: property.square_feet || "",
            year_built: property.year_built || "",
            description: property.description || "",
            property_type: property.property_type || "",
            parking: property.parking || "",
            amenities: property.amenities || "",
            property_condition: property.property_condition || "",
            floors: property.floors || "",
          });
        } else {
          toast.error("Property not found!");
          navigate("/property_list");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property data!");
      }
    };
    fetchPropertyDetails();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.image) {
      toast.error("Please upload an image before submitting!");
      setLoading(false);
      return;
    }
    try {
      const response = await editProperty(id, formData);
      if (response?.message) {
        toast.success(response.message, { autoClose: 500 });
        setTimeout(() => navigate("/property_list"), 500);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const imageData = new FormData();
      imageData.append("image", file);
      const response = await fetch(`${BASE_URL}/upload_image`, {
        method: "POST",
        body: imageData,
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Upload Response Data:", data);

      if (data?.filePath) {
        const fileName = data.filePath.split("/").pop();
        setFormData((prev) => ({
          ...prev,
          image: fileName,
          imageName: file.name,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Image upload failed. No valid filePath returned.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const formValid = () => {
    return Object.entries(formData).every(([key, value]) => {
      if (key === "price" || key === "square_feet") {
        return Number(value) > 0;
      }
      return typeof value === "string" && value.trim() !== "";
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-2 pb-20 sm:pt-15 sm:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="relative"></div>
      <button
        onClick={() => navigate("/property_list")}
        className="flex items-center text-gray-700 mb-4 hover:text-gray-900 mt-4"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span className="text-lg font-semibold">Back</span>
      </button>
      <div className="">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold sm:font-bold text-gray-900 mb-8">
            Update Commercial Property
          </h2>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Image
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    name="imageName"
                    value={formData.image}
                    readOnly
                    className="flex-1 block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Upload an image"
                    required
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer ml-2">
                    <Upload className="h-6 w-6 text-gray-500 hover:text-purple-600" />
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="flex-1 block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter location"
                    required
                  />
                  <MapPin className="h-5 w-5 text-gray-400 ml-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (Monthly Rent)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="₹"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    name="square_feet"
                    value={formData.square_feet}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="year_built"
                    value={formData.year_built}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                >
                  <option value="">Select type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parking Capacity
                </label>
                <input
                  type="text"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="e.g., 20 Cars + 40 Two-wheelers"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amenities
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="e.g., 24/7 Security, Power Backup, Lift"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Condition
                </label>
                <select
                  name="property_condition"
                  value={formData.property_condition}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                >
                  <option value="">Select condition</option>
                  <option value="new">New Construction</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="needsWork">Needs Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Floors
                </label>
                <input
                  type="text"
                  name="floors"
                  value={formData.floors}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Describe the property..."
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center p-4">
              {/* Logo on the left */}
              <div className="flex justify-between items-center space-x-4">
                <button
                  type="submit"
                  disabled={!formValid() || loading}
                  className="bg-purple-600 
                  text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Update Property"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPropertyForm;
