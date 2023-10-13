// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api")} CartLine
*/

// The configured entrypoint for the 'purchase.validation.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  const errors = [];

  if (input.cart === null) {
    const emptyCartError = {
      localizedMessage: "missing cart data",
      target: "cart"
    };
    errors.push(emptyCartError)
    return { errors };
  }

  const lineQuantityError = checkLineQuantities(input.cart.lines)
  if (!!lineQuantityError) {
    errors.push(lineQuantityError)
  }

  //const fullAgeError = checkFullAge(input.cart.deliveryGroups);
  //if (!!fullAgeError) {
  //  errors.push(fullAgeError);
  //}

/*   const error = {
    localizedMessage: "input: " + JSON.stringify(input),
    target: "cart"
  };
  errors.push(error); */

  return { errors };
};



function checkLineQuantities(cartLines) {
  const error = {
    localizedMessage: "It is not permitted to buy more than 50 instances of a product at once.",
    target: "cart"
  };
  console.info("cartLines: ")
  const lineQuantityGreaterLimit = cartLines.find(line => line.quantity > 50);

  return !!lineQuantityGreaterLimit ? error : null;
}

function checkFullAge(groups) {
  const error = {
    localizedMessage: "User has not full age.",
    target: "cart"
  };

  if (groups === null) {
    return {
      localizedMessage: "missing groups data",
      target: "cart"
    };
  }

  const firstName = groups[0].deliveryAddress.firstName
  const lastName = groups[0].deliveryAddress.lastName
  const city = groups[0].deliveryAddress.city
  const zip = groups[0].deliveryAddress.zip
  return schufaTest(firstName, lastName, city, zip) ? null : error;
}

function schufaTest(firstName, lastName, city, zip) {
  // stub
  return false;
}