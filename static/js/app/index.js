let button = document.getElementById('submit');

button.addEventListener('click', async (e) => {
    e.preventDefault();

    let amountAtStart = document.getElementById('amount_at_start');
    let depositPercent = document.getElementById('deposit_percent');
    let ages = document.getElementById('ages');
    let inflationRate = document.getElementById('inflation_rate');
    let amountAtEnd = document.getElementById('amount_at_end');

    const res = await request({url: 'credit', body: {
        amount_at_start: amountAtStart.value,
        deposit_percent: depositPercent.value,
        ages: ages.value,
        inflation_rate: inflationRate.value,
        amount_at_end: amountAtEnd.value,
    }, headers:{
        'X-CSRFToken': csrf_token,
    }});

    console.log(res);
    console.log(JSON.parse(res));

    tmp = JSON.parse(res);

    amountAtStart.value = tmp['amount_at_start'];
    depositPercent.value = tmp['deposit_percent'];
    ages.value = tmp['ages'];
    inflationRate.value = tmp['inflation_rate'];
    amountAtEnd.value = tmp['amount_at_end'];
})