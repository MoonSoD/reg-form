<template>
  <label class="check__container">
    {{ props.label }}
    <input v-model="value" type="checkbox">
    <span class="check__checkmark" :class="{'check__container--error': errorMessage}">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.99958 7.35058C3.04447 7.39842 3.09869 7.43654 3.15888 7.4626C3.21908 7.48866 3.28398 7.5021 3.34958 7.5021C3.41518 7.5021 3.48008 7.48866 3.54027 7.4626C3.60047 7.43654 3.65469 7.39842 3.69958 7.35058L9.31958 1.73058C9.36644 1.6841 9.40364 1.6288 9.42902 1.56787C9.45441 1.50694 9.46748 1.44159 9.46748 1.37558C9.46748 1.30958 9.45441 1.24423 9.42902 1.1833C9.40364 1.12237 9.36644 1.06707 9.31958 1.02059L8.78958 0.490584C8.69611 0.398971 8.57045 0.347656 8.43958 0.347656C8.3087 0.347656 8.18304 0.398971 8.08958 0.490584L3.34958 5.23058L1.84958 3.74058C1.80469 3.69275 1.75047 3.65463 1.69027 3.62857C1.63008 3.60251 1.56518 3.58907 1.49958 3.58907C1.43398 3.58907 1.36908 3.60251 1.30888 3.62857C1.24869 3.65463 1.19447 3.69275 1.14958 3.74058L0.619579 4.27058C0.572715 4.31707 0.535518 4.37237 0.510133 4.4333C0.484749 4.49423 0.47168 4.55958 0.47168 4.62558C0.47168 4.69159 0.484749 4.75694 0.510133 4.81787C0.535518 4.8788 0.572715 4.9341 0.619579 4.98058L2.99958 7.35058Z" fill="white"/>
</svg>
    </span>
  </label>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  }
})

const {value, errorMessage} = useField<boolean>(() => props.name as string);
</script>

<style scoped lang="scss">

.check {
  &__container {
    display: block;
    position: relative;

    color: $text-secondary;
    font-weight: 500;

    padding-left: 2.375rem;
    margin-bottom: 0.75rem;

    cursor: pointer;
    font-size: 0.875rem;

    user-select: none;

    &--error {
      outline: 1px $text-error solid;
    }

    input {
      position: absolute;

      opacity: 0;

      cursor: pointer;

      height: 0;
      width: 0;
    }
  }

  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;

    width: 1.3125rem;
    height: 1.375rem;
    border-radius: 0.375rem;

    transition: background-color 0.25s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #F2F5F8;

  }

  &__container:hover input ~ &__checkmark {
    background-color: $gray-focus;
    outline: 1px $gray-hover solid;
  }

  &__container input:checked ~ &__checkmark {
    background-color: $blue;
  }

  &__container input:checked ~ &__checkmark:after {
    display: block;
  }
}


</style>