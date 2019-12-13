let teamsData = require("./JSON/Teams.json");

var playerData = require("./JSON/Players.json");

var freeAgents = require("./JSON/FreeAgents.json");

var draftData = require("./JSON/DraftData.json");

const POS_QB = 0;
const POS_HB = 1;
const POS_FB = 2;
const POS_WR = 3;
const POS_TE = 4;
const POS_LT = 5;
const POS_LG = 6;
const POS_C = 7;
const POS_RG = 8;
const POS_RT = 9;
const POS_LE = 10;
const POS_RE = 11;
const POS_DT = 12;
const POS_LOLB = 13;
const POS_MLB = 14;
const POS_ROLB = 15;
const POS_CB = 16;
const POS_FS = 17;
const POS_SS = 18;
const POS_K = 19;
const POS_P = 20;


exports.generatePlayer = function generatePlayer(pos, rating) {
    let name =
      draftData[Math.floor(Math.random() * draftData.length)].firstname +
      " " +
      draftData[Math.floor(Math.random() * draftData.length)].lastname;
    let faceSrc = draftData[0].faceSrc;
    let age = 18;
    let playerComparison = Math.floor(Math.random() * draftData.length);
  
    while (draftData[playerComparison].position != pos) {
      playerComparison = Math.floor(Math.random() * draftData.length);
    }
    let number = draftData[playerComparison].number;
    let position = draftData[playerComparison].position;
    let height = draftData[playerComparison].height;
    let pass =
      draftData[playerComparison].pass -
      Math.floor(Math.random() * 12);
    let awareness =
      draftData[playerComparison].awareness -
      Math.floor(Math.random() * 12);
    let rush =
      draftData[playerComparison].rush -
      Math.floor(Math.random() * 12);
    let speed =
      draftData[playerComparison].speed -
      Math.floor(Math.random() * 3);
    let catching =
      draftData[playerComparison].catch -
      Math.floor(Math.random() * 12);
    let block =
      draftData[playerComparison].block -
      Math.floor(Math.random() * 12);
    let breakBlock =
      draftData[playerComparison].breakBlock -
      Math.floor(Math.random() * 12);
    let tackle =
      draftData[playerComparison].tackle -
      Math.floor(Math.random() * 12);
    let kick =
      draftData[playerComparison].kick -
      Math.floor(Math.random() * 12);
    //2 years the plus one is because the contract years go down AFTER the draft not before but contract years should be 2 for rookies
    let years = Math.floor(Math.random() * 3) + 1;
    let salary = 2400000;
  
    //RATING FORMULA
    let ply = {
      name: name,
      faceSrc: faceSrc,
      number: number,
      age: age,
      position: position,
      height: height,
      pass: pass,
      awareness: awareness,
      rush: rush,
      speed: speed,
      catch: catching,
      block: block,
      breakBlock: breakBlock,
      tackle: tackle,
      kick: kick,
      years: years,
      salary: salary
    };
    calculateRating(ply);
  
    while (ply.rating > rating) {
      if (ply.rating <= rating) {
        break;
      }
      if (ply.awareness <= 40) {
        break;
      }
      ply.awareness--;
      if (ply.position === POS_QB) {
        ply.pass--;
  
      }
  
      if (ply.position >= POS_HB && ply.position <= POS_TE) {
        ply.rush--;
        // ply.speed --;
        ply.catch--;
        ply.block--;
      }
  
      if (ply.position >= POS_LT && ply.position <= POS_RT) {
        ply.block--;
      }
  
      if (ply.position >= POS_LE && ply.position <= POS_DT) {
        ply.breakBlock--;
        ply.tackle--;
      }
  
      if (ply.position >= POS_LOLB && ply.position <= POS_SS) {
        ply.breakBlock--;
        ply.tackle--;
        ply.catch--;
        // ply.speed --;
      }
  
      if (ply.position >= POS_K && ply.position <= POS_P) {
        ply.kick--;
      }
      calculateRating(ply);
    }
  
    while (ply.rating < rating) {
      if (ply.rating >= rating) {
        break;
      }
  
  
      if (ply.awareness >= 99) {
        break;
      }
      if (ply.pass >= 99) {
        break;
      }
      if (ply.rush >= 99) {
        break;
      }
      if (ply.block >= 99) {
        break;
      }
      if (ply.breakBlock >= 99) {
        break;
      }
      if (ply.tackle >= 99) {
        break;
      }
      if (ply.catch >= 99) {
        break;
      }
      if (ply.kick >= 99) {
        break;
      }
      if (ply.speed >= 99) {
        break;
      }
  
  
      ply.awareness++;
      if (ply.position === POS_QB) {
        ply.pass++;
  
      }
  
      if (ply.position >= POS_HB && ply.position <= POS_TE) {
        ply.rush++;
        // ply.speed ++;
        ply.catch++;
        ply.block++;
      }
  
      if (ply.position >= POS_LT && ply.position <= POS_RT) {
        ply.block++;
      }
  
      if (ply.position >= POS_LE && ply.position <= POS_DT) {
        ply.breakBlock++;
        ply.tackle++;
      }
  
      if (ply.position >= POS_LOLB && ply.position <= POS_SS) {
        ply.breakBlock++;
        ply.tackle++;
        ply.catch++;
        // ply.speed ++;
      }
  
      if (ply.position >= POS_K && ply.position <= POS_P) {
        ply.kick++;
      }
      calculateRating(ply)
    }
    return ply;
  
  }

  exports.calculateRating = calculateRating = (ply) => {
    //BLOCK OVER 99
    if (ply.pass >= 99) {
      ply.pass = 99;
    }
    if (ply.awareness >= 99) {
      ply.awareness = 99;
    }
    if (ply.rush >= 99) {
      ply.rush = 99;
    }
    if (ply.speed >= 99) {
      ply.speed = 99;
    }
    if (ply.catch >= 99) {
      ply.catch = 99;
    }
    if (ply.block >= 99) {
      ply.block = 99;
    }
    if (ply.breakBlock >= 99) {
      ply.breakBlock = 99;
    }
    if (ply.tackle >= 99) {
      ply.tackle = 99;
    }
    if (ply.kick >= 99) {
      ply.kick = 99;
    }

    //under 40 too
    if (ply.pass <= 40) {
      ply.pass = 40;
    }
    if (ply.awareness <= 40) {
      ply.awareness = 40;
    }
    if (ply.rush <= 40) {
      ply.rush = 40;
    }
    if (ply.speed <= 40) {
      ply.speed = 40;
    }
    if (ply.catch <= 40) {
      ply.catch = 40;
    }
    if (ply.block <= 40) {
      ply.block = 40;
    }
    if (ply.breakBlock <= 40) {
      ply.breakBlock = 40;
    }
    if (ply.tackle <= 40) {
      ply.tackle = 40;
    }
    if (ply.kick <= 40) {
      ply.kick = 40;
    }

    switch (ply.position) {
      case POS_QB:
        ply.rating = Math.round(
          ((ply.pass + ply.awareness)) / 2
        );
        break;
      case POS_HB:
        ply.rating = Math.round(
          (ply.speed + ply.rush + ply.awareness) / 3
        );
        break;
      case POS_FB:
        ply.rating = Math.round(
          (ply.block + ply.rush * 2 + ply.awareness) / 4
        );
        break;
      case POS_WR:
        ply.rating = Math.round(
          (ply.catch + ply.speed + ply.awareness) / 3
        );
        break;
      case POS_TE:
        ply.rating = Math.round(
          (ply.block + ply.catch + ply.speed + ply.awareness) / 4
        );
        break;
      case POS_LT:
        ply.rating = Math.round((ply.block + ply.awareness) / 2);
        break;
      case 6:
        ply.rating = Math.round((ply.block + ply.awareness) / 2);
        break;
      case 7:
        ply.rating = Math.round((ply.block + ply.awareness) / 2);
        break;
      case 8:
        ply.rating = Math.round((ply.block + ply.awareness) / 2);
        break;
      case 9:
        ply.rating = Math.round((ply.block + ply.awareness) / 2);
        break;
      case 10:
        ply.rating = Math.round(
          (ply.tackle + ply.breakBlock + ply.awareness) / 3
        );
        break;
      case 11:
        ply.rating = Math.round(
          (ply.tackle + ply.breakBlock + ply.awareness) / 3
        );
        break;
      case 12:
        ply.rating = Math.round(
          (ply.tackle + ply.breakBlock + ply.awareness) / 3
        );
        break;
      case 13:
        ply.rating = Math.round(
          (ply.tackle + ply.breakBlock + ply.awareness + ply.speed) / 4
        );
        break;
      case 14:
        ply.rating = Math.round(
          (ply.tackle + ply.breakBlock + ply.awareness + ply.speed) / 4
        );
        break;
      case 15:
        ply.rating = Math.round(
          (ply.tackle + ply.breakBlock + ply.awareness + ply.speed) / 4
        );
        break;
      case 16:
        ply.rating = Math.round(
          (ply.tackle + ply.catch + ply.awareness + ply.speed) / 4
        );
        break;
      case 17:
        ply.rating = Math.round(
          (ply.tackle + ply.catch + ply.awareness + ply.speed) / 4
        );
        break;
      case 18:
        ply.rating = Math.round(
          (ply.tackle + ply.catch + ply.awareness + ply.speed) / 4
        );
        break;
      case 19:
        ply.rating = Math.round(
          (ply.kick + ply.awareness) / 2
        );
        break;
      case 20:
        ply.rating = Math.round(
          (ply.kick + ply.awareness) / 2
        );
        break;
      default:
        ply.rating = 40;
        break;
    }
  }

  exports.calculateTeamRating = function calculateTeamRating(team) {
    try {
      let total = 0;
      let rat = 0;
      let kickers = 0;
      for (let i = 0; i < team.roster.length; i++) {
        if (team.roster[i].position === POS_K || team.roster[i].position === POS_P) {
          kickers++;
        } else {
          total += team.roster[i].rating;
        }
      }
      rat = Math.round(
        (total / (team.roster.length - kickers))
      );

      team.rating = Math.round(scaleBetween(rat, 60, 99, 65, 85));
      if (team.rating >= 99) {
        team.rating = 99;
      }

    } catch (err) {
      console.log(team.name + "calculateRating()" + err);
    }
  }

  function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (
      ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
    );
  }


  exports.manageCFPPollRating = function manageCFPPollRating(teams){
    for(let i=0; i<teams.length; i++){
      let team = teams[i];
      console.log(team.name);
      let oldRating = team.rating;
      // let maxChange = 5;
      console.log(team.rank);
      let rating = 0;
      if(team.rank <= 25){
      rating = Math.round(scaleBetween(team.rank, 93,84,1,25));
      }else{
      rating = Math.round(scaleBetween(team.rank, 84,69,25,130));
      }

      // rating = Math.round(scaleBetween(team.rank, 94,68,1,130));

      
  console.log(`${team.name} old:${oldRating} new:${rating}`);
  
      
      if (team.rating > rating) {
        while (team.rating != rating) {

          for (let i = 0; i < team.roster.length; i++) {
            let ply = team.roster[i];
            let scaledMovement = Math.round(scaleBetween(ply.rating, 0,3,60,99));

            ply.awareness -=scaledMovement;
            if(ply.position === POS_QB){
              ply.pass -=scaledMovement;
        
            }
        
            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush -=scaledMovement;
              // ply.speed -=scaledMovement;
              ply.catch -=scaledMovement;
              ply.block -=scaledMovement;
            }
        
            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block -=scaledMovement;
            }
        
            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock -=scaledMovement;
              ply.tackle -=scaledMovement;
            }
        
            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock -=scaledMovement;
              ply.tackle -=scaledMovement;
              ply.catch -=scaledMovement;
              // ply.speed -=scaledMovement;
            }
        
            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick -=scaledMovement;
            }
            calculateRating(ply);
            exports.calculateTeamRating(team);
          }
            if (team.rating <= rating) {
              break;
            }
            // if ((oldRating-team.rating) >= maxChange) {
            //   break;
            // }
        }
      }
      if (team.rating < rating) {
        while (team.rating != rating) {
          for (let i = 0; i < team.roster.length; i++) {
            let ply = team.roster[i];
            let scaledMovement = Math.round(scaleBetween(ply.rating, 3,0,60,99));

            ply.awareness += scaledMovement;
            if(ply.position === POS_QB){
              ply.pass += scaledMovement;
            }
        
            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush += scaledMovement;
              // ply.speed += scaledMovement;
              ply.catch += scaledMovement;
              ply.block += scaledMovement;
            }
        
            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block += scaledMovement;
            }
        
            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock += scaledMovement;
              ply.tackle += scaledMovement;
            }
        
            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock += scaledMovement;
              ply.tackle += scaledMovement;
              ply.catch += scaledMovement;
              // ply.speed += scaledMovement;
            }
        
            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick += scaledMovement;
            }
            calculateRating(ply);
            exports.calculateTeamRating(team);
          }
            if (team.rating >= rating) {
              break;
            }
            // if ((oldRating-team.rating)*-1 >= maxChange) {
            //   break;
            // }
    }
  }
  console.log(`${team.name} old:${oldRating} new:${team.rating}`);
    }
  }