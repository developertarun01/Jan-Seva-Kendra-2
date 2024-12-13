import React, { useState } from "react";

function Contact() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobile: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct WhatsApp message
    const whatsappMessage = `Hello, There's a Message for you:
- Name: ${formData.name}
- mobile: ${formData.mobile}
- Email: ${formData.email || "Not Provided"}
- Message: ${formData.message}
Thank you`;

    // WhatsApp URL
    const whatsappURL = `https://wa.me/918630739687?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Clear form inputs
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Have questions or need assistance? Reach out to us, and we’ll be happy to help!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-600">
                Contact Information
              </h2>
              <p>
                <strong>Shop Name:</strong> Jan Seva Kendra
              </p>
              <p>
                <strong>Owner Name:</strong> Tarun Kumar
              </p>
              <p>
                <strong>Address:</strong> Opp. ESI Hospital, New Sharda Nagar, Saharanpur, Uttar Pradesh, India 247001
              </p>
              <p>
                <strong>Mobile No:</strong>{" "}
                <a
                  href="tel:+918630739687"
                  className="text-blue-600 hover:underline"
                >
                  +91 86307 39687
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:tarunbusinessmail@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  tarunbusinessmail@gmail.com
                </a>
              </p>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Send Us a Message
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="name"
                  >
                    Your Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
                    Your Mobile No:
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Enter your Mobile Number"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="email"
                  >
                    Your Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="message"
                  >
                    Your Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;