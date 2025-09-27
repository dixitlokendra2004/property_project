import React from "react";
import { Phone, Mail, Instagram, Facebook, MessageSquare } from "lucide-react";

function Contact() {
  return (
    <div
      className="min-h-screen bg-gray-50 pt-4 sm:pt-32 pb-20 px-4"
      style={{ fontFamily: "initial" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-0 sm:mb-2 px-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Any question or remarks? Just reach out to us!
          </p>
        </div>

        {/* White Card Wrapper */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Property Image */}
            <div className="md:w-1/2">
              <img
                src="public/images/grm_property.jpeg"
                alt="Modern Commercial Building"
                className="w-full h-full object-cover rounded-3xl shadow-md"
              />
            </div>

            {/* Right side - Contact Info */}
            <div className="md:w-1/2">
              <div className="bg-purple-600 rounded-3xl p-8 text-white h-full overflow-hidden">
                <div className="space-y-8 relative z-10">
                  <h2 className="text-2xl font-bold mb-2">
                    Contact Information
                  </h2>
                  <p className="text-purple-100 mb-12">
                    Reach out to us for any inquiries about our properties!
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500 p-3 rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-purple-100">+91 94250 81738</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500 p-3 rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-purple-100 break-all">
                          thapamanshamsher@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500 p-3 rounded-lg">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Office Address</p>
                        <p className="text-purple-100">
                          79 B IDA commercial SCH No 169 B TCS SQUARE, super
                          corridor Indore MP
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <a
                      href="https://www.instagram.com/m.s_thapa_/?igsh=MTBxN2Rpams5YWdpbA%3D%3D#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-500 p-3 rounded-full hover:bg-purple-400 transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.facebook.com/people/Maan-Thapa/pfbid0hGDP7ZHQ6JvbKSrP7jT7b3a5xQ74CYr1Bja7G1p8g3rAUCVUCL52BrHKYkTTTMKWl/?mibextid=wwXIfr&rdid=IQQpm2MtS6OHJHgn&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F8edscWLQ%2F%3Fmibextid%3DwwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-500 p-3 rounded-full hover:bg-purple-400 transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  </div>
                </div>

                {/* Decorative circles */}
                {/* <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-400 rounded-full opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400 rounded-full opacity-50"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
