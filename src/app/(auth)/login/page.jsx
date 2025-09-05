"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2Icon } from "lucide-react";
import Link from "next/link";

import toast from "react-hot-toast";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
// import CustomBtn from "@/components/CustomBtn";
import { createUser } from "@/apifunctions/users/createUser";
import { Button } from "@/components/ui/button";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Login attempt:', formData);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login Success");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error:::", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    // console.log('Login attempt:', formData);
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = {
        fullName: res.user?.displayName,
        email: res.user?.email,
        photoURL: res.user?.photoURL,
        userId: res.user?.uid,
      };
      await createUser(user);
      toast.success("Login Success");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error:::", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  p-4">
      <div className="w-full max-w-md">
        <div className="bg-white  rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-theme-purple mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                    bg-white 
                    text-gray-900 
                    placeholder-gray-500 
                    focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-2 border border-gray-300  rounded-lg 
                    bg-white 
                    text-gray-900  
                    placeholder-gray-500 
                    focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-theme-purple hover:text-theme-purple/100 "
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full py-2 px-4 bg-theme-purple hover:bg-theme-purple/100  cursor-pointer
                text-white rounded-lg hover:opacity-90 transform hover:scale-[1.02] transition-all"
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : ""}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 "></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white  text-gray-500 ">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex">
              <Button
                disabled={isLoading}
                type="button"
                onClick={handleGoogleSignin}
                className="w-full flex items-center justify-center py-2 px-4 
                  border border-gray-300  
                  text-white
                  rounded-lg cursor-pointer
                  transition-colors"
              >
                {isLoading ? <Loader2Icon className="animate-spin" /> : ""}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                &nbsp;Sign in with Google
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 ">
              Don't have an account?{" "}
              <Link
                href={`/signup`}
                className="text-purple-600 hover:text-purple-700 "
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
