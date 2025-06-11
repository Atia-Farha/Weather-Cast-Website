export async function onRequest(context) {
    const url = new URL(context.request.url);
    const city = url.searchParams.get("city");
    const date = url.searchParams.get("date");

    if (!city || !date) {
        return new Response("Missing city or date parameter", { status: 400 });
    }

    const apiKey = context.env.WEATHER_API_KEY;
    const astronomyUrl = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city}&date=${date}`;

    try {
    const response = await fetch(astronomyUrl);
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error fetching recipes', { status: 500 });
    }
}