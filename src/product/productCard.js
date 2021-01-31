import { isNameEligeableForCalculation, isPriceEligeableForCalculation } from "../price";
import { PricePerUnitDescriptor } from "../calculation";

function getProductName(element) {
  const newLocal = element.querySelector("utk-product-card-name span");
  return newLocal.textContent.trim();
}

function getProductPrice(element) {
  return element.querySelector("utk-product-price .product-price").textContent.trim();
}

function setPricePerUnit(element, price) {
  let basePriceContainer = element.querySelector(".product-base-price");
  let productOldPrice = basePriceContainer.querySelector(".product-old-price");
  let pp = document.createElement("span");
  pp.title = price.describe();
  pp.textContent = price.pricePerUnitText();
  if (productOldPrice) {
    pp.style.marginRight = "5px";
    productOldPrice.prepend(pp);
  } else {
    pp.style.marginTop = "-14px";
    basePriceContainer.append(pp);
  }
}

export class ProductCardHandler {
  matches(element) {
    const found = element.localName === "product-card" || element.querySelector("product-card");
    return found;
  }

  handle(element) {
    console.log(">> handle");
    let priceText = getProductPrice(element);
    let nameText = getProductName(element);
    let isPriceEligiable = isPriceEligeableForCalculation(priceText);
    let unit = isNameEligeableForCalculation(nameText);
    if (isPriceEligiable && unit) {
      let pricePerUnitDescriptor = new PricePerUnitDescriptor(priceText, unit);
      // console.log(">> " + nameText + " | " + price + " | " + unit.quantity);
      setPricePerUnit(element, pricePerUnitDescriptor);
    }
  }
}
