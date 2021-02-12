import { ProductCardPricePerUnitAdder } from "../product/ProductCardPricePerUnitAdder";
import { ProductPagePricePerUnitAdder } from "../product/ProductPagePricePerUnitAdder";

declare let window: CustomWindow;

(function () {
  if (window.utkonosAssistantHasRun) {
    return;
  }
  window.utkonosAssistantHasRun = true;

  const productCardHandler = new ProductCardPricePerUnitAdder();
  const productPageHandler = new ProductPagePricePerUnitAdder();

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(addedNode => {
        if (
          addedNode instanceof HTMLElement &&
          (addedNode.nodeName === "PRODUCT-CARD" || addedNode.nodeName === "DIV")
        ) {
          if (productCardHandler.matches(addedNode)) {
            productCardHandler.handle(addedNode);
          } else if (productPageHandler.matches(addedNode)) {
            productPageHandler.handle(addedNode);
          }
        }
      });
    }
  });
  observer.observe(document, { childList: true, subtree: true });
})();

interface CustomWindow extends Window {
  utkonosAssistantHasRun: boolean;
}
