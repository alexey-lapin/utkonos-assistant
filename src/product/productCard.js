import { isNameEligeableForCalculation, isPriceEligeableForCalculation } from "../price";

function getProductName(element) {
    const newLocal = element.querySelector("utk-product-card-name span");
    return newLocal.textContent.trim();
}

function getProductPrice(element) {
    return element.querySelector("utk-product-price .product-price").textContent.trim();
}

function setPricePerUnit(element, price) {
    let basePriceContainer = element.querySelector(".product-base-price");
    let productOldPrice = basePriceContainer.querySelector(".product-old-price");
    let pp = document.createElement("span");
    pp.textContent = price;
    if (productOldPrice) {
        pp.style.marginRight = "5px";
        productOldPrice.prepend(pp);
    } else {
        pp.style.marginTop = "-14px";
        basePriceContainer.append(pp);
    }
}

export class ProductCardHandler {

    matches(element) {
        const found = element.localName === "product-card" || element.querySelector("product-card");
        return found;
    }

    handle(element) {
        console.log(">> handle");
        let priceText = getProductPrice(element);
        let nameText = getProductName(element);
        let isPriceEligiable = isPriceEligeableForCalculation(priceText);
        let unit = isNameEligeableForCalculation(nameText);
        if (isPriceEligiable && unit) {
            let price = parseFloat(priceText.replaceAll(/\s/g, "").replace(",", ".").slice(0, -1));
            let pricePerUnit = price / unit.normalizedQuantity();
            let pricePerUnitText = pricePerUnit.toFixed(2) + " ₽/" + unit.normalizedUnit();
            console.log(">> " + nameText + " | " + price + " | " + unit.quantity);
            setPricePerUnit(element, pricePerUnitText);
        }
    }

}
