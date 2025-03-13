"use server";
import { cookies } from "next/headers";

interface AuthResponse {
  access_token: string;
}

interface AuthResponseUI {
  error?: string;
  redirect?: string;
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponseUI> {
  try {
    const url = `http://${process.env.API_HOST}/auth/login`;
    const body = JSON.stringify({ email, password });
    const res: AuthResponse = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      return data;
    });

    const accessToken = res.access_token;
    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: accessToken,
    });
    return { redirect: "/dashboard" };
  } catch (e: any) {
    console.log("fecht Error:", e);
    return { error: e.message };
  }
}

export async function signup(
  email: string,
  password: string,
): Promise<AuthResponseUI> {
  try {
    const url = `http://${process.env.API_HOST}/auth/signup`;
    const body = JSON.stringify({ email, password });
    const res: AuthResponse = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Internal Error");
      }
      return data;
    });

    const accessToken = res.access_token;
    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: accessToken,
    });
    return { redirect: "/dashboard" };
  } catch (e: any) {
    console.log("fecht Error:", e);
    return { error: e.message };
  }
}
