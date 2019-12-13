const node = require('node-html-parser');
const request = require('request');
var fs = require('fs');
const getHrefs = require('get-hrefs');
const getSrc = require('get-src');
const getUrls = require('get-urls');

let bpi = 'https://www.espn.com/mens-college-basketball/bpi';
let bpi2 = 'https://www.espn.com/mens-college-basketball/bpi/_/view/overview/page/2';

// request(bpi, function(err,res,body){
//         const root = node.parse(body);
//         let as = root.querySelectorAll('a');
//         for(let i=0; i<as.length; i++){
//             let tms = as[i].querySelectorAll('span');
//             if(tms.length>0){
//                 console.log(as[i].toString());
//             }
//         }

// });

// request(bpi2, function(err,res,body){
//     const root = node.parse(body);
//     let as = root.querySelectorAll('a');
//     for(let i=0; i<as.length; i++){
//         let tms = as[i].querySelectorAll('span');
//         if(tms.length>0){
//             console.log(as[i].toString());
//         }
//     }

// });


let teams = [
    {
      "id": 127
    },
    {
      "id": 150
    },
    {
      "id": 222
    },
    {
      "id": 258
    },
    {
      "id": 2483
    },
    {
      "id": 57
    },
    {
      "id": 275
    },
    {
      "id": 2250
    },
    {
      "id": 96
    },
    {
      "id": 97
    },
    {
      "id": 2641
    },
    {
      "id": 153
    },
    {
      "id": 239
    },
    {
      "id": 66
    },
    {
      "id": 2509
    },
    {
      "id": 2305
    },
    {
      "id": 269
    },
    {
      "id": 152
    },
    {
      "id": 120
    },
    {
      "id": 248
    },
    {
      "id": 213
    },
    {
      "id": 2
    },
    {
      "id": 2294
    },
    {
      "id": 2132
    },
    {
      "id": 2086
    },
    {
      "id": 52
    },
    {
      "id": 87
    },
    {
      "id": 194
    },
    {
      "id": 251
    },
    {
      "id": 344
    },
    {
      "id": 12
    },
    {
      "id": 356
    },
    {
      "id": 156
    },
    {
      "id": 2633
    },
    {
      "id": 2390
    },
    {
      "id": 99
    },
    {
      "id": 2507
    },
    {
      "id": 197
    },
    {
      "id": 2608
    },
    {
      "id": 30
    },
    {
      "id": 2166
    },
    {
      "id": 328
    },
    {
      "id": 2628
    },
    {
      "id": 252
    },
    {
      "id": 2550
    },
    {
      "id": 2670
    },
    {
      "id": 2306
    },
    {
      "id": 2193
    },
    {
      "id": 261
    },
    {
      "id": 8
    },
    {
      "id": 201
    },
    {
      "id": 2752
    },
    {
      "id": 2168
    },
    {
      "id": 41
    },
    {
      "id": 98
    },
    {
      "id": 2440
    },
    {
      "id": 21
    },
    {
      "id": 135
    },
    {
      "id": 38
    },
    {
      "id": 228
    },
    {
      "id": 130
    },
    {
      "id": 84
    },
    {
      "id": 108
    },
    {
      "id": 231
    },
    {
      "id": 183
    },
    {
      "id": 68
    },
    {
      "id": 2116
    },
    {
      "id": 227
    },
    {
      "id": 59
    },
    {
      "id": 166
    },
    {
      "id": 259
    },
    {
      "id": 142
    },
    {
      "id": 9
    },
    {
      "id": 145
    },
    {
      "id": 46
    },
    {
      "id": 164
    },
    {
      "id": 103
    },
    {
      "id": 277
    },
    {
      "id": 2579
    },
    {
      "id": 257
    },
    {
      "id": 2057
    },
    {
      "id": 2184
    },
    {
      "id": 218
    },
    {
      "id": 2335
    },
    {
      "id": 2348
    },
    {
      "id": 204
    },
    {
      "id": 167
    },
    {
      "id": 58
    },
    {
      "id": 221
    },
    {
      "id": 2350
    },
    {
      "id": 2439
    },
    {
      "id": 2430
    },
    {
      "id": 2724
    },
    {
      "id": 305
    },
    {
      "id": 111
    },
    {
      "id": 93
    },
    {
      "id": 2599
    },
    {
      "id": 61
    },
    {
      "id": 2117
    },
    {
      "id": 264
    }
  ]


async function pass(){
let passing = '';
for(let tm=0; tm<teams.length; tm++){
  let link = `https://www.espn.com/mens-college-basketball/team/roster/_/id/${teams[tm].id}/`;

  let statisticsLink = `https://www.espn.com/mens-college-basketball/team/stats/_/id/${teams[tm].id}`

    request(link, function(err,res,body){
        const root = node.parse(body);
        let tds = root.querySelectorAll('span');
        let pix = root.querySelectorAll('img');
        let confirmed = '';
        console.log(pix.length);
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

        fs.appendFile('NCAABroster.txt', str, function(err){
          if (err) throw err;
      })


        //pix
        for(let i=0; i<pix.length; i++){
          
          let hrefs = Array.from(getUrls(pix[i].toString()));
          if(hrefs.length>0){
            confirmed += `\n${hrefs[0]}`;
            console.log(tm);
            // console.log(hrefs[0]);
          }

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
        fs.appendFile('NCAABportraits.txt', picStr, function(err){
            if (err) throw err;
        })

        fs.appendFile('NCAABConfirmedPortraits.txt', confirmed, function(err){
          if (err) throw err;
      })
    
    });

    // request(statisticsLink, function(err,res,body){


    //     const root = node.parse(body);
    //     let trs = root.querySelectorAll('tr');
    //     //COUNT PLAYERS
    //     let rosterCount = 0;
    //     let finished = false;
    //     for(let i=0; i<trs.length; i++){
    //         if(finished){
    //             break;
    //         }
    //         let tds = trs[i].querySelectorAll('span');
    //         rosterCount++;

    //         for(let j=0; j<tds.length; j++){
    //             if(tds[j].rawText == "Total"){
    //                 finished = true;
    //             }
    //         }
    //     }

    //     let pix = root.querySelectorAll('a');
    //     let str = `${teams[tm].id}`;
    //     for(let i=0; i<trs.length; i++){
    //     if(i === rosterCount){
    //         break;
    //     }
    //     let tds = trs[i+rosterCount].querySelectorAll('span');
    //     let data = teams[tm].id + ',' + trs[i].rawText + ',';
    //     for(let j=0; j<tds.length; j++){
    //         data += (tds[j].rawText) + ',';

    //     }
    //       str+=data;
    //       data = data.replace(/\D/g,'');
    //       if(data.length>0){
    //         str+=','+data;
    //       }
    //       str+='\n';
    //     }

    //     fs.appendFile('NCAABstatistics.txt', str, function(err){
    //       if (err) throw err;
    //   })
    // });
    
}
 
}

pass();

 
