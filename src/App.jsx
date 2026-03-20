import './App.css'
import { useState } from 'react'
import AppRouter from './components/AppRouter'
import items from './config/items.js'
import round from './utils/round'
import getPurchasableItems from './utils/getPurchasableItems'

function App() {
    // Esitellään pelin laskennalliset alkuarvot.
    const initialstats = {
        clicks: 0,
        balance: 0,
        increase: 1,
        itemstobuy: 0,
        upgrades: 0,
        collected: 0
    }

    // Luodaan tilamuuttuja, johon tallennetaan pelin laskennalliset tiedot.
    const [stats, setStats] = useState(initialstats)

    // Luodaan tilamuuttuja kaupan tuotteille.
    const [storeitems, setStoreitems] = useState(items)

    // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
    const countBuyableItems = (items, balance) => {
        let total = 0
        getPurchasableItems(items).forEach(item => {
            if (item.price <= balance) total++
        })
        return total
    }

    const handleClick = () => {
        // Tehdään kopio stats-tilamuuttujasta.
        let newstats = {...stats}
        // Kasvatetaan napautusten lukumäärää yhdellä.
        newstats.clicks = newstats.clicks + 1;
        // Kasvatetaan sitruunoiden määrää kasvatusarvolla.
        newstats.balance = round(newstats.balance + newstats.increase,1)
        // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
        newstats.itemstobuy = countBuyableItems(storeitems,newstats.balance)
        // Kasvatetaan kerättyjen sitruunoiden kokonausmäärää.
        newstats.collected = round(newstats.collected + newstats.increase,1)
        // Tallennetaan päivitetty stats-muuttuja.
        setStats(newstats);
    }

    const handlePurchase = (id) => {
        // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
        const index = storeitems.findIndex(storeitem => storeitem.id == id)
        // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
        if (stats.balance >= storeitems[index].price) {
            // Tehdään kopiot tilamuuttujista.
            // Tehdään kopiot tilamuuttujista.
            let newstoreitems = JSON.parse(JSON.stringify(storeitems))
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
            // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
            newstats.itemstobuy = countBuyableItems(newstoreitems,newstats.balance)
            // Tallennetaan uudet tilamuuttujien arviot.
            setStoreitems(newstoreitems)
            setStats(newstats)
        }
    }

    const handleReset = () => {
        // Päivitetään tilamuuttujat alkuarvoihin.
        setStats(initialstats)
        setStoreitems(items)
    }

    return (
        <AppRouter stats={stats}
                   storeitems={storeitems}
                   handleClick={handleClick}
                   handlePurchase={handlePurchase}
                   handleReset={handleReset} />
    )



}

export default App