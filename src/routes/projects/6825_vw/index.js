
import express from 'express';

var router = express.Router();

const dayMSeconds = 86400000; //miliseconds in a day
const startTime = 1567906500000; //11.40 am CHANGE THIS LATER
//check code word given against code word of day
const codes = [
    {
        date : startTime,
        code : 'ALL STARS'
    },
    {
        date : startTime + (dayMSeconds * 1),
        code : 'ENSUITE'
    },
    {
        date : startTime + (dayMSeconds * 2),
        code : 'TERRACE'
    },
    {
        date : startTime + (dayMSeconds * 3),
        code : 'CHALLENGE'
    },
    {
        date : startTime + (dayMSeconds * 4),
        code : 'TOOLS DOWN'
    }
]

/* GET home page. */
router.post('/', function(req, res, next) {
    
    //console.log(req.body);
    if (!req.body.code) {
        res.status(200);
        return res.json({success:false});
    } 
    const userCode = req.body.code;

    const currentDate = new Date().getTime();
    console.log(currentDate);
    for (let i=0; i<codes.length - 1; i+=1) {
        const {date, code} = codes[i];

        if (
            currentDate > date && currentDate < codes[i+1].date
        ) {
            if (code.toLowerCase() === userCode.toLowerCase()) {
                res.status(200);
                return res.json({success: true});
            } else {
                res.status(200);
                return res.json({success: false});
            }
        }
    }

    //check last days code
    const {date, code} = codes[codes.length-1];
    if (
        currentDate > date
    ) {
        if (code.toLowerCase() === userCode.toLowerCase()) {
            res.status(200);
            return res.json({success: true});
        } else {
            res.status(200);
            return res.json({success: false});
        }
    }
    res.status(200);
    return res.json({success: false});
    

});


export default router;
