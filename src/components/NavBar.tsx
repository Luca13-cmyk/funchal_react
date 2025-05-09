import { LucideTicketCheck } from "lucide-react";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <a href="/" className="flex justify-center items-center">
        <img
          src="/funchal_logo.png"
          alt="Logo"
          className="w-16 h-16 md:w-[150px] md:h-[150px] m-2"
        />
        <h2 className="text-3xl">
          <b className="antialiased uppercase ">Funchal</b>
        </h2>
      </a>
      <a
        href="/your-info"
        className="flex justify-center items-center"
        title="Sua Reserva"
      >
        <p>
          <b className="antialiased uppercase xl:text-white text-black">
            {<LucideTicketCheck size={28} />}
          </b>
        </p>
      </a>
    </nav>
  </header>
);

export default NavBar;
