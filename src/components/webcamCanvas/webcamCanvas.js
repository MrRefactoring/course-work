import { authenticationActions as actions } from 'pages/authentication/authenticationActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { staticURL } from 'api';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './webcamCanvas.less';

const inputSize = 320;
const scoreThreshold = 0.5;

class WebcamCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.videoConstraints = {
      facingMode: 'user',
      width: 440,
      height: 500
    };

    this.detectionOptions = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });

    this.timeoutSetted = false;

    this.state = {
      video: undefined
    };
  }

  componentDidMount() {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(`${staticURL}/ssd_mobilenetv1`),
      faceapi.nets.tinyFaceDetector.loadFromUri(`${staticURL}/tiny_face_detector`),
      faceapi.nets.faceRecognitionNet.loadFromUri(`${staticURL}/face_recognition`),
      faceapi.nets.faceLandmark68Net.loadFromUri(`${staticURL}/face_landmark_68`),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(`${staticURL}/face_landmark_68_tiny`)
    ]).then(() => {
      this.setState({
        video: document.querySelector('video')
      }, () => {
        this.state.video.addEventListener('play', this.renderCanvas);
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.opened && this.props.opened) {
      this.setState({
        video: document.querySelector('video')
      }, () => {
        this.state.video.addEventListener('play', this.renderCanvas);
      });
    }
  }

  renderCanvas = () => {
    const canvas = document.querySelector('#canvas');

    if (!canvas) return;

    const context = canvas.getContext('2d');

    canvas.width = this.videoConstraints.width;
    canvas.height = this.videoConstraints.height;

    this.drawCanvas(this.state.video, context, canvas);
  }

  drawCanvas = async (video, context, canvas) => {
    if (video.paused || video.ended) return;

    const { width, height } = this.videoConstraints;

    const result = await faceapi.detectSingleFace(video, this.detectionOptions);

    context.drawImage(video,
      0,
      0,
      width,
      height
    );

    if (result) {
      if (!this.props.loader) {
        this.props.signInByFace({ photo: canvas.toDataURL() });
      }

      faceapi.drawDetection(canvas, result, { withScore: false, boxColor: 'orange' });
    }

    setTimeout(this.drawCanvas, 20, video, context, canvas);
  }

  render() {
    const {
      opened,
      loader,
      resetError,
      errorMessage
    } = this.props;

    if (errorMessage && !this.timeoutSetted) {
      setTimeout(() => { resetError(); }, 2000);
      this.timeoutSetted = true;
    } else if (!errorMessage) {
      this.timeoutSetted = false;
    }

    if (!opened) return null;

    return (
      <div className='canvas container'>
        <Webcam
          width={0}
          height={0}
          audio={false}
          screenshotFormat='image/jpeg'
          videoConstraints={this.videoConstraints}
        />
        <div className={`status bar ${loader || errorMessage ? 'open' : ''} ${errorMessage ? 'error' : ''}`}>
          {
            (loader && !errorMessage)
            && <span>Идет распознование лица...</span>
          }
          {
            errorMessage
            && <span>{errorMessage}</span>
          }
        </div>
        <canvas id='canvas'/>
      </div>
    );
  }
}

const stateToProps = state => ({
  loader: state.authentication.loader,
  errorMessage: state.authentication.errorMessage
});

export default connect(stateToProps, actions)(WebcamCanvas);

WebcamCanvas.propTypes = {
  signInByFace: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};
