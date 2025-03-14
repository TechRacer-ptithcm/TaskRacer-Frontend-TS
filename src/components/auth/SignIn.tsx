"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "../ui/InputWithIcon";
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { setEmail, setPassword, setStep } from "@/redux/auth/authSlice";
import Logo from "../ui/Logo";

const signInSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(setEmail(data.email));
    dispatch(setPassword(data.password));
    // Xử lý logic đăng nhập
  };

  return (
    <Card className="w-full max-w-md gap-3">
      <CardHeader>
        <Logo />
        <CardTitle className="text-center text-3xl">Đăng nhập</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      className="rounded-full"
                      type="text"
                      placeholder="Tên đăng nhập"
                      icon={<FiUser size={20} />}
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-center">
              <Button
                type="submit"
                className="w-60 cursor-pointer rounded-full"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col">
        <p className="text-muted-foreground text-sm">
          Bạn chưa có tài khoản?{" "}
          <Button
            variant="link"
            onClick={() => dispatch(setStep("signUp"))}
            className="cursor-pointer p-0"
          >
            Đăng ký ngay
          </Button>
        </p>
        <Button
          variant="link"
          onClick={() => dispatch(setStep("forgotPassword"))}
          className="cursor-pointer"
        >
          Quên mật khẩu?
        </Button>

        <div className="relative flex w-full items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
        type="button"
        className="flex items-center justify-center w-30 max-w-xs p-2 space-x-2 border rounded-full shadow-sm hover:bg-gray-50 cursor-pointer mt-2"
      >
        <FcGoogle className="w-5 h-5" />
      </button>
      </CardFooter>
    </Card>
  );
}
