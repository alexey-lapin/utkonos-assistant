const patternItem = /\s+([0-9.]+)\s*(г|кг|мл|л)$/;
const patternPack = /\s*(\d+)\s*(штук(?:и)? по)\s*([0-9.]+)\s*(г|кг|мл|л)$/;

export function isPriceEligeableForCalculation(priceText) {
    return !priceText.includes("/");
}

export function isNameEligeableForCalculation(nameText) {
    let packMatch = patternPack.exec(nameText);
    if (packMatch) {
        let count = parseInt(packMatch[1].trim());
        return new Descriptor(handleQuantity(packMatch[3]) * count, packMatch[4]);
    }
    let itemMatch = patternItem.exec(nameText);
    if (itemMatch) {
        return new Descriptor(handleQuantity(itemMatch[1]), itemMatch[2]);
    }
    return null;
}

function handleQuantity(quantity) {
    if (quantity.startsWith("0.")) {
        return quantity;
    } else {
        return quantity.replace(".", "");
    }
}

export class Descriptor {
    constructor(quantity, unit) {
        this.quantity = quantity;
        this.unit = unit;
    }

    normalizedQuantity() {
        if (this.unit === "мл" || this.unit === "г") {
            return this.quantity / 1000;
        }
        return this.quantity;
    }

    normalizedUnit() {
        if (this.unit === "мл") {
            return "л";
        }
        if (this.unit === "г") {
            return "кг";
        }
        return this.unit;
    }

}
