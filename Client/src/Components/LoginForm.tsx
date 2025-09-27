import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

const LoginForm = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success("Connexion réussie !");
    } else {
      toast.error(result.error || "Échec de la connexion");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-6 py-10 m-auto mt-10 bg-blue-50 rounded-lg shadow-2xl w-[50%]"
    >
      <input
        name="identifier"
        type="text"
        placeholder="Email ou nom d'utilisateur"
        value={form.identifier}
        onChange={handleChange}
        className="py-2 pl-3 w-[95%] rounded-2xl bg-white text-xs"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        className="py-2 pl-3 w-[95%] rounded-2xl bg-white text-xs"
        required
      />
      <Button
        type="submit"
        variant="default"
        className="rounded-2xl w-[95%] m-auto bg-blue-600 cursor-pointer hover:bg-blue-700 text-white"
      >
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;
