import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import { formWaveSurferOptions } from "../helpers/waveOptions"
import './AudioPlayer.css'

const AudioPlayer = ({ url }) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setIsPlaying(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  return (
    <div className='audio-player'>
      <div id="waveform" ref={waveformRef}></div>
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Stop' : 'Play'}</button>
      </div>
    </div>
  )
}

export default AudioPlayer