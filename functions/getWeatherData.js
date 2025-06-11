export async function onRequest(context) {
    const url = new URL(context.request.url);
    const city = url.searchParams.get("city");

    if (!city) {
        return new Response("Missing city parameter", { status: 400 });
    }

    const apiKey = context.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes&alerts=no`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error fetching recipes', { status: 500 });
    }
}