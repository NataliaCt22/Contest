"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const damageCodes = {
    "navigation": "NAV-01",
    "communications": "COM-02",
    "life_support": "LIFE-03",
    "engines": "ENG-04",
    "deflector_shield": "SHLD-05"
};
app.get('/status', (req, res) => {
    const systems = Object.keys(damageCodes);
    const damagedSystem = systems[Math.floor(Math.random() * systems.length)];
    res.json({ damaged_system: damagedSystem });
});
app.get('/repairbay', (req, res) => {
    const damagedSystem = req.query.system;
    if (!damagedSystem) {
        res.status(400).send('No system specified');
    }
    const repairCodes = {
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
app.post('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot");
});
app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
