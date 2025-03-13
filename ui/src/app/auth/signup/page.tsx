import Link from "next/link";
import SignUpForm from "./components/SignUpForm";

export const metadata = {
  title: "Sign up page",
  description: "Sign up page",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
