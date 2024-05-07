// Funktion, um Daten von der CoinGecko API zu abfragen und anzuzeigen
async function fetchCoinsData() {
    const searchUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

    try {
        const response = await fetch(searchUrl);
        const coins = await response.json();
        allCoins = coins; // Speichert die abgerufenen Coins in der globalen Variable
        displayCoins(coins); // Zeigt alle Coins an
    } catch (error) {
        console.error('Fehler beim Abrufen der CoinGecko-Daten:', error);
    }
}

// Funktion, um die Coins im DOM anzuzeigen
function displayCoins(coins) {
    const container = document.getElementById('crypto-container');
    container.innerHTML = ''; // Container leeren für neue Inhalte

    // Schleife durch jedes Coin-Objekt im Array
    coins.forEach(coin => {
        // Erstellen der HTML-Elemente für jeden Coin
        const coinDiv = document.createElement('div');
        coinDiv.className = 'coin';

        // Fügen des Coin-Bildes hinzu
        const img = document.createElement('img');
        img.src = coin.image;
        img.alt = coin.name;
        img.width = 50; // Setze die gewünschte Bildgröße
        img.height = 50;

        // Fügen des Namens hinzu
        const name = document.createElement('h2');
        name.textContent = coin.name;

        // Fügen des Preises hinzu
        const price = document.createElement('p');
        price.textContent = `Kurs: $${coin.current_price.toFixed(2)}`;

        // Zusammenbauen der Coin-Div
        coinDiv.appendChild(img);
        coinDiv.appendChild(name);
        coinDiv.appendChild(price);

        // Füge das Coin-Div zum Container hinzu
        container.appendChild(coinDiv);
    });
}

// Funktion zum Filtern und Anzeigen von Coins basierend auf dem eingegebenen Namen
function filterCoinsByName(name) {
    const filteredCoins = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(name.toLowerCase())
    );
    displayCoins(filteredCoins); // Zeigt die gefilterten Coins an
}

// Event-Listener für das Suchfeld hinzufügen
document.getElementById('coin-search').addEventListener('input', (e) => {
    filterCoinsByName(e.target.value);
});

// Starten des API-Aufrufs, um die Daten beim Laden der Seite zu laden
fetchCoinsData();

let allCoins = [];

