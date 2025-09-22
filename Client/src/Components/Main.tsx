import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
const Main = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
        <h2 className="text-2xl font-bold text-center">
          Gérez votre cuisine comme un{" "}
          <span className="text-blue-600 block text-center">Professionnel</span>
        </h2>
        <p className="mt-2 text-gray-600 text-xs">
          <span>RestoGest</span> votre assistant ultime pour optimiser la
          gestion de votre restaurant.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild variant="default">
            <Link
              to="/login"
              className="text-white bg-black hover:bg-blue-600 text-xs"
            >
              J'ai déjà un compte
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register" className="hover:bg-gray-100 text-xs">
              Commencer gratuitement
            </Link>
          </Button>
        </div>
        <h3 className="text-md font-bold mt-15 text-center">
          Tout ce dont vous avez besoin
        </h3>
        <p className="mt-2 text-gray-600 text-xs text-center max-w-md">
          Une solution complète pour gèrer efficacement votre restaurant, de la
          caommande à la l'analyse des performances.
        </p>
        <div></div>
      </div>
    </main>
  );
};

export default Main;
