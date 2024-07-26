import { Link } from "react-router-dom";

const Navbar = ({children}) => {
  return (
    <header className="max-w-6xl mx-auto flex justify-between items-center p-4 pb-10">
      <Link to="/">
        <img src="flixify-logo.png" alt="logo" className="w-32 md:w-52" />
      </Link>
      {children}
    </header>
  );
};

export default Navbar;
