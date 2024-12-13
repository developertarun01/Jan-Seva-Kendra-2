import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ClientForm() {
  const { serviceId } = useParams(); // Extract serviceId from URL
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    documents: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`https://jan-seva-kendra-api.vercel.app/api/services/${serviceId}`);
        setService(response.data); // Set the service data
        // Initialize documents array for uploading
        setFormData((prev) => ({
          ...prev,
          documents: Array(response.data.documents.length).fill(null),
        }));
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Service not found or an error occurred.");
      }
    };

    fetchService();
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (index, file) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index] = file;
    setFormData((prevData) => ({ ...prevData, documents: updatedDocuments }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("mobile", formData.mobile);
    data.append("email", formData.email);
    data.append("services", service.name);

    // Append uploaded files
    formData.documents.forEach((file, index) => {
      if (file) data.append("documents", file);
    });

    try {
      alert("Submitting your Form, Please Wait ...")
      const response = await fetch("https://jan-seva-kendra-api.vercel.app/api/submit-form", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert(`Error: ${errorData.message || "Failed to submit the form"}`);
        return;
      }

      alert("Form submitted successfully!");
      navigate("/")
      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        documents: [],
      });
    } catch (err) {
      console.error("Error submitting form:", err.message);
      alert("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <p className="text-center text-red-500 font-bold">{error}</p>;
  }

  if (!service) {
    return <p className="text-center text-gray-500">Loading service details...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 m-5 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">{service.name}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {service.documents.map((doc, index) => {
            // Only render file input if the label is not empty
            if (doc) {
              return (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {doc}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                  />
                </div>
              );
            }
            return null; // Skip rendering the input if label is empty
          })}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div >
  );
}

export default ClientForm;