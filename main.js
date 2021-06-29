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

let tab;

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

  data = gmynd.filterPropType(data, "minutes", "Number");

  groupedByDate = gmynd.groupData(data, ["tourneyYear", "tourneyMonth"]);
  //console.log ("date");
  //console.log (groupedByDate);
};

// --- Screen 1 -------------------------------------------------------------------------------------------------------------

function drawMatches(year = 2003) {
  showMatches = true;

  let yearData = groupedByDate[year];
  console.log("yearData");
  console.log(yearData);

  for (let month in yearData) {
    // get array of matches for this month
    let matches = yearData[month];
    
    let matchCount = 0;

    console.log("matches");
    console.log(matches);
    matches.forEach((match, i) => {
      matchCount++;

      let xLefties = (parseInt(month) * monthOffSet) + 600;
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

      $('.btn-year').show();
      $('.btn-surface').hide();
    });
  }
};


// --- Screen 2 -------------------------------------------

function drawLengths (year = 2003) {
  showLengths = true;

  let yearData = groupedByDate[year];
  
  for (let month in yearData) {
    let surfaceCount = 0;

    let lengths = yearData[month]

    //console.log("lengths");
    //console.log(lengths);
    lengths.forEach((lengths, j) =>{
      surfaceCount++

      let xSurface = lowerBorder + (surfaceCount * 15) - 580;
      let ySurface = (parseInt(month)*monthOffSet)+ 150;

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

    $('.btn-year').show();
    $('.btn-surface').show();
  }
};


// --- Screen 3 -------------------------------------------

function drawTourneys (year = 2003) {
  showTourneys = true;

  let yearData = groupedByDate[year];
  console.log("yearData");
  console.log(yearData);

  for (let month in yearData) {
    // get array of matches for this month
    let tourney = yearData[month];
    
    let matchCount = 0;

    //console.log("matches");
    //console.log(matches);
    tourney.forEach((tourney, k) => {
      matchCount++;

      /*
      let xLefties = (parseInt(month) * monthOffSet) + 600;
      let xRighties = xLefties + matchOffSet;
      
      let leftiesDot = $('<div></div>'); //left players
      let rightiesDot = $('<div></div>'); //right players
      */

      let angle = (parseInt(month) - 1896) * 2.9;
      angle = gmynd.radians(angle - 90);

      let xTourney = (Math.cos(angle) * (parseInt(month)*monthOffSet) / 4 + 350);
      let yTourney = (Math.sin(angle) * (parseInt(month)*monthOffSet) / 4 + 350);

      let leftiesDot = $('<div></div>'); //left players
      let rightiesDot = $('<div></div>'); //right players

      leftiesDot.addClass("lefties");
      rightiesDot.addClass("righties");
      
      let yCoord = lowerBorder - (matchCount * 12);
      
      if (tourney.winner_hand === "L") {
        leftiesColor = leftColor;
        rightiesColor = rightLoseColor;
      } else if (tourney.winner_hand === "R") {
        rightiesColor = rightColor;
        leftiesColor = leftLoseColor;
      };

      leftiesDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': leftiesColor,
        'position': 'absolute',
        'left': xTourney,
        'top': yTourney,
        'border-radius': '100%'
      });
    
      rightiesDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': rightiesColor,
        'position': 'absolute',
        'left': xTourney,
        'top': yTourney,
        'border-radius': '100%'
      });
    
      $('#stage').append(leftiesDot);
      $('#stage').append(rightiesDot);

      $('.btn-year').hide();
      $('.btn-surface').hide();
    });
  }
};


// -- Screen Switches ---------------------------------------------------------------------------------------------

function matchesView() {
  stage.empty();
  tab = 1;
  drawMatches();

  $('.matches').css({
    'color': "white",
  });

  $('.lengths').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.tourneys').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

};

function lengthsView() {
  stage.empty();
  tab = 2;
  drawLengths();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.lengths').css({
    'color': "white" ,
  });

  $('.tourneys').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

};

function tourneysView() {
  stage.empty();
  tab = 3;
  drawTourneys();

  $('.matches').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.lengths').css({
    'color': "rgba(255, 255, 255, 0.15)",
  });

  $('.tourneys').css({
    'color': "white",
  });
};

// -- Years Buttons ---------------

  function buttonSwapping(e)  {
    const target = $(e.target);
    $('.btn-year').css({
      'color': "rgba(255, 255, 255, 0.15)"
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
    } else if (tab == 2){
    $('.surface').remove();
    drawLengths(year);
    } else if (tab == 3){
      $('.lefties').remove();
      $('.righties').remove();
    drawTourneys(year);
    };

  };

// -- Surface Buttons ---------------

function surfaceSwapping(event)  {
  const eventTarget = $(event.target);
  console.log(eventTarget);

  $('.btn-surface').css({
    'color': "rgba(255, 255, 255, 0.15)"
  });
  eventTarget.css({
    'color': "white",
  });
  let surface = eventTarget.text();
  visibilityByData();
};


  function visibilityByData(prob, val) {
    $('.surface').each (function(){

      if (selectedProps.includes($(this).data(prop) == val)){
        $(this).css({
          'opacity': '1'
        }); 
      }
        else {
          $(this).css({
            'opacity': '0.15'
          });
        }
      });
  };

  function allView() {
    stage.empty();
    
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
  
  function hard() {
    stage.empty();
      
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
  
  function clay() {
    stage.empty();
    
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
  
  function grass() {
    stage.empty();
    
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
  
  function carpet() {
    stage.empty();
    
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