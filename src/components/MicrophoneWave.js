import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone";
import { useEffect, useRef } from "react";

const MicrophoneWave = () => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#eee",
      progressColor: "#3f535d",
      barWidth: 3,
      barHeight: 2,
      barRadius: 3,
      responsive: true,
      height: 42,
      plugins: [MicrophonePlugin.create()]
    });
    wavesurfer.current.microphone.on('deviceReady', stream => {
      console.log('Device ready!', stream);
    });
    wavesurfer.current.microphone.on('deviceError', code => {
      console.warn('Device error: ' + code);
    });
    
    wavesurfer.current.microphone.start()
    console.log('Running!!!')

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.microphone.destroy()
  }, []);

  return <div id="waveform" ref={waveformRef}></div>
}

export default MicrophoneWave