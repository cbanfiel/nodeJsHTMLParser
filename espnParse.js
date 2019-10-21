const node = require('node-html-parser');
const request = require('request');
var fs = require('fs');

let teams = [
    {
      "id": 2005
    },
    {
      "id": 2006
    },
    {
      "id": 333
    },
    {
      "id": 12
    },
    {
      "id": 9
    },
    {
      "id": 8
    },
    {
      "id": 2032
    },
    {
      "id": 349
    },
    {
      "id": 2
    },
    {
      "id": 2050
    },
    {
      "id": 239
    },
    {
      "id": 68
    },
    {
      "id": 103
    },
    {
      "id": 189
    },
    {
      "id": 2084
    },
    {
      "id": 252
    },
    {
      "id": 25
    },
    {
      "id": 2116
    },
    {
      "id": 2117
    },
    {
      "id": 2132
    },
    {
      "id": 228
    },
    {
      "id": 38
    },
    {
      "id": 36
    },
    {
      "id": 150
    },
    {
      "id": 151
    },
    {
      "id": 2199
    },
    {
      "id": 57
    },
    {
      "id": 52
    },
    {
      "id": 278
    },
    {
      "id": 61
    },
    {
      "id": 59
    },
    {
      "id": 62
    },
    {
      "id": 248
    },
    {
      "id": 70
    },
    {
      "id": 356
    },
    {
      "id": 84
    },
    {
      "id": 2294
    },
    {
      "id": 66
    },
    {
      "id": 2305
    },
    {
      "id": 2306
    },
    {
      "id": 2309
    },
    {
      "id": 96
    },
    {
      "id": 2348
    },
    {
      "id": 97
    },
    {
      "id": 99
    },
    {
      "id": 276
    },
    {
      "id": 120
    },
    {
      "id": 235
    },
    {
      "id": 2390
    },
    {
      "id": 193
    },
    {
      "id": 130
    },
    {
      "id": 127
    },
    {
      "id": 2393
    },
    {
      "id": 135
    },
    {
      "id": 344
    },
    {
      "id": 142
    },
    {
      "id": 2426
    },
    {
      "id": 158
    },
    {
      "id": 2440
    },
    {
      "id": 167
    },
    {
      "id": 166
    },
    {
      "id": 153
    },
    {
      "id": 152
    },
    {
      "id": 249
    },
    {
      "id": 2433
    },
    {
      "id": 2459
    },
    {
      "id": 77
    },
    {
      "id": 87
    },
    {
      "id": 195
    },
    {
      "id": 194
    },
    {
      "id": 201
    },
    {
      "id": 197
    },
    {
      "id": 145
    },
    {
      "id": 2483
    },
    {
      "id": 204
    },
    {
      "id": 213
    },
    {
      "id": 221
    },
    {
      "id": 2509
    },
    {
      "id": 242
    },
    {
      "id": 164
    },
    {
      "id": 21
    },
    {
      "id": 23
    },
    {
      "id": 2567
    },
    {
      "id": 2579
    },
    {
      "id": 2572
    },
    {
      "id": 309
    },
    {
      "id": 24
    },
    {
      "id": 183
    },
    {
      "id": 2628
    },
    {
      "id": 218
    },
    {
      "id": 2633
    },
    {
      "id": 251
    },
    {
      "id": 245
    },
    {
      "id": 2641
    },
    {
      "id": 2649
    },
    {
      "id": 2655
    },
    {
      "id": 202
    },
    {
      "id": 5
    },
    {
      "id": 26
    },
    {
      "id": 41
    },
    {
      "id": 2439
    },
    {
      "id": 30
    },
    {
      "id": 254
    },
    {
      "id": 328
    },
    {
      "id": 2638
    },
    {
      "id": 238
    },
    {
      "id": 258
    },
    {
      "id": 259
    },
    {
      "id": 154
    },
    {
      "id": 264
    },
    {
      "id": 265
    },
    {
      "id": 277
    },
    {
      "id": 2711
    },
    {
      "id": 275
    },
    {
      "id": 2751
    },
    {
      "id": 2653
    },
    {
      "id": 58
    },
    {
      "id": 113
    },
    {
      "id": 98
    },
    {
      "id": 326
    },
    {
      "id": 2226
    },
    {
      "id": 2229
    },
    {
      "id": 2636
    },
    {
      "id": 2247
    },
    {
      "id": 295
    },
    {
      "id": 6
    }
  ]

  //nfl
  teams = [
    {
      "name": "ARI",
      "id": 0
    },
    {
      "name": "ATL",
      "id": 1
    },
    {
      "name": "BAL",
      "id": 2
    },
    {
      "name": "BUF",
      "id": 3
    },
    {
      "name": "CAR",
      "id": 4
    },
    {
      "name": "CHI",
      "id": 5
    },
    {
      "name": "CIN",
      "id": 6
    },
    {
      "name": "CLE",
      "id": 7
    },
    {
      "name": "DAL",
      "id": 8
    },
    {
      "name": "DEN",
      "id": 9
    },
    {
      "name": "DET",
      "id": 10
    },
    {
      "name": "GB",
      "id": 11
    },
    {
      "name": "HOU",
      "id": 12
    },
    {
      "name": "IND",
      "id": 13
    },
    {
      "name": "JAX",
      "id": 14
    },
    {
      "name": "KC",
      "id": 15
    },
    {
      "name": "LAC",
      "id": 16
    },
    {
      "name": "LAR",
      "id": 17
    },
    {
      "name": "MIA",
      "id": 18
    },
    {
      "name": "MIN",
      "id": 19
    },
    {
      "name": "NE",
      "id": 20
    },
    {
      "name": "NO",
      "id": 21
    },
    {
      "name": "NYG",
      "id": 22
    },
    {
      "name": "NYJ",
      "id": 23
    },
    {
      "name": "OAK",
      "id": 24
    },
    {
      "name": "PHI",
      "id": 25
    },
    {
      "name": "PIT",
      "id": 26
    },
    {
      "name": "SF",
      "id": 27
    },
    {
      "name": "SEA",
      "id": 28
    },
    {
      "name": "TB",
      "id": 29
    },
    {
      "name": "TEN",
      "id": 30
    },
    {
      "name": "WAS",
      "id": 31
    }
  ];

let rushing = '';
let receiving = '';
let defense = '';
let kicking = '';

async function pass(){
let passing = '';
for(let tm=0; tm<teams.length; tm++){
  let link = `https://www.espn.com/college-football/team/roster/_/id/${teams[tm].id}/`;
  //NFL
  link = `https://www.espn.com/nfl/team/roster/_/name/${teams[tm].name}/`

    request(link, function(err,res,body){
        const root = node.parse(body);
        let tds = root.querySelectorAll('span');
        let pix = root.querySelectorAll('a');
        let str = `${teams[tm].id}`;
        let picStr = `${teams[tm].id}`;
        // console.log(root.toString());
        // console.log(tds[3].toString());

        //data height, weight, name, number, year
        for(let i=0; i<tds.length; i++){
          let data = (tds[i].rawText);
          str+=data;
          data = data.replace(/\D/g,'');
          if(data.length>0){
            str+=','+data;
          }
          
          if(tds[i].rawText.length<1){
            str+= '\n' + `${teams[tm].id},`;
          }else{
          str+=','
          }
        }

        fs.appendFile('espnData.txt', str, function(err){
          if (err) throw err;
      })


        //pix
        for(let i=0; i<pix.length; i++){
          


          if(pix[i].rawText.length > 1){
            picStr+=pix[i].rawText+',';
            let data = (pix[i].toString());
            data = data.replace(/\D/g,'');
            // console.log(data);
            picStr+=data;
          }

          picStr += '\n'+ `${teams[tm].id},`;
        }

        // console.log(picStr);
        fs.appendFile('espnImages.txt', picStr, function(err){
            if (err) throw err;
        })
    
    });
    
}
 
}

pass();

 
