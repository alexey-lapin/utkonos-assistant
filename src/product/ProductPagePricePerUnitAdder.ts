import { getQuantityDescriptor, isPriceEligeableForCalculation } from "../price";
import { AbstractPricePerUnitAdder } from "./AbstractPricePerUnitAdder";
import { selectQueryOrThrow, throwing } from "./index";
import { PricePerUnitDescriptor } from "../calculation/PricePerUnitDescriptor";

function setPricePerUnit(element: Element, price: PricePerUnitDescriptor) {
  const basePriceContainer = selectQueryOrThrow(element, ".product-base-price");
  const pricePerUnitContainer = document.createElement("span");
  pricePerUnitContainer.title = price.describe();
  pricePerUnitContainer.textContent = price.pricePerUnitText();
  pricePerUnitContainer.style.marginRight = "5px";
  basePriceContainer.append(pricePerUnitContainer);
}

export class ProductPagePricePerUnitAdder extends AbstractPricePerUnitAdder {
  matches(element: Element): boolean {
    return element.querySelector(".product-page_info-block") != null;
  }

  handle(element: Element): void {
    const priceText = this.getProductPrice(element);
    const nameText = this.getProductName(element);
    const isPriceEligiable = isPriceEligeableForCalculation(priceText);
    const quantityDescriptor = getQuantityDescriptor(nameText);
    if (isPriceEligiable && quantityDescriptor != null) {
      const pricePerUnitDescriptor = new PricePerUnitDescriptor(priceText, quantityDescriptor);
      setPricePerUnit(element, pricePerUnitDescriptor);
    }
  }

  getProductName(element: Element): string {
    const productNameElement = selectQueryOrThrow(element, ".product-base-info_name");
    return productNameElement.textContent?.trim() ?? throwing("failed to get product name");
  }

  getProductPrice(element: Element): string {
    const productPriceElement = selectQueryOrThrow(element, "utk-product-price .product-sale-price");
    return productPriceElement.textContent?.trim() ?? throwing("failed to get product price");
  }
}
