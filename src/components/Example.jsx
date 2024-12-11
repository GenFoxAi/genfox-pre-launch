import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Example = () => {
  return (
    <div className="flex items-center justify-center bg-neutral-100 px-8 py-24 text-neutral-800">
      <BlockInTextCard
        tag="/ Coming Soon"
        text={
          <>
            <strong>Something Amazing is Coming!</strong> Be the first to know
            when we launch our cutting-edge AI platform.
          </>
        }
        examples={[
          "Revolutionize your workflow with AI.",
          "Unlock the potential of intelligent tools.",
          "Stay ahead with state-of-the-art solutions.",
          "Discover the future of AI innovation.",
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({ tag, text, examples }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    const googleFormEndpoint =
      "https://docs.google.com/forms/d/e/1FAIpQLSchDWwb9yMzjnWEg4Gi2zV9f-zeDbHW1yG7mu4ZOtbt-YyIWw/formResponse";

    const body = new URLSearchParams();
    body.append("entry.329512789", formData.name); 
    body.append("entry.873409098", formData.email); 
    body.append("entry.839801045", formData.phone); 

    try {
      await fetch(googleFormEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      setSubmissionStatus("success");
      setShowModal(true);
      setFormData({ name: "", email: "", phone: "" });

      setTimeout(() => setShowModal(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("failure");
    }
  };

  return (
    <div className="w-full max-w-xl space-y-6">
      <div>
        <p className="mb-1.5 text-sm font-light uppercase">{tag}</p>
        <hr className="border-neutral-700" />
      </div>
      <p className="max-w-lg text-xl leading-relaxed">{text}</p>
      <div>
        <Typewrite examples={examples} />
        <hr className="border-neutral-300" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full rounded-full border border-neutral-950 py-2 px-4 text-sm font-medium text-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-full border border-neutral-950 py-2 px-4 text-sm font-medium text-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full rounded-full border border-neutral-950 py-2 px-4 text-sm font-medium text-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950"
          required
        />
        <button
          type="submit"
          className="w-full rounded-full border border-neutral-950 py-2 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100"
        >
          {submissionStatus === "submitting" ? "Submitting..." : "Notify Me"}
        </button>
      </form>
      <AnimatePresence>
        {showModal && submissionStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              className="bg-white rounded-lg p-6 text-center shadow-xl"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-medium text-neutral-900">
                You will be notified!
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Thank you for subscribing to updates.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {submissionStatus === "failure" && (
        <p className="text-red-600">⚠️ Something went wrong. Please try again.</p>
      )}
    </div>
  );
};

const Typewrite = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, 5500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 text-sm font-light uppercase">
      <span className="inline-block size-2 bg-neutral-950" />
      <span className="ml-3">
        EXAMPLE:{" "}
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span key={`${exampleIndex}-${i}`} className="relative">
            <motion.span>{l}</motion.span>
          </motion.span>
        ))}
      </span>
    </p>
  );
};
