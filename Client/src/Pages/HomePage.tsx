import SideBar from "@/Components/SideBar";
import HomeMain from "@/Components/Home"; // ou ton composant central

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <HomeMain />
      </div>
    </div>
  );
}
