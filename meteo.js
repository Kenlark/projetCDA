// Fonction principale pour récupérer et afficher les données météo
const fetchWeather = async () => {
  try {
    // Charger la configuration
    const configResponse = await fetch("./conf.json");
    const config = await configResponse.json();

    const apiKey = "333ab70688174bc7b62213951251101";
    const city = config.city;
    const unit = config.unit === "Celsius" ? "metric" : "imperial";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Récupérer les données météo
    const weatherResponse = await fetch(url);
    if (!weatherResponse.ok) {
      throw new Error(`Erreur HTTP : ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();

    // Extraire les données
    const { temp_c, temp_f, condition } = weatherData.current;

    // Afficher les données
    document.getElementById("weather").innerHTML = `
      <p>Ville : ${city}</p>
      <p>Température : ${unit === "metric" ? `${temp_c}°C` : `${temp_f}°F`}</p>
      <p>Condition : ${condition.text}</p>
    `;
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo :", error);
    document.getElementById("weather").textContent =
      "Erreur lors du chargement.";
  }
};

// Appeler la fonction
fetchWeather();
// Mettre à jour toutes les heures (3600000 ms)
setInterval(fetchWeather, 3600000);
