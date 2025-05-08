"use client";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FiUser } from "react-icons/fi";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { setUserEmail } from "@/redux/auth/authSlice";
import Logo from "@/components/ui/Logo";
import { sendOtpForgotPassword } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { /*loading,*/ error } = useSelector( // Remove loading here
    (state: RootState) => state.auth.user,
  );
  // const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      account: "",
    },
  });

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
          onClick={() => navigate("/auth/sign-in")}
          className="cursor-pointer"
        >
          Quay lại đăng nhập
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ForgotPassword;
