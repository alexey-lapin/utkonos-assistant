export class QuantityDescriptor {
  quantity: number;
  unit: string;

  constructor(quantity: number, unit: string) {
    this.quantity = quantity;
    this.unit = unit;
  }

  normalizedQuantity(): number {
    if (this.unit === "мл" || this.unit === "г") {
      return this.quantity / 1000;
    }
    return this.quantity;
  }

  normalizedUnit(): string {
    if (this.unit === "мл") {
      return "л";
    }
    if (this.unit === "г") {
      return "кг";
    }
    return this.unit;
  }
}

export class PricePerUnitDescriptor {
  price: number;
  quantity: number;
  pricePerUnit: number;

  constructor(price: number, quantity: number, pricePerUnit: number) {
    this.price = price;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
  }

  describe() {
    return `${this.price.toFixed(2)} / ${this.quantity.toFixed(3)}`;
  }
}
