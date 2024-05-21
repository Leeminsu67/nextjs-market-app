import Link from "next/link";
import React from "react";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({ children, href }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      className="fixed flex bottom-5 right-5 w-14 bg-orange-400 text-white items-center justify-center border-0 border-transparent rounded-full shadow-xl cursor-pointer aspect-square hover:bg-orange-500 transition-colors"
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
