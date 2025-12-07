import { API_URL } from "@/constants/url";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    console.log(id);
    const { data } = await axios.post(`${API_URL}/api/user/:${id}`);

    if (!data) {
      return NextResponse.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
