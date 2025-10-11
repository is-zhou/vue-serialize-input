<h1 align="center">vue-serialize-input</h1>

<h3 align="center">一个基于 Vue3 + Element Plus 的输入框组件，支持 对象 / 数组 / 函数 / 正则 等序列化与反序列化，适合调试或需要在表单中输入复杂数据结构的场景。</h3>

<div align="center">

![npm](https://img.shields.io/npm/v/vue-serialize-input?style=flat-square)
![npm](https://img.shields.io/npm/dt/vue-serialize-input?style=flat-square)
![NPM](https://img.shields.io/npm/l/vue-serialize-input?style=flat-square)

</div>

✨ 特性

- 支持序列化/反序列化 对象、数组、函数、正则、基本类型

- 支持配置 触发时机（blur / change / mouseleave）

- 内置类型校验，可限制允许的序列化类型并给出错误提示

- 基于 Element Plus 的 <el-input>，支持所有原生属性和事件透传

- 支持 v-model 双向绑定

## 📦 Install

```bash
pnpm install vue-serialize-input
# 或
npm install vue-serialize-input
```

⚠️ 注意：本库依赖 element-plus，请确保宿主项目已安装

## 🚀 Usage

### Global Import

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VueSerializeInput from "vue-serialize-input";
import "vue-serialize-input/dist/index.css";
const app = createApp(App);
app.use(VueSerializeInput);
app.mount("#app");
```

### Manually import

```ts
import { SerializeInput } from "vue-serialize-input";
```

```vue
<template>
  <SerializeInput
    v-model="data"
    :serializeType="['array', 'number']"
    placeholder="请输入数组或数字"
    @onSerialized="onSerialized"
    @onDeserialized="onDeserialized"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref({ foo: "bar", regex: /abc/gi, func: (x: number) => x * 666 });

function onSerialized(str: string) {
  console.log("Serialized:", str);
}
function onDeserialized(obj: unknown) {
  console.log("Deserialized:", obj);
}
</script>
```

## ⚙️ Props

| Prop               | 类型                                                | 默认值                            | 说明                                                        |
| ------------------ | --------------------------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| `v-model`          | `unknown`                                           | —                                 | 输入框绑定值（支持对象、数组、正则、函数、基本类型等）      |
| `trigger`          | `"blur" \| "change" \| "mouseleave"`                | `"blur"`                          | 触发反序列化的时机                                          |
| `placeholder`      | `string`                                            | `"输入对象/数组/正则/函数字符串"` | 占位文本                                                    |
| `type`             | `"text" \| "textarea" \| "number"`                  | `"textarea"`                      | 输入框类型                                                  |
| `autosize`         | `boolean \| { minRows?: number; maxRows?: number }` | `true` (当 type 为 `textarea` 时) | 自动高度调整                                                |
| `serializeOptions` | `SerializeOptions`                                  | —                                 | 自定义序列化/反序列化配置                                   |
| `serializeType`    | `SerializeType \| SerializeType[]`                  | `[]`                              | 限制允许的序列化类型（如 `"object"`、`["object","array"]`） |

## 🎯 事件

| 事件名           | 参数                           | 说明                   |
| ---------------- | ------------------------------ | ---------------------- |
| `onSerialized`   | `(value: string \| undefined)` | 每次序列化完成时触发   |
| `onDeserialized` | `(value: unknown)`             | 每次反序列化完成时触发 |
| `blur`           | `(event: FocusEvent)`          | 输入框失焦时触发       |
| `change`         | `(value: unknown)`             | 输入值改变时触发       |
| `mouseleave`     | `(event: MouseEvent)`          | 鼠标移出时触发         |

## 🛠️ 类型定义

```ts
export type SerializeType =
  | "boolean"
  | "number"
  | "undefined"
  | "string"
  | "object"
  | "function"
  | "array"
  | "regex";
```

## 📖 开发 & 调试

```bash
git clone https://github.com/your-repo/vue-serialize-input.git
cd vue-serialize-input
pnpm install
pnpm dev
```

## 📦 构建

```bash
pnpm build
```
