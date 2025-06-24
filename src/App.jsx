
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import backgroundAnimation from "../public/Animation - 1750593292107.json";
import mobileAni from "../public/Animation - mobile.json";
import robotAni from "../public/Animation - robot.json";

const fullText = "Abhimanyu Singh Rathore ";

function App() {

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1000); // wait before deleting
        }
      } else {
        setDisplayedText(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const sections = {
    home: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = window.innerHeight / 2;
      for (const [key, ref] of Object.entries(sections)) {
        if (ref.current && ref.current.offsetTop - threshold <= offset) {
          setActive(key);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section) => {
    sections[section].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <nav className="bg-[url('/54478.png')] sticky top-0 shadow w-full z-50">
        {/* Main Nav Bar */}
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-black">╰┈➤ Portfolio</h1>

          {/* Toggle Button - Mobile only */}
          <button
            className="md:hidden text-3xl text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {Object.keys(sections).map((key) => (
              <li
                key={key}
                className={
                  active === key
                    ? 'text-teal-500 font-semibold cursor-pointer'
                    : 'text-gray-400 cursor-pointer hover:text-teal-500'
                }
                onClick={() => scrollTo(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Mobile Dropdown Menu - INSIDE the flow (not fixed/absolute) */}
        {menuOpen && (
          <ul className="flex flex-col items-center md:hidden bg-[url('/54478.png')] bg-opacity-90 px-4 py-4 space-y-4">
            {Object.keys(sections).map((key) => (
              <li
                key={key}
                className={
                  active === key
                    ? 'text-teal-400 font-semibold cursor-pointer'
                    : 'text-gray-300 cursor-pointer hover:text-teal-400'
                }
                onClick={() => {
                  scrollTo(key);
                  setMenuOpen(false); // close on click
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </nav>


      <div ref={sections.home} id="home" className="bg-[#0b0c1a] min-h-screen flex  justify-center relative text-center px-4">
        {/* Animated Background */}
        <Lottie
          animationData={backgroundAnimation}
          loop
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          id='bg-animation'
        />

        <motion.div id='hero-text' className="text-center mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 id='hero-heading' className="text-teal-400 text-4xl font-bold mt-5"><span className='text-cyan-800'>Hi, </span>I'm {displayedText}|</h1>
          <p id='hero-subtitle' className="text-cyan-400 text-lg mt-2">Frontend Developer | React.js | MERN Stack</p>
        </motion.div>
        {/* My Image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <img
            src="/Abhi.jpg"
            alt="Abhimanyu Singh Rathore"
            className="w-[500px] h-[350px] md:w-110 md:h-120 md:mt-18 rounded-full border-4 border-cyan-400 shadow-2xl"
            id='profile-image'
          />

          {/* Short About Me Text Below Image - Now part of the same container */}
          <div className="mt-8 w-full text-center z-10 px-6" id='about-me-box'>
            <p className="text-white text-base md:text-lg max-w-xl mx-auto bg-[#182237] bg-opacity-70 rounded-lg py-4 px-6 shadow-lg">
              A passionate self-taught Front-End Developer. With a strong foundation in <span className="text-teal-400 font-semibold">HTML, CSS, JavaScript, and React.js</span> My journey started with curiosity and hands-on practice.
            </p>
          </div>
        </div>


      </div>


      <section ref={sections.skills} className="bg-gradient-to-t from-[#29456f] via-[#182237] to-[#0d0d1c] min-h-screen py-20 px-6 bg-gray-100" id="about">

        <h2 className="text-5xl font-bold  text-teal-500 flex justify-center">Skills</h2>
        <p className="text-xl  mt-2  text-cyan-700 flex justify-center">These are all my skill sets.</p>
        {/* grid */}
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-600 w-full border-2 border-cyan-500 max-w-md mx-auto  rounded-lg p-6 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">Programming Languages</h1>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=v8RpPQUwv0N8&format=png" alt="HTML" />
              <span className="text-lg font-medium text-white">HTML</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=80&id=YjeKwnSQIBUq&format=png" alt="CSS" />
              <span className="text-lg font-medium text-white">CSS</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=PXTY4q2Sq2lG&format=png" alt="JavaScript" />
              <span className="text-lg font-medium text-white">JavaScript</span>
            </div>
          </div>

          <div className="bg-gray-600 w-full border-2 border-cyan-500 max-w-md mx-auto  rounded-lg p-6 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">Front-End Technologies</h1>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=80&id=wPohyHO_qO1a&format=png" alt="HTML" />
              <span className="text-lg font-medium text-white">reactJS</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=PndQWK6M1Hjo&format=png" alt="CSS" />
              <span className="text-lg font-medium text-white">Bootstrap</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=x7XMNGh2vdqA&format=png" alt="JavaScript" />
              <span className="text-lg font-medium text-white">Tailwind CSS</span>
            </div>
          </div>


          <div className="bg-gray-600 w-full border-2 border-cyan-500 max-w-md mx-auto  rounded-lg p-6 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">Back-End & Full-Stack</h1>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=hsPbhkOH4FMe&format=png" alt="HTML" />
              <span className="text-lg font-medium text-white">Node.js</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=50&id=kg46nzoJrmTR&format=png" alt="CSS" />
              <span className="text-lg font-medium text-white">Express.js</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=bosfpvRzNOG8&format=png" alt="JavaScript" />
              <span className="text-lg font-medium text-white">MongoDB</span>
            </div>
            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=21896&format=png" alt="JavaScript" />
              <span className="text-lg font-medium text-white">REST APIs</span>
            </div>
          </div>

          <div className="bg-gray-600 w-full border-2 border-cyan-500 max-w-md mx-auto  rounded-lg p-6 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">Others</h1>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=64&id=3tC9EQumUAuq&format=png" alt="HTML" />
              <span className="text-lg font-medium text-white">GitHub</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=9OGIyU8hrxW5&format=png" alt="CSS" />
              <span className="text-lg font-medium text-white">VS Code</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=80&id=EPbEfEa7o8CB&format=png" alt="JavaScript" />
              <span className="text-lg font-medium text-white">Postman</span>
            </div>

            <div className="flex items-center space-x-3 border-2 border-black px-4 py-2 rounded-lg">
              <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=20906&format=png" alt="JavaScript" />
              <span className="text-lg font-medium text-white">Git</span>
            </div>
          </div>
        </div>



      </section>


      <section ref={sections.projects} className="bg-gradient-to-t from-[#0d0d1c] via-[#182237] to-[#29456f] min-h-screen py-20 px-6" id="projects">
        <h2 className="text-5xl font-bold  text-teal-500 mb-5 flex justify-center">Projects</h2>
        <p className="text-center text-cyan-500 max-w-3xl mx-auto mt-2 mb-10 text-lg">
          Here are some of the real-world projects I've built to sharpen my front-end and full-stack development skills. These projects demonstrate my ability to work with React.js, Node.js, MongoDB, APIs, and modern UI frameworks like Tailwind and Bootstrap. Each project focuses on solving a specific problem or delivering a useful feature with clean, responsive design.
        </p>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Video Streaming App',
              description: 'Full-stack app for video uploads and streaming.',
              tech: 'React, Node.js, MongoDB, JWT',
              github: 'https://github.com/mrrathore67/video-frontend'
            },
            {
              title: 'TextUtils',
              description: 'Text utility app for formatting and counting.',
              tech: 'React, Bootstrap',
              github: 'https://github.com/mrrathore67/TextUtils-'
            },
            {
              title: 'News Portal',
              description: 'Live news feed with category filters.',
              tech: 'React, News API',
              github: 'https://github.com/mrrathore67/News-Monkey'
            },
            {
              title: 'Recipe Book',
              description: 'A simple and interactive Recipe Book web application. Where you can add new recipes with title, ingredients, and instructions in localStorage.',
              tech: 'HTMl, CSS, JavaScript, Bootstrap',
              github: 'https://github.com/mrrathore67/Recipe-Book'
            },
            {
              title: 'Link-Shortener',
              description: 'A interactive Link-Shortener web application.',
              tech: 'ReactJS, Bootstrap, APIs',
              github: 'https://github.com/mrrathore67/Recipe-Book'
            }
          ].map((project, index) => (
            <motion.div key={index} className="bg-[#1c2331] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between" whileHover={{ scale: 1.03 }}>
              <h3 className="text-2xl font-semibold text-teal-300 mb-2">{project.title}</h3>
              <p className="text-m mt-2 mb-4">{project.description}</p>
              <p className="text-xs text-gray-500 mb-3"><span className='text-sm text-gray-500 font-bold'>Tech:- </span> {project.tech}</p>
              <a href={project.github} target="_blank" className="inline-block bg-teal-500 hover:bg-teal-600 text-black px-4 py-1.5 rounded transition">View on GitHub</a>
            </motion.div>
          ))}
        </div>
      </section>


      <section
        ref={sections.contact}
        className="bg-gradient-to-t from-[#29456f] via-[#182237] to-[#0d0d1c] relative py-12 px-6 text-center text-white"
        id="contact">
        <h2 className="text-5xl  font-bold text-teal-400 mb-10 underline underline-offset-4">Contact Me</h2>


        <div className="space-y-6 text-lg">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:asr672001@gmail.com"
              className="text-teal-400 underline hover:text-teal-300 transition"
            >
              asr672001@gmail.com
            </a>
          </p>
          <p>
            📞 Mobile No.:{" "}
            <a
              href="tel:+917690841833"
              className="text-teal-400 underline hover:text-teal-300 transition"
            >
              +91 7690841833
            </a>
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
            <a
              href="https://linkedin.com/in/abhimanyu-singh-rathore-0399a8337"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-cyan-500 hover:scale-105  hover:bg-teal-500 text-white flex justify-center font-medium px-6 py-3 rounded-lg shadow transition duration-300 "
            >
              <img className='w-7 h-7 mr-2 ' src="https://img.icons8.com/?size=48&id=qNUNvR9aEWql&format=png" alt="" /> <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/mrrathore67"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-cyan-500 hover:scale-105 hover:bg-teal-500 text-white flex justify-center font-medium px-6 py-3 rounded-lg shadow transition duration-300"
            >
              <img className='w-7 h-7 mr-2 ' src="https://img.icons8.com/?size=64&id=3tC9EQumUAuq&format=png" alt="" /> <span>GitHub</span>

            </a>
            <a
              href="/Abhimanyu_Singh_Rathore.pdf"
              target="_blank"
              download
              rel="noopener noreferrer"
              className="border-2 border-cyan-500 hover:scale-105 hover:bg-teal-500 text-white flex justify-center font-medium px-6 py-3 rounded-lg shadow transition duration-300"
            >
              <img className='w-7 h-7 mr-2 ' src="https://img.icons8.com/?size=80&id=44091&format=png" alt="" /> <span>Resume</span>

            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-end gap-10 items-center relative z-10">
          {/* <Lottie animationData={mobileAni} loop className="w-64 h-64" /> */}
          <Lottie animationData={robotAni} loop className="w-64 h-64" />
        </div>



      </section>

    </div>
  );
}

export default App;