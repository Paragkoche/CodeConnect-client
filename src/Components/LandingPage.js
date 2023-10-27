import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [sections, setSections] = useState([
    {
      id: 1, title: <div className='bg-white text-xl font-bold cursor-pointer rounded-lg p-4 shadow-lg flex items-center'>My Registration</div>,
      content: <div className='bg-purple-950 flex space-x-16 items-center py-5'><img src={require('./img/top10lan.jpg')} className='flex h-40 w-25'></img>
        <img src={require('./img/programming evolution.jpg')} className='flex h-40 w-25'></img>
        <img src={require('./img/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo-removebg-preview (1).png')} className='flex h-40 w-25'></img>
      </div>,
      show: true
    },
    {
      id: 2, title: <div className='bg-white text-xl font-bold cursor-pointer rounded-lg p-4 shadow-lg flex items-center'>My watchlist</div>,
      content: <div className='bg-purple-950 flex space-x-16 items-center py-5'><img src={require('./img/top10lan.jpg')} className='flex h-40 w-25'></img>
        <img src={require('./img/programming evolution.jpg')} className='flex h-40 w-25'></img>
        <img src={require('./img/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo-removebg-preview (1).png')} className='flex h-40 w-25'></img>
      </div>,
      show: false
    },
    {
      id: 3, title: <div className='bg-white text-xl font-bold cursor-pointer rounded-lg p-4 shadow-lg flex items-center'>Recently Viewed</div>,
      content: <div className='bg-purple-950 flex space-x-16 items-center py-5'><img src={require('./img/top10lan.jpg')} className='flex h-40 w-25'></img>
        <img src={require('./img/programming evolution.jpg')} className='flex h-40 w-25'></img>
        <img src={require('./img/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo-removebg-preview (1).png')} className='flex h-40 w-25'></img>
      </div>,
      show: false
    },
  ]);

  const handleClick = (id) => {
    setSections(
      sections.map((section) => {
        if (section.id === id) {
          return { ...section, show: !section.show };
        }
        else {
          return { ...section, show: false };
        }
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-purple-950 text-white p-8 flex flex-wrap justify-center">
        <div className="text-left w-1/2 p-24">
          <h1 className="text-4xl font-bold">
            <pre className="">
              Connecting Teachers, Students,
              <span className="border-b border-white">Programming</span>
            </pre>
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Explore the code across various topics using different languages, gain coding skills, and stand out in the crowd.
          </p>
        </div>

        <div className="w-1/2 p-20">
          <div className="flex flex-wrap justify-center">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={require('./img/home-hero-blogs.png')}
                alt="Image 1"
                className="w-full h-full object-cover rounded-lg mr-3"
              />
              <div className="absolute top-0 left-0 text-black text-bold p-2">
                Assignments
              </div>
            </div>

            <div className="relative w-32 h-32 mb-4">
              <img
                src={require('./img/home-hero-compete.png')}
                alt="Image 1"
                className="w-full h-full object-cover rounded-lg ml-3"
              />
              <div className="absolute top-0 left-0 text-black text-bold p-2 ml-3">
                Compete
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={require('./img/home-hero-practice.png')}
                alt="Image 1"
                className="w-full h-full object-cover rounded-lg mr-3"
              />
              <div className="absolute top-0 left-0 text-black text-bold p-2">
                <Link to='/landing'>Practice</Link>
              </div>
            </div>
            <div className="relative w-32 h-32 mb-4">
              <img
                src={require('./img/home-hero-learn.png')}
                alt="Image 1"
                className="w-full h-full object-cover rounded-lg ml-3"
              />
              <div className="absolute top-0 left-0 text-black text-bold p-2 ml-3">
                Learn
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-purple-950 flex justify-center p-10'>
        <div className='flex space-x-16 ' >
          {sections.map((section) => (
            <div key={section.id} className="p-2 cursor-pointer ${setSection === section.id ? 'bg-yellow-300' : ''}">
              <button onClick={() => handleClick(section.id)}>{section.title}</button>
              {section.show && <p>{section.content}</p>}
            </div>
          ))}
        </div>
        </div>
        <Footer />
      </>
      );
}

      export default LandingPage;
