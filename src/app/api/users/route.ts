import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/constants/url";

export async function GET() {
  try {
    const { data } = await axios.get(`${API_URL}/api/users`);

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, course, skills } = body;
    console.log(skills);
    const newUser = { name, email, course, skills };
    console.log(newUser);
    const {
      data: { data, message },
    } = await axios.post(`${API_URL}/api/users`, newUser);

    return NextResponse.json({ data, status: 201, message }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
