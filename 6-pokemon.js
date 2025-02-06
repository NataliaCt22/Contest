const getPokemon = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const { height, types } = await response.json();
    return { types, height };
}

const getPokemons = async (url = `https://pokeapi.co/api/v2/pokemon/`) => { 
    const heights = {};
    const fetchPromises = [];

    while (url) {
        console.log(url)
        const response = await fetch(url);
        const body = await response.json();

        if (!body.results) {
            break;
        }

        for (const result of body.results) {
            const pokemonPromise = getPokemon(result.url).then(pokemon => {
                pokemon.types.forEach(({ type }) => {
                    if (!heights[type.name]) {
                        heights[type.name] = { height: 0, amount: 0, avg: 0 };
                    }
                    heights[type.name].amount++;
                    heights[type.name].height += pokemon.height;
                    heights[type.name].avg = (heights[type.name].height / heights[type.name].amount).toFixed(3);
                });
            });
            fetchPromises.push(pokemonPromise);
        }

        url = body.next;
    }

    await Promise.all(fetchPromises);

    return Object.entries(heights)
    .filter(([key, value]) => value.avg > 0)
    .reduce((acc, [key, value]) => {
        acc[key] = value.avg;
        return acc;
    }, {});

}

getPokemons().then((heights) => {
    console.log(heights);
}).catch((error) => {
    console.error('Error fetching data:', error);
});
