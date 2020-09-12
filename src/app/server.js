var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var authCheck  = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-8q9tcufb.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://localhost:3001',
issuer: 'https://dev-8q9tcufb.us.auth0.com/',
algorithms: ['RS256']
});
app.use(authCheck);

app.get('/api/deals/public', (req, res)=>{
  let deals = [
    // Array of public deals
  ];
  res.json(deals);
})

// For the private route, we'll add this authCheck middleware
app.get('/api/deals/private', authCheck, (req,res)=>{
  let deals = [
    // Array of private deals
  ];
  res.json(deals);
})

app.listen(3001);
console.log('Listening on localhost:3001');