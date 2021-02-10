import { QuantityDescriptor } from "../calculation/QuantityDescriptor";

const patternItem = /\s+([0-9.]+)\s*(г|кг|мл|л|шт|штук|штука|штуки)$/;
const patternPack = /\s*(\d+)\s*(штук(?:и)? по)\s*([0-9.]+)\s*(г|кг|мл|л)$/;

export function isPriceEligeableForCalculation(priceText: string): boolean {
  return !priceText.includes("/");
}

export function getQuantityDescriptor(nameText: string): QuantityDescriptor | null {
  const packMatch = patternPack.exec(nameText);
  if (packMatch) {
    const count = parseInt(packMatch[1].trim());
    return new QuantityDescriptor(handleQuantity(packMatch[3]) * count, packMatch[4]);
  }
  const itemMatch = patternItem.exec(nameText);
  if (itemMatch) {
    return new QuantityDescriptor(handleQuantity(itemMatch[1]), itemMatch[2]);
  }
  return null;
}

function handleQuantity(quantity: string) {
  if (quantity.startsWith("0.")) {
    return parseFloat(quantity);
  } else if (quantity.includes(".") && quantity.length > 4) {
    return parseFloat(quantity.replace(".", ""));
  } else {
    return parseFloat(quantity);
  }
}
