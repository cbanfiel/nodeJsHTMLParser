const node = require('node-html-parser');
const request = require('request');
var fs = require('fs');

const teams = [
    'new-mexico-lobos',
    'san-jose-state-spartans'
]

let rushing = '';
let receiving = '';
let defense = '';
let kicking = '';

async function pass(){
let passing = '';
for(let tm=0; tm<teams.length; tm++){

    request(`https://www.foxsports.com/college-football/${teams[tm]}-team-stats?season=2019&week=0&category=PASSING&group=2&team=0`, function(err,res,body){
        const root = node.parse(body);
        let tds = root.querySelectorAll('td');
        for(let i=0; i<tds.length; i++){
            try{
                let name = tds[i].querySelectorAll('span')[1].rawText;
                passing+='\n'
                passing+=teams[tm]+',';
                passing+=name;
                // console.log(name);
                passing+=','
            }catch(e){
                passing+=(tds[i].rawText);
                passing+=','
            }


        }
        fs.appendFile('passing.txt', passing, function(err){
            if (err) throw err;
        })
    
    });
    
}
 
}

pass();

 
