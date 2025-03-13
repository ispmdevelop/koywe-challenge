"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { retriveQuote } from "@/modules/quote/actions";
import { QuoteItem } from "./QuoteItem";

interface FormData {
  id: string;
}

export function RetrieveQuoteForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError(null);
    const res = await retriveQuote(data.id);
    if (res.redirect) {
      return router.replace(res.redirect);
    }
    if (res.error) {
      setData(null);
      return setError(res.error);
    }
    setData(res.data);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Retrieve quote by id
        </h2>
      </div>

      {error && (
        <div className="mt-5 w-fit border-2 border-red-600 rounded p-2">
          <p className="text-center  font-bold tracking-tight text-red-600">
            {error}
          </p>
        </div>
      )}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              ID
            </label>
            <div className="mt-2">
              <input
                {...register("id", { required: true })}
                type="string"
                name="id"
                id="id"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Retrieve Quote
            </button>
          </div>
        </form>
        {data && (
          <>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Quote Retrieved by id
            </h2>
            <QuoteItem data={data} />
          </>
        )}
      </div>
    </div>
  );
}
