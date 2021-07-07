let stageHeight, stageWidth;
let stage;
let body = $('body');
let groupedByDate;
let selectedProps = [];

// -- const for Screen: Matches ---------------------------------------------------------------------------------------------
const rMatch = 3;
const lowerBorder = 1075;
const monthOffSet = 70;
const matchOffSet = 12;
const leftBorder = 600;

const leftColor = 'rgba(254, 245, 140, 1)';
const rightColor = 'rgba(166, 242, 242, 1)';
const leftLoseColor = 'rgba(254, 245, 140, 0.25)';
const rightLoseColor = 'rgba(166, 242, 242, 0.25)';


// -- const for Screen: Lengths ---------------------------------------------------------------------------------------------
let surfaceColor;
const hardColor = 'rgba(121, 209, 209, 1)';
const clayColor = 'rgba(212, 95, 16, 1)';
const grassColor = 'rgba(171, 255, 132, 1';
const carpetColor = 'rgba(40, 86,179, 1)';

const leftFinalBorder = 250;

let tab=1;

let showMatches;
showMatches = true;

let showLengths;
showLengths = false;

let showTourneys;
showTourneys = false;

$(function () {
  stage = $('#stage');
  stageHeight = stage.height();
  stageWidth = stage.width();
  prepareData();
  $('.btn-year').click(buttonSwapping);
  $('.btn-surface').click(surfaceSwapping);
  yearView(2003);
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

  data = gmynd.filterPropType(data, "minutes", "Number");

  groupedByDate = gmynd.groupData(data, ["tourneyYear", "tourneyMonth"]);
  //console.log ("date");
  //console.log (groupedByDate);  

  finalMatches.forEach(finals => {
    let date = finals.tourney_date;
    let year = date.toString().charAt(0) + date.toString().charAt(1) + date.toString().charAt(2) + date.toString().charAt(3);
    let month = date.toString().charAt(4) + date.toString().charAt(5);
    //console.log(year, month);
    finals.tourneyYear = year;
    finals.tourneyMonth = month;
  });
  
  groupedByFinals = gmynd.groupData(finalMatches, "tourneyYear");
  //console.log(groupedByFinals);
};

// --- Screen 1 -------------------------------------------------------------------------------------------------------------

function drawMatches(year = 2003) {
  showMatches = true;

  $('.btn-year').show();
  $('.btn-surface').hide();

  let yearData = groupedByDate[year];
  /*   console.log("yearData");
    console.log(yearData); */

  for (let month in yearData) {
    // get array of matches for this month
    let matches = yearData[month];

    let matchCount = 0;

    /*     console.log("matches");
        console.log(matches); */
    matches.forEach((match, i) => {
      matchCount++;

      let xLefties = (parseInt(month) * monthOffSet) + leftBorder;
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

function drawLengths(year = 2003) {
  showLengths = true;

  $('.btn-year').show();
  $('.btn-surface').show();

  let yearData = groupedByDate[year];

  for (let month in yearData) {
    let surfaceCount = 0;

    let lengths = yearData[month]

    lengths.forEach((length, j) => {
      surfaceCount++

      let xSurface = lowerBorder + (surfaceCount * 15) - 650;
      let ySurface = (parseInt(month) * monthOffSet) + 100;
      let rSurf = gmynd.map(length.minutes, 20, 120, 30, 300);
      r = gmynd.circleRadius(rSurf);

      let surfaceDot = $('<div></div>');
      surfaceDot.addClass("surface");

      if (length.surface === "Hard") {
        surfaceColor = hardColor
      } else if (length.surface === "Clay") {
        surfaceColor = clayColor
      } else if (length.surface === "Grass") {
        surfaceColor = grassColor
      } else if (length.surface === "Carpet") {
        surfaceColor = carpetColor
      };

      surfaceDot.css({
        'height': r*2.5,
        'width': r*2.5,
        'background-color': surfaceColor,
        'position': 'absolute',
        'left': xSurface - r,
        'top': ySurface - r,
        'border-radius': '100%'
      });

      $('#stage').append(surfaceDot);

      surfaceDot.data(length);

      surfaceDot.mouseover(() => {
        surfaceDot.addClass("hover");

         //Length
         $('#hoverLength').text(length.minutes + ' mins');
         $('#hoverLength').css({
           'color': 'rgb(255, 231, 194)',
         });

        //Name
        $('#hoverName').text(length.tourney_name);
        $('#hoverName').css({
          'color': 'rgb(255, 255, 255, 0.75)',
        });

        //Month
        /*let displayMonth;

        if (length.tourneyMonth == "01") {
          displayMonth = "January"
        } else if (length.tourneyMonth == "02"){
          displayMonth = "February"
        } else if (length.tourneyMonth == "03"){
          displayMonth = "March"
        } else if (length.tourneyMonth == "04"){
          displayMonth = "April"
        } else if (length.tourneyMonth == "05"){
          displayMonth = "May"
        } else if (length.tourneyMonth == "06"){
          displayMonth = "June"
        } else if (length.tourneyMonth == "07"){
          displayMonth = "July"
        } else if (length.tourneyMonth == "08"){
          displayMonth = "August"
        } else if (length.tourneyMonth == "09"){
          displayMonth = "September"
        } else if (length.tourneyMonth == "10"){
          displayMonth = "October"
        } else if (length.tourneyMonth == "11"){
          displayMonth = "November"
        };

        $('#hoverMonth').text(displayMonth + " , ");
        $('#hoverMonth').css({
          'color': 'rgb(255, 255, 255, 0.75)',
        });
        */

        //Round
        
        let displayRound;

        if (length.round == "R32") {
          displayRound = "Round 32"
        } else if (length.round == "R16"){
          displayRound = "Round 16"
        } else if (length.round == "QF"){
          displayRound = "Quarter-final "
        } else if (length.round == "SF"){
          displayRound = "Semi-final "
        } else if (length.round == "F"){
          displayRound = "Finals"
        }; 
        
        $('#hoverRound').text(displayRound);
        $('#hoverRound').css({
          'color': 'rgb(255, 255, 255, 0.75)',
        });

        //Surface
        /*
        $('#hoverSurface').text(length.surface);
        $('#hoverSurface').css({
          'color': 'rgb(255, 255, 255, 0.75)',
        });
         */
      });

      surfaceDot.mouseout(() => {
        surfaceDot.removeClass("hover");
        $('#hoverName').text("");
        $('#hoverMonth').text("");
        $('#hoverRound').text("");
        $('#hoverLength').text("");
        $('#hoverSurface').text("");
      });
    });
   
  }
};

// --- Screen 3 -------------------------------------------

function drawTourneys() {
  showWinners = true;

  $('.btn-year').hide();
  $('.btn-surface').hide();

  let yearCount = -1;
  let rowCount = 0;
  let rowOffset = 500;
  let rowSplit = 6;

  for (let year in groupedByFinals) {
    yearCount++;
    let finalCount = 0;

    if (yearCount % rowSplit == 0){
      rowCount++;
      yearCount = 0;
    };

        let finals = groupedByFinals[year];

    //console.log(finals);
    finals.forEach((final, j) => {
     
      finalCount++; 

      //console.log(parseInt(year));
      const rFinal = 7;
      
      
      let theta = 2.4 * j;
      let spiralRadius = 5 * Math.sqrt(theta) * 1.7;
      let yearOffset = 270;
      let xFinal = (Math.cos(theta) * spiralRadius) + (yearCount*yearOffset) + leftFinalBorder;
      let yFinal = (320 + Math.sin(theta) * spiralRadius) + (rowCount * rowOffset) - 500; 
      
      let finalDot = $('<div></div>');
      finalDot.addClass("finals");
      
      if (final.winner_hand === "L") {
        finalColor = leftColor;
      } else if (final.winner_hand === "R") {
        finalColor = 'rgba(166, 242, 242, 0.5)';
      };

      finalDot.css({
        "position": "absolute",
        'background-color': finalColor,
        'height': rFinal * 2,
        'width': rFinal*2,
        'left': xFinal,
        'top': yFinal,
        'border-radius': '100%'
      });

      $('#stage').append(finalDot);

    });
  }
};

// -- Screen Switches ---------------------------------------------------------------------------------------------

function matchesView() {
  tab = 1;
  stage.empty();
  resetButtonsColors();
  resetYearButtons();
  drawMatches();

  $('.matches').css({
    'color': "white",
  });

  $('.lengths').css({
    'color': "rgba(131, 138, 177, 0.35)",
  });

  $('.tourneys').css({
    'color': "rgba(131, 138, 177, 0.35)",
  });

};

function lengthsView() {
  stage.empty();
  tab = 2;
  drawLengths();
  resetButtonsColors();
  resetYearButtons();

  $('.matches').css({
    'color': "rgba(131, 138, 177, 0.35)",
  });

  $('.lengths').css({
    'color': "white",
  });

  $('.tourneys').css({
    'color': "rgba(131, 138, 177, 0.35)",
  });

};

function tourneysView() {
  stage.empty();
  tab = 3;
  drawTourneys();
  
  $('.matches').css({
    'color': "rgba(131, 138, 177, 0.35)",
  });

  $('.lengths').css({
    'color': "rgba(131, 138, 177, 0.35)",
  });

  $('.tourneys').css({
    'color': "white",
  });
};

// -- Years Buttons ---------------

function buttonSwapping(e) {
  const target = $(e.target);

  $('.btn-year').css({
    'color': "rgba(131, 138, 177, 0.45)"
  });
  target.css({
    'color': "white",
  });
  let year = parseInt(target.text());
  yearView(year);
};

function yearView(year) {

  if (tab == 1) {
    $('.lefties').remove();
    $('.righties').remove();
    drawMatches(year);
  } else if (tab == 2) {
    $('.surface').remove();
    drawLengths(year);
  }

  //resetButtonsColors();
};

// -- Surface Buttons ---------------

function surfaceSwapping(e) {
  const target = $(e.target);
  console.log(target.index())
  $('.btn-surface').css({
    'color': "rgba(131, 138, 177, 0.35)"
  });

  if (target.index() == 0) {
    surfaceColor = hardColor;
  } else if (target.index() == 1) {
    surfaceColor = clayColor;
  } else if (target.index() == 2) {
    surfaceColor = grassColor;
  } else if (target.index() == 3) {
    surfaceColor = carpetColor;
  };

  target.css({
    'color': surfaceColor,
  });
  
  let surface = target.text();
  visibilityByData("surface", surface);
};

function visibilityByData(prop, val) {
  $('.surface').each(function () {
    if ($(this).data(prop) == val) {
      $(this).css({
        'opacity': '1'
      });
    }
    else {
      $(this).css({
        'opacity': '0.10'
      });
    }
  });
};

// -- Reset Buttons ---------------

function resetButtonsColors(){
  $('.btn-surface').css({
    'color': "rgba(131, 138, 177, 0.45)"
  });
};

function resetYearButtons(){
  $('.btn-year').css({
    'color': "rgba(131, 138, 177, 0.45)"
  });
};