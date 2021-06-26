const express = require('express');
const { isNumber } = require('util');
const router = express.Router();
const pow = Math.pow
const log = Math.log

router.post('/calculate', (req, res) => {
    let amount_at_start = req.body.amount_at_start;
    let deposit_percent = req.body.deposit_percent;
    let ages = req.body.ages;
    let inflation_rate = req.body.inflation_rate;
    let amount_at_end = req.body.amount_at_end;

    if (typeof amount_at_start !== 'number') {
        amount_at_start = amount_at_end * pow((1 + inflation_rate / 100), ages) / pow((1 + deposit_percent / 100), ages);
    } else if (typeof deposit_percent !== 'number') {
        deposit_percent = (pow((amount_at_end * pow((1 + inflation_rate / 100), ages) / amount_at_start), (1 / ages)) - 1) * 100;
    } else if (typeof inflation_rate !== 'number') {
        inflation_rate = (pow((amount_at_end / (amount_at_start * pow((1 + deposit_percent / 100), ages))), (1 / ages)) - 1) * 100;
    } else if (typeof ages !== 'number') {
        let base = (1 + deposit_percent / 100) / (1 + inflation_rate / 100);
        ages = log(amount_at_end / amount_at_start, base)
    } else if (typeof amount_at_end !== 'number') {
        amount_at_end = (amount_at_start * pow((1 + deposit_percent / 100), ages)) / pow((1 + inflation_rate / 100), ages);
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