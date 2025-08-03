import './App.css'
import Timeline from './components/Timeline/Timeline'

import planScheduleData from './data/plan.json'
import factScheduleData from './data/fact.json'

function App() {
    return (
        <div className="App">
            <Timeline plan={planScheduleData} fact={factScheduleData} />
        </div>
    )
}

export default App
