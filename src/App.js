import AudioPlayer from './components/AudioPlayer'
// import MRTMRecorder from './components/recorder/MRTMRecorder'
import VMSGRecorder from './components/recorder/VMSGRecorder'
import './App.css'
import { useState } from 'react'

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
          <div className='recordings__item' key={audio}>
            <audio controls>
              <source src={audio} type="audio/mpeg" />
            </audio>
            <AudioPlayer url={audio} />
          </div>  
        ))}
      </section>
      <VMSGRecorder onSave={addAudio} />
    </div>
  );
}

export default App;
