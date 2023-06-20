<template>
  <section class="wrapper">
    <h1 class="text--heading">Registration Form</h1>
    <ul class="form__grid">
      <li class="form__grid__entry--fluid">
        <input-text name="email" label="Email"/>
      </li>
      <li class="form__grid__entry">
        <input-text name="firstName" label="First Name"/>
      </li>
      <li class="form__grid__entry">
        <input-text name="lastName" label="Second name"/>
      </li>
      <li class="form__grid__entry">
        <input-select name="language" label="Language" :options="languages"/>
      </li>
      <li class="form__grid__entry">
        <input-select name="country" label="Country"
                      :options="countriesData"/>
      </li>
      <li class="form__grid__entry">
        <input-text name="password" label="Password" type="password"/>
      </li>
      <li class="form__grid__entry">
        <input-text name="confirmPassword" label="Confirm Password" type="password"/>
      </li>
      <li class="form__grid__entry--fluid row--flex">
        <h2>
          Private Profile
        </h2>
        <div class="row--flex">
          <input-switch name="privateProfile" />
        </div>
      </li>
      <li class="form__grid__entry">
        <custom-button text="Sign up" @click="onSubmit" />
      </li>
      <li class="form__grid__entry row--flex">
        <div class="check-policy">
          <input-checkbox name="privatePolicyAccepted" label="Creating an account means you’re okay with our Privacy Policy."/>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import InputText from "~/components/input-text.vue"
import InputSelect from "~/components/input-select.vue"
import CustomButton from "~/components/custom-button.vue"
import InputCheckbox from "~/components/input-checkbox.vue"
import {useFetch} from "@vueuse/core"
import {useForm} from "vee-validate";
import {default as registerSchema} from "../src/schemas/register-schema"
import {useRouter} from "nuxt/app";
import InputSwitch from "../components/input-switch";
import {computed} from "@vue/reactivity";


const {handleSubmit} = useForm({
  validationSchema: registerSchema,
})

const onSubmit = handleSubmit(values => {
  console.table(values);
  router.push({ path: "/success" });
})

const router = useRouter();

const languages = [
  {
    name: "Slovak"
  },
  {
    name: "English"
  }
]

const countries = useFetch("https://restcountries.com/v2/all?fields=name");

const countriesData = computed(() => {
  if (countries.isFinished.value) {
    return JSON.parse(countries.data.value)
  }

  return [];
})
</script>


