import express from 'express';
import stripeModule from 'stripe';
import UserModel from '../../models/userModels.js';
import paymentModel from '../../models/payment.js';
import addToCartModel from '../../models/addToCart.js';
import CreateDonationModel from '../../models/createDonation.js';

const app = express();
const stripe = stripeModule('sk_test_51NYRyfKTzmdU21JYO4eHnWYq0iKcJj2rGa7b7NZ9UIY6EcGH1cendbnbh2vINcJup4WkUuNFdmqETrP10vn3djgS00FVCGzPiB');


const customarStripeAccount = async (req, res) => {
    const id = req.user_id
    const user = await UserModel.findById(id)
    try {
        if (user.customarId) {
            res.json({ customerId: user.customarId });
        } else {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
            });

            res.json({ customerId: customer.id });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the customer.' });
    }
}
const paymentRecive = async (req, res) => {
    const id = req.user_id
    const { amount, currency, paymentMethodId, customerId, cartDetails } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            customer: customerId,
            confirm: true,
            metadata: {
                cartDetails: JSON.stringify(cartDetails),
            },
        });
        const result = new paymentModel({
            amount: paymentIntent.amount,
            user: id,
            paymentIntentId: paymentIntent.id
        });
        await Promise.all(
            cartDetails.map(async (cartItemId) => {
              const updatedCartItem = await addToCartModel.findByIdAndUpdate(
                cartItemId,
                { paymentConfirm: true },
                { new: true }
              );
              return updatedCartItem;
            })
          );
        await result.validate();
        await result.save();
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}
const paymentReciveDonation = async (req, res) => {
    const id = req.user_id
    const { amount, currency, paymentMethodId, customerId, cartDetails } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            customer: customerId,
            confirm: true,
            metadata: {
                cartDetails: JSON.stringify(cartDetails),
            },
        });
        const result = new paymentModel({
            amount: paymentIntent.amount,
            user: id,
            paymentIntentId: paymentIntent.id
        });
        await Promise.all(
            cartDetails.map(async (cartItemId) => {
              const updatedCartItem = await CreateDonationModel.findByIdAndUpdate(
                cartItemId,
                { paymentConfirm: true },
                { new: true }
              );
              return updatedCartItem;
            })
          );
        await result.validate();
        await result.save();
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}



export { customarStripeAccount, paymentRecive, paymentReciveDonation }
