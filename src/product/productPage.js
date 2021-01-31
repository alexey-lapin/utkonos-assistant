import { isNameEligeableForCalculation, isPriceEligeableForCalculation } from "../price";
import { PricePerUnitDescriptor } from "../calculation";

function getProductName(element) {
  const newLocal = element.querySelector(".product-base-info_name");
  return newLocal.textContent.trim();
}

function getProductPrice(element) {
  return element.querySelector("utk-product-price .product-sale-price").textContent.trim();
}

function setPricePerUnit(element, price) {
  let basePriceContainer = element.querySelector(".product-base-price");
  let pp = document.createElement("span");
  pp.title = price.describe();
  pp.textContent = price.pricePerUnitText();
  pp.style.marginRight = "5px";
  basePriceContainer.append(pp);
}

export class ProductPageHandler {
  matches(element) {
    const found = element.querySelector(".product-page_info-block");
    return found;
  }

  handle(element) {
    console.log(">> handle pp");
    let priceText = getProductPrice(element);
    let nameText = getProductName(element);
    let isPriceEligiable = isPriceEligeableForCalculation(priceText);
    let unit = isNameEligeableForCalculation(nameText);
    if (isPriceEligiable && unit) {
      let pricePerUnitDescriptor = new PricePerUnitDescriptor(priceText, unit);
      setPricePerUnit(element, pricePerUnitDescriptor);
    }
  }
}
