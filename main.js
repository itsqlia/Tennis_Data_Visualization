let stageHeight, stageWidth;
let stage;
let matchesViewOn = true;
let matchLengthsViewOn = false;
let tourneyWinnersViewOn = false;
let groupedByDate; 
let groupedByFinalWinners;

$(function () {
  stage = $('#stage');
  stageHeight = stage.height();
  stageWidth = stage.width();
  prepareData();
  drawMatches();
  //drawMatchLengths();
  //drawTourneyWinners();

  /*
  if (matchesViewOn == true) {
    matchesView();
  }*/

});

function prepareData() {

  //Function to get month and year separately
  data.forEach(match => {
    let date = match.tourney_date;
    let year = date.toString().charAt(0) + date.toString().charAt(1) + date.toString().charAt(2) + date.toString().charAt(3);
    let month = date.toString().charAt(4) + date.toString().charAt(5);
    //console.log(year, month);
    match.tourneyYear = year;
    match.tourneyMonth = month;
  });

  // -- Screen: Matches (Winner & Loser) ---------------------------------------------------------------------------------------------
  
  groupedByDate = gmynd.groupData(data, ["tourneyYear", "tourneyMonth"]);
  //console.log ("date");
  //console.log (groupedByDate);

  
  // -- Screen: Match Lengths ---------------------------------------------------------------------------------------------

  data = gmynd.filterPropType(data, "minutes", "Number");

  //groupedMatchLengths = gmynd.groupData (data, ["minutes", "surface", "tourneyMonth", "tourneyYear"]);
  //console.log(groupedMatchLengths);

  cumulatedMatchLengths = gmynd.cumulateData(data, ["minutes", "surface", "tourneyMonth", "tourneyYear"]);
  console.log(cumulatedMatchLengths);


  // -- Screen: Tourney Winners ---------------------------------------------------------------------------------------------

  groupedByTourneyWinners = gmynd.groupData(finalMatches, "year");
  //console.log("Tourney Winners");
  //console.log(groupedByTourneyWinners);
};

// ------------------------------------------------------------------------------------------------------------------

function drawMatches(year = 2003) {
  let yearData = groupedByDate[year];
  console.log(yearData);

  for (let month in yearData) {
    // get array of matches for this month
    let matches = yearData[month];
   
    const rMatch = 6;
    const circleGap = rMatch;

    matches.forEach((match, j) => {

      const xMatch = 250 + (parseInt(month) * 30);
      const yMatch = 1080 - (j * 15) - 30;
      const oneMatchPerRow = 2;
      
      let dot = $('<div></div>');
      dot.addClass("matches");
      let border;

      let color = 'rgba(138, 227, 227, 1)';

      if (match.winner_hand === "L") {
        color = 'rgba(249, 237, 102, 1)'
      }
      else if (match.winner_hand === "R") {
        color = 'rgba(138, 227, 227, 1)'
      }
      
      /*
      else if (match.loser_hand === "L") {
        border = '2px solid' + color;
        color = 'rgba(249, 237, 102, 1)'
      }
      else if (match.loser_hand === "R") {
        border = '2px solid' + color;
        color = 'rgba(138, 227, 227, 1)'
      }
      */

      dot.css({
        'height': rMatch * 2,
        'width': rMatch * 2 ,
        'background-color': color,
        'position': 'absolute',
        'left': xMatch,
        'top': yMatch,
        'border-radius': '100%'
      });

      $('#stage').append(dot);
    });
  }
}

function drawMatchLengths () {
  const lengthX = stageWidth / 2;
  const lengthY = stageHeight / 2;

  cumulatedMatchLengths.forEach(matchLengths => {

    let angle = (matchLengths.tourneyMonth - 2003) * 2.9;
    angle = gmynd.radians(angle - 90);
    const rSpiral = 25;

    let xSpiral = (lengthX + (Math.cos(angle)) * ((matchLengths.tourneyMonth - 1896) / 4 + 250) - rSpiral); // cosinus vom winkel
    let ySpiral = (lengthY + (Math.sin(angle)) * ((matchLengths.tourneyMonth - 1896) / 4 + 250) - rSpiral); // sinus vom winkel

    let spiralDot = $('<div></div>');
    spiralDot.addClass("MatchLengths");
    let spiralDotColor;

    spiralDot.css({
      'height': rSpiral * 2,
      'width': rSpiral * 2,
      'left': xSpiral,
      'top': ySpiral,
      'position': 'absolute',
      'border-radius': '100%',
      'background-color': spiralDotColor,
  });
 
  stage.append(spiralDot);


  }



  )};

function drawTourneyWinners() {

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
        'border-radius': '100%'
      });
      stage.append(dot);

    });
    i++;
  }
};


// -- Screen Switches ---------------------------------------------------------------------------------------------

/*
function matchesView() {
  matchesViewOn = true;
  matchLengthsViewOn = false;
  tourneyWinnersViewOn = false;

  drawMatches();

  $('.matches').css({
    'color': "white",
  });

  $('.matchLengths').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.tourneyWinners').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

}

function matchLengthsView() {
  matchesViewOn = false;
  matchLengthsViewOn = true;
  tourneyWinnersViewOn = false;

  drawMatchLengths();

  $('.matches').css({
    'color': "white",
  });

  $('.matchLengths').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.tourneyWinners').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

}

function tourneyWinnersView() {
  matchesViewOn = false;
  matchLengthsViewOn = false;
  tourneyWinnersViewOn = true;

  drawTourneyWinners();


  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.matchLengths').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.tourneyWinners').css({
    'color': "white",
  });

  $('.inner').fadeIn();
};
*/