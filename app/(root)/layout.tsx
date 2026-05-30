import Navbar from "@/components/navigation/navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
