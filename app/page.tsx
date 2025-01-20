"use client";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {
  // loged in user details
  const { user } = useKindeBrowserClient();
  console.log(user);

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
