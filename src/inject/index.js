import f from "./qwer";
import { matches, getProductName, getProductPrice, ProductCardHandler } from "../product/productCard";
import { isNameEligeableForCalculation } from "../price";
import { ProductPageHandler } from "../product/productPage";

(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  f();

  const productCardHandler = new ProductCardHandler();
  const productPageHandler = new ProductPageHandler();

  let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        if (addedNode.nodeName === "PRODUCT-CARD" || addedNode.nodeName === "DIV") {
          if (productCardHandler.matches(addedNode)) {
            productCardHandler.handle(addedNode);
          } else if (productPageHandler.matches(addedNode)) {
            productPageHandler.handle(addedNode);
          }
        }
      }
    }
  });
  observer.observe(document, { childList: true, subtree: true });
})();
