import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function AdminForm() {
  const [serviceId, setServiceId] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [document1, setDocument1] = useState("");
  const [document2, setDocument2] = useState("");
  const [document3, setDocument3] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // If editing, prefill data
  useEffect(() => {
    if (location.state?.service) {
      const { _id, name, cost, description, documents, image } = location.state.service;
      setServiceId(_id);
      setServiceName(name);
      setServiceCost(cost || "");
      setServiceDescription(description);
      setDocument1(documents[0] || "");
      setDocument2(documents[1] || "");
      setDocument3(documents[2] || "");
      setImage(image);
    }
  }, [location]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set Base64 string to `image`
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      name: serviceName,
      cost: serviceCost,
      description: serviceDescription,
      documents: [document1, document2, document3],
      image, // Send Base64 encoded image
    };

    setLoading(true);

    try {
      if (serviceId) {
        // Update service
        await axios.put(`https://jan-seva-kendra-api.vercel.app/api/services/${serviceId}`, serviceData);
        alert("Service updated successfully!");
      } else {
        // Add new service
        await axios.post("https://jan-seva-kendra-api.vercel.app/api/services", serviceData);
        alert("Service added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert a file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-blue-600 font-bold mb-6">
        {serviceId ? "Edit Service" : "Add Service"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Service Name */}
        <div>
          <label
            htmlFor="serviceName"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            placeholder="Eg: Jeewan Praman Patra, Jaati Praman Patra"
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Service Cost */}
        <div>
          <label
            htmlFor="serviceCost"
            className="block text-sm font-medium text-gray-700"
          >
            Service Cost
          </label>
          <input
            type="number"
            id="serviceCost"
            value={serviceCost}
            placeholder="Cost you wnat to Charge"
            onChange={(e) => setServiceCost(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Service Description */}
        <div>
          <label
            htmlFor="serviceDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Service Description
          </label>
          <textarea
            id="serviceDescription"
            placeholder="Details about this Service"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Documents */}
        <div>
          <label
            htmlFor="document1"
            className="block text-sm font-medium text-gray-700"
          >
            Document Required 1
          </label>
          <input
            type="text"
            id="document1"
            value={document1}
            placeholder="Eg: Aadhar Card, Pan Card"
            onChange={(e) => setDocument1(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="document2"
            className="block text-sm font-medium text-gray-700"
          >
            Document Required 2
          </label>
          <input
            type="text"
            id="document2"
            value={document2}
            placeholder="Eg: Bank Passbook, Driving Licence"
            onChange={(e) => setDocument2(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="document3"
            className="block text-sm font-medium text-gray-700"
          >
            Document Required 3
          </label>
          <input
            type="text"
            id="document3"
            placeholder="Any Other Document"
            value={document3}
            onChange={(e) => setDocument3(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Service Banner
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>


        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300"
              }`}
          >
            {loading ? "Processing..." : serviceId ? "Update Service" : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
