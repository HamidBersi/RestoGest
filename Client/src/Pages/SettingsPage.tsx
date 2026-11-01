import { useState } from "react";
import { useUser } from "../Context/UserContext";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { Moon, Sun, Save, Upload, Eye, EyeOff } from "lucide-react";
import { apiCall } from "@/lib/api";

const SettingsPage = () => {
  const { user, setUser } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    emailConfirm: user?.email || "",
    currentPassword: "",
    newPassword: "",
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
      // Validation - Nom
      if (!form.name.trim()) {
        toast.error("Le nom est requis");
        setIsLoading(false);
        return;
      }

      // Validation - Email
      if (!form.email.trim()) {
        toast.error("L'email est requis");
        setIsLoading(false);
        return;
      }

      // Validation - Confirmation email
      if (form.email !== form.emailConfirm) {
        toast.error("Les emails ne correspondent pas");
        setIsLoading(false);
        return;
      }

      // Validation - Changement de mot de passe
      if (form.newPassword || form.confirmPassword || form.currentPassword) {
        // Si au moins un champ est rempli, tous doivent l'être
        if (!form.currentPassword.trim()) {
          toast.error("Veuillez saisir votre mot de passe actuel");
          setIsLoading(false);
          return;
        }
        if (!form.newPassword.trim()) {
          toast.error("Veuillez saisir votre nouveau mot de passe");
          setIsLoading(false);
          return;
        }
        if (!form.confirmPassword.trim()) {
          toast.error("Veuillez confirmer votre nouveau mot de passe");
          setIsLoading(false);
          return;
        }
        if (form.newPassword !== form.confirmPassword) {
          toast.error("Les nouveaux mots de passe ne correspondent pas");
          setIsLoading(false);
          return;
        }
      }

      // Préparer les données pour l'envoi
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);

      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      if (form.currentPassword) {
        formData.append("currentPassword", form.currentPassword);
        formData.append("newPassword", form.newPassword);
      }

      // Appeler l'API pour mettre à jour le profil
      const response = await apiCall<{ user: typeof user }>("/users/profile", {
        method: "PUT",
        body: formData,
      });

      // Mettre à jour le contexte utilisateur
      if (response.user) {
        setUser(response.user);
      }

      // Réinitialiser les champs
      setForm({
        name: response.user?.name || "",
        email: response.user?.email || "",
        emailConfirm: response.user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        avatar: null,
      });

      toast.success("Paramètres mis à jour avec succès !");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  const bgClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardBgClass = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const inputBgClass = isDarkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500";
  const labelClass = isDarkMode ? "text-gray-300" : "text-gray-900";
  const subTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <main className={`p-2 max-w-sm mx-auto min-h-screen ${bgClass}`}>
      <h1 className="text-sm font-bold mb-3">Paramètres</h1>

      {/* Mode Sombre/Clair */}
      <div className={`rounded border p-2 mb-2 ${cardBgClass}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDarkMode ? (
              <Moon size={14} className="text-blue-400" />
            ) : (
              <Sun size={14} className="text-yellow-500" />
            )}
            <div>
              <h2 className="font-semibold text-[11px]">Thème</h2>
              <p className={`text-[9px] ${subTextClass}`}>
                {isDarkMode ? "Mode sombre" : "Mode clair"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              isDarkMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                isDarkMode ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Profil */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Avatar */}
        <div className={`rounded border p-2 ${cardBgClass}`}>
          <h2 className="font-semibold text-[11px] mb-2">Photo de profil</h2>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden flex-shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold">
                  {user.name?.charAt(0)}
                </span>
              )}
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <div className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-[10px] font-medium transition-colors">
                <Upload size={12} />
                Changer
              </div>
            </label>
          </div>
        </div>

        {/* Nom */}
        <div className={`rounded border p-2 ${cardBgClass}`}>
          <label
            className={`block text-[11px] font-semibold mb-1 ${labelClass}`}
          >
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-2 py-1 border rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 ${inputBgClass}`}
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div className={`rounded border p-2 ${cardBgClass}`}>
          <label
            className={`block text-[11px] font-semibold mb-1 ${labelClass}`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-2 py-1 border rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 ${inputBgClass}`}
            placeholder="Votre email"
          />
        </div>

        {/* Confirmation Email */}
        <div className={`rounded border p-2 ${cardBgClass}`}>
          <label
            className={`block text-[11px] font-semibold mb-1 ${labelClass}`}
          >
            Confirmer l'email
          </label>
          <input
            type="email"
            name="emailConfirm"
            value={form.emailConfirm}
            onChange={handleChange}
            className={`w-full px-2 py-1 border rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 ${inputBgClass}`}
            placeholder="Confirmer votre email"
          />
          {form.email !== form.emailConfirm && form.emailConfirm && (
            <p className="text-[9px] text-red-500 mt-0.5">
              Les emails ne correspondent pas
            </p>
          )}
        </div>

        {/* Mot de passe */}
        <div className={`rounded border p-2 ${cardBgClass}`}>
          <h2 className="font-semibold text-[11px] mb-2">
            Changer le mot de passe
          </h2>
          <div className="space-y-2">
            {/* Mot de passe actuel */}
            <div>
              <label
                className={`block text-[10px] font-medium mb-0.5 ${labelClass}`}
              >
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className={`w-full px-2 py-1 border rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 pr-7 ${inputBgClass}`}
                  placeholder="Mot de passe actuel"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label
                className={`block text-[10px] font-medium mb-0.5 ${labelClass}`}
              >
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className={`w-full px-2 py-1 border rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 pr-7 ${inputBgClass}`}
                  placeholder="Nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showNewPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label
                className={`block text-[10px] font-medium mb-0.5 ${labelClass}`}
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-2 py-1 border rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 pr-7 ${inputBgClass}`}
                  placeholder="Confirmer le mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={12} />
                  ) : (
                    <Eye size={12} />
                  )}
                </button>
              </div>
            </div>

            {form.newPassword &&
              form.confirmPassword &&
              form.newPassword !== form.confirmPassword && (
                <p className="text-[9px] text-red-500">
                  Les mots de passe ne correspondent pas
                </p>
              )}
          </div>
        </div>

        {/* Bouton Enregistrer */}
        <div className="flex gap-1 pt-1">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-[10px] font-medium transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>

      {/* Infos supplémentaires */}
      <div
        className={`rounded border p-2 mt-3 ${
          isDarkMode
            ? "bg-blue-900 border-blue-800"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <h3
          className={`font-semibold text-[10px] mb-1 ${
            isDarkMode ? "text-blue-300" : "text-blue-900"
          }`}
        >
          Informations
        </h3>
        <p
          className={`text-[9px] ${
            isDarkMode ? "text-blue-200" : "text-blue-800"
          }`}
        >
          Connecté en tant que <strong>{user.role}</strong>
        </p>
      </div>
    </main>
  );
};

export default SettingsPage;
