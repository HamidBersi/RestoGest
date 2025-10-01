import RegisterForm from "../Components/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center">Inscription</h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
