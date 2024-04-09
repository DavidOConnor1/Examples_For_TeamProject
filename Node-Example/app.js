const axios = require('axios');
const express = require('express');
const app = express();
const endpoint = 'https://api.meetup.com/gql'

const PORT = process.env.PORT || 3000;


const query = `
query {self{id, name}}     `

const variables = {
    "query": "$query"
}

const body = JSON.stringify({query,variables});

const request = axios({
    url: endpoint, 
    method: "POST",
    mode: "cors",
    headers: {
        'Authorization': 'Bearer {cvdgj137jq4nejecgnh6ce0chr}',
        "Content-Type": "application/json"
    },
    data: body
});

request.then(({data}) => console.log(data));

app.listen(PORT);