"use client";
import { useNavigate, useLocation } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { verifyAccount, verifyOtpForgotPassword } from "@/redux/auth/authSlice";
import { resendEmailVerification } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Mã OTP phải có 6 chữ số" })
    .max(6, { message: "Mã OTP phải có 6 chữ số" }),
});

export default function VerifyEmail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAccountVerification = location.pathname.includes("verify-account");
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const email = useSelector((state: RootState) => state.auth.user.email);

  const onSubmit = (data: { otp: string }) => {
    if (isAccountVerification) {
      dispatch(verifyAccount(String(data.otp)));
    } else {
      dispatch(verifyOtpForgotPassword(String(data.otp)));
    }
  };

  const handleResendEmail = () => {
    if (email) {
      dispatch(resendEmailVerification(email));
    }
  };

  return (
    <Card className="w-full max-w-md gap-3 rounded-4xl">
      <CardHeader>
        <Logo />
        <CardTitle className="text-center text-3xl">Xác thực Email</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-center text-sm">
          Nhập mã OTP được gửi đến email của bạn để xác thực tài khoản.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex w-full items-center justify-center">
                    <div className="flex items-center justify-center">
                      <InputOTP
                        maxLength={6}
                        {...field}
                        className="text-center text-lg tracking-widest"
                      >
                        <InputOTPGroup className="flex w-full items-center justify-center">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
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
                Xác thực
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col">
        <p className="text-muted-foreground text-sm">
          Không nhận được mã?{" "}
          <Button
            variant="link"
            onClick={handleResendEmail}
            className="cursor-pointer p-0"
          >
            Gửi lại email xác thực
          </Button>
        </p>

        <Button
          variant="link"
          onClick={() => navigate("/auth/sign-in")}
          className="cursor-pointer"
        >
          Quay lại đăng nhập
        </Button>
      </CardFooter>
    </Card>
  );
}
