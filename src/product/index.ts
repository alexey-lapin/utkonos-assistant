export function selectQuery(parent: Element | Document, selector: string): Element | null {
  return parent.querySelector(selector);
}

export function selectQueryOrThrow(parent: Element | Document, selector: string): Element {
  return selectQuery(parent, selector) ?? throwing(`Selector ${selector} didn't match any elements.`);
}

export function throwing<T>(message: string): T {
  throw new Error(message);
}
