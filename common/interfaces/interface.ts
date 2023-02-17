export interface EmailProps {
  email: string;
  validEmail: boolean;
  changeEmailText: (text: string) => void;
}

export interface PasswordProps {
  password: string;
  validePassword: string;
  changePasswordText: (text: string) => void;
}

export interface FullNameProps {
  name: string;
  changeNameText: (text: string) => void;
}

export interface RememberMeProps {
  rememberMe: boolean;
  changeRememberMeValue: () => void;
}

export interface AuthScreenNavigateProps {
  navigateToLoginScreen: () => void;
}

export interface forgotPasswordProps {
  navigateToForgotScreen: () => void;
}

export interface UserInterface {
  email: string;
  name: string;
  profilePic: string;
  remember: boolean;
}
