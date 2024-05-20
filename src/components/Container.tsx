import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

// 감싼것들을 보여줄려면 children으로 보여줄 수 있다
const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-6">
      {children}
    </div>
  );
};

export default Container;
