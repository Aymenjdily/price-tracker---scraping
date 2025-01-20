import Link from "next/link";

import { navLinks } from "@/constants/navigation";

const RootNavbar = () => {
  return (
    <header className="border-b py-5">
      <nav className="flex items-center justify-between gap-5">
        <Link href={"/"} className="text-xl font-bold">
          Price Tracker
        </Link>
        <ul className="flex items-center gap-x-5">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="cursor-pointer transition duration-200 hover:opacity-50"
            >
              {link.icon}
            </div>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default RootNavbar;
