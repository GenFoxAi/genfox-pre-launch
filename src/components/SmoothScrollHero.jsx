import { ReactLenis } from 'lenis/dist/lenis-react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useRef } from 'react';
import genfoxheroimage from '../assets/GenFox.png';
import logo from '../assets/logogen.png';
import whatsapp from '../assets/Frame 3.png'
import call from '../assets/Frame 2.png'
import skills from '../assets/Frame 4.png'
import integration from '../assets/Frame 5.png'
import ShiftingCountdown from './ShiftingCountdown';

export const SmoothScrollHero = () => {
  return (
    <div className='bg-white'>
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white'>
      <img src={logo} className='h-10' alt="logo" />
      <button
        onClick={() => {
          document.getElementById('launch-schedule')?.scrollIntoView({
            behavior: 'smooth',
          });
        }}
        className='flex items-center gap-1 text-xs text-zinc-400'
      >
        COMING SOON <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className='relative w-full'
    >
      <CenterImage />

      <ParallaxImages />

      <div className='absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950' />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className='sticky top-0 h-screen w-full'
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${genfoxheroimage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className='mx-auto max-w-5xl px-4 pt-[200px]'>
      <ParallaxImg
        src={call}
        alt='fox call'
        start={-200}
        end={200}
        className='w-1/3 rounded-lg' 
      />
      <ParallaxImg
        src={whatsapp}
        alt='Whatsapp chat bot'
        start={200}
        end={-250}
        className='mx-auto w-2/3 rounded-lg'
      />
      <ParallaxImg
        src={skills}
        alt='skills and stuff'
        start={-200}
        end={200}
        className='ml-auto w-1/3 rounded-lg'
      />
      <ParallaxImg
        src={integration}
        alt='integration apps'
        start={0}
        end={-500}
        className='ml-24 w-5/12 rounded-lg'
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
    return (
      <section
        id='launch-schedule'
        className='mx-auto max-w-5xl px-4 py-48 text-white'
      >
        <motion.h1
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1.5 }} // Slower transition
          className='mb-20 text-4xl font-black uppercase text-zinc-700'
        >
          Coming Soon
        </motion.h1>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1.5 }} // Slower transition
        >
          <ShiftingCountdown />
        </motion.div>
        <motion.div
          className='mt-20  space-y-6 text-xl leading-8 text-zinc-400 font-mono'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.5, // Slower stagger
              },
            },
          }}
        >
             <motion.h1
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1.5 }} // Slower transition
          className='mb-10 text-2xl font-black uppercase text-zinc-700'
        >
          MEET FOX
        </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1 }} // Slower individual transition
          >
            The AI assistant designed to redefine how you manage your
            life. Powered by advanced multi-agent systems and supporting
            multi-modal interaction, Fox isn’t just smart—it’s intuitive,
            adaptable, and built to seamlessly integrate into your daily routine.
          </motion.p>
          <motion.ul
            className='list-disc list-inside'
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.5 } }, // Slower stagger
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1 }} // Slower individual transition
            >
              Tracks your finances, organizes your schedule, and syncs with your
              fitness goals.
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1 }} // Slower individual transition
            >
              Works effortlessly through WhatsApp, turning complex tasks into
              simple conversations.
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1 }} // Slower individual transition
            >
              Combines cutting-edge AI with a user-friendly interface, making
              advanced technology accessible to everyone.
            </motion.li>
          </motion.ul>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1 }} // Slower individual transition
          >
            We’re building a solution that’s as powerful as it is personal—your
            ultimate interface to AI.
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1.2 }} // Slightly slower for emphasis
            className='mt-9'
          >
            This is just the beginning. Stay tuned for the next chapter—you won’t
            want to miss it!
          </motion.p>
        </motion.div>
      </section>
    );
  };

  

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className='mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9'
    >
      <div>
        <p className='mb-1.5 text-xl text-zinc-50'>{title}</p>
        <p className='text-sm uppercase text-zinc-500'>{date}</p>
      </div>
      <div className='flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500'>
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};
