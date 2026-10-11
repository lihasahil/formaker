import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo/logo.svg" alt="Logo" width={40} height={10} />
          <span className="brutal-text text-black text-xl">Formaker</span>
        </Link>
        <nav className="flex gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-black">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-black">
            How it works
          </a>
          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>
        </nav>
        <p className="text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Formaker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
