import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Guest Area",
};

function AccountPage() {
  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, Username
    </h2>
  );
}

export default AccountPage;
