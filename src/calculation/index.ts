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
  private price: number;
  private quantity: QuantityDescriptor;
  private pricePerUnit: number;

  constructor(priceText: string, quantity: QuantityDescriptor) {
    const priceNumber = priceText
      .replaceAll(/\s/g, "")
      .replace(",", ".")
      .slice(0, -1);
    this.price = parseFloat(priceNumber);
    this.quantity = quantity;
    this.pricePerUnit = this.price / quantity.normalizedQuantity();
  }

  describe(): string {
    const price = this.price.toFixed(2);
    const quantity = this.quantity.normalizedQuantity().toFixed(3);
    const unit = this.quantity.normalizedUnit();
    return `${price}₽ / ${quantity}${unit}`;
  }

  pricePerUnitText(): string {
    return this.pricePerUnit.toFixed(2) + " ₽/" + this.quantity.normalizedUnit();
  }
}
