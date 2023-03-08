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
  title?: string;
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
  birthday: Date;
  remember: boolean;
  fcmToken: string;
  totalDebitValuation: number;
  totalCreditValuation: number;
}

export interface EntryInterface {
  partyName: string;
  mobileNumber: string;
  dueDate: Date;
  message: string;
  amount: string;
  type: "collect" | "pay";
  madeOn: Date;
  uid: string;
}
