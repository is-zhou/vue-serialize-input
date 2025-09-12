<script setup lang="ts">
import { ref } from "vue";

const data = ref({
  foo: "bar",
  regex: /abc/gi,
  func: (x: number) => x * 2,
  arr: [1, 2, 3],
});
</script>

<template>
  <h1>SerializeInput 组件调试</h1>
  <SerializeInput v-model="data" :unsafe="true" />
  <pre>{{ data }}</pre>
</template>
