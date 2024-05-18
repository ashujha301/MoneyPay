"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function createOnRampTransaction(provider: string, amount: number){
    const session = await getServerSession(authOptions);
    
    if(!session.user){
        return {
            message: "Unauthenticated request"
        }
    }

    const token = (Math.random() * 1000).toString();
    
    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            provider,
            amount: amount * 100,
            token: token,
            userId: Number(session?.user?.id),
            startTime: new Date()
        }
    });

    return {
        message: "Done"
    }
}