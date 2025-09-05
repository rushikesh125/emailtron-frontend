"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    let timer;
    if (user) {
      toast.success("You are already Loggedin");
       timer = setTimeout(() => {
        router.push("/");
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [user, router]);
  return <div>{children}</div>;
};

export default AuthLayout;
