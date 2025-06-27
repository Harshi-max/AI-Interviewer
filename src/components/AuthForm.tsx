"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const isSignIn = type === "sign-in";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({ email, idToken });
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.svg" alt="logo" height={38} width={38} />
            <h2 className="text-2xl font-semibold text-center text-primary dark:text-white mt-2">PrepWise</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Practice job interviews with AI
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {!isSignIn && (
                  <FormField
                      control={form.control}
                      name="name"
                      label="Name"
                      placeholder="Your Name"
                      type="text"
                  />
              )}

              <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
              />

              <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
              />

              <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md py-2 transition-colors"
              >
                {isSignIn ? "Sign In" : "Create an Account"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-5 text-sm">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="text-indigo-600 hover:underline font-medium ml-1"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </div>
      </div>
  );
};

export default AuthForm;
