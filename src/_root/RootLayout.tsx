import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/toaster";

const RootLayout = () => {
  return (
    <div className="relative">
      <NavBar />

      <main className="overflow-hidden">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default RootLayout;
