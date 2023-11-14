import Link from "next/link";
import Image from "next/image";
import logo from "@/static/img/Black_and_White_Monogram_Business_Logo__1_-removebg-preview (1).png";
const Navbar = () => {
  return (
    <nav className="bg-purple-400 p-4 flex justify-between items-center h-12">
      <a href="/" className="flex w-36">
        <Image src={logo} alt="LOGO" />
        {/* <img src={Logo} alt='Logo'></img> */}
      </a>

      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/leaderbord" className="hover:text-gray-300 h-2 w-2">
            Leader bard
          </Link>
        </li>
        <li>
          <Link href="/cores" className="hover:text-gray-300">
            Learn
          </Link>
        </li>
      </ul>

      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/login">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
