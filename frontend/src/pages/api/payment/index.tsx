import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: '2020-08-27'});
import { NextApiRequest, NextApiResponse } from "next";

const calculateOrderAmount = (valor: number) => {
    return valor*100
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(req.body),
            currency: 'brl',
            payment_method_types: [
                'card'
            ]
        })

        res.send({
            clientSecret: paymentIntent.client_secret
        })
        
    }
}