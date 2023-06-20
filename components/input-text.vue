<template>
  <div class="outer">
    <div ref="focusGroup" class="input-group" :class="[floatingLabelClass, {'input-group--error-border': errorMessage && meta.touched}]">
      <label class="label" :for="props.name">{{ props.label }}</label>
      <input v-model="value" class="input" :type="inputType" :id="props.name" :name="props.name" :class="{'text--error': hasError}">
      <Transition>
        <div v-if="groupIsFocused && !errorMessage" class="input-group__hover-line"/>
      </Transition>
      <button @click="togglePasswordVisibility()" v-if="props?.type === 'password' || isPasswordVisible" class="input-group__side-btn">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19C16.563 19 20.063 16 22.5 10C20.063 4 16.563 1 12 1C7.437 1 3.937 4 1.5 10C3.937 16 7.437 19 12 19ZM12 14.5C10.8076 14.4966 9.66498 14.0214 8.82181 13.1782C7.97864 12.335 7.50343 11.1924 7.5 10C7.5 7.525 9.525 5.5 12 5.5C14.475 5.5 16.5 7.525 16.5 10C16.5 12.475 14.475 14.5 12 14.5Z" stroke="#C0CCDA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <Transition>
      <p v-if="errorMessage && meta.touched" class="input-group__error-message text--error">{{errorMessage}}</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";
import {computed, ref} from "@vue/reactivity";
import {useFocusWithin, useToggle} from "@vueuse/core";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
  }
});

const hasError = ref(false);

const [isPasswordVisible, togglePasswordVisibility] = useToggle();

const inputType = computed(() => {
  if (!props?.type || isPasswordVisible.value) {
    return "text";
  }

  return props.type;
})

const {value, errorMessage, meta} = useField<string>(() => props.name as string);

const focusGroup = ref<HTMLDivElement>();
const {focused: groupIsFocused} = useFocusWithin(focusGroup);

const floatingLabelClass = computed(() => {
  const isTouched = value.value?.length > 0;

  return {
    "input-group--floating": isTouched || groupIsFocused.value,
    "input-group--bg-white": isTouched
  };
});

</script>

<style scoped>
.outer {
  position: relative;
}
</style>