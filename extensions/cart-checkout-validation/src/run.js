// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").} CartLine
*/

// The configured entrypoint for the 'purchase.validation.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  const errors = [];
  const lineQuantityError = checkLineQuantities(input.cart.lines)
  if (!!lineQuantityError) {
    errors.push(lineQuantityError)
  }

  const zipError = checkZips(input.cart.deliveryGroups);  
  if (!!zipError) {
    errors.push(zipError);
  }

  return { errors };
};



function checkLineQuantities(cartLines) {
  const error = {
    localizedMessage: "It is not permitted to buy more than 50 instances of a product at once.",
    target: "cart"
  };
  const lineQuantityGreaterLimit = cartLines.find(line => line.quantity > 50);

  return !!lineQuantityGreaterLimit ? error : null;
}

function checkZips(groups) {
  const error = {
    localizedMessage: "This zip code is not permitted to purchase products in this shop.",
    target: "cart"
  };
  const legalZipCodes = ["07743", "07749", "07751", "07778", "07745", "07740"];
  const permittedZipCode = groups.find(group => legalZipCodes.includes(group.deliveryAddress.zip));

  return !permittedZipCode ? null : error;
}