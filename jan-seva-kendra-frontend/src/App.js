import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LeftSide from "./components/LeftSide";
import Footer from "./components/Footer";
// import Home from "./pages/Home";
import Services from "./pages/Services";
import AdminForm from "./pages/AdminForm";
import ClientForm from "./pages/ClientForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Admin from "./pages/Admin";

function App() {
  const addService = (service) => {
    // Function to handle adding a new service to the services list
    console.log("Service added:", service);
  };
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          {/* <LeftSide /> */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Services />} />
            <Route path="/edit-service" element={<AdminForm />} />
            <Route path="/add-service" element={<AdminForm addService={addService} />} />
            <Route path="/client-form/:serviceId" element={<ClientForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;