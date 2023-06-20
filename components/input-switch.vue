<template>
  <div @click="toggleAndUpdate()" class="switch" :class="{'switch--yes': isYes}">
    <div v-if="isYes" class="switch__label--yes">YES</div>
    <Transition>
      <div class="switch__thumb">
        <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_7_1)">
            <rect x="1" width="19" height="24" rx="7" fill="white"/>
          </g>
          <rect x="7" y="7" width="2" height="2" rx="1" fill="#F1F3F5"/>
          <rect x="7" y="11" width="2" height="2" rx="1" fill="#F1F3F5"/>
          <rect x="7" y="15" width="2" height="2" rx="1" fill="#F1F3F5"/>
          <rect x="12" y="7" width="2" height="2" rx="1" fill="#F1F3F5"/>
          <rect x="12" y="11" width="2" height="2" rx="1" fill="#F1F3F5"/>
          <rect x="12" y="15" width="2" height="2" rx="1" fill="#F1F3F5"/>
          <defs>
            <filter id="filter0_d_7_1" x="0" y="0" width="21" height="27" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                             result="hardAlpha"/>
              <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_7_1"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_1"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_1" result="shape"/>
            </filter>
          </defs>
        </svg>
      </div>
    </Transition>
    <div v-if="!isYes" class="switch__label--no">NO</div>
  </div>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";
import {useToggle} from "@vueuse/core";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const [isYes, toggle] = useToggle();

const toggleAndUpdate = () => {
  value.value = toggle();
}

const {value} = useField<boolean>(() => props.name as string);
</script>

<style scoped lang="scss">
.switch {
  width: 3.75rem;
  height: 1.875rem;

  border-radius: 0.625rem;
  padding: 0.1875rem 0.25rem;

  background-color: #F2F5F8;

  cursor: pointer;

  user-select: none;

  display: flex;
  align-items: center;
  justify-content: start;

  transition: all 0.25s ease;

  font-size: 0.6875rem;

  &--yes {
    background-color: $blue;
  }

  &--yes &__thumb {
    transform: translateX(calc(50% + 2px));
  }

  &__thumb {
    transition: all 0.25s ease;

    display: flex;
    align-items: center;
  }

  &__label {
    &--no {
      color: $text-input-secondary;
      font-weight: 700;

      margin-left: 0.625rem
    }

    &--yes {
      color: #FFF;
      font-weight: 700;

      margin-left: 0.5rem;
    }
  }
}

</style>