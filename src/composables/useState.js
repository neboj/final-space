import { reactive, readonly } from 'vue';
import { useRouter } from 'vue-router';

const state = reactive({
  user: { isLoggedIn: false },
});

export default function () {
  const router = useRouter(),
    goToEpisodes = () => router.push(`/episodes`);

  const loginUser = (newUser) => {
    state.user = newUser;
    state.user.isLoggedIn = true;
    state.user.img = `https://avatars.dicebear.com/api/bottts/${Math.random()}.png`;
    state.user.episodes = [];
  };

  const logoutUser = () => {
    state.user = { isLoggedIn: false };
    goToEpisodes();
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
