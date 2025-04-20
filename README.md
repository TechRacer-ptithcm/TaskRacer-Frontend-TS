# 🏁 TaskRacer Frontend

Ứng dụng quản lý nhiệm vụ nhóm thời gian thực, được phát triển bằng **React**, **TypeScript**, **Vite**, tích hợp với hệ thống backend Spring Boot. Giao diện thân thiện, hiệu suất cao, dễ mở rộng.

## 🚀 Công nghệ sử dụng

- ⚛️ React + TypeScript
- ⚡️ Vite
- 🎨 Tailwind CSS
- 🌈 ShadCN UI + Material UI
- 🔄 Zustand (state management)
- 🌍 i18next (đa ngôn ngữ)
- 📁 Modular folder structure

## 📂 Cấu trúc thư mục chính

```
src/
├── components/       # Các UI components tái sử dụng
├── features/         # Các slice chức năng (auth, user, task, team...)
├── pages/            # Các trang chính (Home, Login, Dashboard...)
├── hooks/            # Custom hooks
├── lib/              # Cấu hình axios, interceptors
├── store/            # Zustand slices
├── types/            # TypeScript types & interfaces
├── utils/            # Hàm tiện ích
├── locales/          # Tệp dịch i18n
```

## ✨ Các tính năng chính

- Đăng ký / Đăng nhập với xác thực JWT
- Quản lý nhiệm vụ cá nhân và nhóm
- Tạo, chia sẻ, phân quyền team
- Hệ thống Pomodoro tập trung
- UI hiện đại, responsive
- Tối ưu trải nghiệm người dùng bằng hiệu ứng & giao diện mượt mà

## 🛠️ Cài đặt và chạy ứng dụng

```bash
# Cài đặt phụ thuộc
npm install --legacy-peer-deps

npm install --save-dev vite --legacy-peer-deps

# Chạy server dev
npm run dev

# Build production
npm run build
```

## 🧪 ESLint + Type Checking

Cấu hình ESLint mạnh mẽ theo chuẩn `typescript-eslint`:

```ts
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  extends: [
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## 🌐 Đa ngôn ngữ

Sử dụng `react-i18next`, có thể mở rộng hỗ trợ nhiều ngôn ngữ với cấu trúc:

```
src/locales/
├── en/
│   └── translation.json
├── vi/
│   └── translation.json
```

## 📦 Tích hợp Backend

- Sử dụng `axios` với interceptor tự động gắn token
- Quản lý state qua `Zustand`
- DTO phù hợp với backend `Spring Boot`

## 💬 Liên hệ

> Đồ án thuộc môn: **[Tên môn học]**  
> GV hướng dẫn: **[Tên giáo viên]**  
> Nhóm thực hiện: **[Tên nhóm hoặc thành viên]**

---

> Made with ❤️ by TaskRacer Team
