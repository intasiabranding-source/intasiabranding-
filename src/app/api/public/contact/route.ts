import { NextRequest, NextResponse } from "next/server";
import { processContactSubmission } from "@/lib/public-api/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await processContactSubmission(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.error?.includes("couldn't send") ? 503 : 400 }
      );
    }
    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    const message =
      err instanceof Error ? err.message : "Unexpected server error";
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development"
            ? message
            : "Something went wrong. Please email intasiabranding@gmail.com or call 9342035536.",
      },
      { status: 500 }
    );
  }
}
