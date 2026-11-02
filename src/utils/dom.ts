export function getElement<T extends Element>(selector: string, parent: ParentNode = document): T {
    const element: T | null = parent.querySelector<T>(selector);

    if (element === null) {
        throw new Error(`Element "${selector}" was not found`);
    }

    return element;
}
