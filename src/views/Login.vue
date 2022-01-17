<template>
  <div>
    <h3 class="page-title">Login</h3>

    <!-- Register form -->
    <form class="form" @submit.prevent="login">
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
        />
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
        />
      </div>

      <!-- Submit btn -->
      <button type="submit" class="btn btn--primary form__btn">Login</button>
      <p v-if="credentialsError" class="form__error">Invalid credentials</p>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import useState from '@/composables/useState.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    // utils
    const { setLoggedIn } = useState();
    const router = useRouter(),
      goToHome = () => router.push(`/`);

    // Form data
    const form = reactive({
      email: '',
      password: '',
    });
    const credentialsError = ref(false);
    const dbUser = JSON.parse(localStorage.getItem('login'));

    // Form submit
    const login = () => {
      credentialsError.value = false;

      if (
        !dbUser ||
        dbUser.email !== form.email ||
        dbUser.password !== form.password
      ) {
        credentialsError.value = true;
        return;
      }

      Object.keys(form).forEach((key) => (form[key] = ''));
      setLoggedIn(true);
      goToHome();
    };

    return {
      form,
      login,
      credentialsError,
    };
  },
};
</script>

<style lang="scss" scoped></style>
