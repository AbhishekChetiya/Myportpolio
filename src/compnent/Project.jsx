import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import todo from '/todo.png'
import tele from '/Telegram.png'
import socail from '/Social.png'
import casino from '/casino.png'
import calculator from '/calculator.png'
import sudoko from '/sudoko.png'
import {Tilt} from 'react-tilt';

let Card, CardContent, CardHeader, CardTitle, Button;
try {
  ({ Card, CardContent, CardHeader, CardTitle } = require('../components/ui/card'));
  ({ Button } = require('../components/ui/button'));
} catch (error) {
  // Fallback components if imports fail
  Card = ({ children, className }) => <div className={`border rounded-lg ${className}`}>{children}</div>;
  CardHeader = ({ children }) => <div className="p-4 border-b">{children}</div>;
  CardTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;
  CardContent = ({ children }) => <div className="p-4">{children}</div>;
  Button = ({ children, onClick, className }) => (
    <button onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
      {children}
    </button>
  );
}

const ProjectSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const profiles = [
    {
      title: "Social-Media-Website",
      description: `This project is an Instagram clone built with the MERN stack, featuring a React front-end and Node/Express back-end with MongoDB. It enables real-time chat via Socket.io and allows users to post images, videos, comment, and like content. Secure authentication is managed with JWT and Bcrypt, while Cloudinary handles image storage and Postman is used for API testing`,
      image: socail,
      secondLink : `https://social-media-website-rust.vercel.app/`,
      link: "https://github.com/AbhishekChetiya/Social-Media-Website"
    },
    {
      title: "full-stack To-Do List application",
      description: `This project enables users to register, manage, and delete tasks through an intuitive interface. Built with the MERN stack, it features robust backend APIs using Express.js and efficient database management with MongoDB, enhancing my Node.js skills and simplifying task management.`,
      image: todo,
      secondLink : "https://to-do-list-full-stack-nu.vercel.app/",
      link: "https://github.com/AbhishekChetiya/To-Do-List-Full-Stack"
    },
    {
      title: "Calculator",
      description: `Developed a user-friendly calculator using HTML, CSS, and JavaScript to perform basic mathematical operations. The application features a responsive design with a visually appealing interface, allowing users to easily input values and view results in real time. This project showcases my skills in front-end development and dynamic functionality.`,
      secondLink : "https://calculator-lovat-alpha.vercel.app/",
      image: calculator,
      link: "https://github.com/AbhishekChetiya/Calculator"
    },
    {
      title: "Sudoko",
      description: `Developed a Sudoku solver that efficiently solves puzzles using recursion and backtracking techniques. The application validates input data to ensure solvability, providing accurate solutions when valid puzzles are entered. Built with HTML, CSS, and JavaScript for a user-friendly interface and seamless interaction.`,
      image: sudoko,
      secondLink : "https://sudoku-solver-murex.vercel.app/",
      link: "https://github.com/AbhishekChetiya/SudokuSolver"
    },
    {
      title: "Casino",
      description: `A card game where players draw from a deck of thirteen cards to reach a winning value of 21. Players can continue drawing cards until their total exceeds 21, resulting in a loss. Each loss deducts money, and sound effects enhance the gaming experience, signaling wins and losses.`,
      image: casino,
      secondLink :"https://casino-dusky-eta.vercel.app/",
      link: "https://github.com/AbhishekChetiya/CASINO"
    },
    {
      title: "Telegram Bot",
      description: `This personalized Telegram bot, built with Gemini AI, introduces my skills, interests, and achievements. It answers user questions and provides tailored insights about my software development background, competitive programming, and ongoing projects, enhancing user interaction in a friendly manner.`,
      image: tele,
      secondLink: "https://github.com/AbhishekChetiya/MyTeleChat_bot",
      link: "https://github.com/AbhishekChetiya/MyTeleChat_bot"
    },
    // Add more projects as needed
  ];

  const nextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const prevProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextProfile();
    }

    if (touchStart - touchEnd < -75) {
      prevProfile();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevProfile();
      } else if (event.key === 'ArrowRight') {
        nextProfile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const ProfileCard = ({ profile, isActive }) => (
    <Tilt options={{ max: 10, scale: 1.05, speed: 300 }}>
      <Card 
        className={`w-full ${isActive ? 'block' : 'hidden lg:block'} mb-4 lg:mb-0 transition-all duration-300 ease-in-out overflow-hidden rounded-lg flex flex-col h-[450px]`}
      >
        <div className="relative h-48 flex-shrink-0">
          <img 
            src={profile.image} 
            alt={profile.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="flex flex-col flex-grow">
          <CardTitle className="mb-2">{profile.title}</CardTitle>
          <p className="text-sm mb-4 overflow-y-auto flex-grow">{profile.description}</p>
          <div className="flex justify-start gap-4 mt-auto">
            <a href={profile.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-sm">
              View Github
            </a>
            {profile.secondLink && (
              <a href={profile.secondLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-sm">
                Demo
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </Tilt>
  );
  return (
    <section id="project-section" className="py-20 bg-gray-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {profiles.map((profile, index) => (
              <ProfileCard
                key={index}
                profile={profile}
                isActive={index === currentIndex}
              />
            ))}
          </div>
          <Button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 lg:hidden"
            onClick={prevProfile}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 lg:hidden"
            onClick={nextProfile}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center mt-4 lg:hidden">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;