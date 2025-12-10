import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/constants/url";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const { data } = await axios.delete(`${API_URL}/api/news/${id}`);

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 },
    );
  }
}
