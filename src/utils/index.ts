import { SerializeType } from "../types";

export function getTargetByTypeof(value: unknown): SerializeType {
    let type = typeof value;

    if (type === "object" && Array.isArray(value)) {
        return "array";
    }

    if (value instanceof RegExp) {
        return "regex";
    }

    return type as SerializeType;
}

export function verifySerializeTypes(value: unknown, serializeType: SerializeType | Array<SerializeType>): string | undefined {
    if (typeof serializeType === "string") {
        const type = getTargetByTypeof(value);
        const result = serializeType === type;
        if (result) {
            return;
        }
        return `Error: ${type}不是期望的类型${serializeType}`;
    }

    if (Array.isArray(serializeType) && serializeType.length) {
        const type = getTargetByTypeof(value);
        const result = serializeType.includes(type);

        if (result) {
            return
        }
        return `Error: ${type}不在期望的类型${serializeType.join(
            ","
        )}之中`;
    }

    return
}