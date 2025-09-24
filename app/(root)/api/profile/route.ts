import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, image, bio, email } = body as { name?: string; image?: string; bio?: string; email?: string };

    const author = await prisma.author.update({
      where: { id: String(session.id) },
      data: {
        name: name ?? undefined,
        image: image ?? undefined,
        bio: bio ?? undefined,
        email: email ?? undefined,
      },
      select: { id: true, name: true, image: true, bio: true, email: true },
    });

    return NextResponse.json({ author });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
  }
}


