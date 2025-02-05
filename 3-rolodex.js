const getPerson = async (id) => {
    const person = await fetch(`https://swapi.dev/api/people/${id}`, {
        headers: {
            accept: 'application/json',
        }
    });
    if (!person.ok) {
        return {}
    }
    return await person.json(); 
}

const getPlanet = async (id) => {
    const planet = await fetch(`https://swapi.dev/api/planets/37`, {
        headers: {
            accept: 'application/json',
        }
    });

    if (!planet.ok) {
        return null;
    }

    return await planet.json(); 
}

const getMessage = async (name) => {
    const response = await fetch(`https://makers-challenge.altscore.ai/v1/s1/e3/resources/oracle-rolodex?name=${name}`, {
        headers: {
            accept: 'application/json',
            'API-KEY': '3196fbd3043343228396e962348754f7',
        },
    });
    return await response.json();
}

const oracleRolodex = async () => {
    console.log('...searching...');
    const planets = {};
    let id = 1, person;
    while (true) {
        if (id == 17) {
            id++; 
            continue;
        }
        person = await getPerson(id);
        if (!person || !person.name) break;
        const planetUrl = person.homeworld;
        const planetId = planetUrl.split('/').filter(Boolean).pop();
        const msg = await getMessage(person.name);
        const message = Buffer.from(msg.oracle_notes, 'base64').toString('utf-8');
        if (!planets[planetId]) {
            planets[planetId] = { light: 0, dark: 0, population: 0 };
        }
        if (message.includes('Light Side')) {
            planets[planetId].light++;
        }
        if (message.includes('Dark Side')) {
            planets[planetId].dark++;
        }
        planets[planetId].population++;
        const { light, dark, population } = planets[planetId];
        planets[planetId].ibf = (light - dark) / population;
        id++;
    }
    return planets;
};

oracleRolodex().then(async planets => {
    const planet = Object.entries(planets).filter(([key, value]) => value.ibf === 0 ?? key);
    console.log(await getPlanet(planet))
});

