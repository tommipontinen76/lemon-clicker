const getPurchasableItems = (items) => {
    // Taulukko, johon ostettavissa olevat tuotteet kootaan.
    let purchasableItems = []
    // Lähtökohtaisesti kaikkia ostettavia tuotteita ei ole listattu.
    let allItemsListed = false
    // Käydään tuotteet yksitellen lävitse.
    items.forEach(item => {
        // Tarkista, onko ostettavat tuotteet listattu. Jos on, niin
        // hypätään tuote ylitse.
        if (!allItemsListed) {
            // Ei ole listattu, lisätään tuote listaan.
            purchasableItems.push(item)
            // Jos lisätyn tuotteen määrä on nolla, niin ei listata
            // enempää tuotteita.
            if (item.qty == 0) {
                allItemsListed = true
            }
        }
    })
    // Palautetaan koostettu taulukko.
    return purchasableItems
}

export default getPurchasableItems
