const stripe = require("../Config/stripeConfig");

const createCheckoutSession = async ({ course, user }) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: course.name,
          },

          unit_amount: course.price * 100,
        },

        quantity: 1,
      },
    ],

    metadata: {
      userId: user.id.toString(),
      courseId: course._id.toString(),
      price : course.price
    },

    success_url:
      "http://localhost:3000/student/enrollment/6a04986e099aee3c83dc2a05",

    cancel_url: "http://localhost:3000/payment/cancel",
  });

  return session;
};

module.exports = {
  createCheckoutSession,
};
