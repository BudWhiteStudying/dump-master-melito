export async function lazyField(obj: any, field: string, getter: () => Promise<any>) {
    Object.defineProperty(obj, field, {
        configurable: true,
        enumerable: true,
        get: async function () {
            const value = await getter();
            return value;
        }
    });
}