import { useState, useEffect } from 'react'
import './styles.css';

const ProgressBar = ({ setDisabled }) => {
    const [percent, setPercent] = useState(0)

    const updateProgressBar = () => {
        interval = setInterval(() => {
            setPercent(percent + 1)
        }, 20)

        if (percent === 100) {
            clearInterval(interval)
            setDisabled(false)
        }
    }

    useEffect(() => {
        updateProgressBar()

        return () => clearInterval(interval)
    }, [percent])

    return (
        <div className="outer">
            <div className="inner" style={{ width: `${percent}%` }} />
        </div>
    )
}

const App = () => {
    const [progressBars, setProgressBars] = useState([])
    const [disabled, setDisabled] = useState(false)
    let interval;

    return (
        <div>
            <button
                onClick={() => {
                    setDisabled(true)
                    setProgressBars([...progressBars, <ProgressBar setDisabled={setDisabled} />])
                }}
                disabled={disabled}
            >Add</button>
            <div className="progressBars">
                {progressBars.map((progressBar) => progressBar)}
            </div>
        </div>
    );
}

export default App