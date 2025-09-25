import { useState } from "react";
import { Button } from "@/Components/ui/button";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    avatar: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as any;
    setForm((f) =>
      files ? { ...f, avatar: files[0] } : { ...f, [name]: value }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("role", form.role);
    data.append("password", form.password);
    if (form.avatar) data.append("avatar", form.avatar);

    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    if (res.ok) {
      alert("Registration successful!");
    } else {
      alert(result.error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 max-w-sm m-auto bg-white rounded shadow"
    >
      <input
        name="name"
        type="text"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Sélectionnez un rôle</option>
        <option value="chef">Chef</option>
        <option value="serveur">Serveur</option>
        <option value="manager">Manager</option>
      </select>
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="avatar"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <Button type="submit" variant="default">
        S'inscrire
      </Button>
    </form>
  );
};

export default RegisterForm;
