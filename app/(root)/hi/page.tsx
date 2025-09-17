"use client";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirect to GitHub sign-in
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
  <p>Welcome, {session?.user?.name}</p>
  <img src={session?.user?.image}/>
    </>
)}
