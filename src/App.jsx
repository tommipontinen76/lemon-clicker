import './App.css'
import { useState } from 'react'
import AppRouter from './components/AppRouter'
import items from './config/items.js'
import round from './utils/round'

function App() {
    // Luodaan tilamuuttuja, johon tallennetaan tuotelista.
    const [storeitems,setStoreitems] = useState(items)
    const [stats, setStats] = useState({clicks: 0, balance: 0, increase: 1, itemstobuy: 0})
    const handleClick = () => {
        // Tehdään kopio stats-tilamuuttujasta.
        let newstats = {...stats}
        // Kasvatetaan napautusten lukumäärää yhdellä.
        newstats.clicks = newstats.clicks + 1;
        // Kasvatetaan sitruunoiden määrää kasvatusarvolla.
        newstats.balance = round(newstats.balance + newstats.increase,1)
        // Tallennetaan päivitetty stats-muuttuja.
        setStats(newstats);
    }

    const handlePurchase = (id) => {
        // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
        const index = storeitems.findIndex(storeitem => storeitem.id == id)
        // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
        if (stats.balance >= storeitems[index].price) {
            // Tehdään kopiot tilamuuttujista.
            let newstoreitems = [...storeitems]
            let newstats = {...stats}
            // Kasvatetaan tuotteiden määrää yhdellä.
            newstoreitems[index].qty++
            // Vähännetään varoista tuotteen hinta.
            newstats.balance = round(newstats.balance - newstoreitems[index].price,1)
            // Lasketaan tuotteen uusi hinta.
            newstoreitems[index].price =
                Math.floor(newstoreitems[index].baseprice * Math.pow(1.15,newstoreitems[index].qty))
            // Koostemuuttujien esittely.
            let increase = 1
            let upgrades = 0
            // Käydään kaupan tuotteet yksitellen lävitse.
            for (let i=0; i<newstoreitems.length; i++) {
                // Lisätään tuotteiden määrä kokonaismäärään.
                upgrades = upgrades + newstoreitems[i].qty
                // Lisätään tuotteen vaikutus kasvatusarvoon.
                increase = increase + newstoreitems[i].multiplier*newstoreitems[i].qty
            }
            // Tallennetaan lasketut koostearvot.
            newstats.increase = round(increase,1)
            newstats.upgrades = upgrades
            // Tallennetaan uudet tilamuuttujien arviot.
            setStoreitems(newstoreitems)
            setStats(newstats)
        }
    }


    return (
        <AppRouter stats={stats}
                   storeitems={storeitems}
                   handleClick={handleClick}
                   handlePurchase={handlePurchase} />
    )



}

export default App