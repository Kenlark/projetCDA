// Fonction pour récupérer et afficher les données météo
const fetchWeather = async () => {
  try {
    // Charger la configuration
    const configResponse = await fetch("./conf.json");
    const config = await configResponse.json();

    const apiKey = config.apiKey;
    const city = config.city;
    const unit = config.unit === "Celsius" ? "metric" : "imperial";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Récupérer les données météo
    const weatherResponse = await fetch(url);
    if (!weatherResponse.ok) {
      throw new Error(`Erreur HTTP : ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();

    // Extraire et afficher les données météo
    const { temp_c, temp_f, condition } = weatherData.current;
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

// Appeler la fonction au chargement de la page
fetchWeather();
setInterval(fetchWeather, 3600000);
