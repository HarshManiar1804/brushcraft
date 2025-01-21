"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQueries, useQuery } from "convex/react";
import React, { useEffect } from "react";


function Dashboard() {

  const { user }: any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      if (getUser == undefined) {
        createUser({
          name: user.given_name,
          email: user.email,
          image: user.image
        }).then((resp) => {
          console.log(resp)
        })
      }
      console.log("hiiii", getUser);
    }
  }, [user]);
  return <div>Dashboard
    <LogoutLink>
      <Button>Logout</Button>
    </LogoutLink>
  </div>;
}

export default Dashboard;
