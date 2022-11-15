// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */

const stripe = require("stripe")(
  "sk_test_51LPvpUDNDwI2KDMrMudPwHsdxOwUtaLCu4nFl3Uaw7YVnOAh6MhEBkqETh8K1cjnXGD42x8fFpIVm6cy2K6E93ss00APeRSJTM"
);

exports.handler = async (event) => {
  const { typeName, arguments } = event;

  if (typeName !== "Mutation") {
    throw new Error("Request is not a mutation");
  }

  if (!arguments?.amount) {
    throw new Error("Amount is required");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: arguments.amount,
    currency: "cad",
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};
