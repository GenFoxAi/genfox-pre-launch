import React, { useEffect, useState } from 'react';
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
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({ tag, text, examples }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
        },
        body,
      });

      setSubmissionStatus('success');
      setShowModal(true);
      setFormData({ name: '', email: '', phone: '' });

      setTimeout(() => setShowModal(false), 3000);
    } catch (error) {
      setSubmissionStatus('failure');
    }
  };

  return (
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
          >
            <motion.div
              className='bg-white rounded-lg p-6 text-center shadow-xl'
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className='text-lg font-medium text-neutral-900'>
                You will be notified!
              </h2>
              <p className='mt-2 text-sm text-neutral-600'>
                Thank you for subscribing to updates.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {submissionStatus === 'invalid-phone' && (
        <p className='text-red-600'>
          ⚠️ Please enter a valid 10-digit phone number.
        </p>
      )}
      {submissionStatus === 'failure' && (
        <p className='text-red-600'>
          ⚠️ Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
};

const Typewrite = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
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
        EXAMPLE:{' '}
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
          </motion.span>
        ))}
      </span>
    </p>
  );
};
