import { Component } from "react"
import vmsg from 'vmsg'
import './AudioRecorder.css'
import MicrophoneWave from "../MicrophoneWave"

const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.4.0/vmsg.wasm'
})

// ? Using vmsg
class VMSGRecorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isRecording: false,
      blobUrl: '',
    }
  }

  start = async () => {
    this.setState({ isLoading: true });

    try {
      await recorder.initAudio();
      await recorder.initWorker();
      recorder.startRecording();
      this.setState({ isLoading: false, isRecording: true });
    } catch (e) {
      console.error(e);
      this.setState({ isLoading: false });
    }
  }

  stop = async () => {
    this.setState({ isLoading: true });

    if (this.state.isRecording) {
      const blob = await recorder.stopRecording();
      const blobUrl = URL.createObjectURL(blob)

      this.setState({
        isLoading: false,
        isRecording: false,
        blobUrl: URL.createObjectURL(blob)
      })
      this.props.onSave(blobUrl)

      console.log('Package VMSG')
      console.log('Audio Stopped and saved!')
      console.log({ blob })
      console.log({ blobUrl })
    } else {
      this.setState({ isLoading: false });
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

export default VMSGRecorder