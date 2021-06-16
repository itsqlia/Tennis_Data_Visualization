let stageHeight, stageWidth;
let stage;
let body = $('body');
let groupedByDate; 
let groupedByFinalWinners;

let showMatches; 
showMatches = true;

let showLengths;
showLengths = false;

let showWinners; 
showWinners = false;


$(function () {
  stage = $('#stage');
  stageHeight = stage.height();
  stageWidth = stage.width();
  prepareData();
  drawMatches();
  drawLengths();
  drawWinners();
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

  // -- Screen: Matches ---------------------------------------------------------------------------------------------
  
  groupedByDate = gmynd.groupData(data, ["tourneyYear", "tourneyMonth"]);
  //console.log ("date");
  //console.log (groupedByDate);

  
  // -- Screen: Match Lengths ---------------------------------------------------------------------------------------------

  data = gmynd.filterPropType(data, "minutes", "Number");

  //groupedMatchLengths = gmynd.groupData (data, ["minutes", "surface", "tourneyMonth", "tourneyYear"]);
  //console.log(groupedMatchLengths);

  cumulatedLengths = gmynd.cumulateData(data, ["minutes", "surface", "tourneyMonth", "tourneyYear"]);
  //console.log(cumulatedLengths);


  // -- Screen: Tourney Winners ---------------------------------------------------------------------------------------------

  groupedByTourneyWinners = gmynd.groupData(finalMatches, "year");
  //console.log("Tourney Winners");
  //console.log(groupedByTourneyWinners);
};

// --- Screen 1 -------------------------------------------------------------------------------------------------------------

function drawMatches(year = 2003) {
  showMatches = true;
  $('.all').hide();
  $('.hard').hide();
  $('.clay').hide();
  $('.grass').hide();
  $('.carpet').hide();

  $('.year03').hide();
  $('.year04').hide();
  $('.year05').hide();
  $('.year06').hide();
  $('.year07').hide();
  $('.year08').hide();
  $('.year09').hide();
  $('.year10').hide();


  let yearData = groupedByDate[year];
  console.log(yearData);

  for (let month in yearData) {
    // get array of matches for this month
    let matches = yearData[month];
   
    const rMatch = 7;
    const circleGap = rMatch * 50;
    
    let leftWinCount = 0;
    let rightWinCount = 0;

    let leftLoserCount = 0;
    let rightLoserCount = 0;
    
    matches.forEach((match, j) => {

      let xWinner = (parseInt(month) * 180) - 120;
      let yWinner = 0;

      let xLoser = (parseInt(month) * 180) - 50;
      let yLoser = 0;
      
      let winnerDot = $('<div></div>'); //winnerdot
      let loserDot = $('<div></div>'); //loserdot

      winnerDot.addClass("winner");
      let winnerColor = 'rgba(166, 242, 242, 1)';
      
      loserDot.addClass("loser");
      let loserColor = 'rgba(254, 245, 140, 1)';

      
      if (match.winner_hand === "L") {
        winnerColor = 'rgba(254, 245, 140, 1)';
        yWinner = 980 - (leftWinCount * 20);
        leftWinCount++;
      } else if (match.winner_hand === "R") {
        winnerColor = 'rgba(166, 242, 242, 1)';
        yWinner = 980 - (rightWinCount * 20);
        xWinner+= 25;
        rightWinCount++;
      } 
      
      if (match.loser_hand === "L") {
        loserColor = 'rgba(254, 245, 140, 0.25)';
        yLoser = 980 - (leftLoserCount * 20);
        leftLoserCount++
      } else if (match.loser_hand === "R") {
        loserColor = 'rgba(166, 242, 242, 0.25)';
        yLoser = 980 - (rightLoserCount * 20);
        xLoser+= 25;
        rightLoserCount++;
      }

      winnerDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': winnerColor,
        'position': 'absolute',
        'left': xWinner,
        'top': yWinner,
        'border-radius': '100%'
      });
      
      loserDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': loserColor,
        'position': 'absolute',
        'left': xLoser,
        'top': yLoser,
        'border-radius': '100%'
      });
      
      $('#stage').append(winnerDot);
      $('#stage').append(loserDot);

    });
  }
};


// --- Screen 2 -------------------------------------------

function drawLengths () {
  showLengths = true;
  
  $('.all').show();
  $('.hard').show();
  $('.clay').show();
  $('.grass').show();
  $('.carpet').show();
  
  $('.year03').show();
  $('.year04').show();
  $('.year05').show();
  $('.year06').show();
  $('.year07').show();
  $('.year08').show();
  $('.year09').show();
  $('.year10').show();
  
    const lengthX = stageWidth / 2;
    const lengthY = stageHeight / 2;
  
    cumulatedLengths.forEach(lengths => {
  
      let angle = (lengths.tourneyMonth - 2003) * 2.9;
      angle = gmynd.radians(angle - 90);
      const rSurface = 25;
  
      let xSurface = (lengthX + (Math.cos(angle)) * ((lengths.tourneyMonth - 30) / 4 + 250) - rSurface); // cosinus vom winkel
      let ySurface = (lengthY + (Math.sin(angle)) * ((lengths.tourneyMonth - 30) / 4 + 250) - rSurface); // sinus vom winkel
  
      let surfaceDot = $('<div></div>');
      surfaceDot.addClass("Lengths");
      let surfaceDotColor;
  
      if(length.surface == "Hard") {
        surfaceDotColor = '#79D1D1';
      } else if (length.surface == "Clay") {
        surfaceDotColor = '#D45F10'
      } else if (length.surface == "Grass") {
        surfaceDotColor = '#ABE184'
      } else if (length.surface == "Carpet") {
        surfaceDotColor = '#2856B3'
      }
  
  
      surfaceDot.css({
        'height': rSurface * 2,
        'width': rSurface * 2,
        'left': xSurface,
        'top': ySurface,
        'position': 'absolute',
        'border-radius': '100%',
        'background-color': surfaceDotColor,
    });
   
    stage.append(surfaceDot);
  
  
    }
  
    )};


// --- Screen 3 -------------------------------------------

function drawWinners() {
  showWinners = true;
  $('.all').hide();
  $('.hard').hide();
  $('.clay').hide();
  $('.grass').hide();
  $('.carpet').hide();

  $('.year03').hide();
  $('.year04').hide();
  $('.year05').hide();
  $('.year06').hide();
  $('.year07').hide();
  $('.year08').hide();
  $('.year09').hide();
  $('.year10').hide();

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

function matchesView() {
  stage.empty();
  drawMatches();

  $('.matches').css({
    'color': "white",
  });

  $('.lengths').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.winners').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

};

function lengthsView() {
  stage.empty();
  drawLengths();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.lengths').css({
    'color': "white" ,
  });

  $('.winners').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

};

function winnersView() {
  stage.empty();

  drawWinners();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.lengths').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.winners').css({
    'color': "white",
  });
};

// -- Surface Buttons ---------------

function allView() {
  stage.empty();

  //$('.allSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 1)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

};

function hardView() {
  stage.empty();

  //$('.hardSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.hard').css({
    'color': "rgba(121, 209, 209, 1)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

};

function clayView() {
  stage.empty();

  //$('.claySurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.clay').css({
    'color': "rgba(212, 95, 16, 1)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

};

function grassView() {
  stage.empty();

  //$('.grassSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.grass').css({
    'color': "rgba(171, 255, 132, 1",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

};

function carpetView() {
  stage.empty();

  //$('.carpetSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.carpet').css({
    'color': "rgba(40, 86,179, 1)",
  });

};

// -- Years Buttons ---------------
/*
$('.year-button').click(buttonSwapping);
function buttonSwapping(event)  {
  $('.year-button').css //mach transparent
  let target = $(event.target)
  target.css // mach hell
  console.log(parseInt(target.text()));
  }
*/


function year03View() {
  stage.empty();

  //$('.carpetSurface').show();


  $('.year03').css({
    'color': "white",
  });

  $('.year04').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.year05').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.year06').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.year07').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.year08').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.year09').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });

  $('.year10').css({
    'color': "rgba(255, 255, 255, 0.5)",
  });
};