const express = require('express');
const needle = require('needle');
const router = express.Router();

const url =require('url');

 
const API_BASE_URL =process.env.BASE_URL;



router.get('/', async (req,res)=>{
   
    // const params = new URLSearchParams( {...url.parse(req.url,true).query}); //When using query params 


    try {

       // const  apiRes= await needle('get',`${API_BASE_URL}${params}`);  // Breakdown the query params 

        const  apiRes= await needle('get',`${API_BASE_URL}${req.originalUrl.split('/api/')[1]}`);
        const data = apiRes.body;
    
        // Log the request to the API
        if (process.env.NODE_ENV!=='production') {
            console.log(`REQUEST: ${API_BASE_URL}${req.originalUrl.split('/api/')[1]}`);
        }

        res.status(200)
        res.send(data)
    } catch (error) {
        res.status(500).json({error});
    }


})


module.exports= router; 