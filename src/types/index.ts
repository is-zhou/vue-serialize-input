import { SerializeOptions } from "../composables/useSerialize";

export type SerializeType =
    | "boolean"
    | "number"
    | "undefined"
    | "string"
    | "object"
    | "function"
    | "array"
    | "regex";


export type Trigger = "blur" | "change" | "mouseleave"

export type InputType = "text" | "textarea" | "number"


export type Autosize = boolean | { minRows?: number; maxRows?: number };


export type SerializeInputEmits = {
    (e: "onSerialized", value: string | undefined): void;
    (e: "onDeserialized", value: unknown): void;
    (e: "blur", event: FocusEvent): void;
    (e: "change", value: unknown): void;
    (e: "mouseleave", event: MouseEvent): void;
}


export interface SerializeInputProps {
    trigger?: Trigger;
    placeholder?: string;
    type?: InputType;
    autosize?: Autosize;
    serializeOptions?: SerializeOptions;
    serializeType?: SerializeType | Array<SerializeType>;
}