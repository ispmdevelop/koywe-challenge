import { ExchangeForm } from "./components/ExchangeForm";
import { RetrieveQuoteForm } from "./components/RetrieveQuoteForm";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function SignUpForm() {
  return (
    <div className="flex flex-col ">
      <ExchangeForm />
      <RetrieveQuoteForm />
    </div>
  );
}
