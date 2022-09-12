import AudioPlayer from './components/AudioPlayer';
import AudioRecorder from './components/AudioRecorder';
import './App.css';
import { useState } from 'react';

// const audios = [
//   'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
// ]

function App() {
  const [playlist, setPlaylist] = useState([])

  const addAudio = (url) => {
    setPlaylist(current => [...current, url])
  }

  return (
    <div className="App">
      <h1>Testing MP3 Recordings!</h1>
      <section className='recordings'>
        <h2>Recordings</h2>
        {playlist.map((audio) => (
          <AudioPlayer url={audio} key={audio} />
        ))}
      </section>
      <AudioRecorder onSave={addAudio} />
    </div>
  );
}

export default App;
