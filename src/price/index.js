import { QuantityDescriptor } from "../calculation";

const patternItem = /\s+([0-9.]+)\s*(г|кг|мл|л)$/;
const patternPack = /\s*(\d+)\s*(штук(?:и)? по)\s*([0-9.]+)\s*(г|кг|мл|л)$/;

export function isPriceEligeableForCalculation(priceText) {
  return !priceText.includes("/");
}

export function isNameEligeableForCalculation(nameText) {
  let packMatch = patternPack.exec(nameText);
  if (packMatch) {
    let count = parseInt(packMatch[1].trim());
    return new QuantityDescriptor(
      handleQuantity(packMatch[3]) * count,
      packMatch[4]
    );
  }
  let itemMatch = patternItem.exec(nameText);
  if (itemMatch) {
    return new QuantityDescriptor(handleQuantity(itemMatch[1]), itemMatch[2]);
  }
  return null;
}

function handleQuantity(quantity) {
  if (quantity.startsWith("0.")) {
    return parseFloat(quantity);
  } else if (quantity.includes(".") && quantity.length > 4) {
    return parseFloat(quantity.replace(".", ""));
  } else {
    return parseFloat(quantity);
  }
}
