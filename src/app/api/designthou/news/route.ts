import { NextResponse } from "next/server";
import axios from "axios";
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

// export async function POST(request: Request) {
// 	try {
// 		const body = await request.json()
// 		const { name, email, course } = body

// 		await connectDB()

// 		const newUser = await User.create({ name, email, course })

// 		return NextResponse.json(newUser, { status: 201 })
// 	} catch (e: unknown) {
// 		const err = e as MongoError

// 		if (err.code === 11000 && err.keyPattern?.email) {
// 			// 이메일 중복
// 			return NextResponse.json(
// 				{ error: '이미 등록된 이메일입니다.' },
// 				{ status: 400 },
// 			)
// 		}

// 		return NextResponse.json(
// 			{ error: 'Failed to create user' },
// 			{ status: 500 },
// 		)
// 	}
// }
