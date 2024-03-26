const axios = require('axios');
const fs = require('fs');

const RapidAPIProgram = async () => {

    // Fetch Team Data
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/teams',
      headers: {
        'X-RapidAPI-Key': '447b510cfdmsh8a430d0d9dcbeccp130797jsn0bec1990a8d4',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };
    
    try {
        // API Response
        const response = await axios.request(options);

        // Separating out relevant data from payload
        const NBADataArray = response.data.response

        // Data variable to list all team names
        let NBATeams = "NBA Teams: " + "\n"

        // Looping through array to capture only team names for our print out
        NBADataArray.forEach(item => {
            if (item.nbaFranchise == true){
                NBATeams = NBATeams + item.name + "\n"
                console.log(item.city)
                console.log(item.leagues.standard.conference)
            }
        });
        
        // Path to the file you want to write
        const filePath = '/Users/ryankavanaugh/Desktop/test.txt';
            
        // Write NBA team data to the file
        fs.writeFile(filePath, NBATeams, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Data has been written to the file successfully.');
            }
        });

    } catch (error) {
        console.error(error);
    }
}

RapidAPIProgram().then((r) => console.log(r));
