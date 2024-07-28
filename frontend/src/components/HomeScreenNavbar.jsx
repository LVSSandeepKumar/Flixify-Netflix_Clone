import { LogOut, Menu, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const HomeScreenNavbar = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const {setContentType} = useContentStore();

  return (
    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      {/* Desktop Navbar */}
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/flixify-logo.png"
            alt="flixify logo"
            className="w-32 sm:w-40"
          />
        </Link>
        <div className="hidden sm:flex gap-3 items-center">
          <Link to={"/"} className="hover:underline" onClick={() => setContentType("movie")}>
            Movies
          </Link>
          <Link to={"/"} className="hover:underline" onClick={() => setContentType("tv")}>
            TV Shows
          </Link>
          <Link to={"/search"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/history"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar image"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/*Mobile Navbar */}
      {isMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-500">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeScreenNavbar;
