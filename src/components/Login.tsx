import { signIn } from "next-auth/react";

export default function Login() {
  const handleSignIn = async (provider: string) => {
    try {
      await signIn(provider);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-5">
        <button
          onClick={() => handleSignIn("github")}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
        >
          Login
        </button>
        <button
          onClick={() => handleSignIn("github")}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
        >
          SignIn
        </button>
      </div>
    </div>
  );
}
