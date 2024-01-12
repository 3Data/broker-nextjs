export const checkAudio = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  if (context.state === "suspended") return false;
  if (context.state === "running") return true;
};
