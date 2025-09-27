import React from "react";
import { Instagram, Facebook } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      phone: "+1 234 567 890",
      img: "public/images/campus.jpeg",
    },
    {
      name: "Sarah Smith",
      phone: "+1 987 654 321",
      img: "public/images/eccommerce_logo.png",
    },
    {
      name: "James Brown",
      phone: "+1 543 210 678",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Emily Davis",
      phone: "+1 678 123 456",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Michael Johnson",
      phone: "+1 890 456 123",
      img: "https://randomuser.me/api/portraits/men/52.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-10 lg:px-12">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left side - Photos */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Main large photo */}
              <div className="col-span-2">
                <img
                  src="public/images/grm_property.jpeg"
                  alt="Luxury Property"
                  className="w-full h-[300px] sm:h-[400px] object-cover rounded-2xl shadow-lg"
                />
              </div>
              {/* Two smaller photos */}
              <div>
                <img
                  src="public/images/property.jpeg"
                  alt="Property Interior"
                  className="w-full h-[180px] sm:h-[250px] object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <img
                  src="public/images/properties_image.jpeg"
                  alt="Property Exterior"
                  className="w-full h-[180px] sm:h-[250px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="lg:w-1/2" style={{ fontFamily: "initial" }}>
            <h3 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-800 mb-8 sm:mb-10">
              About Us
            </h3>
            <div className="space-y-6 sm:space-y-8 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                Our commitment to excellence drives everything we do. From the
                moment you begin your property search until the day you receive
                your keys, our team of dedicated professionals is there to
                ensure a smooth, transparent, and enjoyable experience.
              </p>
              <p>
                We pride ourselves on our curated selection of premium
                properties, each chosen for its unique character, prime
                location, and exceptional quality. Whether you're seeking a
                modern urban apartment, a spacious suburban family home, or a
                luxurious beachfront villa, we have the expertise and portfolio
                to match your aspirations.
              </p>
              <p>
                Our deep understanding of the luxury real estate market,
                combined with our personalized approach to client service, sets
                us apart in the industry. We don't just sell properties; we help
                you find a home that reflects your lifestyle, meets your needs,
                and exceeds your expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Footer */}
        <div className="mt-20 bg-gray-900 text-white py-12 w-full">
          <div className="text-center">
            <h3
              className="text-xl sm:text-2xl font-bold mb-6"
              style={{ fontFamily: "initial" }}
            >
              Connect With Us
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/m.s_thapa_/?igsh=MTBxN2Rpams5YWdpbA%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors flex items-center"
              >
                <Instagram className="h-6 w-6 sm:h-8 sm:w-8 mr-2" />
                <span
                  className="text-base sm:text-xl"
                  style={{ fontFamily: "initial" }}
                >
                  Instagram
                </span>
              </a>
              <a
                href="https://www.facebook.com/people/Maan-Thapa/pfbid02kora2iukwdHuqinyXgDJFg8HqsiPL8MQ3v3DpDKLNzog6TFBJXLk7twsor1AEAE2l/?mibextid=wwXIfr&rdid=xpCob4mgLc6ImTtO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F8edscWLQ%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors flex items-center"
              >
                <Facebook className="h-6 w-6 sm:h-8 sm:w-8 mr-2" />
                <span
                  className="text-base sm:text-xl"
                  style={{ fontFamily: "initial" }}
                >
                  Facebook
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
