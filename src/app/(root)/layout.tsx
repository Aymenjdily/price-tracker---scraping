import React from "react";

import Navbar from "@/components/navbar";

type WebsiteLayout = {
  children: React.ReactNode;
};

const WebsiteLayout = ({ children }: WebsiteLayout) => {
  return (
    <main className="mx-auto max-w-7xl px-5">
      <Navbar />
      {children}
    </main>
  );
};

export default WebsiteLayout;
