const getSpeed = async () => {
    let speed = null;

    while (!speed) {
        try {
            const response = await fetch(`https://makers-challenge.altscore.ai/v1/s1/e1/resources/measurement`, {
                headers: {
                    accept: 'application/json',
                    'API-KEY': '3196fbd3043343228396e962348754f7',
                }
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const body = await response.json();
            const { distance, time } = body;
            console.log(distance, time);

            if (distance.includes(' AU') && time.includes(' hours')) {
                const distanceValue = parseFloat(distance.replace(' AU', ''));
                const timeValue = parseFloat(time.replace(' hours', ''));
                speed = Math.floor(distanceValue / timeValue);
            }
        } catch (error) {
            console.error('Error fetching speed:', error);
        }
    }

    return speed;
};

getSpeed().then(speed => console.log('Speed:', speed));
