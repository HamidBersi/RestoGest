import { useState } from "react";
import { useUser } from "../Context/UserContext";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { Moon, Sun, Save, Upload } from "lucide-react";

const SettingsPage = () => {
  const { user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    avatar: null as File | null,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null,
  );
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      const file = files[0];
      setForm((f) => ({ ...f, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!form.name.trim()) {
        toast.error("Le nom est requis");
        return;
      }
      if (!form.email.trim()) {
        toast.error("L'email est requis");
        return;
      }
      if (form.password && form.password !== form.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }

      // Pour maintenant, afficher un message de succès
      toast.success("Paramètres mis à jour avec succès !");
      // TODO: Implémenter l'API d'update du profil
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-6">Paramètres</h1>

      {/* Mode Sombre/Clair */}
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDarkMode ? (
              <Moon size={20} className="text-gray-600" />
            ) : (
              <Sun size={20} className="text-yellow-500" />
            )}
            <div>
              <h2 className="font-semibold text-sm">Thème</h2>
              <p className="text-xs text-gray-600">
                {isDarkMode ? "Mode sombre" : "Mode clair"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Profil */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-sm mb-3">Photo de profil</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">{user.name?.charAt(0)}</span>
              )}
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-medium">
                <Upload size={14} />
                Changer la photo
              </div>
            </label>
          </div>
        </div>

        {/* Nom */}
        <div className="bg-white rounded-lg border p-4">
          <label className="block text-sm font-semibold mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div className="bg-white rounded-lg border p-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre email"
          />
        </div>

        {/* Mot de passe */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-sm mb-3">
            Changer le mot de passe
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Laisser vide pour ne pas changer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirmer le mot de passe"
              />
            </div>
          </div>
        </div>

        {/* Bouton Enregistrer */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            <Save size={16} />
            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>

      {/* Infos supplémentaires */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mt-6">
        <h3 className="font-semibold text-sm text-blue-900 mb-2">
          Informations
        </h3>
        <p className="text-xs text-blue-800">
          Vous êtes connecté en tant que <strong>{user.role}</strong>
        </p>
      </div>
    </main>
  );
};

export default SettingsPage;
