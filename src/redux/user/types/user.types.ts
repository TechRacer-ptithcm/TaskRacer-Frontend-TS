export interface UserState {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  streak: number;
  userInfoSubmitted: boolean;
  active: boolean;
  isProfileDialogOpen: boolean;
  profileDialogData: {
    fullName: string;
    gender: string;
    birthDate: string;
  };
}

export interface UserProfileDialogState {
  isProfileDialogOpen: boolean;
  profileDialogData: {
    fullName: string;
    gender: string;
    birthDate: string;
  };
}
