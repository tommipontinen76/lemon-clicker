import './App.css'
import Lemon from './components/Lemon'
import Balance from './components/Balance'
import Booster from './components/Booster'
import Header from './components/Header'
import { useState } from 'react'


function App() {
    const [clicks, setClicks] = useState(0)
    const handleClick = () => {
        // Kasvatetaan napautusten määrää yhdellä.
        setClicks(clicks + 1)
    }


    return (
        <>
            <div>
                <Header>lemon clicker</Header>
                <Lemon onClick={handleClick} />
                <Balance total={clicks} />
                <Lemon />
                <Booster value="3.2" />
            </div>
        </>
    )
}

export default App