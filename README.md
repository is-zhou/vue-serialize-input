# vue-serialize-textarea

A Vue3 input component that supports **serialize & deserialize** of objects, arrays, regex, and functions.

## 🚀 Install

```bash
npm install vue-serialize-textarea
```

## 🚀 Usage

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VueSerializeText from "vue-serialize-textarea";

const app = createApp(App);
app.use(VueSerializeInput);
app.mount("#app");
```

```vue
<template>
  <SerializeInput
    v-model="data"
    @onSerialized="onSerialized"
    @onDeserialized="onDeserialized"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref({ foo: "bar", regex: /abc/gi, func: (x: number) => x * 2 });

function onSerialized(str: string) {
  console.log("Serialized:", str);
}
function onDeserialized(obj: unknown) {
  console.log("Deserialized:", obj);
}
</script>
```
