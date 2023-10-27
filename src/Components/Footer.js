import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-purple-400 text-white py-4">
      
    <div className="container mx-auto text-center">
      <div className="flex justify-between">
        <div className="w-1/4 ">
          <img src={require('./img/Black_and_White_Monogram_Business_Logo-removebg-preview.png')} alt="Logo" className="mb-2" />
          <p className="text-xl underline">Build by the coders for the coders</p>
          <p className="text-3xl font font-semibold py-2">Stay Connected</p>
          <div className="flex space-x-2 ml-20">
            <a href="#"><FaFacebook size={20} /></a>
            <a href="#"><FaTwitter size={20} /></a>
            <a href="#"><FaInstagram size={20} /></a>
            <a href="#"><FaLinkedin size={20} /></a>
          </div>
        </div>
        <div className="w-1/4">
          <h3>Practice</h3>
          <ul className="list-disc pl-4">
            <li>Coding</li>
            <li>DSA</li>
            <li>Quizzes</li>
            <li>MCQs</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h3>Learn</h3>
          <ul className="list-disc pl-4">
            <li>DSA</li>
            <li>Programming languages</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h3>Participate</h3>
          <p>Your participate text here.</p>
          <h3>Assignment</h3>
          <p>Your assignment text here.</p>
        </div>
      </div>
      <p>&copy; 2023 Your Website Name</p>
    </div>
    
  </footer>
  );
};

export default Footer;
