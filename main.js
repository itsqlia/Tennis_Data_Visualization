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
const rSurface = 4.5;

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

  finals = gmynd.findAllByValue(data, "round", "F");
  //console.log(finals);
};

// --- Screen 1 -------------------------------------------------------------------------------------------------------------

function drawMatches(year = 2003) {
  showMatches = true;

  $('.btn-year').show();
  $('.btn-surface').hide();

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

    });
  }
};


// --- Screen 2 -------------------------------------------

function drawLengths (year = 2003) {
  showLengths = true;

  $('.btn-year').show();
  $('.btn-surface').show();

  let yearData = groupedByDate[year];
  
  for (let month in yearData) {
    let surfaceCount = 0;

    let lengths = yearData[month]

    console.log("lengths");
    console.log(lengths);
    lengths.forEach((lengths, j) =>{
      surfaceCount++

      let xSurface = lowerBorder + (surfaceCount * 15) - 620;
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

    surfaceDot.data(lengths);

    surfaceDot.mouseover(() => {
      surfaceDot.addClass("hover");

      //Tourney Name
      $('#hoverName').text('Tournament : ' + lengths.tourney_name);
      $('#hoverName').css({
        'color': 'white',
      });

      //Round
      $('#hoverRound').text('Round : ' + lengths.round);
      $('#hoverRound').css({
        'color': 'white',
      });
      
      //Length
      $('#hoverLength').text('Match Length : ' + lengths.minutes + 'mins');
      $('#hoverLength').css({
        'color': 'white',
      });

      //Surface
      $('#hoverSurface').text('Surface : ' + lengths.surface);
      $('#hoverSurface').css({
        'color': surfaceColor,
      });
    });
    surfaceDot.mouseout(() => {
      surfaceDot.removeClass("hover");
      $('#hoverName').text("");
      $('#hoverLenght').text("");
      $('#hoverSurface').text("");
  });
    });
  }
};


// --- Screen 3 -------------------------------------------

function drawTourneys (year = 2003) {
  showTourneys = true;

  $('.btn-year').hide();
  $('.btn-surface').hide();
    
  console.log(finals);
    finals.forEach((finals, k) => {
      let finalsCount = 0;
      finalsCount++;

      const rFinals = 9;

      let theta = 2.4;
      let spiralRadius = 5 * Math.sqrt(theta) * 2.4;
      let xFinals = 160 + Math.cos(theta) * spiralRadius + (k * 190);
      let yOffset = k % 3 * 260; //0-5 bis 6-11
      let yFinals = 320 + Math.sin(theta) * spiralRadius + yOffset;

      let leftiesDot = $('<div></div>'); //left players
      let rightiesDot = $('<div></div>'); //right players
    
      leftiesDot.addClass("lefties");
      rightiesDot.addClass("righties");

      if (finals.winner_hand === "L") {
        leftiesColor = leftColor;
        rightiesColor = rightLoseColor;
      } else if (finals.winner_hand === "R") {
        rightiesColor = rightColor;
        leftiesColor = leftLoseColor;
      };

      leftiesDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': leftiesColor,
        'position': 'absolute',
        'left': xFinals,
        'top': yFinals,
        'border-radius': '100%'
      });
    
      rightiesDot.css({
        'height': rMatch * 2,
        'width': rMatch * 2,
        'background-color': rightiesColor,
        'position': 'absolute',
        'left': xFinals,
        'top': yFinals,
        'border-radius': '100%'
      });

      $('#stage').append(leftiesDot);
      $('#stage').append(rightiesDot);
    
    });
  };


// -- Screen Switches ---------------------------------------------------------------------------------------------

function matchesView() {
  tab = 1;
  stage.empty();
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
    } 

  };

// -- Surface Buttons ---------------


function surfaceSwapping(e)  {
  const target = $(e.target);

  $('.btn-surface').css({
    'color': "rgba(255, 255, 255, 0.15)"
  });
  target.css({
    'color': "white",
  });
  let surface = target.text();
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

 function all() {
    stage.empty();
    drawLengths();
    
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
    visibilityByData("surface", "Hard");
      
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
    visibilityByData("surface", "Clay");
    
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
    visibilityByData("surface", "Grass");
    
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
    visibilityByData("surface", "Carpet");

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