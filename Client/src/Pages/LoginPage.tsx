import LoginForm from "../Components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-center text-2xl font-bold">Connexion</h2>
      <div className="w-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
