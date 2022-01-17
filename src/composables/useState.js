import { reactive, readonly } from 'vue';

const state = reactive({
  user: { isLoggedIn: false },
});

export default function () {
  const loginUser = (newUser) => {
    state.user = newUser;
    state.user.isLoggedIn = true;
    state.user.img = `https://avatars.dicebear.com/api/bottts/${Math.random()}.png`;
  };

  const logoutUser = () => {
    state.user = { isLoggedIn: false };
  };
  return {
    state: readonly(state),
    loginUser,
    logoutUser,
  };
}
