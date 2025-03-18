"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "../ui/InputWithIcon";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  setUserEmail,
  setUserUsername,
  setUserPassword,
  setStep,
} from "@/redux/auth/authSlice";
import Logo from "../ui/Logo";
// import { signUpUser } from "@/redux/auth/authSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { signUpUser } from "@/redux/auth/authSlice";
import { Loader2 } from "lucide-react"

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth.user);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    dispatch(setUserUsername(data.username));
    dispatch(setUserEmail(data.email));
    dispatch(setUserPassword(data.password));
    console.log(data)
    dispatch(signUpUser(data));
  };

  return (
    <Card className="w-full max-w-md gap-3 rounded-4xl">
      <CardHeader>
        <Logo />
        <CardTitle className="text-center text-3xl">Đăng ký</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      className="rounded-full"
                      type="text"
                      placeholder="Tên đăng nhập"
                      icon={<FiUser size={20} />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      className="rounded-full"
                      type="email"
                      placeholder="Email"
                      icon={<MdOutlineEmail size={20} />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      className="rounded-full"
                      type="password"
                      placeholder="Mật khẩu"
                      icon={<IoLockClosedOutline size={20} />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {error && <p className={cn("text-destructive text-sm text-center")}>{error}</p>}
                </FormItem>
              )}
            />
            <div className="flex w-full justify-center">
              <Button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Đang đăng ký...
                  </>
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col">
        <p className="text-muted-foreground text-sm">
          Đã có tài khoản?{" "}
          <Button
            variant="link"
            onClick={() => dispatch(setStep("signIn"))}
            className="cursor-pointer p-0"
          >
            Đăng nhập
          </Button>
        </p>

        <div className="relative flex w-full items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          type="button"
          className="mt-2 flex w-30 max-w-xs cursor-pointer items-center justify-center space-x-2 rounded-full border p-2 shadow-sm hover:bg-gray-50"
        >
          <FcGoogle className="h-5 w-5" />
        </button>
      </CardFooter>
    </Card>
  );
}
