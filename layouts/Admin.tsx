import React, { useCallback, useEffect } from "react";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
// import FooterAdmin from "../components/Footers/FooterAdmin";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Admin({ children }) {
  const router = useRouter();
  const user = useUser();

  const handleUser = useCallback(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24" style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
