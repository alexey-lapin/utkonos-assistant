import { PricePerUnitAdder } from "./PricePerUnitAdder";

export abstract class AbstractPricePerUnitAdder implements PricePerUnitAdder {
  abstract matches(element: Element): boolean;

  abstract handle(element: Element): void;

  abstract getProductName(element: Element): string;

  abstract getProductPrice(element: Element): string;
}
