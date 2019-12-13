class Team {
    constructor(team) {
      this.conferenceId = team.conferenceId;
      this.id = team.id;
      this.name = team.name;
      this.rating = 0;
  
      //this will be updated every game
      this.defenseRating = 0;
      this.offenseRating = 0;
  
      this.division = team.division;
  
  
      this.scheduleRating = 0;
      this.scheduleRank=0;
  
      this.totalRankingRating = 0;
  
      this.logoSrc = team.logoSrc;
      this.coach.teamLogoSrc = team.logoSrc;
      this.coachingBudget = 2000000;
      this.schedule = [];
      this.played = [];
      this.wins = 0;
      this.losses = 0;
      this.otLosses = 0;
      this.roster = [];
      this.lineup = [];
      this.history = [];
      this.seed = 1;
      this.ratingRank;
      this.powerRanking = 30;
      this.scholarshipsAvailable = 0;
      this.secondChancePoints = 0;
      //keep track of retirmements
      this.retirements = [];
      // this.calculateRating();
      this.firstTeam;
      this.secondTeam = [];
      this.bench = [];
      this.constantBench = [];
      this.trainingPoints = 0;
      // this.reorderLineup();
  
      this.draftPicks = [
        {
          round: 1,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 2,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 3,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 4,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 5,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 6,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 7,
          originalTeam: this.name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        }
      ];
  
      //stats
      this.seasonPoints = 0;
      this.seasonPointsAllowed = 0;
      this.seasonPassYards = 0;
      this.seasonRushYards = 0;
      this.seasonPlays = 0;
  
  
      this.expiring = {
        name: "Expiring Contracts",
        roster: [],
        logoSrc: "https://github.com/cbanfiel/On-Paper-Sports-Images/blob/master/app/football.png?raw=true",
        reorderLineup: function () {
          availableFreeAgents.roster.sort(function (a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
            return 0;
          });
        }
      };
  
      //salary cap
      this.salary = 0;
  
      //football
      this.qbs = [];
      this.rbs = [];
      this.fbs = [];
      this.tes = [];
      this.wrs = [];
      this.ol = [];
      this.dl = [];
      this.lbs = [];
      this.dbs = [];
      this.ks = [];
      this.ps = [];
  
  
  
      this.interestedProspects = { roster: [] };
      this.offered = [];
  
      this.offStarters = { passers: [], runners: [], recievers: [], blockers: [] };
      this.defStarters = { rushers: [], intercepters: [] }
    }
  
    generateScheduleRating() {
      let rat = 0;
      for (let i = 0; i < this.schedule.length; i++) {
        rat += this.schedule[i].rating;
      }
  
      this.scheduleRating = Math.round(rat / this.schedule.length);
  
      // console.log(this.name +  ' ' + this.scheduleRating);
  
    }
  
    releaseExpiring() {
      for (let i = 0; i < this.expiring.roster.length; i++) {
        availableFreeAgents.roster.push(this.expiring.roster[i]);
      }
      this.expiring.roster = [];
    }
  
    calculateRating() {
      try {
        let total = 0;
        let rat = 0;
        let kickers = 0;
        for (let i = 0; i < this.roster.length; i++) {
          if (this.roster[i].position === POS_K || this.roster[i].position === POS_P) {
            kickers++;
          } else {
            total += this.roster[i].rating;
          }
        }
        rat = Math.round(
          (total / (this.roster.length - kickers))
        );
  
        this.rating = Math.round(scaleBetween(rat, 60, 99, 65, 85));
        if (this.rating >= 99) {
          this.rating = 99;
        }
  
      } catch (err) {
        console.log(this.name + "calculateRating()");
      }
    }
  
    /*
  1st quarter, first 8 minutes: 1st team
  1st quarter, last 4 minutes; 
  2nd quarter, first 4 minutes: 2nd team
  3rd quarter, first 8 minutes: 1st team
  3rd quarter, last 4 minutes;
  
  4th quarter, first 4 minutes: 2nd team
  4th quarter, last 8 minutes: 1st team
  
  */
  
    checkRequirements() {
      let diff = 0;
      let arr = [];
      if (this.qbs.length < POS_QB_REQUIREMENTS) {
        diff = POS_QB_REQUIREMENTS - this.qbs.length;
        arr.push({
          position: POS_QB,
          amount: diff
        });
      }
      if (this.rbs.length < POS_HB_REQUIREMENTS) {
        diff = POS_HB_REQUIREMENTS - this.rbs.length;
        arr.push({
          position: POS_HB,
          amount: diff
        })
      }
      if (this.wrs.length < POS_WR_REQUIREMENTS) {
        diff = POS_WR_REQUIREMENTS - this.wrs.length;
        arr.push({
          position: POS_WR,
          amount: diff
        })
      }
      // if(this.tes.length < POS_TE_REQUIREMENTS){
      //   diff = POS_TE_REQUIREMENTS - this.tes.length;
      //   arr.push( {
      //     position: POS_TE,
      //     amount: diff
      //   }
      // }
      if (this.ol.length < POS_OL_REQUIREMENTS) {
        diff = POS_OL_REQUIREMENTS - this.ol.length;
        arr.push({
          position: POS_LT,
          amount: diff
        })
      }
      if (this.dl.length < POS_DL_REQUIREMENTS) {
        diff = POS_DL_REQUIREMENTS - this.dl.length;
        arr.push({
          position: POS_LE,
          amount: diff
        })
      }
      if (this.dbs.length < POS_DB_REQUIREMENTS) {
        diff = POS_DB_REQUIREMENTS - this.dbs.length;
        arr.push({
          position: POS_CB,
          amount: diff
        })
      }
      if (this.ks.length < POS_K_REQUIREMENTS) {
        diff = POS_K_REQUIREMENTS - this.ks.length;
        arr.push({
          position: POS_K,
          amount: diff
        })
      }
      if (this.ps.length < POS_P_REQUIREMENTS) {
        diff = POS_P_REQUIREMENTS - this.ps.length;
        arr.push({
          position: POS_P,
          amount: diff
        })
      }
      return arr;
    }
  
    manageFootballLineup() {
      this.roster.sort(function (a, b) {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        } else {
          return 0;
        }
      });
  
  
      this.qbs = [];
      this.rbs = [];
      this.fbs = [];
      this.tes = [];
      this.wrs = [];
      this.ol = [];
      this.dl = [];
      this.lbs = [];
      this.dbs = [];
      this.ks = [];
      this.ps = [];
  
  
      for (let i = 0; i < this.roster.length; i++) {
        let player = this.roster[i];
        if (!player.redshirted) {
          if (player.position === 0) {
            this.qbs.push(player);
          } else if (player.position === 1) {
            this.rbs.push(player);
          } else if (player.position === 2) {
            this.fbs.push(player);
          } else if (player.position === 3) {
            this.wrs.push(player);
          } else if (player.position === 4) {
            this.tes.push(player);
          }
          else if (player.position > 4 && player.position < 10) {
            this.ol.push(player);
          }
          else if (player.position >= POS_LE && player.position <= POS_DT) {
            this.dl.push(player);
          }
          else if (player.position >= 13 && player.position <= 15) {
            this.lbs.push(player);
          }
          else if (player.position > 15 && player.position < 19) {
            this.dbs.push(player);
          }
          else if (player.position === 19) {
            this.ks.push(player);
          }
          else if (player.position === 20) {
            this.ps.push(player);
          }
  
        }
  
        //   for (let i = 0; i < this.offered.length; i++) {
        //     let player = this.offered[i];
        //     if (player.position === 0) {
        //       this.qbs.push(player);
        //     } else if (player.position === 1) {
        //       this.rbs.push(player);
        //     } else if (player.position === 2) {
        //       this.fbs.push(player);
        //     } else if (player.position === 3) {
        //       this.wrs.push(player);
        //     } else if (player.position === 4) {
        //       this.tes.push(player);
        //     }
        //     else if (player.position > 4 && player.position < 10) {
        //       this.ol.push(player);
        //     }
        //     else if (player.position >=POS_LE && player.position <= POS_DT) {
        //       this.dl.push(player);
        //     }
        //     else if (player.position >= 13 && player.position <= 15) {
        //       this.lbs.push(player);
        //     }
        //     else if (player.position > 15 && player.position < 19) {
        //       this.dbs.push(player);
        //     }
        //     else if (player.position === 19) {
        //       this.ks.push(player);
        //     }
        //     else if (player.position === 20) {
        //       this.ps.push(player);
        //     }
        // }
      }
  
      // let missingRequirements = this.checkRequirements()
      // for(let i=0; i<missingRequirements.length; i++){
      //   console.log(missingRequirements[i].position + ' ' + missingRequirements[i].amount + ' ' + this.name);
      // }
  
    }
  
    reorderLineup() {
      // this.manageHockeyLineups();
      this.manageFootballLineup();
      this.calculateRating();
    }
  
    setPlayerRoles() {
      try {
        for (let i = 0; i < this.roster.length; i++) {
          this.roster[i].role = 0;
          this.roster[i].tempRole = 0;
        }
  
        for (let i = 0; i < this.firstTeam.length; i++) {
          this.firstTeam[i].role = 3;
          this.firstTeam[i].tempRole = 3;
        }
  
        for (let i = 0; i < this.secondTeam.length; i++) {
          this.secondTeam[i].role = 1;
          this.secondTeam[i].tempRole = 1;
        }
  
        let tot = 0;
        for (let i = 0; i < this.firstTeam.length; i++) {
          tot += this.firstTeam[i].rating;
        }
  
        for (let i = 0; i < this.firstTeam.length; i++) {
          let amt = (this.firstTeam[i].rating / tot) * 100;
          if (amt > 21) {
            // console.log(this.firstTeam[i].name);
            this.firstTeam[i].role = 4;
            this.firstTeam[i].tempRole = 4;
            break;
          }
        }
  
        this.secondTeam.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          } else {
            return 0;
          }
        });
  
        this.secondTeam[0].role = 2;
        this.secondTeam[0].tempRole = 2;
      } catch (err) {
        console.log("Role Error");
      }
    }
  
    manageUsage() {
      try {
        let rebTotal = 0;
        for (let i = 0; i < this.firstTeam.length; i++) {
          rebTotal += this.firstTeam[i].reb + this.firstTeam[i].position * 20;
        }
  
        for (let i = 0; i < this.firstTeam.length; i++) {
          this.firstTeam[i].reboundUsage =
            ((this.firstTeam[i].reb + this.firstTeam[i].position * 20) /
              rebTotal) *
            100;
        }
  
        // rebTotal = 0;
        // for (let i = 0; i < this.secondTeam.length; i++) {
        //     rebTotal += this.secondTeam[i].reb + (this.secondTeam[i].position * 20);
        // }
  
        // for (let i = 0; i < this.secondTeam.length; i++) {
        //     this.secondTeam[i].reboundUsage = ((this.secondTeam[i].reb + (this.secondTeam[i].position * 20)) / rebTotal) * 100;
        // }
  
        let tot = 0;
        for (let i = 0; i < this.firstTeam.length; i++) {
          tot +=
            scaleBetween(this.firstTeam[i].off, 0, 400, 40, 99) +
            scaleBetween(this.firstTeam[i].threePoint, 0, 400, 40, 99) / 4;
          if (i < 2) {
            //backcourt
            tot += this.frontCourtVsBackCourt * 35;
          } else {
            //frontcourt
            tot -= this.frontCourtVsBackCourt * 35;
          }
        }
  
        for (let i = 0; i < this.firstTeam.length; i++) {
          let usage =
            scaleBetween(this.firstTeam[i].off, 0, 400, 40, 99) +
            scaleBetween(this.firstTeam[i].threePoint, 0, 400, 40, 99) / 4;
          if (i < 2) {
            //backcourt
            tot += this.frontCourtVsBackCourt * 35;
          } else {
            //frontcourt
            tot -= this.frontCourtVsBackCourt * 35;
          }
  
          this.firstTeam[i].usage = (usage / tot) * 100;
        }
  
        // tot = 0;
        // for (let i = 0; i < this.secondTeam.length; i++) {
        //     tot += (this.secondTeam[i].off + (this.secondTeam[i].threePoint / 4));
        // }
  
        // for (let i = 0; i < this.secondTeam.length; i++) {
        //     this.secondTeam[i].usage = ((this.secondTeam[i].off + (this.secondTeam[i].threePoint / 4)) / tot) * 100;
        // }
  
        if (this.roster.length <= this.rotationSize) {
          console.log(this.name + " Does not have enough players");
          this.rotationSize = this.roster.length - 1;
        }
  
        //MINUTES IN ROTATION
        tot = 0;
  
        let includedInRotation = [...this.firstTeam];
        for (let i = 0; i < this.bench.length; i++) {
          if (includedInRotation.length >= this.rotationSize) {
            break;
          } else {
            includedInRotation.push(this.bench[i]);
          }
        }
  
        for (let i = 0; i < includedInRotation.length; i++) {
          tot += scaleBetween(includedInRotation[i].rating, 300, 1000, 80, 99);
          tot += scaleBetween(includedInRotation[i].role, 0, 600, 0, 4);
        }
  
        for (let i = 0; i < includedInRotation.length; i++) {
          includedInRotation[i].minutes = Math.round(
            ((scaleBetween(includedInRotation[i].rating, 300, 1000, 80, 99) +
              scaleBetween(includedInRotation[i].role, 0, 600, 0, 4)) /
              tot) *
            240
          );
        }
  
        for (let i = 0; i < includedInRotation.length; i++) {
          if (includedInRotation[i].minutes >= 38) {
            let rem = includedInRotation[i].minutes - 38;
            includedInRotation[i].minutes = 38;
  
            let index = i + 1;
            while (rem > 0) {
              includedInRotation[index].minutes++;
              rem--;
              index++;
              if (index >= includedInRotation.length - 1) {
                index = i + 1;
              }
            }
          }
        }
  
        this.bench = [];
        for (let i = 0; i < includedInRotation.length; i++) {
          if (!this.firstTeam.includes(includedInRotation[i])) {
            this.bench.push(includedInRotation[i]);
          }
        }
      } catch (err) {
        console.log(this.name + " ERROR");
        console.log(err);
      }
  
      //messes up
      // this.lineup = this.firstTeam;
      // this.lineup=[];
      // this.lineup = this.lineup.concat(this.firstTeam);
      // this.lineup = this.firstTeam;
      this.lineup = this.firstTeam.slice(0);
  
      this.bench.sort(function (a, b) {
        if (a.minutes > b.minutes) {
          return 1;
        }
        if (a.minutes > b.minutes) {
          return -1;
        } else {
          return 0;
        }
      });
  
      this.constantBench = [...this.bench];
    }
  
    generateBenchWarmers() {
      let benchWarmers = [];
  
      for (let i = 0; i < this.roster.length; i++) {
        if (
          !this.firstTeam.includes(this.roster[i]) &&
          !this.secondTeam.includes(this.roster[i])
        ) {
          benchWarmers.push(this.roster[i]);
        }
      }
  
      return benchWarmers;
    }
  }