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

  const fullAgeError = checkFullAge(input.cart.deliveryGroups);
  if (!!fullAgeError) {
    errors.push(fullAgeError);
  }

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
  const lineQuantityGreaterLimit = cartLines.find(line => line.quantity > 50);

  return !!lineQuantityGreaterLimit ? error : null;
}

function checkZips(groups) {
  const error = {
    localizedMessage: "This zip code is not permitted to purchase products in this shop.",
    target: "cart"
  };

  if (groups[0]["deliveryAddress"] === null) {
    const message = "deliveryGroups is empty. groups: " + JSON.stringify(groups);
    console.error(message);
    return {
      localizedMessage: message,
      target: "cart"
    }
  }

  const legalZipCodes = ["07743", "07749", "07751", "07778", "07745", "07740"];
  const permittedZipCode = groups.find(group => legalZipCodes.includes(group.deliveryAddress?.zip));

  return !permittedZipCode ? null : error;
}

function checkFullAge(groups) {
  const error = {
    localizedMessage: "User has not full age.",
    target: "cart"
  };

  // null check

  const firstName = groups[0].deliveryAddress.firstName
  const lastName = groups[0].deliveryAddress.lastName
  const city = groups[0].deliveryAddress.city
  const zip = groups[0].deliveryAddress.zip
  schufaTest(firstName, lastName, city, zip) ? null : error;
}

function schufaTest(firstName, lastName, city, zip) {
  // stub
  return false;
}