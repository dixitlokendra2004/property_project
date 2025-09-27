import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, MapPin, LogOut, Building } from "lucide-react";
import { addProperty } from "../services/authServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../services/constants";

function AddProperty() {
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

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Before Submission:", formData);

    if (!formData.image) {
      return toast.error("Please upload an image before submitting!");
    }

    setLoading(true);

    try {
      const response = await addProperty(formData);

      console.log("API Response:", response);

      if (response?.message) {
        toast.success(response.message, { autoClose: 3000 });
        setTimeout(() => navigate("/property_list"), 3000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.message || "Something went wrong!");
      setLoading(false);
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

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  const isFormInvalid =
    loading || Object.values(formData).some((value) => !value);

  const handleButtonClick = () => {
    navigate("/property_list");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <button
          type="button"
          onClick={handleLogout}
          className="absolute top-4 right-4 p-3 border border-transparent shadow-sm rounded-md text-red-600 bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
      <div className="">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-center mb-2">
            <img
              src="public/images/property_logo.png"
              alt="Logo"
              className="h-40 w-40"
            />
          </div>
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold sm:font-bold text-gray-900 mb-8">
            Add New Commercial Property
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
                    value={formData.imageName}
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

              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div> */}

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

            {/* Submit Button with Progress Indicator */}
            <div className="flex flex-wrap justify-between items-center p-2 sm:p-4 gap-2">
              {/* Left Button */}
              <button
                className="inline-flex justify-center items-center py-2 px-3 sm:py-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                style={{ fontFamily: "initial" }}
                onClick={handleButtonClick}
              >
                <Building className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Property List
              </button>

              {/* Right Button */}
              <div className="flex items-center ml-0 sm:ml-4">
                <button
                  type="submit"
                  disabled={isFormInvalid}
                  className={`flex justify-center items-center py-2 px-3 sm:py-3 sm:px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white ${
                    isFormInvalid
                      ? "bg-purple-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  <Building className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  {loading ? "Processing..." : "Add Property"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
