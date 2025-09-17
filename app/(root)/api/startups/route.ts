import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formSchema } from "@/lib/validation";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   console.log(session);

    const body = await req.json();
    const parsed = await formSchema.parseAsync(body);
  
    const startup = await prisma.startup.create({
      data: {
        title: parsed.title,
        description: parsed.description,
        category: parsed.category,
        image: parsed.link,
        pitch: parsed.pitch,
        author: { connect: { id: String(session.id) } },
      },
      select: { id: true },
    });
    
    // const users = await prisma.author.create({
    //   data: {
    //     title: parsed.title,
    //     description: parsed.description,
    //     category: parsed.category,
    //     image: parsed.link,
    //     pitch: parsed.pitch,
    //     author: { connect: { id: String(session.id) } },
    //   },
    //   select: { id: true },
    // });

    return NextResponse.json({ id: startup.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 },
    );
  }
}
export default async function GET({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;

    const post = await prisma.startup.findUnique({
      where: { id },
      include: { author: true },
    });
  } catch (err) {
   return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 },
    );
  }
}

