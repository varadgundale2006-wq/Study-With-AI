"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function LoginButton() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!session) {
    return (
      <div>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() =>
            signIn("credentials", { email, password, redirect: false })
          }
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <p>Welcome {session.user?.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}