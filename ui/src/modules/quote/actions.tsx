"use server";

import { cookies } from "next/headers";

export async function createQuote(
  from: string,
  to: string,
  amount: string,
): Promise<any> {
  try {
    console.log({ from, to, amount });
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { redirect: "/auth/login" };
    }

    console.log({ token });

    const url = `http://${process.env.API_HOST}/quote`;
    const body = JSON.stringify({ from, to, amount: parseFloat(amount) });

    const res = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      return { ok: res.ok, data };
    });

    console.log({ res });

    if (!res.ok && res.data.statusCode === 401) {
      return { redirect: "/auth/login" };
    }
    if (!res.ok) {
      throw new Error(res.data.message || "Invalid credentials");
    }

    return { data: res.data };
  } catch (e: any) {
    console.log("fecht Error:", e);
    return { error: e.message };
  }
}

export async function retriveQuote(id: string): Promise<any> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { redirect: "/auth/login" };
    }

    const url = `http://${process.env.API_HOST}/quote/${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      return { ok: res.ok, data };
    });

    if (!res.ok && res.data.statusCode === 401) {
      return { redirect: "/auth/login" };
    }
    if (!res.ok) {
      throw new Error(res.data.message || "Invalid credentials");
    }

    return { data: res.data };
  } catch (e: any) {
    console.log("fecht Error:", e);
    return { error: e.message };
  }
}
