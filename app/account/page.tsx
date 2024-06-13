import { Metadata } from "next";
import React from "react";
import { auth } from "@/app/_lib/auth";

export const metadata: Metadata = {
  title: "Guest Area",
};

async function AccountPage() {
  const session = await auth();

  return ( 
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {session?.user?.name}
    </h2>
  );
}

export default AccountPage;
