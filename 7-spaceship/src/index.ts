import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

const damageCodes: Record<string, string> = {
  "navigation": "NAV-01",
  "communications": "COM-02",
  "life_support": "LIFE-03",
  "engines": "ENG-04",
  "deflector_shield": "SHLD-05"
};

app.get('/status', (req: Request, res: Response) => {
  const systems = Object.keys(damageCodes);
  const damagedSystem = systems[Math.floor(Math.random() * systems.length)];
  res.json({ damaged_system: damagedSystem });
});

app.get('/repairbay', (req: Request, res: Response): void => {
  const damagedSystem = req.query.system as string;

  if (!damagedSystem) {
    res.status(400).send('No system specified');
  }

  const repairCodes: Record<string, string> = {
    "navigation": "NAV-01",
    "communications": "COM-02",
    "life_support": "LIFE-03",
    "engines": "ENG-04",
    "deflector_shield": "SHLD-05"
  };

  const repairCode = repairCodes[damagedSystem];

  if (!repairCode) {
    res.status(400).send('Invalid system');
  }

  // Retornar la página HTML con el código único
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Repair</title>
    </head>
    <body>
        <div class="anchor-point">${repairCode}</div>
    </body>
    </html>
  `);
});

app.post('/teapot', (req: Request, res: Response) => {
  res.status(418).send("I'm a teapot");
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
