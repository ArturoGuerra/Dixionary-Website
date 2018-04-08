const { Router } = require('express');
const RateLimit = require('express-rate-limit');
const requestify = require('requestify');

const router = Router();
const ratelimit = new RateLimit({
    windowMs: 3600000,
    max: 200,
    dalayMs: 0
});

function getIndex(index) {
  return index * 20
}

//router.use(ratelimit);
router.use('/fetch', (req, res, next) => {
  let url = 'https://api.dixionary.com/api/fetch'
  if (req.query.index) {
    url = url + '?index=' + req.query.index
  }
  requestify.get(url).then(result => {
    var body = JSON.parse(result.body);
    res.json(body);
   }).catch(console.error)
});

router.use('/translate', (req, res, next) => {
    var indexs = 0;
    try {
        var original = req.body.message.split(' ');
        var message = req.body.message;
        console.log(original);
    } catch (e) {
        var original = [];
        var message = '';
        console.log(e)
        console.log("400 Bad Request");
        res.status(400).send("400 Bad Request");
    }
    requestify.post('https://api.dixionary.com/api/get', {message: message}).then((result) => {
        var corrected = JSON.parse(result.body);
        var string = [];
        for (let x=0; x < original.length; x++) {
            for(let y=0; y < corrected.length; y++) {
                if (original[x] == corrected[y].english) {
                    string.push(corrected[y].scammer);
                    indexs++
                    break;
                }
            }
        }
        console.log(string);
        res.json(string);
    })
    .catch(console.log);
});

export default router
