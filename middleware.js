import { NextResponse } from "next/server";

export default function milddleware(req, ev) {
    console.log(req.url);
    if(req.nextUrl.pathname.startsWith('/bunk-url')) {
        return NextResponse.rewrite("http://localhost:3000/api/hello");
    }
}