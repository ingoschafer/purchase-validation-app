// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

// The configured entrypoint for the 'purchase.validation.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  // The error
  const error = {
    localizedMessage: "It is not permitted to buy more than 50 instances of a product at once.",
    target: "cart"
  };

  // Parse the decimal (serialized as a string) into a float.
  const lineQuantityGreaterLimit = input.cart.lines.find(line => line.quantity > 50);
  const errors = [];

  // Orders with subtotals greater than $1,000 are available only to established customers.
  if (!!lineQuantityGreaterLimit) {
    errors.push(error);
  }

  return { errors };
};
