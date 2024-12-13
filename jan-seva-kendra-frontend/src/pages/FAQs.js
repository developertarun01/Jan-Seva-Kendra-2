import React, { useState } from "react";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqList = [
    {
      question: "What services are offered at Jan Seva Kendra?",
      answer: "We offer a range of government and utility services including Aadhaar updates, PAN card services, bill payments, and more.",
    },
    {
      question: "What are your working hours?",
      answer: "Our working hours are from 9:00 AM to 6:00 PM, Monday to Saturday. We are closed on Sundays.",
    },
    {
      question: "How can I contact Jan Seva Kendra?",
      answer: "You can reach us at +91 8218171118 or via email at tarunbusinessmail@gmail.com. Our address is Opp. ESI Hospital, New Sharda Nagar, Saharanpur, Uttar Pradesh, India 247001.",
    },
    {
      question: "Do I need to book an appointment for services?",
      answer: "Appointments are not required for most services. However, we recommend contacting us in advance for specific queries or large-volume tasks.",
    },
    {
      question: "Are your services available online?",
      answer: "Yes, some of our services are available online. Please contact us to know more about online assistance.",
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Frequently Asked Questions (FAQs)
          </h1>
          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all"
                >
                  <span className="font-medium">{faq.question}</span>
                  <span>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-4 py-3 bg-gray-50 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
