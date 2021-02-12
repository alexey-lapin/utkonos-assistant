export interface PricePerUnitAdder {
    matches(element: HTMLElement): boolean;
    handle(element: HTMLElement): void;
}