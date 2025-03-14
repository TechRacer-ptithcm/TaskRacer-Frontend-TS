"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useDispatch } from "react-redux";
import { setEmail, setPassword, setUsername, setStep } from "@/redux/auth/authSlice";

const signUpSchema = z.object({
  username: z.string().min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { username: string; email: string; password: string }) => {
    dispatch(setUsername(data.username));
    dispatch(setEmail(data.email));
    dispatch(setPassword(data.password));
    // Xử lý logic đăng ký
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-lg">Đăng ký</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      type="email"
                      placeholder="Email"
                      icon={<MdOutlineEmail size={20} />}
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
                      type="password"
                      placeholder="Mật khẩu"
                      icon={<IoLockClosedOutline size={20} />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button type="submit" className="w-30 rounded-full cursor-pointer">
                Đăng ký
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="link"
          onClick={() => dispatch(setStep("signIn"))}
          className="cursor-pointer"
        >
          Đã có tài khoản? Đăng nhập
        </Button>
      </CardFooter>
    </Card>
  );
}
