import { AbstractPricePerUnitAdder } from "./AbstractPricePerUnitAdder";
import { PricePerUnitDescriptor } from "../calculation/PricePerUnitDescriptor";
import { selectQuery, selectQueryOrThrow, throwing } from "./index";

const CONTAINER_SELECTOR = "product-card";

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
    const pricePerUnitContainer = this.createPricePerUnitContainer(pricePerUnitDescriptor);
    const basePriceContainer = selectQueryOrThrow(element, ".product-base-price");
    const oldPriceContainer = selectQuery(basePriceContainer, ".product-old-price");
    this.attachPricePerUnitContainer(pricePerUnitContainer, basePriceContainer, oldPriceContainer);
  }

  private attachPricePerUnitContainer(
    pricePerUnitContainer: HTMLElement,
    basePriceContainer: Element,
    oldPriceContainer: Element | null
  ): void {
    if (oldPriceContainer == null) {
      pricePerUnitContainer.style.marginTop = "-14px";
      basePriceContainer.append(pricePerUnitContainer);
    } else {
      pricePerUnitContainer.style.marginRight = "5px";
      oldPriceContainer.prepend(pricePerUnitContainer);
    }
  }

  matches(element: HTMLElement): boolean {
    return (
      (element.localName === CONTAINER_SELECTOR || element.querySelector(CONTAINER_SELECTOR) !== null) &&
      super.matches(element)
    );
  }

  handle(element: HTMLElement): void {
    super.handle(element);
    this.handleVariants(element);
  }

  private handleVariants(element: HTMLElement) {
    const variantsContainer = selectQuery(element, "product-variants");
    if (variantsContainer != null) {
      this.addVariantListeners(element);
    }
  }

  private addVariantListeners(element: HTMLElement): void {
    const variants = element.querySelectorAll(".product-listing-variants_item-radio");
    variants.forEach((variant: Element) => {
      variant.addEventListener("change", (event: Event) => {
        const productContainer = (event.target as HTMLElement).closest(CONTAINER_SELECTOR) as HTMLElement;
        this.removePricePerUnitContainer(productContainer);
        super.handle(productContainer);
      });
    });
  }
}
