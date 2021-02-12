import { AbstractPricePerUnitAdder } from "./AbstractPricePerUnitAdder";
import { PricePerUnitDescriptor } from "../calculation/PricePerUnitDescriptor";
import { selectQuery, selectQueryOrThrow, throwing } from "./index";

export class ProductCardPricePerUnitAdder extends AbstractPricePerUnitAdder {
  getProductName(element: HTMLElement): string {
    const productNameElement = selectQueryOrThrow(element, "utk-product-card-name span");
    return productNameElement.textContent?.trim() ?? throwing("failed to get product name");
  }

  getProductPrice(element: HTMLElement): string {
    const productPriceElement = selectQueryOrThrow(element, "utk-product-price .product-price");
    return productPriceElement.textContent?.trim() ?? throwing("failed to get product price");
  }

  setPricePerUnit(element: HTMLElement, pricePerUnitDescriptor: PricePerUnitDescriptor): void {
    const basePriceContainer = selectQueryOrThrow(element, ".product-base-price");
    const productOldPrice = selectQuery(basePriceContainer, ".product-old-price");

    const pricePerUnitContainer = this.createPricePerUnitContainer(pricePerUnitDescriptor);
    if (productOldPrice == null) {
      pricePerUnitContainer.style.marginTop = "-14px";
      basePriceContainer.append(pricePerUnitContainer);
    } else {
      pricePerUnitContainer.style.marginRight = "5px";
      productOldPrice.prepend(pricePerUnitContainer);
    }
  }

  matches(element: HTMLElement): boolean {
    return (
      (element.localName === "product-card" || element.querySelector("product-card") !== null) && super.matches(element)
    );
  }
}
