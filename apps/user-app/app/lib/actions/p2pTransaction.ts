"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransaction(amount: string, number: string){
    const session = await getServerSession(authOptions);
    const from = session.user.id;

    if(!from) {
        return {
            message: "You are not logged in"
        }
    }
    const to = await prisma.user.findFirst({
        where: {
            number: number
        }
    });

    if(!to){
        return {
            message: "User does not exist"
        }
    }

    await prisma.$transaction(async(tx)=>{
        await tx.$queryRaw`SELECT*FROM "Balance" WHERE "userId"  = ${Number(from)} FOR UPDATE` //locks the Balance table
        const fromBalance = await tx.balance.findFirst({
            where:{
                userId:Number(from)
            }
        })
        if(!fromBalance ||  fromBalance?.amount < Number(amount) ){
            return {message:"Insufficient funds"}
        }
        await tx.balance.update({
            where:{
                userId:Number(from)
            },
            data:{
                amount:{
                    decrement:Number(amount)*100
                }
            }
        })
        await tx.balance.update({
            where:{
                userId:Number(to.id)
            },
            data:{
                amount:{
                    increment:Number(amount)*100
                }
            }
        })

        await tx.p2pTransfer.create({
            data:{
                fromUserId:Number(from),
                toUserId:Number(to.id),
                timestamp:new Date(),
                amount:Number(amount)*100
            }
        })

        return {message:"Transaction completed"}
    })

}