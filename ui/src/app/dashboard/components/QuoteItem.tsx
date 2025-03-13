import { Quote } from "@/modules/quote/types/Quote";

interface Props {
  data: Quote;
}

export function QuoteItem({ data }: Props) {
  return (
    <div className="mt-5 w-fit border-2 border-green-600 rounded p-2">
      <ul>
        <li>
          <strong>id: </strong> {data.id}{" "}
        </li>
        <li>
          <strong>from: </strong> {data.from}
        </li>
        <li>
          <strong>to: </strong> {data.to}
        </li>
        <li>
          <strong>amount </strong> {data.amount}
        </li>
        <li>
          <strong>rate: </strong> {data.rate}
        </li>
        <li>
          <strong>convertedAmount: </strong> {data.convertedAmount}
        </li>
        <li>
          <strong>createdAt: </strong> {data.createdAt}
        </li>
        <li>
          <strong>expiresAt: </strong> {data.expiresAt}
        </li>
      </ul>
    </div>
  );
}
