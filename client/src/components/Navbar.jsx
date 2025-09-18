import React, { useState, useEffect } from "react";
import logo_icon from "/assets/logo.svg";
import { useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import ButtonGradient from "../buttons/ButtonGradient.jsx";
import { motion, AnimatePresence } from "framer-motion";
import useIsSmallScreen from "../hooks/useIsSmallScreen.js";
import NavHoverLink from "./NavHoverLink.jsx";   // ✅ import here

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isSmall = useIsSmallScreen();

  const handleScroll = () => setScrolled(window.scrollY > 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/academy" },
    { label: "Contact Us", path: "/contact" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" },
    exit: { opacity: 0, y: -10, height: 0 },
  };

  return (
    <div className="fixed w-full z-50 flex justify-center items-center transition-all duration-500">
      <header
        className={`flex items-center justify-between border border-white/20 backdrop-blur-sm transition-all duration-500 ${
          scrolled
            ? `bg-white translate-y-3 sm:translate-y-10 max-w-[1140px] w-[80%] sm:w-[1140px] rounded-2xl px-4 sm:px-8 py-2 sm:py-2 ${
                menuOpen && "rounded-b-none"
              }`
            : "bg-white sm:translate-y-0 px-7 sm:px-10 py-4 max-w-full w-full sm:py-4"
        }`}
      >
        <img src={logo_icon} className="w-[120px] sm:w-[200px] h-[36px]" alt="Logo" />

        {/* Desktop Nav with hover effect */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <NavHoverLink
                key={label}
                to={path}
                className={`${isActive ? "text-primary font-semibold" : scrolled ? "text-slate-700" : "text-[#525F81]"} hover:text-primary`}
              >
                {label}
              </NavHoverLink>
            );
          })}
        </nav>

        {!isSmall && <ButtonGradient onClick={() => {}}>Hire me</ButtonGradient>}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu with hover effect */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`absolute top-[66px] shadow-md rounded-b-2xl md:hidden z-40 bg-white border-t-2 border-primary w-full ${
              scrolled ? "max-w-[80%]" : "max-w-[1140px]"
            }`}
          >
            <div className="flex flex-col gap-4 py-3 px-4">
              {navItems.map(({ label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <NavHoverLink
                    key={label}
                    to={path}
                    className={`${isActive ? "text-primary font-semibold" : "text-slate-600"} hover:text-primary`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavHoverLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
