import SloganIcon from "@/Components/Icons/SloganIcon";

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-4 bg-white border-b-1 border-gray-200">
        <div className="flex justify-around items-center">
          <SloganIcon />
          <div>
            <h1 className="text-xl font-bold">RestoGest</h1>
            <p className="text-xs text-gray-500">
              Votre assistant de cuisine professionnelle
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
2;
