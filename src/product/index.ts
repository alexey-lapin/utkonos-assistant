export function selectQuery(parent: Element | Document, selector: string): Element | null {
  return parent.querySelector(selector);
}

export function selectQueryOrThrow(parent: Element | Document, selector: string): Element {
  return selectQuery(parent, selector) ?? throwing(`failed to query '${selector}'`);
}

export function throwing<T>(message: string): T {
  throw new Error(message);
}
