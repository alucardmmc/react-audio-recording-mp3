import { Component } from "react"
import MicRecorder from 'mic-recorder-to-mp3'
import './AudioRecorder.css'
import MicrophoneWave from "../MicrophoneWave"
import { hasAudioSupport } from "../../helpers/audioSupport"

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

// ? Using mic-record-to-mp3
class MRTMRecorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      blobUrl: '',
      isBlocked: false,
    }
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied')
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true })
        })
        .catch((e) => console.error(e))
    }
  }

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobUrl = URL.createObjectURL(blob)
        this.setState({ blobUrl, isRecording: false })
        this.props.onSave(blobUrl)

        console.log('Package mic-recorder-to-mp3')
        console.log('Audio Stopped and saved!')
        console.log({ blob })
        console.log({ blobUrl })
      })
      .catch((e) => console.log(e))
  }

  componentDidMount() {
    if (hasAudioSupport()) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log('Permission Granted')
          this.setState({ isBlocked: false })
        })
        .catch(() => {
          console.log('Permission Denied')
          this.setState({ isBlocked: true })
        })
    } else {
      console.log('Device is not compatible!')
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.isRecording ? <MicrophoneWave /> : null}
        <div className="audio-recorder">
          <button 
            className="audio-recorder__button" 
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            Record
          </button>
          <button 
            className="audio-recorder__button audio-recorder__button--red" 
            onClick={this.stop}
            disabled={!this.state.isRecording}
          >
            Stop
          </button>
        </div>
      </div>
    )
  }
}

export default MRTMRecorder