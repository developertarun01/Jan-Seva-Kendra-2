import React from "react";

function About() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            About Us
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to <strong>Jan Seva Kendra</strong>, your one-stop solution for a wide range of government and utility services. Our mission is to provide fast, reliable, and accessible services to everyone in our community. We pride ourselves on ensuring that essential services are available to all, fostering convenience and trust.
          </p>
          <div className="text-lg text-gray-700 space-y-4">
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
              <strong>Mobile No:</strong> <a href="tel:+918630739687" className="text-blue-600 hover:underline">+91 86307 39687</a>
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:tarunbusinessmail@gmail.com" className="text-blue-600 hover:underline">tarunbusinessmail@gmail.com</a>
            </p>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-700">
              At <strong>Jan Seva Kendra</strong>, we are committed to bridging the gap between citizens and essential services. From Aadhaar updates to utility bill payments, we ensure seamless processes, saving your time and effort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
