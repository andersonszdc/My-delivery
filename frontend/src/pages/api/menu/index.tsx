import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../services/dbConnect'
import Product from '../../../models/Product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    await dbConnect()

    switch (method) {

        case 'GET':
            try {
                const products = await Product.find({})
                res.status(200).json({ products })
            } catch (error) {
                res.status(400).json({message: error})
            }
        break

        case 'POST':
            try {
                res.status(200).json({message: 'ok'})
            } catch (error) {
                res.status(400).json({message: error})
            }
        break

        default:
            res.status(400).json({message: 'default'})
    }
}