/*
Player/Team Class
Create All Teams
Manage Rankings (FPI)
SaveToFile();

*/
var fs = require('fs');


const script = require('./RequriedScripts');
let players = require('./player_data.json');



createPlayers = () => {
    console.log(players.length);
    let finalPlayers = [];
    for(let i=0; i<players.length; i++){
        let ply = script.generatePlayer(parseInt(players[i].position), parseInt(players[i].rating));
        ply.team = parseInt(players[i].team);
        ply.name = players[i].name;
        ply.number = parseInt(players[i].number);
        ply.position = parseInt(players[i].position);
        ply.age = parseInt(players[i].age);
        ply.height = players[i].height;
        ply.weight = players[i].weight;
        ply.faceSrc = players[i].faceSrc;
        finalPlayers.push(ply);
    }


    fs.writeFile('final_player_data.json', JSON.stringify(finalPlayers), function (err) {
        if (err) throw err;
    });




}

createPlayers();

