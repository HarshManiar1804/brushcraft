"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQueries, useQuery } from "convex/react";
import React, { useEffect } from "react";


function Dashboard() {

  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture
      }).then((resp) => {
        console.log("avi gya user bhai tme -->", resp)
      })
    }
  }
  return <div>Dashboard
    <LogoutLink>
      <Button>Logout</Button>
    </LogoutLink>
  </div>;
}

export default Dashboard;
