class Player {
    constructor(player) {
      this.name = player.name;
      this.position = player.position;
      this.positionString;
      this.getPositionString();
      this.faceSrc = player.faceSrc;
      if (player.faceSrc == null || player.faceSrc.length < 1) {
      this.faceSrc = portraits[Math.floor(Math.random()*portraits.length)];
      }
      this.teamLogoSrc;
      this.teamName;
      this.usage = 0;
      this.reboundUsage = 0;
      this.number = player.number;
      this.height = player.height;
      this.years = player.years;
      this.age = player.age;
      this.salary = player.salary;
      this.previousSeasonsStats = [];
      this.role = 0;
      this.tempRole = 0;
      this.trained = false;
      this.redshirted = false;
      this.redshirt = false;
  
      this.projectedPick = 0;
  
      //rotation
      this.minutes = 0;
      this.minutesRemaining = 0;
      this.minutesPlayed = 0;
      this.minutesPlayedThisQuarter = 0;
  
      this.statsHistory = [];
  
      this.rating = 80;
  
      this.interest = 0;
      this.signed = false;
  
      //JSON
      this.team = player.team;
  
      //FOOTBALL RATINGS BABYYYY
      this.pass = player.pass;
      this.awareness = player.awareness;
      this.rush = player.rush;
      this.speed = player.speed;
      this.catch = player.catch;
      this.block = player.block;
      this.breakBlock = player.breakBlock;
      this.tackle = player.tackle;
      this.kick = player.kick;
  
      //training
      this.passOld = player.pass;
      this.awarenessOld = player.awareness;
      this.rushOld = player.rush;
      this.speedOld = player.speed;
      this.catchOld = player.catch;
      this.blockOld = player.block;
      this.breakBlockOld = player.breakBlock;
      this.tackleOld = player.tackle;
      this.kickOld = player.kick;
  
      //football stats
      this.completions = 0;
      this.attempts = 0;
      this.touchdowns = 0;
      this.yards = 0;
      this.rushYards = 0;
      this.rushAttempts = 0;
      this.rushTouchdowns = 0;
      this.kicksAttempted = 0;
      this.kicksMade = 0;
      this.receptions = 0;
      this.tackles = 0;
      this.interceptions = 0;
      this.fumbles = 0;
      this.fumblesRecovered = 0;
      this.sacks = 0;
      this.punts = 0;
      this.puntYards = 0;
  
      this.seasonCompletions = 0;
      this.seasonAttempts = 0;
      this.seasonTouchdowns = 0;
      this.seasonYards = 0;
      this.seasonRushYards = 0;
      this.seasonRushAttempts = 0;
      this.seasonRushTouchdowns = 0;
      this.seasonKicksAttempted = 0;
      this.seasonKicksMade = 0;
      this.seasonReceptions = 0;
      this.seasonTackles = 0;
      this.seasonInterceptions = 0;
      this.seasonFumbles = 0;
      this.seasonFumblesRecovered = 0;
      this.seasonSacks = 0;
      this.seasonPunts = 0;
      this.seasonPuntYards = 0;
  
      // console.log(this.name + " " + this.years + " " + this.salary);
    }
  
    getCollegeYearString() {
      let str = ''
      if (this.age === 18) {
        str = 'FR'
      }
      if (this.age === 19) {
        str = 'SO'
      }
      if (this.age === 20) {
        str = 'JR'
      }
      if (this.age >= 21) {
        str = 'SR'
      }
  
      if (this.redshirt || this.redshirted) {
        str += ' (RS)';
      }
      return str;
    }
  
    getPositionString() {
      if (this.position === 0) {
        this.positionString = "QB";
      } else if (this.position === 1) {
        this.positionString = "RB";
      } else if (this.position === 2) {
        this.positionString = "FB";
      } else if (this.position === 3) {
        this.positionString = "WR";
      } else if (this.position === 4) {
        this.positionString = "TE";
      } else if (this.position === 5) {
        this.positionString = "LT";
      } else if (this.position === 6) {
        this.positionString = "LG";
      } else if (this.position === 7) {
        this.positionString = "C";
      } else if (this.position === 8) {
        this.positionString = "RG";
      } else if (this.position === 9) {
        this.positionString = "RT";
      } else if (this.position === 10) {
        this.positionString = "LE";
      } else if (this.position === 11) {
        this.positionString = "RE";
      } else if (this.position === 12) {
        this.positionString = "DT";
      } else if (this.position === 13) {
        this.positionString = "LOLB";
      } else if (this.position === 14) {
        this.positionString = "MLB";
      } else if (this.position === 15) {
        this.positionString = "ROLB";
      } else if (this.position === 16) {
        this.positionString = "CB";
      } else if (this.position === 17) {
        this.positionString = "FS";
      } else if (this.position === 18) {
        this.positionString = "SS";
      } else if (this.position === 19) {
        this.positionString = "K";
      } else if (this.position === 20) {
        this.positionString = "P";
      }
    }
  
    calculateRating() {
      //BLOCK OVER 99
      if (this.pass >= 99) {
        this.pass = 99;
      }
      if (this.awareness >= 99) {
        this.awareness = 99;
      }
      if (this.rush >= 99) {
        this.rush = 99;
      }
      if (this.speed >= 99) {
        this.speed = 99;
      }
      if (this.catch >= 99) {
        this.catch = 99;
      }
      if (this.block >= 99) {
        this.block = 99;
      }
      if (this.breakBlock >= 99) {
        this.breakBlock = 99;
      }
      if (this.tackle >= 99) {
        this.tackle = 99;
      }
      if (this.kick >= 99) {
        this.kick = 99;
      }
  
      //under 40 too
      if (this.pass <= 40) {
        this.pass = 40;
      }
      if (this.awareness <= 40) {
        this.awareness = 40;
      }
      if (this.rush <= 40) {
        this.rush = 40;
      }
      if (this.speed <= 40) {
        this.speed = 40;
      }
      if (this.catch <= 40) {
        this.catch = 40;
      }
      if (this.block <= 40) {
        this.block = 40;
      }
      if (this.breakBlock <= 40) {
        this.breakBlock = 40;
      }
      if (this.tackle <= 40) {
        this.tackle = 40;
      }
      if (this.kick <= 40) {
        this.kick = 40;
      }
  
      // let bestrating = [this.off, this.def, this.pass, this.faceOff];
      // bestrating.sort(function (a, b) {
      //     if (a < b) {
      //         return 1;
      //     }
      //     if (a > b) {
      //         return -1;
      //     }
      //     return 0;
      // });
  
      // if (this.position != 4) {
      //     this.rating = Math.round(((this.off * 2) + (this.def * 2) + (this.pass) + (bestrating[0] * 2)) / 7);
      //     if (this.rating >= 99) {
      //         this.rating = 99;
      //     }
      // } else {
      //     this.rating = Math.round((this.positioning + this.reflexes)/2);
      // }
  
      switch (this.position) {
        case POS_QB:
          this.rating = Math.round(
            ((this.pass + this.awareness)) / 2
          );
          break;
        case POS_HB:
          this.rating = Math.round(
            (this.speed + this.rush + this.awareness) / 3
          );
          break;
        case POS_FB:
          this.rating = Math.round(
            (this.block + this.rush * 2 + this.awareness) / 4
          );
          break;
        case POS_WR:
          this.rating = Math.round(
            (this.catch + this.speed + this.awareness) / 3
          );
          break;
        case POS_TE:
          this.rating = Math.round(
            (this.block + this.catch + this.speed + this.awareness) / 4
          );
          break;
        case POS_LT:
          this.rating = Math.round((this.block + this.awareness) / 2);
          break;
        case 6:
          this.rating = Math.round((this.block + this.awareness) / 2);
          break;
        case 7:
          this.rating = Math.round((this.block + this.awareness) / 2);
          break;
        case 8:
          this.rating = Math.round((this.block + this.awareness) / 2);
          break;
        case 9:
          this.rating = Math.round((this.block + this.awareness) / 2);
          break;
        case 10:
          this.rating = Math.round(
            (this.tackle + this.breakBlock + this.awareness) / 3
          );
          break;
        case 11:
          this.rating = Math.round(
            (this.tackle + this.breakBlock + this.awareness) / 3
          );
          break;
        case 12:
          this.rating = Math.round(
            (this.tackle + this.breakBlock + this.awareness) / 3
          );
          break;
        case 13:
          this.rating = Math.round(
            (this.tackle + this.breakBlock + this.awareness + this.speed) / 4
          );
          break;
        case 14:
          this.rating = Math.round(
            (this.tackle + this.breakBlock + this.awareness + this.speed) / 4
          );
          break;
        case 15:
          this.rating = Math.round(
            (this.tackle + this.breakBlock + this.awareness + this.speed) / 4
          );
          break;
        case 16:
          this.rating = Math.round(
            (this.tackle + this.catch + this.awareness + this.speed) / 4
          );
          break;
        case 17:
          this.rating = Math.round(
            (this.tackle + this.catch + this.awareness + this.speed) / 4
          );
          break;
        case 18:
          this.rating = Math.round(
            (this.tackle + this.catch + this.awareness + this.speed) / 4
          );
          break;
        case 19:
          this.rating = Math.round(
            (this.kick + this.awareness) / 2
          );
          break;
        case 20:
          this.rating = Math.round(
            (this.kick + this.awareness) / 2
          );
          break;
        default:
          this.rating = 40;
          break;
      }
    }
  }