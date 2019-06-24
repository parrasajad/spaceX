const app = module.exports = require('express')();
const https = require('https');



app.get('/all', (req, res) => {
    const options = {
        'method': 'GET',
        'hostname': 'api.spacexdata.com',
        'path': '/v3/launches',
        'headers': {
        }
      };
      
      const request = https.request(options, function (response) {
        const chunks = [];
      
        response.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        response.on("end", function (chunk) {
            res.json(JSON.parse(Buffer.concat(chunks)));
        });
      
        response.on("error", function (error) {
          console.error(error);
        });
      });
      
      request.end();
   
   
});

    

app.get('/', async (req, res) => {
    try{
        let launch = await getLaunchDetails(req.query.flight_number)
        let launchPadDetails = await getLauchPadDetails(launch.launch_site.site_id)
        res.json({"launchDetails": launch, "launchPadDetails": launchPadDetails})
    }
    catch(error) {
        console.log(error);
    }
   
   
});

const getLaunchDetails = (flight_number) => new Promise((resolve, reject) => {
    const options = {
        'method': 'GET',
        'hostname': 'api.spacexdata.com',
        'path': `/v3/launches/${flight_number}`,
        'headers': {
        }
      };
      
      const request =  https.request(options, function (response) {
        const chunks = [];
      
        response.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        response.on("end", function (chunk) {
          const launch =  JSON.parse(Buffer.concat(chunks));
          resolve(launch);
        });
      
        response.on("error", function (error) {
           reject(error);
        });
      });
      
      request.end();
});

const  getLauchPadDetails = (site_id) => new Promise((resolve, reject) => {
    console.log("sit", site_id)
    var options = {
        'method': 'GET',
        'hostname': 'api.spacexdata.com',
        'path': `/v3/launchpads/${site_id}`,
        'headers': {
        }
      };
      
      const req =  https.request(options, (res) =>  {
        const chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
         res.on("end", function (chunk) {
          const launchPad = JSON.parse(Buffer.concat(chunks));
          console.log("launchPad", launchPad);
           resolve(launchPad);
        });
      
         res.on("error", function (error) {
           reject(error);
        });
      });
      
     req.end();
});