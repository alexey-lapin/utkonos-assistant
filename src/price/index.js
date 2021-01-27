const pattern1 = /\s+([0-9.]+)\s*(г|кг)$/;

export function isPriceEligeableForCalculation(priceText) {
    return !priceText.includes("/");
}

export function isNameEligeableForCalculation(nameText) {
    let newLocal = pattern1.exec(nameText);
    if (newLocal) {
        return new Descriptor(newLocal[1], newLocal[2]);
    }
    console.log(">> r " + newLocal);
    return null;
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
