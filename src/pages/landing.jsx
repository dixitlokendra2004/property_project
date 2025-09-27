import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/constants";
import {
  MapPin,
  Search,
  Heart,
  Bath,
  BedDouble,
  Square,
  Instagram,
  Facebook,
  ChevronDown,
  PlayCircle,
  Shield,
  Leaf,
  Sun,
  Droplet,
  Calendar,
  Building,
} from "lucide-react";
import { getProperties } from "../services/authServices";

function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  const backgroundImages = [
    "public/images/grm_property.jpeg",
    "public/images/property.jpeg",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered properties
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchLocation.trim()) {
      setFilteredProperties(properties);
      return;
    }
    const filtered = properties.filter((property) =>
      property.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);
    if (!value.trim()) {
      setFilteredProperties(properties);
    }
  };

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  return (
    <div>
      {/* Hero Section with Auto-scrolling Background */}
      <div
        className="relative h-[500px] bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          fontFamily: "initial",
          backgroundImage: `url("${backgroundImages[currentImageIndex]}")`,
        }}
      >
        <div className="absolute inset-0 bg-opacity-60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Properties to buy in Indore
            </h1>
            <p className="text-sm text-white mb-8 max-w-2xl">
              Everyone has dreams and aspirations, but most of us don't have the
              first idea about how to make them come true. Or at least we don't
              think we do. For some reason we aren't able to trust that the
              voice inside our head may actually know what it's talking about.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-3xl">
              <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
                <div className="flex-1 relative flex items-center">
                  <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search location in Indore"
                    value={searchLocation}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors ml-2"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div
        className="container mx-auto px-4 py-16"
        style={{ fontFamily: "initial" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link to={`/properties/${property.id}`}>
                <div className="relative">
                  <img
                    src={`${BASE_URL}/uploads/${property.image}`}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-indigo-600">
                      {property.price}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{property.year_built} Year</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        <span>{property.floors} Floors</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-5 w-5 mr-2" />
                        <span>{property.square_feet} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div
        className="bg-gray-200 py-16 pb-20 mb-0"
        style={{ fontFamily: "initial" }}
      >
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 p-2 rounded-lg text-center mb-10">
            <h2 className="text-3xl font-bold text-black">
              Benefits of owning an eco-friendly home
            </h2>
            <p className="text-1xl text-gray-700 mt-2">
              High-quality homes with low-carbon impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
              <h3 className="text-lg font-semibold text-black p-4">
                Low energy costs
              </h3>
              <p className="text-sm text-gray-600 px-4 flex-grow">
                One of the most significant benefits of owning an Eco Haven
                Realty Home is lower energy costs. Our eco-friendly homes are
                designed to use less energy with our solar powered system,
                saving money on bills.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-CPOhdXHLN3ij7E3X5ycFGSENINHVZt92nQ&s"
                alt="Modern Solar Home"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
              <h3 className="text-lg font-semibold text-black p-4">
                Smaller carbon footprint
              </h3>
              <p className="text-sm text-gray-600 px-4 flex-grow mb-4">
                {" "}
                {/* Added mb-4 for spacing */}
                Our eco-friendly homes also have a smaller carbon footprint.
                They constantly use renewable energy sources and produce less
                waste which means they have a lower impact on the environment.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE77p0lF213r70M8YljB6lvF-hEtPPygHHZw&s"
                alt="Green Urban Retreat"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
              <h3 className="text-lg font-semibold text-black p-4">Indoor</h3>
              <p className="text-sm text-gray-600 px-4 flex-grow">
                Our hybrid ventilation strategy includes both natural and
                mechanical ventilation, while our airtight wooden structure
                reduces risk of mold development, ensuring a healthy home.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDMWJUnEPnAV5aniunbrYReymlqfOcxY0HA&s"
                alt="Nature Inspired Villa"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Eco-Friendly Features Section */}
      <div
        className="py-20 bg-gradient-to-b from-gray-100 to-white mt-0"
        style={{ fontFamily: "initial" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sustainable Living Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our properties incorporate cutting-edge eco-friendly technologies
              for sustainable living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Sun className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Solar Power
              </h3>
              <p className="text-gray-600">
                High-efficiency solar panels that reduce energy costs by up to
                70% and minimize environmental impact.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Water Conservation
              </h3>
              <p className="text-gray-600">
                Rainwater harvesting systems and low-flow fixtures that reduce
                water usage by up to 50%.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Home
              </h3>
              <p className="text-gray-600">
                Integrated smart home systems that optimize energy usage and
                enhance security and comfort.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                <Leaf className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sustainable Materials
              </h3>
              <p className="text-gray-600">
                Eco-friendly building materials that reduce carbon footprint and
                create healthier living spaces.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Footer */}
      <div className="bg-gray-900 text-white py-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h3
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "initial" }}
          >
            Connect With Us
          </h3>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 items-center">
            <a
              href="https://www.instagram.com/m.s_thapa_/?igsh=MTBxN2Rpams5YWdpbA%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center mb-6 md:mb-2"
            >
              <Instagram className="h-8 w-8 md:h-10 md:w-10 mr-2" />
              <span
                className="text-base md:text-lg"
                style={{ fontFamily: "initial" }}
              >
                Instagram
              </span>
            </a>

            <a
              href="https://www.facebook.com/people/Maan-Thapa/pfbid02kora2iukwdHuqinyXgDJFg8HqsiPL8MQ3v3DpDKLNzog6TFBJXLk7twsor1AEAE2l/?mibextid=wwXIfr&rdid=xpCob4mgLc6ImTtO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F8edscWLQ%2F%3Fmibextid%3DwwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center mb-6 md:mb-2"
            >
              <Facebook className="h-8 w-8 md:h-10 md:w-10 mr-2" />
              <span
                className="text-base md:text-lg"
                style={{ fontFamily: "initial" }}
              >
                Facebook
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
