import { redirect } from "next/navigation";

export default function authPage() {
  return redirect("auth/login");
}
