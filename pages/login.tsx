import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import { Auth } from '@supabase/auth-ui-react';
import {
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

import AuthLayout from "../layouts/Auth";

export default function Login() {
  const router = useRouter();

  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push('admin/profile');
    }
  }, [user, router]);

  const supabase = useSupabaseClient();

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="flex justify-center my-6">
                  <Image alt="TeamCookies" src="/img/logo.png" width={200} height={70} />

                </div>
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  providers={[]}
                  showLinks={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = AuthLayout;
