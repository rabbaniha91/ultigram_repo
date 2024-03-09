import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignoutAccount } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { mutate: signout, isSuccess } = useSignoutAccount();
  const naviagte = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) naviagte(0);
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between">
        <Link to={"/"} className="flex gap-3 items-center">
          Ultigram
        </Link>
      </div>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => signout()}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>
        <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
          <img
            src={user?.imageUrl || `/assets/images/profile-placeholder.svg`}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        </Link>
      </div>
    </section>
  );
};

export default TopBar;
