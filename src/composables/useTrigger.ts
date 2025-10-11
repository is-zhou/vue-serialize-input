import { Ref } from "vue";
import { SerializeInputEmits, Trigger } from "../types";

export function useTrigger(trigger: Trigger, emits: SerializeInputEmits, handleDeserialize: () => void) {

    const onChange = (val: string) => {
        emits("change", val);
        if (trigger === "change") {
            handleDeserialize();
        }
    };

    const onBlur = (event: FocusEvent) => {
        emits("blur", event);
        if (trigger === "blur") {
            handleDeserialize();
        }
    };

    const onMouseleave = (event: MouseEvent) => {
        emits("mouseleave", event);
        if (trigger === "mouseleave") {
            handleDeserialize();
        }
    };

    return { onChange, onBlur, onMouseleave }
}