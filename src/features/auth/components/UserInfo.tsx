import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';
import Logo from "@/components/ui/Logo";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/user/user.slice";

type UserInfoType = {
  name: string;
  gender: string;
  birth: string;
};

export default function UserInfo() {
  const [step, setStep] = useState(1);
  const form = useForm<UserInfoType>({
    defaultValues: {
      name: "",
      gender: "",
      birth: "",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: UserInfoType) => {
    const payload: { name: string; gender: "MALE" | "FEMALE"; birth: string } =
      {
        name: data.name,
        gender: data.gender === "Nam" ? "MALE" : "FEMALE",
        birth: data.birth,
      };
    dispatch(updateUserInfo(payload));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="">
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <CardTitle className="text-2xl">Thông tin người dùng</CardTitle>
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s, i) => {
              const isActive = step === s;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      isActive
                        ? "bg-[#FDBBC1] text-white"
                        : "bg-gray-200 text-gray-400",
                    )}
                  >
                    {s}
                  </div>
                  <span
                    className={cn(
                      "text-xs",
                      isActive ? "font-medium text-[#FDBBC1]" : "text-gray-400",
                    )}
                  >
                    {s === 1
                      ? "Họ và tên"
                      : s === 2
                        ? "Giới tính"
                        : "Ngày sinh"}
                  </span>
                  {i < 2 && <div className="h-px w-10 bg-gray-300" />}
                </div>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        placeholder="Họ và tên"
                        icon={<FaUser />}
                        className="rounded-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 2 && (
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="hover:border-ring hover:ring-ring w-full cursor-pointer rounded-full hover:ring-2">
                          <SelectValue placeholder="Giới tính" />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectItem value="Nam" className="cursor-pointer">
                            Nam
                          </SelectItem>
                          <SelectItem value="Nữ" className="cursor-pointer">
                            Nữ
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 3 && (
              <FormField
                control={form.control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                        <DatePicker
                          value={field.value ? new Date(field.value) : null}
                          onChange={(newValue) => field.onChange(newValue?.toISOString() ?? '')}
                          format="dd/MM/yyyy"
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '9999px'
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div
              className={`flex py-2 ${step === 1 ? "justify-center" : "justify-between"}`}
            >
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-input rounded-full border px-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="rounded-full bg-black px-6 text-white hover:bg-black/90"
                >
                  Tiếp tục
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-full bg-black px-6 text-white hover:bg-black/90"
                >
                  Hoàn tất
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
