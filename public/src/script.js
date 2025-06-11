const cityInput = document.getElementById('cityInput');
const btn = document.getElementById('btn');
const weatherInfo = document.getElementById('weatherInfo');
const astronomyInfo = document.getElementById('astronomyInfo');
const err_weather = document.getElementById('error_weather');
const err_astronomy = document.getElementById('error_astronomy');

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    cityInput.value = '';

    document.documentElement.style.setProperty('--primary-color', '#e7eff3');
    document.documentElement.style.setProperty('--secondary-color', 'white');
    document.documentElement.style.setProperty('--text-color', black);

    err_weather.textContent = '';
    err_astronomy.textContent = '';
    document.getElementById('city').textContent = '_ _ ';
    document.getElementById('country').textContent = '_ _';
    document.getElementById('lat').textContent = '_ _';
    document.getElementById('lon').textContent = '_ _';
    document.getElementById('time').textContent = '_ _ - _ _ - _ _';
    document.getElementById('icon').src = '';
    document.getElementById('icon').style.width = '';
    document.getElementById('icon').style.height = '';
    document.getElementById('icon').alt = '';
    document.getElementById('condition').textContent = '_ _';
    document.getElementById('temp').textContent = '_ _';
    document.getElementById('feels_like').textContent = '_ _';
    document.getElementById('pressure').textContent = '_ _';
    document.getElementById('humidity').textContent = '_ _';
    document.getElementById('heat').textContent = '_ _';
    document.getElementById('cloud').textContent = '_ _';
    document.getElementById('precip').textContent = '_ _';
    document.getElementById('visibility').textContent = '_ _';
    document.getElementById('dewpoint').textContent = '_ _';
    document.getElementById('uv').textContent = '_ _';
    document.getElementById('wind_dir').textContent = '_ _';
    document.getElementById('wind_degree').textContent = ' _ _';
    document.getElementById('wind_chill').textContent = '_ _';
    document.getElementById('wind_speed').textContent = '_ _';
    document.getElementById('wind_gust').textContent = '_ _';
    document.getElementById('us_epa_index').textContent = '_ _';
    document.getElementById('gb_defra_index').textContent = '_ _';
    document.getElementById('co').textContent = '_ _';
    document.getElementById('no2').textContent = '_ _';
    document.getElementById('o3').textContent = '_ _';
    document.getElementById('so2').textContent = '_ _';
    document.getElementById('pm10').textContent = '_ _';
    document.getElementById('pm2_5').textContent = '_ _';
    document.getElementById('day1').textContent = '_ _ - _ _ - _ _';
    document.getElementById('icon1').src = '';
    document.getElementById('icon1').style.width = '';
    document.getElementById('icon1').style.height = '';
    document.getElementById('icon1').alt = '';
    document.getElementById('condition1').textContent = '_ _';
    document.getElementById('temp1').textContent = '_ _';
    document.getElementById('humidity1').textContent = '_ _';
    document.getElementById('uv1').textContent = '_ _';
    document.getElementById('day2').textContent = '_ _ - _ _ - _ _';
    document.getElementById('icon2').src = '';
    document.getElementById('icon2').style.width = '';
    document.getElementById('icon2').style.height = '';
    document.getElementById('icon2').alt = '';
    document.getElementById('condition2').textContent = '_ _';
    document.getElementById('temp2').textContent = '_ _';
    document.getElementById('humidity2').textContent = '_ _';
    document.getElementById('uv2').textContent = '_ _';
    document.getElementById('day3').textContent = '_ _ - _ _ - _ _';
    document.getElementById('icon3').src = '';
    document.getElementById('icon3').style.width = '';
    document.getElementById('icon3').style.height = '';
    document.getElementById('icon3').alt = '';
    document.getElementById('condition3').textContent = '_ _';
    document.getElementById('temp3').textContent = '_ _';
    document.getElementById('humidity3').textContent = '_ _';
    document.getElementById('uv3').textContent = '_ _';

    document.getElementById('sunrise').textContent = '_ _';
    document.getElementById('sunset').textContent = '_ _';
    document.getElementById('moonrise').textContent = '_ _';
    document.getElementById('moonset').textContent = '_ _';
    document.getElementById('moon_phase').textContent = '_ _';
    document.getElementById('moon_illumination').textContent = '_ _';
    document.getElementById('is_moon_up').textContent = '_ _';
    document.getElementById('is_sun_up').textContent = '_ _';

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    weatherDetail(city);
    astronomyDetail(city, formattedDate);
});

function weatherDetail(city) {
    const apiUrl = `/getWeatherData?city=${encodeURIComponent(city)}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Error fetching data.');
            }
        })
        .then(data => {
            // General Section

            const is_day = data.current.is_day;
            document.documentElement.style.setProperty('--primary-color', (is_day) ? 'rgb(153, 204, 223)' : 'rgb(0, 24, 65)');
            document.documentElement.style.setProperty('--secondary-color', (is_day) ? 'rgb(171, 213, 228)' : 'rgb(6, 39, 95)');
            document.documentElement.style.setProperty('--text-color', (is_day) ? 'rgba(0, 0, 0, 0.8)' : 'rgb(220, 233, 255)');

            const city_name = data.location.name;
            document.getElementById('city').textContent = city_name;

            const country = data.location.country;
            document.getElementById('country').textContent = country;

            const latitude = data.location.lat;
            document.getElementById('lat').textContent = latitude;

            const longitude = data.location.lon;
            document.getElementById('lon').textContent = longitude;

            const time = data.location.localtime;
            document.getElementById('time').textContent = time;

            // Current Weather Section

            const icon = data.current.condition.icon;
            document.getElementById('icon').src = `https:${icon}`;
            document.getElementById('icon').style.width = '150px';
            document.getElementById('icon').style.height = '150px';

            const condition = data.current.condition.text;
            document.getElementById('icon').alt = condition;
            document.getElementById('condition').textContent = condition;

            const temp = data.current.temp_c;
            document.getElementById('temp').textContent = temp;

            const feels_like = data.current.feelslike_c;
            document.getElementById('feels_like').textContent = feels_like;

            const pressure = (data.current.pressure_mb * 0.1).toFixed(2);
            document.getElementById('pressure').textContent = pressure;

            const humidity = data.current.humidity;
            document.getElementById('humidity').textContent = humidity;

            const heat = data.current.heatindex_c;
            document.getElementById('heat').textContent = heat;

            const cloud = data.current.cloud;
            document.getElementById('cloud').textContent = cloud;

            const precip = data.current.precip_mm;
            document.getElementById('precip').textContent = precip;

            const visibility = data.current.vis_km;
            document.getElementById('visibility').textContent = visibility;

            const dewpoint = data.current.dewpoint_c;
            document.getElementById('dewpoint').textContent = dewpoint;

            const uv = data.current.uv;
            document.getElementById('uv').textContent = uv;

            // Wind Section

            const wind_dir = data.current.wind_dir;
            document.getElementById('wind_dir').textContent = wind_dir;

            const wind_degree = data.current.wind_degree;
            document.getElementById('wind_degree').textContent = wind_degree;

            const wind_chill = data.current.windchill_c;
            document.getElementById('wind_chill').textContent = wind_chill;

            const wind_speed = data.current.wind_kph;
            document.getElementById('wind_speed').textContent = wind_speed;

            const wind_gust = data.current.gust_kph;
            document.getElementById('wind_gust').textContent = wind_gust;

            // Air Quality Section

            const us_epa_index = data.current.air_quality['us-epa-index'];
            if (us_epa_index == 1) {
                document.getElementById('us_epa_index').textContent = '1 (Good)';
            }
            else if (us_epa_index == 2) {
                document.getElementById('us_epa_index').textContent = '2 (Moderate)';
            }
            else if (us_epa_index == 3) {
                document.getElementById('us_epa_index').textContent = '3 (Unhealthy for Sensitive Groups)';
            }
            else if (us_epa_index == 4) {
                document.getElementById('us_epa_index').textContent = '4 (Unhealthy)';
            }
            else if (us_epa_index == 5) {
                document.getElementById('us_epa_index').textContent = '5 (Very Unhealthy)';
            }
            else if (us_epa_index == 6) {
                document.getElementById('us_epa_index').textContent = '6 (Hazardous)';
            }
            else {
                document.getElementById('us_epa_index').textContent = 'Unknown';
            }

            const gb_defra_index = data.current.air_quality['gb-defra-index'];
            if (gb_defra_index >= 1 && gb_defra_index <= 3) {
                document.getElementById('gb_defra_index').textContent = gb_defra_index + ' (Good)';
            }
            else if (gb_defra_index >= 4 && gb_defra_index <= 6) {
                document.getElementById('gb_defra_index').textContent = gb_defra_index + ' (Moderate)';
            }
            else if (gb_defra_index >= 7 && gb_defra_index <= 9) {
                document.getElementById('gb_defra_index').textContent = gb_defra_index + ' (Unhealthy)';
            }
            else if (gb_defra_index >= 10) {
                document.getElementById('gb_defra_index').textContent = gb_defra_index + ' (Very Unhealthy)';
            }
            else {
                document.getElementById('gb_defra_index').textContent = 'Unknown';
            }

            const co = data.current.air_quality.co;
            document.getElementById('co').textContent = co;

            const no2 = data.current.air_quality.no2;
            document.getElementById('no2').textContent = no2;

            const o3 = data.current.air_quality.o3;
            document.getElementById('o3').textContent = o3;

            const so2 = data.current.air_quality.so2;
            document.getElementById('so2').textContent = so2;

            const pm10 = data.current.air_quality.pm10;
            document.getElementById('pm10').textContent = pm10;

            const pm2_5 = data.current.air_quality.pm2_5;
            document.getElementById('pm2_5').textContent = pm2_5;

            // Forecast Section

            // Day 1 forecast
            const day1 = data.forecast.forecastday[0].date;
            document.getElementById('day1').textContent = day1;

            const icon1 = data.forecast.forecastday[0].day.condition.icon;
            document.getElementById('icon1').src = `https:${icon1}`;
            document.getElementById('icon1').style.width = '150px';
            document.getElementById('icon1').style.height = '150px';

            const condition1 = data.forecast.forecastday[0].day.condition.text;
            document.getElementById('condition1').textContent = condition1;
            document.getElementById('icon1').alt = condition1;

            const temp1 = data.forecast.forecastday[0].day.avgtemp_c;
            document.getElementById('temp1').textContent = temp1;

            const humidity1 = data.forecast.forecastday[0].day.avghumidity;
            document.getElementById('humidity1').textContent = humidity1;

            const uv1 = data.forecast.forecastday[0].day.uv;
            document.getElementById('uv1').textContent = uv1;

            // Day 2 forecast
            const day2 = data.forecast.forecastday[1].date;
            document.getElementById('day2').textContent = day2;

            const icon2 = data.forecast.forecastday[1].day.condition.icon;
            document.getElementById('icon2').src = `https:${icon2}`;
            document.getElementById('icon2').style.width = '150px';
            document.getElementById('icon2').style.height = '150px';

            const condition2 = data.forecast.forecastday[1].day.condition.text;
            document.getElementById('condition2').textContent = condition2;
            document.getElementById('icon2').alt = condition2;

            const temp2 = data.forecast.forecastday[1].day.avgtemp_c;
            document.getElementById('temp2').textContent = temp2;

            const humidity2 = data.forecast.forecastday[1].day.avghumidity;
            document.getElementById('humidity2').textContent = humidity2;

            const uv2 = data.forecast.forecastday[1].day.uv;
            document.getElementById('uv2').textContent = uv2;

            // Day 3 forecast
            const day3 = data.forecast.forecastday[2].date;
            document.getElementById('day3').textContent = day3;

            const icon3 = data.forecast.forecastday[2].day.condition.icon;
            document.getElementById('icon3').src = `https:${icon3}`;
            document.getElementById('icon3').style.width = '150px';
            document.getElementById('icon3').style.height = '150px';

            const condition3 = data.forecast.forecastday[2].day.condition.text;
            document.getElementById('condition3').textContent = condition3;
            document.getElementById('icon3').alt = condition3;

            const temp3 = data.forecast.forecastday[2].day.avgtemp_c;
            document.getElementById('temp3').textContent = temp3;

            const humidity3 = data.forecast.forecastday[2].day.avghumidity;
            document.getElementById('humidity3').textContent = humidity3;

            const uv3 = data.forecast.forecastday[2].day.uv;
            document.getElementById('uv3').textContent = uv3;
        })
        .catch(error => {
            err_weather.textContent = `${error} Your searched city isn't found.`;
        });
}

function astronomyDetail(city, date) {
    const apiUrl = `/getAstronomyData?city=${encodeURIComponent(city)}&date=${date}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Error fetching data.');
            }
        })
        .then(data => {
            const sunrise = data.astronomy.astro.sunrise;
            document.getElementById('sunrise').textContent = sunrise;

            const sunset = data.astronomy.astro.sunset;
            document.getElementById('sunset').textContent = sunset;

            const moonrise = data.astronomy.astro.moonrise;
            document.getElementById('moonrise').textContent = moonrise;

            const moonset = data.astronomy.astro.moonset;
            document.getElementById('moonset').textContent = moonset;

            const moon_phase = data.astronomy.astro.moon_phase;
            document.getElementById('moon_phase').textContent = moon_phase;

            const moon_illumination = data.astronomy.astro.moon_illumination;
            document.getElementById('moon_illumination').textContent = moon_illumination;

            const is_moon_up = data.astronomy.astro.is_moon_up;
            document.getElementById('is_moon_up').textContent = (is_moon_up) ? 'Yes' : 'No';

            const is_sun_up = data.astronomy.astro.is_sun_up;
            document.getElementById('is_sun_up').textContent = (is_sun_up) ? 'Yes' : 'No';
        })
        .catch(error => {
            err_astronomy.textContent = `${error} Astronomy information couldn't be fetched.`;
        });
}