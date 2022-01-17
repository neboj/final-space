import { reactive, readonly } from 'vue';

const state = reactive({
  user: { isLoggedIn: false },
});

export default function () {
  const setLoggedIn = (newValue) => (state.user.isLoggedIn = newValue);
  return {
    state: readonly(state),
    setLoggedIn,
  };
}
