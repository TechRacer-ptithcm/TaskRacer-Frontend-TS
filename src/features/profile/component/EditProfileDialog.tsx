"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/redux/store"
import type { RootState } from "@/redux/store"
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { closeProfileDialog, updateProfileDialogData } from "@/redux/user/reducers/user.slice"

export function EditProfileDialog() {
  const dispatch = useAppDispatch()
  const isOpen = useSelector((state: RootState) => state.user.isProfileDialogOpen)
  const userProfile = useSelector((state: RootState) => state.user.profileDialogData)

  const [formData, setFormData] = useState({
    fullName: userProfile.fullName || "",
    gender: userProfile.gender || "male",
    birthDate: userProfile.birthDate || "",
  })

  const handleClose = () => {
    dispatch(closeProfileDialog())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateProfileDialogData(formData))
    handleClose()
  }

  const handleDateChange = (newValue: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: newValue ? newValue.toISOString() : ""
    }))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Dialog 
        open={isOpen} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "1.5rem",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 600,
              color: "#4B4E6D",
            }}
          >
            Chỉnh sửa thông tin
          </Typography>
          <IconButton 
            onClick={handleClose}
            sx={{
              '& svg': {
                width: '1.25rem',
                height: '1.25rem',
                color: '#6b7280'
              }
            }}
          >
            <X />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            padding: '1.5rem',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ tên</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-gray-50"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="space-y-2">
                <Label>Giới tính</Label>
                <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Nam</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Nữ</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Ngày sinh</Label>
                <DatePicker
                  value={formData.birthDate ? new Date(formData.birthDate) : null}
                  onChange={handleDateChange}
                  format="dd/MM/yyyy"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9999px",
                    },
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="min-w-24 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                Hủy
              </Button>
              <Button type="submit" className="min-w-24 rounded-full bg-[#FF6B6B] hover:bg-[#FF5252]">
                Lưu
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  )
}