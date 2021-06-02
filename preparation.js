let prepareData;

$(function () {
    stage = $('#stage');
    stageHeight = $('#stage').height();
    stageWidth = $('#stage').width();
    prepareData();
});

function prepareData() {

    //Matches von unterschiedlichen Händigkeit, 2003
    let matchesRL = gmynd.findAllByValue(data2003, "winner_hand", "R");
    matchesRL = gmynd.findAllByValue(matchesRL, "loser_hand", "L");
    console.log(matchesRL);

    let matchesLR = gmynd.findAllByValue(data2003, "winner_hand", "L");
    matchesLR = gmynd.findAllByValue(matchesLR, "loser_hand", "R");
    console.log(matchesLR);

    let allMatches03 = matchesRL.concat(matchesLR);
    console.log(allMatches03);

}