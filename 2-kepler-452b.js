const getInfo = async () => {
    let info = [];
    const fetchPromises = [];
    for (let page = 1; page <= 35; page++) {
        const promise = fetch(`https://makers-challenge.altscore.ai/v1/s1/e2/resources/stars?page=${page}&sort-by=id&sort-direction=desc`, {
            headers: {
                accept: 'application/json',
                'API-KEY': '3196fbd3043343228396e962348754f7',
            }
        })
        .then((response) => response.json())
        .then((body) => {
            info = [...info, ...body];
        });

        fetchPromises.push(promise);
    }
    await Promise.all(fetchPromises);
    return info;
};

const getAverage = async () => {
    let info = await getInfo();
    return info.reduce((acc, item) => {
        return acc + item.resonance;
    }, 0) / info.length; 
};

getAverage().then((average) => {
    console.log('Average Resonance:', average);
});
