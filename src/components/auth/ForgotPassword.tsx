"use client";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { FiUser } from "react-icons/fi";
import { InputWithIcon } from "../ui/InputWithIcon";
import { setUserEmail, setStep } from "@/redux/auth/authSlice";
import Logo from "../ui/Logo";
import { sendOtpForgotPassword } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      account: "",
    },
  });
  const { loading, error } = useSelector((state: RootState) => state.auth.user);

  const onSubmit = (data: { account: string }) => {
    dispatch(setUserEmail(data.account));
    dispatch(sendOtpForgotPassword(data.account));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Logo />
        <CardTitle className="text-center text-lg">Quên mật khẩu</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex w-full justify-center">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputWithIcon
                        className="rounded-full"
                        type="text"
                        placeholder="Nhập tài khoản"
                        icon={<FiUser size={20} />}
                        {...field}
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
            </div>
            <div className="flex w-full justify-center">
              <Button
                type="submit"
                className="w-60 cursor-pointer rounded-full"
              >
                Gửi yêu cầu
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
          Quay lại đăng nhập
        </Button>
      </CardFooter>
    </Card>
  );
}
