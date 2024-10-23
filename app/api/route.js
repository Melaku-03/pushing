import userModel from "@/libs/Models/userModel";
import { NextResponse } from "next/server";
import { DBconnect } from "@/libs/config/db";

(async () => {
   await DBconnect();
})()

export async function GET(req) {
    const users = await userModel.find();
    if (users.length === 0) return NextResponse.json({ status: false, message: "Empty database" })
    return NextResponse.json({ status: true, length: users.length, message: users });
} 

export async function POST(req) {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ status: false, message: "Please provide all data!" });
    await userModel.create({ email, password });
    return NextResponse.json({ status: true, message: "New user created!" });
}



