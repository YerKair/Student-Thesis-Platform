import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  try {
    // Получаем токен из заголовков
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    // Проксируем запрос к backend API
    const response = await fetch(`${API_BASE_URL}/teams/my-teams`, {
      method: "GET",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "Failed to fetch team data", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Возвращаем первую команду (так как пользователь может быть только в одной команде)
    if (data.teams && data.teams.length > 0) {
      return NextResponse.json(data.teams[0]);
    } else {
      return NextResponse.json(
        { error: "No team found for user" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
