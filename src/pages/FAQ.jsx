import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const FAQ = () => {
  const { dark } = useContext(AuthContext);

  const faqData = [
    {
      question: "Why should I donate blood?",
      answer:
        "Donating blood is a simple, safe way to help those in need. It saves lives and ensures there is a steady supply for emergencies.",
    },
    {
      question: "Who can donate blood?",
      answer:
        "Most healthy people between the ages of 18-65 can donate blood. You should weigh at least 50 kg and be in good health.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 8 weeks, or plasma and platelets more frequently, depending on the type of donation.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, donating blood is very safe. All the equipment used is sterile, and the process is conducted under the supervision of trained professionals.",
    },
    {
      question: "Does blood donation hurt?",
      answer:
        "You may feel a small prick when the needle is inserted, but the actual process of donating blood is generally painless.",
    },
    {
      question: "What happens to my blood after donation?",
      answer:
        "After donation, blood is tested, processed, and stored until it is needed for transfusions or medical treatments.",
    },
    {
      question: "Can I donate blood if I have a medical condition?",
      answer:
        "It depends on the medical condition. It's best to consult with a doctor or blood bank staff to determine if you're eligible.",
    },
    {
      question: "Can I donate blood after a vaccination?",
      answer:
        "It depends on the vaccine. Usually, you must wait 48 hours after getting the vaccine before donating blood, but consult your blood bank for specific guidelines.",
    },
    {
      question: "What should I do after donating blood?",
      answer:
        "After donating blood, you should rest for a few minutes, hydrate, and avoid heavy physical activity for the rest of the day.",
    },
    {
      question: "How long does the blood donation process take?",
      answer:
        "The actual donation takes around 8-10 minutes, but the entire process, including registration and recovery, takes about an hour.",
    },
  ];

  return (
    <div
      className={`py-10 px-5 lg:px-20 ${
        dark ? " text-gray-100" : " text-gray-900"
      }`}
    >
      <div className="container mx-auto">
        <h2
          className={`text-3xl font-bold mb-6 ${
            dark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Frequently Asked Questions (FAQ) about Blood Donation
        </h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-arrow border rounded-lg ${
                dark ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <input type="checkbox" className="peer" />
              <div
                className={`collapse-title text-xl font-medium ${
                  dark ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {faq.question}
              </div>
              <div
                className={`collapse-content ${
                  dark ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
