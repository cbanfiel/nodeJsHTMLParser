const node = require('node-html-parser');
const request = require('request');
const getHrefs = require('get-hrefs');
var fs = require('fs');

let link = 'http://www.espn.com/college-football/statistics/teamratings';
const teams = [];

requestFPI = () => {
    request(link, (err, res, body) => {
      const root = node.parse(body);
      const rows = root.querySelectorAll('tr');
      
      rows.forEach((row)=>{
        const team = [];
        const cells = row.querySelectorAll('td');
        cells.forEach((cell) => {
            team.push(cell.rawText);
        })
        let isTeam = false; 
        const hrefs = row.querySelectorAll('a');
        hrefs.forEach((href) => {
            let link = getHrefs(href.toString());
            if(link.length>0){
                team.push(getHrefs(href.toString()))
                isTeam = true;
            }
        })

        if(isTeam){
            teams.push({name: team[1], rank:team[0], id:grabTeamIdFromLink(team[team.length-1])});
        }

        fs.writeFile('ncaaf_fpi.json', JSON.stringify(teams), function (err) {
            if (err) throw err;
        });

      })

    });

}


grabTeamIdFromLink = (link) => {
    let id = link.toString().replace('/college-football/team/fpi?id=','');
    id = id.replace('&year=2019','')
    return id;
}


requestFPI();