import  {isNameEligeableForCalculation, isPriceEligeableForCalculation} from "../price";

// export function matches(element) {
    // const found = element.querySelector("product-card");
    // return found;
// }

function getProductName(element) {
    // console.log(container.innerHTML);
    const newLocal = element.querySelector("utk-product-card-name span");
    // console.log(">> product " + newLocal);
    return newLocal.textContent.trim();
}

function getProductPrice(element) {
    return element.querySelector("utk-product-price .product-price").textContent.trim();
}

export class ProductCardHandler {

    matches(element) {
        const found = element.querySelector("product-card");
        return found;
    }

    handle(element) {
        let priceText = getProductPrice(element);
        let nameText = getProductName(element);
        let isPriceEligiable = isPriceEligeableForCalculation(priceText);
        let n = isNameEligeableForCalculation(nameText);
        if (isPriceEligiable && n) {
            console.log(nameText + " | " + priceText + " | " + n.quantity);
        }
    }

}
