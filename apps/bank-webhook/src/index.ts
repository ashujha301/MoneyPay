import express from "express";

const app = express();

app.get('/hdfcWebhook', (req,res)=>{

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    };
})