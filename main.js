let stageHeight, stageWidth;
let stage;

$(function () {
  stage = $('#stage');
  stageHeight = stage.height();
  stageWidth = stage.width();
  prepareData();
  drawDots();
});

function prepareData() {

  //2003, different handiness
  let matchesRL3 = gmynd.findAllByValue(data2003, "winner_hand", "R");
  matchesRL3 = gmynd.findAllByValue(matchesRL3, "loser_hand", "L");

  let matchesLR3 = gmynd.findAllByValue(data2003, "winner_hand", "L");
  matchesLR3 = gmynd.findAllByValue(matchesLR3, "loser_hand", "R");

  let allMatches03 = matchesRL3.concat(matchesLR3);
  // console.log(allMatches03);

  //2004, different handiness
  let matchesRL4 = gmynd.findAllByValue(data2004, "winner_hand", "R");
  matchesRL4 = gmynd.findAllByValue(matchesRL4, "loser_hand", "L");

  let matchesLR4 = gmynd.findAllByValue(data2004, "winner_hand", "L");
  matchesLR4 = gmynd.findAllByValue(matchesLR4, "loser_hand", "R");

  let allMatches04 = matchesRL4.concat(matchesLR4);
  // console.log(allMatches04);

  //2005, different handiness
  let matchesRL5 = gmynd.findAllByValue(data2005, "winner_hand", "R");
  matchesRL5 = gmynd.findAllByValue(matchesRL5, "loser_hand", "L");

  let matchesLR5 = gmynd.findAllByValue(data2005, "winner_hand", "L");
  matchesLR5 = gmynd.findAllByValue(matchesLR5, "loser_hand", "R");

  let allMatches05 = matchesRL5.concat(matchesLR5);
  //console.log(allMatches05);

  //2006, different handiness
  let matchesRL6 = gmynd.findAllByValue(data2006, "winner_hand", "R");
  matchesRL6 = gmynd.findAllByValue(matchesRL6, "loser_hand", "L");

  let matchesLR6 = gmynd.findAllByValue(data2006, "winner_hand", "L");
  matchesLR6 = gmynd.findAllByValue(matchesLR6, "loser_hand", "R");

  let allMatches06 = matchesRL6.concat(matchesLR6);
  //console.log(allMatches06);

  //2007, different handiness
  let matchesRL7 = gmynd.findAllByValue(data2007, "winner_hand", "R");
  matchesRL7 = gmynd.findAllByValue(matchesRL7, "loser_hand", "L");

  let matchesLR7 = gmynd.findAllByValue(data2007, "winner_hand", "L");
  matchesLR7 = gmynd.findAllByValue(matchesLR7, "loser_hand", "R");

  let allMatches07 = matchesRL7.concat(matchesLR5); // <----- 5 WRONG?
  //console.log(allMatches07);

  //2008, different handiness
  let matchesRL8 = gmynd.findAllByValue(data2008, "winner_hand", "R");
  matchesRL8 = gmynd.findAllByValue(matchesRL8, "loser_hand", "L");

  let matchesLR8 = gmynd.findAllByValue(data2008, "winner_hand", "L");
  matchesLR8 = gmynd.findAllByValue(matchesLR8, "loser_hand", "R");

  let allMatches08 = matchesRL8.concat(matchesLR8);
  //console.log(allMatches08);

  //2009, different handiness
  let matchesRL9 = gmynd.findAllByValue(data2009, "winner_hand", "R");
  matchesRL9 = gmynd.findAllByValue(matchesRL9, "loser_hand", "L");

  let matchesLR9 = gmynd.findAllByValue(data2009, "winner_hand", "L");
  matchesLR9 = gmynd.findAllByValue(matchesLR9, "loser_hand", "R");

  let allMatches09 = matchesRL9.concat(matchesLR9);
  //console.log(allMatches09);

  //2010, different handiness
  let matchesRL10 = gmynd.findAllByValue(data2010, "winner_hand", "R");
  matchesRL10 = gmynd.findAllByValue(matchesRL10, "loser_hand", "L");

  let matchesLR10 = gmynd.findAllByValue(data2010, "winner_hand", "L");
  matchesLR10 = gmynd.findAllByValue(matchesLR5, "loser_hand", "R"); //<-- 5 WRONG?

  let allMatches10 = matchesRL10.concat(matchesLR10);
  //console.log(allMatches10);
  let data = [
    ...allMatches03,
    ...allMatches03,
    ...allMatches04,
    ...allMatches05,
    ...allMatches06,
    ...allMatches07,
    ...allMatches08,
    ...allMatches09,
    ...allMatches10,
  ];
  console.log(data);
  //gmynd.saveData(data, "allMatches.json");
}


function drawDots() {

  data2003.forEach(player => {
    if (player.winner_hand != player.loser_hand) {
      let date = player.tourney_date;
      let month = date.toString().charAt(4) + date.toString().charAt(5);
      //console.log (month)

//for (let i=0; data2000.length; i++) {

      const circleGap = 20;
      const r = 30;
      let x = 100;
      let y = 120;

      let dot = $('<div></div>');
      dot.addClass("playerLeft");
      dot.addClass("playerRight");
      let color;
      let stroke;

      if (month === "01") {
        x = 100;
        y = 120 + circleGap;

        if (player.winner_hand === "L") {
          color = 'playerLeft'
        } else {
          color = 'playerRight'
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
  });
}

//};