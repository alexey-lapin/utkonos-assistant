import { getQuantityDescriptor, isPriceEligeableForCalculation } from "../price";
import { PricePerUnitDescriptor } from "../calculation/PricePerUnitDescriptor";
import { AbstractPricePerUnitAdder } from "./AbstractPricePerUnitAdder";
import { selectQuery, selectQueryOrThrow, throwing } from "./index";

function setPricePerUnit(element: Element, price: PricePerUnitDescriptor) {
  const basePriceContainer = selectQueryOrThrow(element, ".product-base-price");
  const productOldPrice = selectQuery(basePriceContainer, ".product-old-price");

  const pricePerUnitContainer = document.createElement("span");
  pricePerUnitContainer.title = price.describe();
  pricePerUnitContainer.textContent = price.pricePerUnitText();
  if (productOldPrice == null) {
    pricePerUnitContainer.style.marginTop = "-14px";
    basePriceContainer.append(pricePerUnitContainer);
  } else {
    pricePerUnitContainer.style.marginRight = "5px";
    productOldPrice.prepend(pricePerUnitContainer);
  }
}

export class ProductCardPricePerUnitAdder extends AbstractPricePerUnitAdder {
  getProductName(element: Element): string {
    const productNameElement = selectQueryOrThrow(element, "utk-product-card-name span");
    return productNameElement.textContent?.trim() ?? throwing("failed to get product name");
  }

  getProductPrice(element: Element): string {
    const productPriceElement = selectQueryOrThrow(element, "utk-product-price .product-price");
    return productPriceElement.textContent?.trim() ?? throwing("failed to get product price");
  }

  matches(element: Element): boolean {
    return element.localName === "product-card" || element.querySelector("product-card") !== null;
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
}
