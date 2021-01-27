import f from "./qwer"
import { matches, getProductName, getProductPrice, ProductCardHandler } from "../product/productCard";
import  {isNameEligeableForCalculation} from "../price";

(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    f();

    let productCardHandler = new ProductCardHandler();

    let observer = new MutationObserver(mutations => {
        // console.log(">> observe");
        for (let mutation of mutations) {
            for (let addedNode of mutation.addedNodes) {
                // console.log(addedNode.nodeName);
                // console.log(addedNode.innerHTML);
                if (addedNode.nodeName === "PRODUCT-CARD" || addedNode.nodeName === "DIV") {
                    // if(matches(addedNode)) {
                    //     const nameText = getProductName(addedNode);
                    //     // console.log(">> found");
                    //     console.log(">> name " + nameText);
                    //     const priceText = getProductPrice(addedNode);
                    //     console.log(">> price " + priceText);
                    //     isNameEligeableForCalculation(nameText);
                    // }

                    if(productCardHandler.matches(addedNode)) {
                        productCardHandler.handle(addedNode);
                    }

                    // let utkProductPrice = addedNode.querySelector("utk-product-price");
                    // if (utkProductPrice) {
                    //     let price = utkProductPrice.querySelector(".product-price").textContent;
                    //     // console.log(">> " + price);
                    //     let emptyBlock = utkProductPrice.querySelector(".product-empty-block");
                    //     if (emptyBlock) {
                    //         console.log(">> empty");
                    //         emptyBlock.textContent = "empty";
                    //     }
                    // }
                    // let utkProductCardName = addedNode.querySelector("utk-product-card-name");
                    // if (utkProductPrice) {
                    //     let name = utkProductCardName.querySelector("span").textContent;
                    //     // console.log(">> " + name);
                    // }
                }
            }
        }
    });
    observer.observe(document, { childList: true, subtree: true });
})();
