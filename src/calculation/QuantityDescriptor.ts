export class QuantityDescriptor {
  constructor(private quantity: number, private unit: string) {}

  normalizedQuantity(): number {
    if (this.unit === "мл" || this.unit === "г") {
      return this.quantity / 1000;
    }
    return this.quantity;
  }

  normalizedUnit(): string {
    if (this.unit === "мл") {
      return "л";
    } else if (this.unit === "г") {
      return "кг";
    } else if (this.unit === "штук" || this.unit === "штука" || this.unit === "штуки") {
        return "шт"
    }
    return this.unit;
  }
}
