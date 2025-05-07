"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setUserEmail, setUserPassword } from "@/redux/auth/authSlice";
import { fetchUserData } from "@/redux/user/user.slice";
import Logo from "@/components/ui/Logo";
import { signInUser } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth.user);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    dispatch(setUserEmail(data.email));
    dispatch(setUserPassword(data.password));

    const resultAction = await dispatch(signInUser(data));

    if (signInUser.fulfilled.match(resultAction)) {
      dispatch(fetchUserData());
    }
  };

  return (
    <Card className="w-full max-w-md gap-3 rounded-4xl">
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
                      {...field}
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
                <FormItem className="m-0">
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      className="rounded-full"
                      type="password"
                      placeholder="Mật khẩu"
                      icon={<IoLockClosedOutline size={20} />}
                    />
                  </FormControl>
                  <FormMessage />
                  {error && (
                    <p className={cn("text-destructive text-center text-sm")}>
                      {error}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="m-0 flex w-full justify-end pr-4">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/auth/forgot-password")}
                className="m-0 cursor-pointer p-0"
              >
                Quên mật khẩu?
              </Button>
            </div>
            <div className="flex w-full justify-center">
              <Button
                type="submit"
                className="w-60 cursor-pointer rounded-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Đăng nhập"
                )}
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
            onClick={() => navigate("/auth/sign-up")}
            className="cursor-pointer p-0"
          >
            Đăng ký ngay
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
