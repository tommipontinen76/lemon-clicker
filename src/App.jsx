import './App.css'
import { useState } from 'react'
import AppRouter from './components/AppRouter'
import items from './config/items.js'



function App() {
    // Luodaan tilamuuttuja, johon tallennetaan tuotelista.
    const [storeitems,setStoreitems] = useState(items)
    const [stats, setStats] = useState({clicks: 0, balance: 0, increase: 1, itemstobuy: 0})
    const handleClick = () => {
        // Tehdään kopio stats-tilamuuttujasta.
        let newstats = {...stats}
        // Kasvatetaan napautusten lukumäärää yhdellä.
        newstats.clicks = newstats.clicks + 1;
        // Tallennetaan päivitetty stats-muuttuja.
        setStats(newstats);
        // Kasvatetaan sitruunoiden määrää kasvatusarvolla.
        newstats.balance = newstats.balance + newstats.increase
    }


    return (
        <AppRouter stats={stats}
                   storeitems={storeitems}
                   handleClick={handleClick} />
    )



}

export default App