import userModel from "@/libs/Models/userModel";
import { NextResponse } from "next/server";


export async function GET(req) {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ status: false, message: "Please provide user id" });
    const user = await userModel.findById(id);
    if (!user) return NextResponse.json({ status: false, message: "user doesn't exist" });
    return NextResponse.json({ status: true, message: user });
}

export async function PUT(req) {
    const id = req.nextUrl.searchParams.get("id");
    const { status, account } = await req.json();
    if (!id) return NextResponse.json({ status: false, message: "Please provide user id" });
    const user = await userModel.findByIdAndUpdate(id);
    if (!user) NextResponse.json({ status: false, message: "user does not exist" });
    await userModel.updateOne({ _id: id }, { $set: { status, account } })
    return NextResponse.json({ status: true, message: "user updated" });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ status: false, message: "Please provide user id" });
    const user = await userModel.findByIdAndDelete(id);
    if (!user) NextResponse.json({ status: false, message: "user does not exist" });
    return NextResponse.json({ status: true, message: `${user.email} removed successfully` });
}