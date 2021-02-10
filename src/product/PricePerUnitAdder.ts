export interface PricePerUnitAdder {
    matches(element: Element): boolean;
    handle(element: Element): void;
}