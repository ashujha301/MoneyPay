import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

interface PaymentType {
    token : string;
    userId: string;
    amount: string;
}
app.get('/hdfcWebhook',async (req,res)=>{

    //TODO: check if the request actually came from hdfc bank, [going to use webhook secret]
    const paymentInformation: PaymentType = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };


    try{
        await db.$transaction([
            db.balance.updateMany({
            where: {
                userId: Number(paymentInformation.userId)
            },
            data: {
                amount: {
                    increment: Number(paymentInformation.amount)
                }
            }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.status(200).json({
            message: "Captured"
        });

        }catch(err){
            console.error(err);
            res.status(411).json({
                message: "Error while processing webhook"
            });
        }
})


app.listen(3003);