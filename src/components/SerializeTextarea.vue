<script setup lang="ts"></script>

<template>
  <div class="serialize-input">
    <textarea
      ref="textarea"
      placeholder="文本域输入框"
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
