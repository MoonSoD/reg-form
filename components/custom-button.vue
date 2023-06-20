<template>
  <button class="btn" @click="() => emit('click')">
    {{props.text}}
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"]);

const props = defineProps({
  text: String
})
</script>

<style scoped lang="scss">
.btn {
  width: 17.5rem;
  height: 4.375rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 1rem;
  color: #FFF;
  letter-spacing: -0.5%;

  cursor: pointer;

  outline: none;
  border: none;
  border-radius: 1rem;

  transition: all 0.25s ease;

  box-shadow: 0rem 0.25rem 0.875rem 0rem #004EEF30;
  background: linear-gradient(269.72deg, #004EEF 0.1%, #8600EF 96.94%);

  &:hover {
    background: linear-gradient(269.72deg, #8600EF 0.1%, #004EEF 96.94%);
    box-shadow: 0rem 2rem 2.75rem -0.8125rem #223BF059;
   }
}
</style>