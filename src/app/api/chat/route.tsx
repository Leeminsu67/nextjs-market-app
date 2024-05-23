import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/helpers/prismadb";
import { Message } from "@prisma/client";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          users: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}

// 메세지 전송
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  // 이미 둘이 대화를 한 conversation이 있는지 찾기
  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: body.senderId,
            },
          },
        },
        {
          users: {
            some: {
              id: body.receiverId,
            },
          },
        },
      ],
    },
  });

  // 이미 둘이 대화를 한 conversation이 있다면 메시지만 생성하기
  if (conversation) {
    console.log("둘이 대화를 한 상태");
    console.log(body);
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id,
        },
      });
      console.log(message);

      return NextResponse.json(message);
    } catch (error: any) {
      return NextResponse.json(error);
    }
  } else {
    // 둘이 처음 대화하는 거라면 conversation과 message 둘 다 생성
    try {
      const newConversation = await prisma.conversation.create({
        data: {
          senderId: body.senderId,
          receiverId: body.receiverId,
          users: {
            connect: [
              {
                id: body.senderId,
              },
              {
                id: body.receiverId,
              },
            ],
          },
        },
      });

      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: newConversation.id,
        },
      });

      return NextResponse.json(message);
    } catch (error) {
      return NextResponse.json(error);
    }
  }
}
