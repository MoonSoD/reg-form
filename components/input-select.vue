<template>
  <div class="select">
    <div @click="toggle()" ref="focusGroup" class="input-group"
         :class="[selectBodyClass, {'input-group--shadowed': isOpen, 'input-group--error-border': errorMessage && meta.touched}]">
      <div class="label">
        {{ selectedOption ?? props.label }}
      </div>
      <button @click="toggle()" class="input-group__side-btn" :class="{'input-group__side-btn--flipped': isOpen}">
        <svg width="12" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M6.7201 6.78C6.57958 6.92069 6.38894 6.99982 6.1901 7L5.8101 7C5.61168 6.9977 5.42182 6.91888 5.2801 6.78L0.150096 1.64C0.103232 1.59352 0.0660349 1.53822 0.0406506 1.47729C0.0152663 1.41636 0.00219702 1.35101 0.00219702 1.285C0.00219701 1.21899 0.0152663 1.15364 0.0406506 1.09271C0.0660349 1.03178 0.103232 0.976482 0.150096 0.93L0.860096 0.22C0.905719 0.173437 0.960175 0.136444 1.02027 0.11119C1.08037 0.085936 1.14491 0.0729284 1.2101 0.0729284C1.27529 0.0729284 1.33982 0.085936 1.39992 0.11119C1.46002 0.136444 1.51447 0.173437 1.5601 0.22L6.0001 4.67L10.4401 0.22C10.4866 0.173136 10.5419 0.135939 10.6028 0.110554C10.6637 0.0851698 10.7291 0.0721002 10.7951 0.0721002C10.8611 0.0721002 10.9265 0.0851698 10.9874 0.110554C11.0483 0.135939 11.1036 0.173136 11.1501 0.22L11.8501 0.93C11.897 0.976481 11.9342 1.03178 11.9595 1.09271C11.9849 1.15364 11.998 1.21899 11.998 1.285C11.998 1.35101 11.9849 1.41636 11.9595 1.47729C11.9342 1.53822 11.897 1.59352 11.8501 1.64L6.7201 6.78Z"
              fill="#C0CCDA"/>
        </svg>
      </button>
    </div>
    <Transition>
      <ul
          ref="dropdown"
          v-if="isOpen"
          class="input-group__dropdown"
          :style="floatingStyles"
      >
        <li v-for="option in options"
            class="input-group__dropdown__entry"
            :class="{'input-group__dropdown__entry--focused': preSelectedOption === option.name}"
            @click="selectOption(option.name)"
        >
          <img v-if="hasIcons" :src="`/images/${option.name}.svg`" alt="Slovak flag"/>
          <p>
            {{ option.name }}
          </p>
        </li>
      </ul>
    </Transition>
    <Transition>
      <p v-if="errorMessage && meta.touched" class="input-group__error-message text--error">{{ errorMessage }}</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {onClickOutside, useFocusWithin, useToggle} from "@vueuse/core";
import {computed, ref, toRef} from "@vue/reactivity";
import {useField} from "vee-validate";
import {autoPlacement, flip, shift, useFloating} from "@floating-ui/vue";
import {onMounted, PropType} from "vue";

export interface SelectOption {
  name: string;
}

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    required: true
  },
  hasIcons: {
    type: Boolean,
    required: false,
  }
});

const options = computed<SelectOption[]>(() => props.options as SelectOption[]);

const preSelectedOption = ref();

const {value: selectedOption, errorMessage, meta} = useField<string>(() => props.name as string);

const selectOption = (value: string) => {
  selectedOption.value = value;
  preSelectedOption.value = "";
  toggle(false);
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (!isOpen.value) {
      return;
    }

    if (e.key === "ArrowUp") {
      toPrev();
    }

    if (e.key === "ArrowDown") {
      toNext();
    }

    if (e.key === "Enter") {
      selectOption(preSelectedOption.value);
    }
  })
})

const toPrev = () => {
  let index = options.value.findIndex(opt => opt.name === preSelectedOption.value);
  console.log("Index prev loc " + index);

  if (index - 1 < 0) {
    index = options.value.length - 1;
  }

  if (options.value[index - 1]?.name) {
    preSelectedOption.value = options.value[--index].name;
  }
}

const toNext = () => {
  let index = options.value.findIndex(opt => opt.name === preSelectedOption.value);

  if (index + 1 > options.value.length - 1) {
    index = -1;
  }

  preSelectedOption.value = options.value[++index].name;
}

const [isOpen, toggle] = useToggle()

const focusGroup = ref<HTMLDivElement>();
const {focused: groupIsFocused} = useFocusWithin(focusGroup);

const selectBodyClass = computed(() => {

  return {
    "input-group--floating": groupIsFocused.value,
    "input-group--bg-white": isOpen.value || selectedOption.value,
    "input-group--open": isOpen.value
  };
});

const dropdown = ref<HTMLUListElement>();

const {floatingStyles} = useFloating(focusGroup, dropdown, {
  placement: "bottom-start",
  middleware: [flip(), shift()]
})

onClickOutside(focusGroup, () => toggle(false), {ignore: [dropdown]})
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
}

.input-group {
  cursor: pointer;
  transition: all 0.25s ease;

  &--shadowed {
    box-shadow: 0rem 0.75rem 2.125rem -0.75rem #00000029;

    &:hover {
      outline: none;
    }
  }

  &--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__dropdown {
    width: 100%;
    height: auto;


    box-shadow: 0rem 0.75rem 2.125rem -0.75rem #00000029;
    border-top: 1px #F2F5F8 solid;

    max-height: 8.5rem;
    overflow: auto;

    background-color: #FFF;

    padding: 0;

    position: absolute;
    z-index: 50;

    display: flex;
    flex-direction: column;

    list-style-type: none;

    border-bottom-left-radius: 0.875rem;
    border-bottom-right-radius: 0.875rem;

    &__entry {
      cursor: pointer;

      display: flex;
      align-items: center;
      flex-shrink: 0;

      column-gap: 1.5rem;

      height: 3rem;
      padding: 0 1.125rem;

      font-weight: 500;
      color: $text-input-secondary;

      &:last-child {
        border-bottom-left-radius: 0.875rem;
        border-bottom-right-radius: 0.875rem;
      }

      &:hover {
        background-color: $gray-focus;
      }

      &--focused {
        background-color: $gray-focus;
      }

    }
  }

  &__side-btn {
    margin-top: -0.4375rem;
    width: 0.75rem;
    height: 0.4375rem;

    transition: all 0.25s ease;

    transform: rotate(0);
    pointer-events: none;
    transform-origin: bottom right;

    &--flipped {
      margin-top: -0.25rem;
      transform: rotate(180deg);
    }
  }
}

.label {
  cursor: pointer;
}
</style>