const node = require('node-html-parser');
const request = require('request');
var fs = require('fs');

var teams = require('./Teams/ncaaf.json');
let allPassing = [];
let allRushing = [];
let allReceiving = [];
let allKicking = [];
let allDefense = [];
let completedStatistics = 0;

async function pass() {
  let passing = '';
  for (let tm = 0; tm < teams.length; tm++) {
    let link = `https://www.espn.com/college-football/team/roster/_/id/${teams[tm].id}/`;
    //NFL
    // link = `https://www.espn.com/nfl/team/roster/_/name/${teams[tm].name}/`;
    //NBA
    // link = `https://www.espn.com/nba/team/roster/_/name/${teams[tm].name}`;


    request(link, function (err, res, body) {
      const root = node.parse(body);
      let tds = root.querySelectorAll('span');
      let pix = root.querySelectorAll('a');
      let str = `${teams[tm].id}`;
      let picStr = `${teams[tm].id}`;
      // console.log(root.toString());
      // console.log(tds[3].toString());

      //data height, weight, name, number, year
      for (let i = 0; i < tds.length; i++) {
        let data = (tds[i].rawText);
        str += data;
        data = data.replace(/\D/g, '');
        if (data.length > 0) {
          str += ',' + data;
        }

        if (tds[i].rawText.length < 1) {
          str += '\n' + `${teams[tm].id},`;
        } else {
          str += ','
        }
      }

      fs.appendFile('appState.txt', str, function (err) {
        if (err) throw err;
      })


      //pix
      for (let i = 0; i < pix.length; i++) {



        if (pix[i].rawText.length > 1) {
          picStr += pix[i].rawText + ',';
          let data = (pix[i].toString());
          data = data.replace(/\D/g, '');
          // console.log(data);
          picStr += data;
        }

        picStr += '\n' + `${teams[tm].id},`;
      }

      // console.log(picStr);
      fs.appendFile('appStateImg.txt', picStr, function (err) {
        if (err) throw err;
      })


    });

  }

}

let statistics = (teamId) => {
  //passing
  //rushing
  //receiving
  //kicking
  //defense

  //th for name
  //span for stats
  let link = `https://www.espn.com/college-football/team/stats/_/id/${teamId}`;
  request(link, (err, res, body) => {
    const root = node.parse(body);
    let rows = root.querySelectorAll('tr');
    let players = [];
    let passing = [];
    let rushing = [];
    let receiving = [];
    let kicking = [];
    let defense = [];
    let index = -1;



    let statsOrPlayer = 'players';

    for (let i = 0; i < rows.length; i++) {
      let string = rows[i].rawText;
      if (string.length > 0) {
        if (string == 'Total') {
          statsOrPlayer = 'stats'
        }
        if (string == 'Name') {
          index++;
          statsOrPlayer = 'players'
        }

        if (statsOrPlayer == 'players') {

          switch (index) {
            case 0:
              passing.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
              break;
            case 1:
              rushing.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
              break;
            case 2:
              receiving.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
              break;
            case 3:
              kicking.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
              break;
            case 4:
              defense.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
              break;
            default:
              players.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
          }



          players.push({ name: string, stats: '', rating: 0, team: teamId, position: '' });
        }

        else {

          //offset for stats
          offset = 1;

          if (i + offset < rows.length - 1) {

            let tds = rows[i + offset].querySelectorAll('span');
            tds.forEach(td => {
              if (td == 'SCKYDS') {
                offset++;
              }
            });


            tds = rows[i + offset].querySelectorAll('span');

            let str = '';
            tds.forEach(td => {
              str += `${td.rawText.replace(/,/g, '')},`;
            });

            switch (index) {
              case 0:
                for (let j = 0; j < passing.length; j++) {
                  if (passing[j].stats.length < 7) {
                    passing[j].stats = str;
                    break;
                  }
                }
                break;
              case 1:
                for (let j = 0; j < rushing.length; j++) {
                  if (rushing[j].stats.length < 7) {
                    rushing[j].stats = str;
                    break;
                  }
                }
                break;
              case 2:
                for (let j = 0; j < receiving.length; j++) {
                  if (receiving[j].stats.length < 7) {
                    receiving[j].stats = str;
                    break;
                  }
                }
                break;
              case 3:
                for (let j = 0; j < kicking.length; j++) {
                  if (kicking[j].stats.length < 7) {
                    kicking[j].stats = str;
                    break;
                  }
                }
                break;
              case 4:
                for (let j = 0; j < defense.length; j++) {
                  if (defense[j].stats.length < 7) {
                    defense[j].stats = str;
                    break;
                  }
                }
                break;
              default:
                players.push({ name: string, stats: '' });
            }
          }
        }
      }
    }
    for (let i = 0; i < passing.length; i++) {
      for(let j=0; j<allPassing.length; j++){
          if(passing[i].name.includes(allPassing[j].name)){
            console.log(passing[i].name + ' ' + allPassing[j].team + ' ' + passing[i].team);
            break;
          }
      }


      if (!passing[i].name.includes('QB')) {
        passing.splice(i--, 1);
      } else {
        passing[i].position = 'QB';
        passing[i].name = passing[i].name.replace(' QB', '');
      }
    }
    for (let i = 0; i < rushing.length; i++) {
      if (!rushing[i].name.includes('RB')&& !rushing[i].name.includes('HB')) {
        rushing.splice(i--, 1);
      } else {
        rushing[i].position = 'RB';
        rushing[i].name = rushing[i].name.replace(' RB', '');
      }
    }
    for (let i = 0; i < receiving.length; i++) {
      if (!receiving[i].name.includes('WR') && !receiving[i].name.includes('TE')) {
        receiving.splice(i--, 1);
      } else {
        if (receiving[i].name.includes('WR')) {
          receiving[i].position = 'WR';
          receiving[i].name = receiving[i].name.replace(' WR', '');
        }
        if (receiving[i].name.includes('TE')) {
          receiving[i].position = 'TE';
          receiving[i].name = receiving[i].name.replace(' TE', '');
        }
      }
    }
    for (let i = 0; i < kicking.length; i++) {
      if (!kicking[i].name.includes('PK')) {
        kicking.splice(i--, 1);
      } else {
        kicking[i].position = 'K';
        kicking[i].name = kicking[i].name.replace(' K', '');
      }
    }
    for (let i = 0; i < defense.length; i++) {
      if (!defense[i].name.includes('LB') && !defense[i].name.includes('DB') && !defense[i].name.includes('DL') && !defense[i].name.includes('DE') && !defense[i].name.includes('CB') && !defense[i].name[defense[i].name.length-1]=='S') {
        defense.splice(i--, 1);
      } else {
        if (defense[i].name.includes('LB')) {
          defense[i].position = 'LB';
          defense[i].name = defense[i].name.replace(' LB', '');
        }
        if (defense[i].name.includes('DB')) {
          defense[i].position = 'DB';
          defense[i].name = defense[i].name.replace(' DB', '');
        }
        if (defense[i].name.includes('DL')) {
          defense[i].position = 'DL';
          defense[i].name = defense[i].name.replace(' DL', '');
        }
        if (defense[i].name.includes('DE')) {
          defense[i].position = 'DE';
          defense[i].name = defense[i].name.replace(' DE', '');
        }
        if (defense[i].name.includes('CB')) {
          defense[i].position = 'CB';
          defense[i].name = defense[i].name.replace(' CB', '');
        }
        if (defense[i].name[defense[i].name.length-1] == 'S') {
          defense[i].position = 'S';
          defense[i].name = defense[i].name.slice(0,defense[i].name.length-2)
        }
      }
    }
    completedStatistics++;
    allPassing = allPassing.concat(passing);
    allRushing = allRushing.concat(rushing);
    allReceiving = allReceiving.concat(receiving);
    allKicking = allKicking.concat(kicking);
    allDefense = allDefense.concat(defense);

    console.log(completedStatistics);
    console.log(teams.length);
    if (completedStatistics >= teams.length) {
      console.log(teamId+ ' CURRE');
      generateQBRatings(allPassing);
      generateRBRatings(allRushing);
      generateWRRatings(allReceiving);
      generateKRatings(allKicking);
      generateDEFRatings(allDefense);
      printTopPlayers();
    }
  });


}


generateQBRatings = (arr) => {
  const YDS = 2;
  let minRating = 65;
  let maxRating = 95;
  let max = 0;
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].stats.split(",")[YDS]) > max) {
      max = arr[i].stats.split(",")[YDS];
      console.log(max);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].rating = scaleBetween(arr[i].stats.split(",")[YDS], minRating, maxRating, min, max);
    // console.log(`${arr[i].team}: ${arr[i].name}, OVR: ${arr[i].rating}, POS: ${arr[i].position}`);
  }
}

generateRBRatings = (arr) => {
  const YDS = 1;
  let minRating = 65;
  let maxRating = 95;
  let max = 0;
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].stats.split(",")[YDS]) > max) {
      max = arr[i].stats.split(",")[YDS];
      console.log(max);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].rating = scaleBetween(arr[i].stats.split(",")[YDS], minRating, maxRating, min, max);
    // console.log(`${arr[i].team}: ${arr[i].name}, OVR: ${arr[i].rating}, POS: ${arr[i].position}`);
  }
}

generateWRRatings = (arr) => {
  const YDS = 1;
  let minRating = 65;
  let maxRating = 95;
  let max = 0;
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].stats.split(",")[YDS]) > max) {
      max = arr[i].stats.split(",")[YDS];
      console.log(max);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].rating = scaleBetween(arr[i].stats.split(",")[YDS], minRating, maxRating, min, max);
    // console.log(`${arr[i].team}: ${arr[i].name}, OVR: ${arr[i].rating}, POS: ${arr[i].position}`);
  }
}

generateDEFRatings = (arr) => {
  const TKL = 2;
  const SCK = 3;
  let minRating = 65;
  let maxRating = 95;
  let max = 0;
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    let rt= parseInt(arr[i].stats.split(",")[TKL]) + (parseInt(arr[i].stats.split(",")[SCK])*4);

    if (rt > max) {
      max = arr[i].stats.split(",")[TKL];
      console.log(max);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let rt= parseInt(arr[i].stats.split(",")[TKL]) + (parseInt(arr[i].stats.split(",")[SCK])*4);
    arr[i].rating = scaleBetween(rt, minRating, maxRating, min, max);
    // console.log(`${arr[i].team}: ${arr[i].name}, OVR: ${arr[i].rating}, POS: ${arr[i].position}`);
  }
}


generateKRatings = (arr) => {
  const KICKS_MADE = 3;
  let minRating = 65;
  let maxRating = 95;
  let max = 0;
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].stats.split(",")[KICKS_MADE]) > max) {
      max = arr[i].stats.split(",")[KICKS_MADE];
      console.log(max);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].rating = scaleBetween(arr[i].stats.split(",")[KICKS_MADE], minRating, maxRating, min, max);
    // console.log(`${arr[i].team}: ${arr[i].name}, OVR: ${arr[i].rating}, POS: ${arr[i].position}`);
  }
}


let printTopPlayers = () => {
  let all = allPassing.concat(allRushing).concat(allReceiving).concat(allKicking).concat(allDefense);
  all.sort((a, b) => {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  })
  let str = '';
  all.forEach(ply => {
    str+=`${ply.team},${ply.position},${ply.name},${ply.rating}\n`
  })

  fs.writeFile('ratings.txt', str, function (err) {
    if (err) throw err;
  })
}



//My favorite function <3
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}



function run(){
  let i = 0;
  let limit = teams.length;
    const timer = setInterval(
      ()=>{
        statistics(teams[i].id);
        i++;
        if(i>= limit){
          clearInterval(timer);
        }
      },750
    );
}


run();

// pass();


