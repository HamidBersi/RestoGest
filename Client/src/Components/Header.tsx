import SloganIcon from "@/Components/Icons/SloganIcon";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import CartIcon from "@/Components/CartIcon"; // 🆕

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between px-6 py-1 bg-white border-b-1 border-gray-200">
        <div className="flex items-center gap-1">
          <SloganIcon className="w-5 h-5" />
          <div>
            <h1 className="text-xs font-bold">RestoGest</h1>
            <p className="text-[7px] text-gray-500">
              Votre assistant de cuisine professionnelle
            </p>
          </div>
        </div>
        <div className="flex gap-6 mr-5 items-center">
          {/* 🆕 Icône panier */}
          <CartIcon />

          <Button asChild variant="default">
            <Link
              to="/login"
              className="text-white bg-black hover:bg-blue-600 text-xs
            "
            >
              Se connecter
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register" className="hover:bg-gray-100 text-xs">
              Créer un compte
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
