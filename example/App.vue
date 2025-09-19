<script setup lang="ts">
import { ref } from "vue";

const data = ref();
</script>

<template>
  <h1>SerializeInput 组件调试</h1>
  <SerializeInput
    v-model="data"
    clearable
    autosize
    :serializeType="['array', 'boolean', 'string']"
  />
  <pre>{{ data }}</pre>
</template>
