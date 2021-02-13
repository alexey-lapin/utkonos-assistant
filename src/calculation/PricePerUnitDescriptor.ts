import { getQuantityDescriptor, isPriceEligeableForCalculation } from "../price";
import { QuantityDescriptor } from "./QuantityDescriptor";

export class PricePerUnitDescriptor {
  private price: number;
  private quantity: QuantityDescriptor;
  private pricePerUnit: number;

  constructor(priceText: string, quantity: QuantityDescriptor) {
    const priceNumber = priceText.replaceAll(/\s/g, "").replace(",", ".").slice(0, -1);
    this.price = parseFloat(priceNumber);
    this.quantity = quantity;
    this.pricePerUnit = this.price / quantity.normalizedQuantity();
  }

  static create(nameText: string, priceText: string): PricePerUnitDescriptor | null {
    const isPriceEligiable = isPriceEligeableForCalculation(priceText);
    const quantityDescriptor = getQuantityDescriptor(nameText);
    if (isPriceEligiable && quantityDescriptor != null) {
      return new PricePerUnitDescriptor(priceText, quantityDescriptor);
    }
    return null;
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
