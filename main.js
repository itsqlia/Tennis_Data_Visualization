let stageHeight, stageWidth;
let stage;
let matchesViewOn = true;
let durationViewOn = false;
let winnersViewOn = false;
let groupedByDate;

$(function () {
  stage = $('#stage');
  stageHeight = stage.height();
  stageWidth = stage.width();
  prepareData();
  drawMatches();
  //drawDuration();
  //drawFinalWinners();

  if (matchesViewOn == true) {
    matchesView();
  }

});

function prepareData() {

  data.forEach(match => {
    let date = match.tourney_date;
    let year = date.toString().charAt(0) + date.toString().charAt(1) + date.toString().charAt(2) + date.toString().charAt(3);
    let month = date.toString().charAt(4) + date.toString().charAt(5);
    //console.log(year, month);
    match.tourneyYear = year;
    match.tourneyMonth = month;
  });

  //Screen: Matches
  groupedByDate = gmynd.groupData(data, ["year", "month"]);
  //console.log ("Winner");
  //console.log (groupedByWinner);

  //Screen: Surfaces
  groupedBySurface = gmynd.groupData(data, "surface");
  //console.log("Surface");
  //console.log(groupedBySurface);

  //Screen: Final Winners
  groupedByFinalWinners = gmynd.groupData(finalMatches, "year");
  console.log("Final Winners");
  console.log(groupedByFinalWinners);
};

function drawMatches(year=2003) {
  let yearData = groupedByDate[year.toString()];
  for (let month in yearData) {
    
    let winnerHand = yearData[month];
    console.log("winnerHand");
    console.log(winnerHand);

    winnerHand.forEach((player, j) => {

      //Fokus auf die Monate+Jahr

      //let tourneyDate = month.concat(year);
      //console.log (tourneyDate);

      const r = 12;
      const circleGap = 5 * r;
      const blockGap = 2 * r;

      const columnNumber = j % 2;
      let blockOffSet = columnNumber >= 12 ? blockGap : 0;
      const x = (3 + columnNumber * r) + blockOffSet;
      const lineNumber = Math.floor(j / 10);
      const blockNumber = Math.floor(lineNumber / 2);
      const y = 1.5 * (blockNumber * blockGap);

      let dot = $('<div></div>');
      dot.addClass("finalWinners");
      let border;

      let color = 'rgba(249, 237, 102, 1)';


      //For-Schleife - Monate + Abfrage: Gewinner & Loser

      if (player.winner_hand === "L" & year === "2003") {
        console.log(player.winner_hand);

        color = 'rgba(249, 237, 102, 1)'
      }
      else if (player.loser_hand === "L" & year === "2003") {
        console.log(player.loser_hand);

        border = '2px solid' + 'rgba(249, 237, 102, 0.5)'
      }


      dot.css({
        'height': r * 2,
        'width': r * 2,
        'background-color': color.finalWinners,
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
      x: stageWidth / 2,
      y: stageWidth / 2
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

function drawFinalWinners() {

  let i = 0;

  for (let key in groupedByFinalWinners) {

    let finalWinners = groupedByFinalWinners[key];

    finalWinners.forEach((player, j) => {

      const rWin = 9;

      let theta = 2.4 * j;
      let spiralRadius = 5 * Math.sqrt(theta) * 2.4;
      let xWin = 160 + Math.cos(theta) * spiralRadius + (i * 190);
      let yOffset = i % 3 * 260; //0-5 bis 6-11
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

//Switch screens

function matchesView() {
  matchesViewOn = true;
  durationViewOn = false;
  winnersViewOn = false;

  drawMatches();

  $('.matches').css({
    'color': "white",
  });

  $('.duration').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.winners').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

}

function winnersView() {
  matchesViewOn = false;
  durationViewOn = false;
  winnersViewOn = true;

  drawFinalWinners();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.duration').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.winners').css({
    'color': "white",
  });

  $('.inner').fadeIn();
}