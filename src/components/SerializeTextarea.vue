<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useSerialize } from "../composables/useSerialize";

const modelValue = defineModel<unknown>();

const {
  unsafe = true,
  trigger = "blur",
  placeholder = "输入对象/数组/正则/函数字符串",
} = defineProps<{
  unsafe: boolean;
  trigger?: "blur" | "input";
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "onSerialized", value: string): void;
  (e: "onDeserialized", value: unknown): void;
}>();

const textarea = ref<HTMLTextAreaElement>();

const inputText = ref<string>("");

const { serialize, deserialize } = useSerialize();

watch(
  () => modelValue.value,
  () => {
    handleSerialize();
  },
  { immediate: true }
);

onMounted(() => {
  textarea.value?.addEventListener(trigger, handleDeserialize);
});
onBeforeUnmount(() => {
  textarea.value?.removeEventListener(trigger, handleDeserialize);
});

function handleSerialize() {
  try {
    const str = serialize(modelValue.value, { unsafe: unsafe });
    inputText.value = str;
    emit("onSerialized", str);
  } catch (err) {
    inputText.value = `序列化失败: ${(err as Error).message}`;
  }
}

function handleDeserialize() {
  try {
    const obj = deserialize(inputText.value, { unsafe: unsafe });
    modelValue.value = obj;
    emit("onDeserialized", obj);
  } catch (err) {
    inputText.value = `反序列化失败: ${(err as Error).message}`;
  }
}
</script>

<template>
  <div class="serialize-input">
    <textarea
      ref="textarea"
      v-model="inputText"
      :placeholder="placeholder"
      class="serialize-input__textarea"
    />
  </div>
</template>

<style scoped>
.serialize-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.serialize-input__textarea {
  width: 100%;
  min-height: 120px;
  font-family: monospace;
  font-size: 14px;
  padding: 0.5rem;
}
</style>
