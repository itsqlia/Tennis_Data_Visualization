let stageHeight, stageWidth;
let stage;
const surfColors = {
  "Hard": "rgba(121, 209, 209, 100)",
  "Clay": "rgba(212, 95, 16, 100)",
  "Carpet": "rgba(40, 86, 179, 100)",
  "Grass": "rgba(171, 225, 132, 100)"
};

$(function () {
  stage = $('#stage');
  stageHeight = stage.height();
  stageWidth = stage.width();
  prepareData();
  //drawMatches();
  //drawDuration();
  drawFinalWinners();
});

function prepareData() {
  
  //F: Wie kann ich auf Monate sortieren lassen? 1 Spalte = 1 Monat
  cumulateMonths = gmynd.cumulateData(data, "tourney_date");
  //console.log(cumulateMonths);

  //Matches
  groupedByWinner = gmynd.groupData(data, "winner_hand");
  //console.log ("Winner");
  //console.log (groupedByWinner);

  //Surfaces
  groupedBySurface = gmynd.groupData(data, "surface");
  //console.log("Surface");
  //console.log(groupedBySurface);

  //Final Winners
  groupedByFinalWinners = gmynd.groupData(finalMatches, "year");
  console.log("Final Winners");
  console.log(groupedByFinalWinners);

};

function drawMatches() {

  for (let key in groupedByWinner) {

    let winnerHand = groupedByWinner[key];
    console.log("winnerHand");
    console.log(winnerHand);

    winnerHand.forEach((player,j) => {

    //Fokus auf die Monate+Jahr
    let date = player.tourney_date;
    let year = date.toString().charAt(0) + date.toString().charAt(1) + date.toString().charAt(2) + date.toString().charAt(3);
    let month = date.toString().charAt(4) + date.toString().charAt(5);
    let tourneyDate = month.concat(year);
    //console.log (tourneyDate);

        const r = 12;
        const circleGap = r;
        const blockGap = 3 * r;

        const columnNumber = j % 12;
        let blockOffSet = columnNumber >= 12 ? blockGap : 0;
        const x = (3 + columnNumber * r) + blockOffSet;
        const lineNumber = Math.floor (j/10);
        const blockNumber = Math.floor (lineNumber/5);
        const y = (lineNumber * 3 * r) + (blockNumber * blockGap);
  
        let dot = $('<div></div>');
        dot.addClass("finalWinners");
        let border;
        
        let color = 'rgba(249, 237, 102, 1)';

        
        //For-Schleife - Monate + Abfrage: Gewinner & Loser
    
          if (player.winner_hand === "L") {
            color = 'rgba(249, 237, 102, 1)'
          }
        
  
        dot.css({
          'height': r * 2,
          'width': r * 2,
          'background-color': 'white',
          'position': 'absolute',
          'left': x,
          'top': y,
          'border-radius': '100%',
        });
  
        $('#stage').append(dot);
      }
    
    )
  }
};

function drawDuration() {
  data.forEach(surface => {
  const dotRadius = 10;
  const radiusPerRing = 10;
  const centerPoint = {
    x : stageWidth / 2,
    y : stageWidth / 2
  }

  let dot = $('<div></div>');
  dot.addClass("surface");
  surfColors;

  if (surface === "Hard") {
    color = surfColors.Hard;
  }
  else if (surface === "Carpet") {
    color = surfColors.Carpet;
  }
  else if (surface === "Clay") {
    color = surfColors.Clay;
  }
  else if (surface === "Grass") {
    color = surfColors.Grass;
  }

  dot.css({
    'background-color': color,
    'height': dotRadius * 2,
    'width': dotRadius * 2,
    'left': 50,
    'top': 50,
  });
  $('#stage').append(dot);
  })
};

function drawFinalWinners(){

  let i = 0;

  for (let key in groupedByFinalWinners) {

    let finalWinners = groupedByFinalWinners[key];

    finalWinners.forEach((player, j) => {

      const rWin = 10;

      let theta = 2.4 * j;
      let spiralRadius = 6 * Math.sqrt(theta) * 2;
      let xWin = 160 + Math.cos(theta) * spiralRadius + (i * 200);
      let yOffset = i % 2 * 390;
      let yWin = 320 + Math.sin(theta) * spiralRadius + yOffset;

      let dot = $('<div></div>');
      dot.addClass("finalWinners");
      let color = 'rgba(138, 227, 227, 1)';

      if (player.winner_hand === "L") {
        color = 'rgba(249, 237, 102, 1)';
      }

      dot.css({
        'background-color': color,
        'height': rWin * 2,
        'width': rWin * 2,
        'left': xWin,
        'top': yWin,
      });
      stage.append(dot);

    });
    i++;
  }
};