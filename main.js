let stageHeight, stageWidth;
let stage;
let cumulateHand;

$(function () {
    stage = $('#stage');
    stageHeight = $('#stage').height();
    stageWidth = $('#stage').width();
    prepareData();
    drawDots();
});

function prepareData() {

    //Matches von verschiedene Händigkeit, 2003
    let matchesRL = gmynd.findAllByValue(data2003, "winner_hand", "R");
    matchesRL = gmynd.findAllByValue(matchesRL, "loser_hand", "L");
    console.log(matchesRL);

    let matchesLR = gmynd.findAllByValue(data2003, "winner_hand", "L");
    matchesLR = gmynd.findAllByValue(matchesLR, "loser_hand", "R");
    console.log(matchesLR);

    let allMatches03 = matchesRL.concat(matchesLR);
    console.log(allMatches03);

    //cumulateHand = gmynd.cumulateData(data2003, "winner_hand","loser_hand");
    //console.log(cumulateHand);

}


function drawDots () {

data2003.forEach(player => {
    if (player.winner_hand != player.loser_hand) {
    let date = player.tourney_date;
    let month = date.toString().charAt(4)+date.toString().charAt(5);
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
        
        if (player.winner_hand === "L"){
            color = 'playerLeft'
        } else {
            color = 'playerRight'
        }

        if (player.loser_hand === "L") {
            stroke = 'playerLeft'
        } else {
            stroke = 'playerRight'
        };
    };

    
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
};

//};