import { AbstractPricePerUnitAdder } from "./AbstractPricePerUnitAdder";
import { PricePerUnitDescriptor } from "../calculation/PricePerUnitDescriptor";
import { selectQueryOrThrow, throwing } from "./index";

export class ProductPagePricePerUnitAdder extends AbstractPricePerUnitAdder {
  getProductName(element: HTMLElement): string {
    const productNameElement = selectQueryOrThrow(element, ".product-base-info_name");
    return productNameElement.textContent?.trim() ?? throwing("failed to get product name");
  }

  getProductPrice(element: HTMLElement): string {
    const productPriceElement = selectQueryOrThrow(element, "utk-product-price .product-sale-price");
    return productPriceElement.textContent?.trim() ?? throwing("failed to get product price");
  }

  setPricePerUnit(element: HTMLElement, pricePerUnitDescriptor: PricePerUnitDescriptor): void {
    const basePriceContainer = selectQueryOrThrow(element, ".product-base-price");
    const pricePerUnitContainer = this.createPricePerUnitContainer(pricePerUnitDescriptor);
    pricePerUnitContainer.style.marginRight = "5px";
    basePriceContainer.append(pricePerUnitContainer);
  }

  matches(element: HTMLElement): boolean {
    // not .product-price
    return element.querySelector(".product-page_info-block") != null && super.matches(element);
  }
}
