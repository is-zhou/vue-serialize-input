<script setup lang="ts">
import { computed, ref, useAttrs, watch } from "vue";
import { SerializeOptions, useSerialize } from "../composables/useSerialize";

export type SerializeType =
  | "boolean"
  | "number"
  | "undefined"
  | "string"
  | "object"
  | "function"
  | "array"
  | "regex";

const modelValue = defineModel<unknown>();

const {
  trigger = "blur",
  placeholder,
  type = "textarea",
  serializeOptions,
  autosize,
  serializeType = [],
} = defineProps<{
  trigger?: "blur" | "change" | "mouseleave";
  placeholder?: string;
  type?: "text" | "textarea" | "number";
  autosize?: boolean | { minRows?: number; maxRows?: number };
  serializeOptions?: SerializeOptions;
  serializeType?: SerializeType | Array<SerializeType>;
}>();

const emit = defineEmits<{
  (e: "onSerialized", value: string | undefined): void;
  (e: "onDeserialized", value: unknown): void;
  (e: "blur", event: FocusEvent, value: unknown): void;
  (e: "change", value: unknown): void;
  (e: "mouseleave", event: MouseEvent, value: unknown): void;
}>();

const $attrs = useAttrs();
const { serialize, deserialize } = useSerialize();

const inputRef = ref<HTMLTextAreaElement>();

const inputText = ref<string | undefined>("");
const message = ref("");

const _placeholder = computed(() => {
  let text = "请输入输入对象/数组/正则/函数字符串";

  if (Array.isArray(serializeType)) {
    text = serializeType.reduce((pre, current, index) => {
      return (pre += `${current}${
        serializeType.length - 1 === index ? "等值" : "、"
      }`);
    }, "请输入");
  }

  if (typeof serializeType === "string") {
    text = `请输入${serializeType}`;
  }

  return placeholder || text;
});

watch(
  () => modelValue.value,
  () => {
    handleSerialize();
  },
  { immediate: true, deep: true }
);

const _autosize = computed(() => {
  if (type === "textarea" && typeof autosize === "undefined") {
    return true;
  }
  return autosize;
});

function handleSerialize() {
  try {
    message.value = "";

    verifySerializeTypes(modelValue.value);

    const serializedStr = serialize(modelValue.value, serializeOptions);
    inputText.value = serializedStr;
    emit("onSerialized", serializedStr);
  } catch (err) {
    message.value = `Error: ${(err as Error).message}`;
  }
}

function handleDeserialize() {
  try {
    message.value = "";

    let obj = inputText.value
      ? deserialize(inputText.value, serializeOptions)
      : undefined;

    const result = verifySerializeTypes(obj);

    if (result) {
      modelValue.value = obj;
      emit("onDeserialized", obj);
    }
  } catch (err) {
    message.value = `Error: ${(err as Error).message}`;
  }
}

function verifySerializeTypes(value: unknown): boolean {
  if (typeof serializeType === "string") {
    const type = getTargetByTypeof(value);
    const result = serializeType === type;
    if (result) {
      return true;
    }
    message.value = `Error: ${type}不是期望的类型${serializeType}`;
    return false;
  }

  if (Array.isArray(serializeType) && serializeType.length) {
    const type = getTargetByTypeof(value);
    const result = serializeType.includes(type);

    if (result) {
      return true;
    }
    message.value = `Error: ${type}不在期望的类型${serializeType.join(
      ","
    )}之中`;
    return false;
  }

  return true;
}

function getTargetByTypeof(value: unknown): SerializeType {
  let type = typeof value;

  if (type === "object" && Array.isArray(value)) {
    return "array";
  }

  if (value instanceof RegExp) {
    return "regex";
  }

  return type as SerializeType;
}

const onChange = (val: string) => {
  emit("change", val);
  if (trigger === "change") {
    handleDeserialize();
  }
};

const onBlur = (event: FocusEvent) => {
  emit("blur", event, inputText.value);
  if (trigger === "blur") {
    handleDeserialize();
  }
};

const onMouseleave = (event: MouseEvent) => {
  emit("mouseleave", event, inputText.value);
  if (trigger === "mouseleave") {
    handleDeserialize();
  }
};
</script>

<template>
  <div class="serialize-input">
    <el-input
      v-model="inputText"
      :autosize="_autosize"
      :type="type"
      @blur="onBlur"
      @change="onChange"
      @mouseleave="onMouseleave"
      ref="inputRef"
      :placeholder="_placeholder"
      v-bind="$attrs"
    />
    <div class="errMsg" v-if="message">{{ message }}</div>
  </div>
</template>

<style scoped>
.serialize-input {
  width: 100%;
}
.serialize-input .errMsg {
  font-size: 12px;
  color: var(--el-color-danger);
}
</style>
