<<<<<<< HEAD
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
=======
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Example = () => {
  return (
    <div className='flex items-center justify-center bg-neutral-100 px-8 py-24 text-neutral-800'>
      <BlockInTextCard
        tag='/ Coming Soon'
        text={
          <>
            <strong>Discover the Future of Assistance!</strong> Stay tuned for
            exclusive updates as we unveil GenFox—your assistant from the
            future.
          </>
        }
        examples={[
          'Manage your finances effortlessly.',
          'Track fitness goals with personalized insights.',
          'Organize your schedule in real-time.',
          'Access everything through WhatsApp.',
          'Simplify your life with a future-ready assistant.',
>>>>>>> master
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({ tag, text, examples }) => {
  const [formData, setFormData] = useState({
<<<<<<< HEAD
    name: "",
    email: "",
    phone: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); 
=======
    name: '',
    email: '',
    phone: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
>>>>>>> master
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
<<<<<<< HEAD
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
=======

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phone)) {
      setSubmissionStatus('invalid-phone');
      return;
    }

    setSubmissionStatus('submitting');

    const googleFormEndpoint =
      'https://docs.google.com/forms/d/e/1FAIpQLScP0W10Mlu3O2OyNtggc9fjduhU5HSdTmJc0dStQuzZuqIMeQ/formResponse';

    const body = new URLSearchParams();
    body.append('entry.546826200', formData.name);
    body.append('entry.479959042', formData.email);
    body.append('entry.1285289203', formData.phone);

    try {
      await fetch(googleFormEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
>>>>>>> master
        },
        body,
      });

<<<<<<< HEAD
      setSubmissionStatus("success");
      setShowModal(true);
      setFormData({ name: "", email: "", phone: "" });

      setTimeout(() => setShowModal(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("failure");
=======
      setSubmissionStatus('success');
      setShowModal(true);
      setFormData({ name: '', email: '', phone: '' });

      setTimeout(() => setShowModal(false), 3000);
    } catch (error) {
      setSubmissionStatus('failure');
>>>>>>> master
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className='w-full max-w-xl space-y-6'>
      <div>
        <p className='mb-1.5 text-sm font-light uppercase'>{tag}</p>
        <hr className='border-neutral-700' />
      </div>
      <p className='max-w-lg text-xl leading-relaxed'>{text}</p>
      <div>
        <Typewrite examples={examples} />
        <hr className='border-neutral-300' />
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          className='w-full rounded-full border border-neutral-950 py-2 px-4 text-sm font-medium text-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950'
          required
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          className='w-full rounded-full border border-neutral-950 py-2 px-4 text-sm font-medium text-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950'
          required
        />
        <input
          type='tel'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone Number'
          className='w-full rounded-full border border-neutral-950 py-2 px-4 text-sm font-medium text-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950'
          required
        />
        <button
          type='submit'
          className='w-full rounded-full border border-neutral-950 py-2 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100'
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Notify Me'}
        </button>
      </form>
      <AnimatePresence>
        {showModal && submissionStatus === 'success' && (
>>>>>>> master
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
<<<<<<< HEAD
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              className="bg-white rounded-lg p-6 text-center shadow-xl"
=======
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
          >
            <motion.div
              className='bg-white rounded-lg p-6 text-center shadow-xl'
>>>>>>> master
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              transition={{ duration: 0.3 }}
            >
<<<<<<< HEAD
              <h2 className="text-lg font-medium text-neutral-900">
                You will be notified!
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
=======
              <h2 className='text-lg font-medium text-neutral-900'>
                You will be notified!
              </h2>
              <p className='mt-2 text-sm text-neutral-600'>
>>>>>>> master
                Thank you for subscribing to updates.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
<<<<<<< HEAD
      {submissionStatus === "failure" && (
        <p className="text-red-600">⚠️ Something went wrong. Please try again.</p>
=======
      {submissionStatus === 'invalid-phone' && (
        <p className='text-red-600'>
          ⚠️ Please enter a valid 10-digit phone number.
        </p>
      )}
      {submissionStatus === 'failure' && (
        <p className='text-red-600'>
          ⚠️ Something went wrong. Please try again.
        </p>
>>>>>>> master
      )}
    </div>
  );
};

const Typewrite = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
<<<<<<< HEAD
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
=======
      setExampleIndex((prevIndex) => (prevIndex + 1) % examples.length);
    }, 5500);

    return () => clearInterval(intervalId);
  }, [examples]);

  const LETTER_DELAY = 0.03;
  const BOX_FADE_DURATION = 0.2;

  return (
    <p className='mb-2.5 text-sm font-light uppercase'>
      <span className='inline-block size-2 bg-neutral-950' />
      <span className='ml-3'>
        {' '}
        {Array.from(examples[exampleIndex]).map((char, i) => (
          <motion.span
            key={`${exampleIndex}-${i}`}
            className='relative inline-block'
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0.3,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
            <motion.span
              className='absolute inset-0 bg-neutral-950'
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: BOX_FADE_DURATION,
                times: [0, 0.5, 1],
              }}
            />
>>>>>>> master
          </motion.span>
        ))}
      </span>
    </p>
  );
};
