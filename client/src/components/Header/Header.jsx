import React, { useState } from 'react';
import quizLOGO from "../../assets/qizzLOGO.png";
import temProfile from "../../assets/temProfile.png";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBurger } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const Header = () => {
  const user = useSelector((state) => state.userAuth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full font-bold shadow-lg my-0 mx-auto sticky top-0 left-0 z-10"
    style={{transition:"transform ease-in 0.5s"}}>
      {/* Header */}
      <div className="flex flex-row justify-between items-center py-4 px-6  bg-deepBlue ">
        {/* Logo */}
        <div className="w-26 md:w-24 h-12">
          <img
            src={quizLOGO}
            alt="Quiz Logo"
            className="w-full h-full object-contain"
            onClick={()=>useNavigate('/')}
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex flex-row justify-center items-center gap-6 text-sm md:text-xl font-bold text-white">
          <Link to="/" className="hover:text-primaryDark hover:border-b-2 ">
            Home
          </Link>
          <Link to="/about" className="hover:text-primaryDark hover:border-b-2">
            About
          </Link>
          <Link to="/quiz" className="hover:text-primaryDark hover:border-b-2">
            QuizZ
          </Link>
        </div>

        {/* User Section */}
        <div className="flex flex-row justify-center items-center gap-4">
          {!user ? (
            <div className="flex flex-row gap-4 text-white text-sm md:text-xl">
              <Link to="/signup" className="hover:text-primaryDark hover:border-b-2">
                Signup
              </Link>
              <Link to="/login" className="hover:text-primaryDark hover:border-b-2">
                Login
              </Link>
            </div>
          ) : (
            <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-yellow-300 rounded-full overflow-hidden">
              <img
                src={temProfile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex flex-row items-center justify-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-primaryDark text-2xl"
          >
            {isMobileMenuOpen ? (<ImCross/>): (<FaBurger/>)}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-gradient-to-r from-navyBlue to-deepBlue text-white text-center mt-2 rounded-md transition-all "
          style={{transition:"transform ease-in 0.3s"}}
        >
          <Link
            to="/"
            className="py-2 hover:text-primaryDark hover:border-b-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="py-2 hover:text-primaryDark hover:border-b-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/quiz"
            className="py-2 hover:text-primaryDark hover:border-b-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Quiz
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
