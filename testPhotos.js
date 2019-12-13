const node = require('node-html-parser');
const request = require('request');
var fs = require('fs');

let links = [
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4432874.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4066253.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4078506.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4431873.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4403231.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4066249.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4592749.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4432822.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4278281.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4592747.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4431776.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4395709.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4592748.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4395710.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4403230.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/3913188.png&w=150"
  },
  {
    "faceSrc": "https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4284066.png&w=150"
  }
];


for (let i=0; i<links.length; i++){
    request(links[i].faceSrc, function(req,res,body){
                  const root = node.parse(body);
              let rawText = (root.rawText);
      
              if(rawText.length <= 1){
                  console.log(links[i].faceSrc);
              }
              
      })
  

}