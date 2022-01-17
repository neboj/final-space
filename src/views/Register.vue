<template>
  <div>
    <h3 class="page-title">Register</h3>

    <!-- Register form -->
    <form class="form" @submit.prevent="register">
      <div class="form__row">
        <!-- Name -->
        <input
          type="text"
          name="name"
          id="name"
          class="form__input"
          placeholder="name"
          v-model="form.name"
          @change="validateName"
        />
        <p v-if="validationErrors && validationErrors.name" class="form__error">
          {{ validationErrors.name }}
        </p>
      </div>

      <div class="form__row">
        <!-- Email -->
        <input
          type="email"
          name="email"
          id="email"
          class="form__input"
          placeholder="email"
          novalidate
          v-model="form.email"
          @change="validateEmail"
        />
        <p
          v-if="validationErrors && validationErrors.email"
          class="form__error"
        >
          {{ validationErrors.email }}
        </p>
      </div>

      <div class="form__row">
        <!-- Password -->
        <input
          type="password"
          name="password"
          id="password"
          class="form__input"
          placeholder="password"
          v-model="form.password"
          @change="validatePassword"
        />
        <p
          v-if="validationErrors && validationErrors.password"
          class="form__error"
        >
          {{ validationErrors.password }}
        </p>
      </div>

      <!-- Submit btn -->
      <button type="submit" class="btn btn--primary form__btn">Register</button>
      <p
        v-if="validationErrors && validationErrors.required"
        class="form__error"
      >
        {{ validationErrors.required }}
      </p>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import useToast from '@/composables/useToast.js';
export default {
  setup() {
    // utils
    const { toast } = useToast();

    const form = reactive({
      name: '',
      email: '',
      password: '',
    });

    // Form Validation
    const validationErrors = reactive({
      name: '',
      email: '',
      password: '',
      required: '',
    });

    const validateName = () => {
      validationErrors.name = '';
      if (form.name.length <= 2) {
        validationErrors.name = 'Name must be atleast 2 chars long.';
      }
    };

    const validateEmail = () => {
      validationErrors.email = '';
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        validationErrors.email =
          'Email must be in correct format example@test.com';
      }
    };

    const validatePassword = () => {
      validationErrors.password = '';
      if (
        !(
          /[a-z]/.test(form.password) && //checks for a-z
          /[0-9]/.test(form.password) && //checks for 0-9
          /\W|_/.test(form.password) && //checks for special char
          form.password.length >= 6
        )
      ) {
        validationErrors.password =
          'Password must be atleast 6 chars long, should contain letters, numbers and special character.';
      }
    };

    // Form Submit
    const register = () => {
      validationErrors.required = '';
      if (!form.name || !form.email || !form.password) {
        validationErrors.required = 'All fields are required.';
        return;
      }

      toast({ title: 'Registration successful', icon: 'success' });
      localStorage.setItem('login', JSON.stringify(form));
      Object.keys(form).forEach((key) => (form[key] = ''));
    };

    return {
      form,
      register,
      validateName,
      validateEmail,
      validatePassword,
      validationErrors,
    };
  },
};
</script>

<style lang="scss" scoped></style>
