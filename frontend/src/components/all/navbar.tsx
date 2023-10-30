import Link from "next/link";
import Image from "next/image"
import logo from "@/static/img/Black_and_White_Monogram_Business_Logo-removebg-preview.png"
const Navbar = () => {
    return (
        <nav className="bg-purple-400 p-4 flex justify-between items-center h-12">
            <a href='/' className="flex w-36">
                <Image src={logo} alt="LOGO" />
                {/* <img src={Logo} alt='Logo'></img> */}
            </a>
            <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg className="h-5 w-5 fill-slate-200" viewBox="0 0 20 20"></svg>
                </span>
                <input className="placeholder:italic placeholder:text-slate-400 block bg-slate-300 w-full border border-slate-300 rounded-xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search" type="text" name="search" />
            </label>

            <ul className="flex space-x-4 text-white">

                <li>
                    <Link href="/compete" className="hover:text-gray-300 h-2 w-2">Compete</Link>
                </li>
                <li>
                    <Link href="/learn" className="hover:text-gray-300">Learn</Link>
                </li>
            </ul>

            <ul className="flex space-x-4 text-white">
                <li>
                    <Link href='/login'>Account</Link>
                </li>
                <li>
                    <Link href="/notifications" className="hover:text-gray-300 h-2">Notification</Link>
                </li>
                <li>
                    <Link href="/menu" className="hover:text-gray-300 h-2">Menu</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;