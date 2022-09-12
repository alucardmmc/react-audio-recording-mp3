export const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export const formWaveSurferMicrophoneOptions = (ref, microphone) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#3f535d",
  barWidth: 3,
  barHeight: 2,
  barRadius: 3,
  responsive: true,
  height: 42,
  plugins: [microphone]
})