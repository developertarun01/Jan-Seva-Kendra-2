import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://jan-seva-kendra-api.vercel.app/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();

    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    setIsAdmin(Boolean(isLoggedIn));
  }, []);

  // Navigate to edit page with selected service
  const handleEdit = (service) => {
    navigate("/edit-service", { state: { service } });
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <section className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3 text-blue-600">Welcome to Jan Seva Kendra</h1>
            <p className="mb-3 text-lg">
              We offer a wide range of services to meet your needs. Click on a service to request it.
            </p>
          </div>
        </section>
        {isAdmin && (
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-3xl font-bold text-blue-600">Manage Services</h1>
            <button
              onClick={() => navigate("/add-service")}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              + Add Service
            </button>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="border bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => {
                if (!isAdmin) {
                  navigate(`/client-form/${service._id}`);
                }
              }}
            >
              <div>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="flex mt-5 justify-between">
                <h2 className="text-xl font-bold">{service.name}</h2>
                <p className="text-gray-500 pt-1">Cost: Rs {service.cost}</p>
              </div>

              <p className="text-gray-700 ">{service.description}</p>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Documents Required:</h3>
                <ul className="flex justify-between">
                  {service.documents.map((doc, index) => (
                    <li key={index} className="text-blue-600">{doc}</li>
                  ))}
                </ul>
              </div>


              {isAdmin && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(`https://jan-seva-kendra-api.vercel.app/api/services/${service._id}`);
                        setServices((prev) =>
                          prev.filter((item) => item._id !== service._id)
                        );
                      } catch (error) {
                        console.error("Error deleting service:", error);
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Services;
