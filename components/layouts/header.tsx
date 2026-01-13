"use client";

import { theme } from "@/lib/theme";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const activePage = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dropdown click outside
  const handleDropdownClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleDropdownClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleDropdownClickOutside);
    }
  }, [isDropdownOpen, handleDropdownClickOutside]);

  // Handle mobile menu click outside
  const handleMobileMenuClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !target.closest("button[aria-label='Toggle mobile menu']")
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleMobileMenuClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleMobileMenuClickOutside);
        document.body.style.overflow = "unset";
      };
    }
  }, [isMenuOpen, handleMobileMenuClickOutside]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isDropdownOpen) setIsDropdownOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDropdownOpen, isMenuOpen]);

  // ACTIVE AND NON ACTIVE PATH
  const navLinkClass = (path: string) =>
    `relative transition-all duration-300 font-medium ${
      activePage === path
        ? `${isScrolled ? "text-white" : theme.text_title} after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current after:rounded-full`
        : `${isScrolled ? "text-white" : theme.text_title}`
    } hover:${theme.text_default_blue} focus:${theme.text_default_blue} rounded-md px-2 py-1`;

  const mobileNavLinkClass = (path: string) =>
    `block py-3 px-4 transition-all duration-300 rounded-lg font-medium ${
      activePage === path
        ? `${theme.text_default_blue} bg-white/10 shadow-sm`
        : `${theme.text_default_blue}`
    } hover:${theme.text_default_blue} hover:bg-white/5 focus:${theme.text_default_blue} focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-30`;

  const dropdownItems = [
    { href: "/bansus", label: "Profil Badan Khusus" },
    { href: "/oprec", label: "Open Recruitment Asdos" },
    { href: "/peer", label: "Peer Group" },
    { href: "/fosi", label: "Forum Silaturahmi" },
    { href: "/pad", label: "Pelatihan Asdos" },
  ];

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${theme.header_background} ${theme.card_shadow} backdrop-blur-md`
            : ``
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 md:space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-lg p-1"
              onClick={closeAllMenus}
            >
              <div className="relative">
                <Image
                  src="/bansus.png"
                  width={32}
                  height={32}
                  alt="Laboratorium Ilmu Komputer Logo"
                  className="rounded-xl md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1
                  className={`text-lg md:text-xl lg:text-2xl font-bold tracking-wide ${theme.text_title} group-hover:${theme.text_default_blue} transition-colors duration-300`}
                >
                  <span
                    className="bansus-glow"
                    data-text="Laboratorium Ilmu Komputer"
                  >
                    Laboratorium Ilmu Komputer
                  </span>
                </h1>
              </div>
              {/* Mobile logo text */}
              <div className="sm:hidden">
                <h1
                  className={`text-sm font-bold ${theme.text_title} flex flex-col`}
                >
                  <span className="bansus-glow" data-text="Laboratorium">
                    Laboratorium
                  </span>
                  <span className="bansus-glow" data-text="Ilmu Komputer">
                    Ilmu Komputer
                  </span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-6 xl:space-x-8"
              role="navigation"
            >
              {/* REPOSITORI */}
              <Link
                href="/repositori"
                className={navLinkClass("/repositori")}
              >
                Repositori
              </Link>

              <Link
                href="/jadwal-praktikum"
                className={navLinkClass("/jadwal-praktikum")}
              >
                Jadwal Praktikum
              </Link>

              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center space-x-1 font-medium transition-all duration-300 px-2 py-1 rounded-md ${isScrolled ? `text-white` : theme.text_title} hover:${theme.text_default_blue}`}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Menu Badan Khusus"
                >
                  <span>Badan Khusus</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                <div
                  className={`absolute top-full left-0 mt-2 w-64 rounded-xl bg-white/10 backdrop-blur-lg border ${theme.border_outside} shadow-xl z-50 transition-all duration-200 ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 visible transform translate-y-0"
                      : "opacity-0 scale-95 invisible transform -translate-y-2"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-2">
                    {dropdownItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          activePage === item.href
                            ? `${theme.text_default_blue} bg-white/15 shadow-sm`
                            : `${theme.text_default}`
                        } hover:${theme.text_default_blue} hover:bg-white/10 focus:${theme.text_default_blue} focus:bg-white/10 focus:outline-none ${
                          index === 0 ? "rounded-t-lg" : ""
                        } ${index === dropdownItems.length - 1 ? "rounded-b-lg" : ""}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <Link
                href="/login"
                className={`${isScrolled ? "text-white" : theme.text_title} px-6 py-2.5 rounded-xl border ${theme.border_outside} font-medium transition-all duration-300 hover:bg-white/10 hover:${theme.text_default_blue} hover:border-white/30 hover:shadow-md`}
              >
                Login
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden ${theme.text_title} p-2 rounded-lg transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#21397D]/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h2 className={`text-lg font-semibold ${theme.text_title}`}>
              Menu
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`${theme.text_title} p-2 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <Link
                href="/jadwal-praktikum"
                onClick={closeAllMenus}
                className={mobileNavLinkClass("/jadwal-praktikum")}
              >
                Jadwal Praktikum
              </Link>
            </div>

            {/* Badan Khusus Section */}
            <div>
              <h3
                className={`uppercase text-xs tracking-wider ${theme.text_default_light} mb-3 px-4 font-semibold opacity-80`}
              >
                Badan Khusus
              </h3>
              <div className="space-y-1">
                {dropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAllMenus}
                    className={mobileNavLinkClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-white/20">
            <Link
              href="/login"
              onClick={closeAllMenus}
              className={`${theme.button_square_pressed_blue_mobile} transition-all duration-300 block text-center font-medium hover:shadow-lg`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
