<script setup lang="ts">
import { computed, ref, useAttrs, watch } from "vue";
import { useSerialize } from "../composables/useSerialize";
import { verifySerializeTypes } from "../utils";
import { SerializeInputEmits, SerializeInputProps } from "../types";
import { useTrigger } from "../composables/useTrigger";

const modelValue = defineModel<unknown>();

const {
  trigger = "blur",
  placeholder,
  type = "textarea",
  serializeOptions,
  autosize,
  serializeType = [],
} = defineProps<SerializeInputProps>();

const emits = defineEmits<SerializeInputEmits>();

const $attrs = useAttrs();

const { serialize, deserialize } = useSerialize();

const inputRef = ref<HTMLTextAreaElement>();

const inputText = ref<string | undefined>("");
const message = ref<string | undefined>("");

const { onBlur, onChange, onMouseleave } = useTrigger(
  trigger,
  emits,
  handleDeserialize
);

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
const _autosize = computed(() => {
  if (type === "textarea" && typeof autosize === "undefined") {
    return true;
  }
  return autosize;
});

watch(
  () => modelValue.value,
  () => {
    handleSerialize();
  },
  { immediate: true, deep: true }
);
//序列化成字符串
function handleSerialize() {
  try {
    message.value = "";
    inputText.value = "";
    if (modelValue.value) {
      message.value = verifySerializeTypes(modelValue.value, serializeType);

      const serializedStr = serialize(modelValue.value, serializeOptions);
      inputText.value = serializedStr;
      emits("onSerialized", serializedStr);
    }
  } catch (err) {
    message.value = `Error: ${(err as Error).message}`;
  }
}
//反序列化成目标类型
function handleDeserialize() {
  try {
    if (inputText.value === "") {
      return;
    }

    let obj = inputText.value
      ? deserialize(inputText.value, serializeOptions)
      : undefined;

    const errMsg = verifySerializeTypes(obj, serializeType);
    message.value = errMsg;

    if (!errMsg) {
      modelValue.value = obj;
      emits("onDeserialized", obj);
    }
  } catch (err) {
    if (serializeType.includes("string")) {
      modelValue.value = inputText.value;
      emits("onDeserialized", inputText.value);
    } else {
      message.value = `Error: ${(err as Error).message}`;
    }
  }
}
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
    <div class="errMsg" v-if="message">
      {{ message }} &nbsp;&nbsp;
      <span @click="handleSerialize()" style="cursor: pointer">[重置]</span>
    </div>
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
