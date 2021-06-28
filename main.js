let stageHeight, stageWidth;
let stage;
let body = $('body');
let groupedByDate; 
let groupedByTourney;

// -- const for Screen: Matches ---------------------------------------------------------------------------------------------
const rMatch = 3;
const lowerBorder = 1000;
const monthOffSet = 125;
const matchOffSet = 12;

const leftColor = 'rgba(254, 245, 140, 1)';
const rightColor = 'rgba(166, 242, 242, 1)';
const leftLoseColor = 'rgba(254, 245, 140, 0.25)';
const rightLoseColor = 'rgba(166, 242, 242, 0.25)';


// -- const for Screen: Lengths ---------------------------------------------------------------------------------------------
const rSurface = 4;

let surfaceColor;
const hardColor = 'rgba(121, 209, 209, 1)';
const clayColor = 'rgba(212, 95, 16, 1)';
const grassColor = 'rgba(171, 255, 132, 1';
const carpetColor = 'rgba(40, 86,179, 1)';


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
  $('.btn-year').click(buttonSwapping);
  drawMatches();
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

  // -- Screen: Matches & Lengths ---------------------------------------------------------------------------------------------
  data = gmynd.filterPropType(data, "minutes", "Number");

  groupedByDate = gmynd.groupData(data, ["tourneyYear", "tourneyMonth"]);
  //console.log ("date");
  //console.log (groupedByDate);


  // -- Screen: Tourneys ---------------------------------------------------------------------------------------------

  finals = gmynd.findAllByValue(data, "round", "F");
  //console.log("Finals");
  //console.log(finals);

  groupedByTourneys = gmynd.groupData(data, ["tourneyYear", "winner_hand"]);
  //console.log("Tourneys");
  //console.log(groupedByTourneys);
};

// --- Screen 1 -------------------------------------------------------------------------------------------------------------

function drawMatches(year = 2003) {
  showMatches = true;

  $('.all').hide();
  $('.hard').hide();
  $('.clay').hide();
  $('.grass').hide();
  $('.carpet').hide();

  let yearData = groupedByDate[year];
  console.log("yearData");
  console.log(yearData);

  for (let month in yearData) {
    // get array of matches for this month
    let matches = yearData[month];
    
    let matchCount = 0;

    console.log("matches");
    console.log(matches);
    matches.forEach((match, j) => {
      matchCount++;

      let xLefties = (parseInt(month) * monthOffSet) + 180;
      let xRighties = xLefties + matchOffSet;
      
      let leftiesDot = $('<div></div>'); //left players
      let rightiesDot = $('<div></div>'); //right players

      leftiesDot.addClass("lefties");
      rightiesDot.addClass("righties");
      
      let yCoord = lowerBorder - (matchCount * 12);
      
      if (match.winner_hand === "L") {
        leftiesColor = leftColor;
        rightiesColor = rightLoseColor;
      } else if (match.winner_hand === "R") {
        rightiesColor = rightColor;
        leftiesColor = leftLoseColor;
      };

      leftiesDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': leftiesColor,
        'position': 'absolute',
        'left': xLefties,
        'top': yCoord,
        'border-radius': '100%'
      });
    
      rightiesDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': rightiesColor,
        'position': 'absolute',
        'left': xRighties,
        'top': yCoord,
        'border-radius': '100%'
      });
    
      $('#stage').append(leftiesDot);
      $('#stage').append(rightiesDot);

    });
  }
};


// --- Screen 2 -------------------------------------------

function drawLengths (year = 2003) {
  showLengths = true;
  
  $('.all').show();
  $('.hard').show();
  $('.clay').show();
  $('.grass').show();
  $('.carpet').show();

  let yearData = groupedByDate[year];
  
  for (let month in yearData) {
    let surfaceCount = 0;

    let lengths = yearData[month]

    //console.log("lengths");
    //console.log(lengths);
    lengths.forEach((lengths, k) =>{
      surfaceCount++

      let xSurface = (parseInt(month) * monthOffSet)+ 250;
      let ySurface = lowerBorder - (surfaceCount * 15)

      let surfaceDot = $('<div></div>');
      surfaceDot.addClass("surface");

      if (lengths.surface === "Hard") {
        surfaceColor = hardColor
      } else if (lengths.surface === "Clay") {
        surfaceColor = clayColor
      } else if (lengths.surface === "Grass") {
        surfaceColor = grassColor
      } else if (lengths.surface === "Carpet") {
        surfaceColor = carpetColor
      }; 

    surfaceDot.css({
      'height': rSurface * 2,
      'width': rSurface * 2,
      'background-color': surfaceColor,
      'position': 'absolute',
      'left': xSurface,
      'top': ySurface,
      'border-radius': '100%'
    });

    $('#stage').append(surfaceDot);
    });
  }
};


// --- Screen 3 -------------------------------------------

function drawTourneys() {
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

  for (let key in groupedByTourney) {

    let finalWinners = groupedByTourney[key];

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
    'color': "rgba(255, 255, 255, 0.25)",
  });

  $('.tourneys').css({
    'color': "rgba(255, 255, 255, 0.25)",
  });

};

function lengthsView() {
  stage.empty();
  drawLengths();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.25)",
  });

  $('.lengths').css({
    'color': "white" ,
  });

  $('.tourneys').css({
    'color': "rgba(255, 255, 255, 0.25)",
  });

};

function tourneysView() {
  stage.empty();

  drawTourneys();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.25)",
  });

  $('.lengths').css({
    'color': "rgba(255, 255, 255, 0.25)",
  });

  $('.tourneys').css({
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
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

};

function hardView() {
  stage.empty();

  //$('.hardSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.hard').css({
    'color': "rgba(121, 209, 209, 1)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

};

function clayView() {
  stage.empty();

  //$('.claySurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.clay').css({
    'color': "rgba(212, 95, 16, 1)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

};

function grassView() {
  stage.empty();

  //$('.grassSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.grass').css({
    'color': "rgba(171, 255, 132, 1",
  });

  $('.carpet').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

};

function carpetView() {
  stage.empty();

  //$('.carpetSurface').show();
  
  $('.all').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.hard').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.clay').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.grass').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.carpet').css({
    'color': "rgba(40, 86,179, 1)",
  });

};

// -- Years Buttons ---------------

  function buttonSwapping(e)  {
    const target = $(e.target);
    $('.btn-year').css({
      'color': "black"//"rgba(255, 255, 255, 0.5)"
    });
    target.css({
      'color': "white",
    });
    let year = parseInt(target.text());
    yearView(year);
  };

  function yearView(year) {
    $('.lefties').remove();
    $('.righties').remove();
    drawMatches(year);
  };