const roster = require('./Rosters/NCAA 2019-20v4.json');
const teamRankings = require('./ncaaf_fpi.json');
const script = require('./RequriedScripts');
const notInRoster = require('./final_player_data.json');
var fs = require('fs');



const teams = roster.teams;

 initializeJson = () => {
        for(let i=0; i<teams.length; i++){
                    //init not in roster (temp for liberty and app state)
                    for(let j=0; j<notInRoster.length; j++){
                        if(notInRoster[j].team == grabIdFromLogoSrc(teams[i].logoSrc)){
                            // console.log(notInRoster[j].name +' ' + grabIdFromLogoSrc(teams[i].logoSrc));
                            teams[i].roster.push(notInRoster[j]);
                        }
                    }



            //set rank
                for(let j=0; j<teamRankings.length; j++){
                    if(teamRankings[j].id == grabIdFromLogoSrc(teams[i].logoSrc)){
                        teams[i].rank = teamRankings[j].rank;
                    }
                }
                //first init ply ratings
                for(let j=0; j<teams[i].roster.length; j++){
                    script.calculateRating(teams[i].roster[j]);
                }
                script.calculateTeamRating(teams[i]);
                // console.log(teams[i].name + ' ' + teams[i].rating);
        }
 }

 grabIdFromLogoSrc = (link) => {
    let id = link.toString().replace('https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/','');
    id = id.replace('.png&w=200','')
    return id;
 }



 adjustPlayerRatingsBasedOnFPI = () => {
    script.manageCFPPollRating(teams);

 }

 displayRoster = () => {
     let players = [];
     for(let i=0; i<teams.length; i++){
        players = players.concat(teams[i].roster);
     }

     players.sort((a,b)=>{
        if(a.rating > b.rating){
            return -1;
        }
        if(a.rating < b.rating){
            return 1;
        }
        return 0;
     });

     for(let i=0; i<100; i++){
         console.log(players[i].name + ' ' + players[i].rating);
     }
 }


 exportRoster = () => {
    // "freeAgents":{"name":"Free Agents","logoSrc":"https://i.ibb.co/5h2T9Kq/test.png","roster":[]}

    let freeAgents = {name: 'Free Agents', logoSrc:'https://i.ibb.co/5h2T9Kq/test.png', roster:[]}
    fs.writeFile('NCAAv4.json', JSON.stringify({teams: teams, freeAgents: freeAgents }), function (err) {
        if (err) throw err;
    });
    
 }

 initializeJson();

 adjustPlayerRatingsBasedOnFPI();

//  displayRoster();

exportRoster();