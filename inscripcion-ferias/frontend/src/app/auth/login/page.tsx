import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <main className="grid min-h-screen bg-white [grid-template-columns:repeat(auto-fit,minmax(380px,1fr))]">
      <LoginForm />
    </main>
  );
}
