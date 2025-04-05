import './ProgressBar.css'

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="progress-bar__text">{progress.toFixed(2)}%</span>
    </div>
  )
}

export default ProgressBar
