<h1 align="center">vue-serialize-textarea</h1>

<h3 align="center">A Vue3 input component that supports <b>serialize & deserialize</b> of objects, arrays, regex, and functions.</h3>

<div align="center">

![npm](https://img.shields.io/npm/v/vue-serialize-textarea?style=flat-square)
![npm](https://img.shields.io/npm/dt/vue-serialize-textarea?style=flat-square)
![NPM](https://img.shields.io/npm/l/vue-serialize-textarea?style=flat-square)

</div>

## 🚀 Install

```bash
pnpm install vue-serialize-textarea
```

## 🚀 Usage

### Global Import

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VueSerializeText from "vue-serialize-textarea";

const app = createApp(App);
app.use(VueSerializeText);
app.mount("#app");
```

### Manually import

```ts
import { SerializeTextarea } from "vue-serialize-textarea";
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
