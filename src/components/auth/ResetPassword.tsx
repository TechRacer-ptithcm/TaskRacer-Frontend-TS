"use client";

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
import { IoLockClosedOutline } from "react-icons/io5";
import { InputWithIcon } from "../ui/InputWithIcon";
import { setStep } from "@/redux/auth/authSlice";
import Logo from "../ui/Logo";
import { changePassword } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const token = useSelector((state: RootState) => state.auth.user.resetToken);

  const onSubmit = (data: { newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Mật khẩu không khớp. Vui lòng nhập lại!");
      return;
    }

    dispatch(changePassword({ token, newPassword: data.newPassword }))
  
    console.log("New Password:", data.newPassword);
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Logo />
        <CardTitle className="text-center text-lg">Đặt lại mật khẩu</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <InputWithIcon
                      className="rounded-full"
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      icon={<IoLockClosedOutline size={20} />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <InputWithIcon
                      className="rounded-full"
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      icon={<IoLockClosedOutline size={20} />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-60 cursor-pointer rounded-full">
              Đặt lại mật khẩu
            </Button>
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
