export const hasAudioSupport = () => {
  return typeof navigator !== 'undefined'
    && typeof navigator.mediaDevices !== 'undefined'
    && typeof navigator.mediaDevices.getUserMedia !== 'undefined'
}