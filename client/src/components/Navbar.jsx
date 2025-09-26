// components/nav/Navbar.jsx
import React, { useState, useEffect } from "react";
import logo_icon from "/assets/logo.svg";
import { useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import ButtonGradient from "../buttons/ButtonGradient.jsx";
import { motion, AnimatePresence } from "framer-motion";
import useIsSmallScreen from "../hooks/useIsSmallScreen.js";
import NavHoverLink from "./NavHoverLink.jsx";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler.jsx";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isSmall = useIsSmallScreen();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`flex items-center justify-between backdrop-blur-xl transition-all duration-500
          ${
            scrolled
              ? `
                translate-y-3 sm:translate-y-10 max-w-[1140px] w-[80%] sm:w-[1140px] rounded-2xl px-4 sm:px-8 py-2 sm:py-2
                bg-white/40 text-slate-800
                border border-white/30
                shadow-[0_6px_24px_rgba(2,6,23,0.06)] 
                dark:bg-slate-900/70 dark:text-slate-100
                dark:border-none
                dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                ${menuOpen && "rounded-b-none"}
              `
              : `
                sm:translate-y-0 px-7 sm:px-10 py-4 max-w-full w-full sm:py-4
                bg-white/50 text-slate-800
                border border-white/30
                shadow-[0_6px_24px_rgba(2,6,23,0.01)]
                dark:bg-background dark:text-slate-100
                dark:border-none
                dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              `
          }`}
      >
        <img
          src={logo_icon}
          className="w-[120px] sm:w-[200px] h-[36px] dark:brightness-110 dark:contrast-125"
          alt="Logo"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <NavHoverLink
                key={label}
                to={path}
                className={`${
                  isActive
                    ? "text-pretty font-semibold"
                    : scrolled
                    ? "text-slate-700 dark:text-slate-200"
                    : "text-[#525F81] dark:text-slate-300"
                } hover:text-pretty dark:hover:text-pretty`}
              >
                {label}
              </NavHoverLink>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle (no wrapper button) */}
          <AnimatedThemeToggler />

          {!isSmall && <ButtonGradient onClick={() => {}}>Hire me</ButtonGradient>}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            className="md:hidden text-slate-800 dark:text-slate-200"
          >
            {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`absolute top-[66px] rounded-b-2xl md:hidden z-40 w-full
              border-t-2 border-pretty
              bg-white/50 backdrop-blur-xl
              shadow-[0_10px_30px_rgba(2,6,23,0.08)]
              ${scrolled ? "max-w-[80%]" : "max-w-[1140px]"}
              dark:bg-slate-900/70 dark:backdrop-blur-xl
              dark:border-none
              dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
            `}
          >
            <div className="flex flex-col gap-4 py-3 px-4">
              {navItems.map(({ label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <NavHoverLink
                    key={label}
                    to={path}
                    className={`${
                      isActive
                        ? "text-pretty font-semibold"
                        : "text-slate-700 dark:text-slate-300"
                    } hover:text-pretty`}
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
