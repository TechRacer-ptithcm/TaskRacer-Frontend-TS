import PremiumList from "@/components/ui/premium-list";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { selectPlan } from "@/redux/premium/premium.slice";
import { setStep } from "@/redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "month",
    label: "Hàng tháng",
    price: "100.000₫",
    note: "100.000₫ thanh toán hàng tháng",
    highlight: null,
  },
  {
    id: "year",
    label: "Hàng năm",
    price: "35.000₫",
    note: "420.000₫ mỗi 12 tháng",
    highlight: "Giá trị tốt nhất",
    tag: "Tiết kiệm 65%",
  },
  {
    id: "half-year",
    label: "Nửa năm",
    price: "60.000₫",
    note: "360.000₫ mỗi 6 tháng",
    tag: "Tiết kiệm 40%",
  },
];

const freeFeatures = [
  { text: "Lưu ghi chú của bạn", available: true },
  { text: "Thực hành các bài toán", available: true },
  { text: "Cài đặt tuỳ chỉnh", available: true },
  { text: "Các bước giải quyết đầy đủ", available: false },
  { text: "Đăng ký Web & Di động", available: false },
  { text: "Đánh giá", available: false },
  { text: "Báo cáo tiến độ chi tiết", available: false },
  { text: "Không có quảng cáo", available: false },
];

const proFeatures = [
  { text: "Lưu ghi chú của bạn", available: true },
  { text: "Thực hành các bài toán", available: true },
  { text: "Cài đặt tuỳ chỉnh", available: true },
  { text: "Các bước giải quyết đầy đủ", available: true },
  { text: "Đăng ký Web & Di động", available: true },
  { text: "Đánh giá", available: true },
  { text: "Báo cáo tiến độ chi tiết", available: true },
  { text: "Không có quảng cáo", available: true },
];

export default function Premium() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPlan = useSelector(
    (state: RootState) => state.premium.selected,
  );

  const getZIndex = (id: string) => {
    if (id === selectedPlan) return 20;
    if (id === "year") return 10;
    return 0;
  };

  const onSubmit = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      dispatch(setStep("signUp"));
      navigate("/auth");
      return;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100 md:flex-row">
      <div className="flex w-full flex-1 flex-col items-center justify-center py-8 md:px-20">
        <Logo className="mb-2" />
        <h1 className="mb-2 text-center text-3xl font-bold">Đăng ký tới Pro</h1>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const isSelected = plan.id === selectedPlan;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ zIndex: getZIndex(plan.id) }}
                className="relative"
                onClick={() => dispatch(selectPlan(plan.id))}
              >
                <Card
                  className={`w-60 cursor-pointer p-6 text-center shadow-md ${
                    isSelected ? "border-2 border-yellow-400" : "border"
                  }`}
                >
                  <CardContent className="flex flex-col items-center justify-center gap-1 p-0">
                    {plan.tag && (
                      <p className="text-sm font-semibold text-purple-600">
                        {plan.tag}
                      </p>
                    )}
                    <p className="text-lg font-medium">{plan.label}</p>
                    <p className="my-2 text-3xl font-bold">{plan.price}</p>
                    <p className="text-muted-foreground text-sm">{plan.note}</p>
                    {plan.highlight && (
                      <p className="mt-2 rounded bg-yellow-300 py-1 font-bold text-yellow-900">
                        {plan.highlight}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <Button
          onClick={onSubmit}
          className="h-auto rounded-full bg-gradient-to-r from-[#FF3B30] to-[#cc9600] px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
        >
          Đăng ký ngay
        </Button>
      </div>

      <div className="hidden items-center justify-center md:flex">
        <div className="h-3/4 w-[2px] bg-gray-300"></div>
      </div>

      <div className="hidden w-1/2 items-center justify-center gap-2 bg-gray-100 md:flex">
        <PremiumList title="Miễn phí" features={freeFeatures} />
        <PremiumList title="Pro" features={proFeatures} />
      </div>
    </div>
  );
}
