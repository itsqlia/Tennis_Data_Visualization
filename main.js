let stageHeight, stageWidth;
let stage;
let colors = {
  "left": "rgba(249, 237, 102, 1)",
  "right": "rgba(138, 227, 227, 1)",
};
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
  drawMatches();
  //drawDuration();
});

function prepareData() {
  
  //F: Wie kann ich auf Monate sortieren lassen?
  cumulateMonths = gmynd.cumulateData(data, "tourney_date");
  //console.log(cumulateMonths);

  //Matches
  groupedByWinner = gmynd.groupData(data, "winner_hand");
  console.log ("Winner");
  console.log (groupedByWinner);

  //Surfaces
  groupedBySurface = gmynd.groupData(data, "surface");
  console.log("Surface");
  console.log(groupedBySurface);

  //Final Winners
  groupedByFinalWinners = gmynd.groupData(finals, "round");
  console.log("Final Winners")
  console.log(groupedByFinalWinners)

};

function drawMatches() {

  //for (i=0; i<data.length; i++){
  data.forEach (player => {

    //Fokus auf die Monate
    let date = player.tourney_date;
    let month = date.toString().charAt(4) + date.toString().charAt(5);
    //console.log (month);
    
    
    const circleGap = 20;
        const r = 20;
        let x = 150;
        let y = 150;
  
        let dot = $('<div></div>');
        dot.addClass("playerLeft");
        dot.addClass("playerRight");
        
        //For-Schleife - Monate + Abfrage: Gewinner & Loser
        
        if (month === "01") {
  
          if (player.winner_hand === "L") {
            color = colors.left
          } else {
            color = colors.right
          }
  
          if (player.loser_hand === "L") {
            stroke = 'playerLeft'
          } else {
            stroke = 'playerRight'
          }
        }
  
        dot.css({
          'height': r,
          'width': r,
          'background-color': 'white',
          'position': 'absolute',
          'left': x,
          'top': y,
          'border-radius': '100%',
        });
  
        $('#stage').append(dot);
      }
    
    )
  //}
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