import { reactive, readonly } from 'vue';
import router from '@/router';

const state = reactive({
  user: { isLoggedIn: false },
});

export default function () {
  const loginUser = (newUser) => {
    state.user = newUser;
    state.user.isLoggedIn = true;
    state.user.img = `https://api.dicebear.com/7.x/bottts/png?seed=${Math.random()}`;
    state.user.episodes = [];
  };

  const logoutUser = () => {
    state.user = { isLoggedIn: false };
    router.push('episodes');
  };

  const favorEpisode = (episode) => state.user.episodes.push(episode);
  const unfavorEpisode = (episode) =>
    state.user.episodes.splice(
      state.user.episodes.findIndex((ep) => ep.id === episode.id),
      1
    );
  return {
    state: readonly(state),
    loginUser,
    logoutUser,
    favorEpisode,
    unfavorEpisode,
  };
}
