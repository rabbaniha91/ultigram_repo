import { useLocation, Link } from "react-router-dom";
import { bottombarLinks } from "@/constanst";

const ButtomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`flex-center flex-col gap-1 p-2 ${
              isActive && " bg-primary-500 rounded-[10px]"
            }`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`${isActive && "invert-white"}`}
              width={16}
              height={16}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default ButtomBar;
