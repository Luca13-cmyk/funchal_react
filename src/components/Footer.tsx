import { wpp_link_dev } from "../constants";

const Footer = () => (
  <footer className="flex flex-col text-black-100  mt-5 border-t border-gray-100">
    <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
      {/* <div className="flex flex-col justify-start items-start gap-6">
        <p className="text-base text-gray-700">
          Funchal {new Date().getFullYear()} <br />
          Todos os direitos reservados &copy;
        </p>
      </div> */}

      {/* <div className="footer__links">
        {footerLinks.map((item) => (
          <div key={item.title} className="footer__link">
            <h3 className="font-bold">{item.title}</h3>
            <div className="flex flex-col gap-5">
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-gray-500"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>

    <div className="flex max-sm:flex-col justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
      <p>@{new Date().getFullYear()} Funchal</p>

      <div className="footer__copyrights-link">
        <a href={wpp_link_dev} className="text-gray-500">
          <b>Dev: </b> Luca Negrette
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
