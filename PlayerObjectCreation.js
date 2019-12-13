var fs = require('fs');
let playerInformation = [];
let img = [];
let playerRatings = [];



readPlayerData = () => {
    let playerData = '';
    fs.readFile('appstate.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        playerData = data.toString();
        playerData = removeUnwantedCharacters(playerData);
        let array = playerData.split("\n");
        let playerArray = [];
        for (let i = 0; i < array.length; i++) {
            let arr = array[i].split(",");
            if (arr.length == 12) {
                playerArray.push({
                    team: arr[0],
                    name: removeUnwantedCharacters(removeNumberFromString(arr[1])),
                    number: remove27FromNumbers(arr[2]),
                    position: convertPositionToPositionID(arr[3]),
                    height: arr[4],
                    weight: arr[7], age: convertYearToAge(arr[8])
                });
            }
        }
        // console.log(playerArray[0].name);
        playerInformation = playerArray;
        readPlayerRatings();
    });
}

remove27FromNumbers = (num) => {
    if (num.length > 2) {
        return num.slice(1, num.length - 1);
    }
    return num;
}

readPlayerRatings = () => {
    let playerData = '';
    fs.readFile('ratings.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        playerData = data.toString();
        playerData = removeUnwantedCharacters(playerData);
        let array = playerData.split("\n");
        let playerArray = [];
        for (let i = 0; i < array.length; i++) {
            let arr = array[i].split(",");
            if (arr.length == 4) {
                playerArray.push({
                    team: arr[0],
                    name: removeNumberFromString(arr[2]),
                    rating: arr[3],
                    position: convertPositionToPositionID(arr[1])
                });
            }
        }
        // console.log(playerArray[0].name);
        playerRatings = playerArray;
        readPlayerImages();
    });
}

readPlayerImages = () => {
    let playerData = '';
    fs.readFile('appStateImg.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        playerData = data.toString();
        playerData = removeUnwantedCharacters(playerData);
        let array = playerData.split("\n");
        let playerArray = [];
        for (let i = 0; i < array.length; i++) {
            let arr = array[i].split(",");
            if (arr.length == 3) {
                playerArray.push({
                    team: arr[0],
                    name: removeNumberFromString(arr[1]),
                    faceSrc: arr[2]
                });
            }
        }
        img = playerArray;
        if (img.length > 1 && playerInformation.length > 1) {
            createPlayerObjects();
        }
    });
}

createPlayerObjects = () => {

    let players = [];
    for (let i = 0; i < playerInformation.length; i++) {
        let ply = playerInformation[i];
        ply.faceSrc = '';
        ply.rating = 60;
        for (let j = 0; j < img.length; j++) {
            if (ply.team == img[j].team && ply.name == img[j].name) {
                ply.faceSrc = `https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/${img[j].faceSrc}.png&w=150`
            }
        }

        for (let j = 0; j < playerRatings.length; j++) {
            if (ply.team == playerRatings[j].team && ply.name == playerRatings[j].name) {
                ply.rating = Math.round(playerRatings[j].rating);
            }
        }

        players.push(ply);
    }
    // let search = 'Zac';
    let str = 'name,faceSrc,team,position,age,height,number,rating\n';
    for (let i = 0; i < players.length; i++) {
        str += `${players[i].name},${players[i].faceSrc},${players[i].team},${players[i].position},${players[i].age},${players[i].height},${players[i].number},${players[i].rating}\n`
    }
    fs.writeFile('player_data.csv', str, function (err) {
        if (err) throw err;
    });

    fs.writeFile('player_data.json', JSON.stringify(players), function (err) {
        if (err) throw err;
    });

}

removeUnwantedCharacters = (data) => {

    data = data.replace(new RegExp("&" + "#" + "x27; ", "g"), "\"");
    data = data.replace(new RegExp("&" + "quot;", "g"), "'");
    data = data.replace(new RegExp("&" + "#" + "x" + ";", "g"), "'");

    return data;
}

convertPositionToPositionID = (pos) => {
    let position;
    switch (pos) {
        case 'QB':
            position = 0;
            break;
        case 'RB':
            position = 1;
            break;
        case 'FB':
            position = 1;
            break;
        case 'HB':
            position = 1;
            break;
        case 'WR':
            position = 3;
            break;
        case 'TE':
            position = 4;
            break;
        case 'OL':
            position = 5;
            break;
        case 'DE':
            position = 10;
            break;
        case 'DL':
            position = 12;
            break;
        case 'LB':
            position = 13;
            break;
        case 'DB':
            position = 17;
            break;
        case 'CB':
            position = 16;
            break;
        case 'S':
            position = 18;
            break;
        case 'PK':
            position = 19;
            break;
        case 'K':
            position = 19;
            break;  
        case 'P':
            position = 20;
            break;   
        default:
            position = 13;
            break;
    }
    return position;
}

convertYearToAge = (year) => {
    let age = 18;
    if (year == 'SO') {
        age = 19;
    } if (year == 'JR') {
        age = 20;
    } if (year == 'SR') {
        age = 21;
    }
    return age;
}

removeNumberFromString = (data) => {
    return data.replace(/\d+/g, '')
}

sortIntoArray = (data) => {
    return data.split("\n");
}

readPlayerData();
