// src/components/Login.tsx
import { signIn } from "next-auth/react";
export default function Login() {
  return (
    <div>
      <div className="flex flex-row gap-5">
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
        >
          Login
        </button>
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
        >
          SignIn
        </button>
        </div>
    </div>
  );
}
