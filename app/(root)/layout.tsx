import React from "react";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
