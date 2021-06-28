const express = require('express');
const { isNumber } = require('util');
const router = express.Router();

function check(a) {
    let num = parseFloat(a)
    return num ? num : undefined;
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

router.post('/calculate', (req, res) => {
    let amount_at_start = check(req.body.amount_at_start);
    let deposit_percent = check(req.body.deposit_percent);
    let ages = check(req.body.ages);
    let inflation_rate = check(req.body.inflation_rate);
    let amount_at_end = check(req.body.amount_at_end);

    if (typeof amount_at_start !== 'number') {
        amount_at_start = (amount_at_end * ((1 + inflation_rate / 100) ** ages) / ((1 + deposit_percent / 100) ** ages)).toFixed(3);
    } else if (typeof deposit_percent !== 'number') {
        deposit_percent = (((amount_at_end / amount_at_start) ** (1/ages) * (1 + inflation_rate / 100) - 1) * 100).toFixed(2);
    } else if (typeof inflation_rate !== 'number') {
        inflation_rate = (((1 + deposit_percent / 100) / (amount_at_end / amount_at_start) ** (1 / ages) - 1) * 100).toFixed(2)
    } else if (typeof ages !== 'number') {
        let base = (1 + deposit_percent / 100) / (1 + inflation_rate / 100);
        ages = (getBaseLog(base, amount_at_end / amount_at_start)).toFixed(0)
    } else if (typeof amount_at_end !== 'number') {
        amount_at_end = ((amount_at_start * (1 + deposit_percent / 100) ** ages) / ((1 + inflation_rate / 100) ** ages)).toFixed(3);
    }

    res.send(JSON.stringify({
        amount_at_start: amount_at_start,
        deposit_percent: deposit_percent,
        ages: ages,
        inflation_rate: inflation_rate,
        amount_at_end: amount_at_end,
    }));
})

module.exports = router