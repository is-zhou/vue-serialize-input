<script setup lang="ts">
import { computed, ref, useAttrs, watch } from "vue";
import { SerializeOptions, useSerialize } from "../composables/useSerialize";

const modelValue = defineModel<unknown>();

const {
  trigger = "blur",
  placeholder = "输入对象/数组/正则/函数字符串",
  type = "textarea",
  serializeOptions,
  autosize,
} = defineProps<{
  trigger?: "blur" | "change" | "mouseleave";
  placeholder?: string;
  type?: "text" | "textarea" | "number";
  autosize?: boolean | { minRows?: number; maxRows?: number };
  serializeOptions?: SerializeOptions;
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

watch(
  () => modelValue.value,
  () => {
    handleSerialize();
  },
  { immediate: true }
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

    modelValue.value = obj;
    emit("onDeserialized", obj);
  } catch (err) {
    message.value = `Error: ${(err as Error).message}`;
  }
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
      :placeholder="placeholder"
      v-bind="$attrs"
    />
    <span class="errMsg" v-if="message">{{ message }}</span>
  </div>
</template>

<style scoped>
.serialize-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.errMsg {
  font-size: 12px;
  color: var(--el-color-danger);
}
</style>
