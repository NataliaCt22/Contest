function readRadar(radar) {
    const map = [];
    const rows = radar.split('|');
    for (let row of rows) {
      map.push(row.split(''));
    }
    return map;
  }
  
function findEnemyShip(map) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === '^') {
          return { x: i, y: j }; 
        }
      }
    }
    return null;
  }
  
  function convertToIndices(position) {
    const column = position.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = parseInt(position[1], 10) - 1;
    return { x: row, y: column };
  }
  
  function predictMovement(enemyShip) {
    const nextX = Math.max(enemyShip.x - 1, 0);
    const nextY = enemyShip.y;
    return { x: nextX, y: nextY };
  }
  
  function convertToGridPosition(coordinates) {
    const columnLetter = String.fromCharCode(coordinates.y + 'a'.charCodeAt(0));
    const rowNumber = coordinates.x + 1;
    return `${columnLetter}${rowNumber}`;
  }
  
  function fire(coordinates) {
    const gridPosition = convertToGridPosition(coordinates);
    console.log(`Firing at coordinates: ${gridPosition}`); 
  }
  
  const radar = `a01b01c01d01e01f01g01h01|a02b02c02d02e$2f02g02h02|a03b03c03d03e03f03g03h$3|a04b04c04d04e04f04g04h04|a05b05c05d05e$5f05g^5h05|a06b06c06d06e$6f06g06h06|a07b07c07d07e07f07g07h07|a08b08c08d08e08f#8g08h08`;
  
  const map = readRadar(radar);
  const enemyShip = findEnemyShip(map);
  
  if (enemyShip) {
    const predictedMove = predictMovement(enemyShip);
    fire(predictedMove);
  } else {
    console.log("Enemy ship not found!");
  }
  