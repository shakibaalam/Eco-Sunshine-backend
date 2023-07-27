import stripe from 'stripe';
const stripeSecretKey = 'sk_test_51NYRyfKTzmdU21JYO4eHnWYq0iKcJj2rGa7b7NZ9UIY6EcGH1cendbnbh2vINcJup4WkUuNFdmqETrP10vn3djgS00FVCGzPiB';
const stripeClient = stripe(stripeSecretKey)

// stripePayments function
const stripePayments = async (req, res) => {
    const { amount, currency, description, token } = req.body;
  
    try {
      // Create a charge using the Stripe API
      const charge = await stripe.charges.create({
        amount,
        currency,
        description,
        source: token,
      });
  
      // Save payment information to MongoDB
      const payment = new PaymentModel({
        amount,
        currency,
        description,
        token,
        chargeId: charge.id,
      });
  
      await payment.save();
  
      // Return the charge object as the response
      res.json(charge);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
  };
  