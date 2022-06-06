
const express = require( 'express');
const app = express();
const port = 8888;

// import fetch from "node-fetch";
const bodyParser = require("body-parser");

const { GoogleSpreadsheet } = require("google-spreadsheet");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/classes', (req, res) => {

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1iFKOX_0BG46ZVEEPfBnytH8LsFdAsjbDro_BI1PibD4');

    // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    (async function() {
        await doc.useServiceAccountAuth({
            // env var values are copied from service account credentials generated by google
            // see "Authentication" section in docs for more info
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
        });
      }());
    
      (async function() {
        await doc.loadInfo(); // loads document properties and worksheets
      }());
  
    
    console.log(doc.title);


    
///////////////////////

    // const sheetId = '688560047';
    // const base = `https://docs.google.com/spreadsheets/d/e/2PACX-${sheetId}/gviz/tq?`;
    // const sheetName = 'Classes-REPORT';
    // const query = encodeURIComponent('Select *')
    // const url = `${base}&sheet=${sheetName}&tq=${query}`
    
    // const class_name_data = [];
    // // document.addEventListener('DOMContentLoaded', init)
    
    // function init() {
    //     fetch(url)
    //         .then(res => res.text())
    //         .then(rep => {
    //             //Remove additional text and extract only JSON:
    //             const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
    //             // console.log(rep)
    //             // document.getElementById('yoyo').innerHTML = JSON.stringify(jsonData, null, '\t');
    //             console.log("================+");
    //             console.log(req["body"]["class-name"]);
    //             console.log(jsonData["table"]["rows"].length);
    //             console.log("================+");
    //             for (let i=0; i<jsonData["table"]["rows"].length; i++) {

    //                 // class_name_data.push(jsonData["table"]["rows"][i]["c"][0]["v"]);
    //                 if (jsonData["table"]["rows"][i]["c"][0]["v"] === req["body"]["class-name"]) {
    //                     res.json(jsonData["table"]["rows"][i]["c"]);
    //                 }
    //             }
    //             res.json({"no" : "dice"});
    //             // res.json(class_name_data);
    //         })
    // }

    // init();

//////////////////////

})

app.post('/post-test', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

// Class Name, Class Start Date, Class End Date, Cohort: Program Type, Class Days, Cohort: Program Name

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
