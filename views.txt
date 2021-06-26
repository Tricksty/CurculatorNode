import json

from math import log
from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.


def index(request):
    context = {}
    return render(request, 'index.html', context)


def function_1(request):
    result = dict()

    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))

        aas_bool = data['amount_at_start'].isdigit()
        dp_bool = data['deposit_percent'].isdigit()
        a_bool = data['ages'].isdigit()
        ir_bool = data['inflation_rate'].isdigit()
        aae_bool = data['amount_at_end'].isdigit()

        amount_at_start = 0
        deposit_percent = 0
        ages = 0
        inflation_rate = 0
        amount_at_end = 0

        if not aas_bool:
            deposit_percent = float(data['deposit_percent'])
            ages = float(data['ages'])
            inflation_rate = float(data['inflation_rate'])
            amount_at_end = float(data['amount_at_end'])
            amount_at_start = amount_at_end * ((1 + inflation_rate / 100) ** ages) / ((1 + deposit_percent / 100) ** ages)
        elif not dp_bool:
            amount_at_start = float(data['amount_at_start'])
            ages = float(data['ages'])
            inflation_rate = float(data['inflation_rate'])
            amount_at_end = float(data['amount_at_end'])
            deposit_percent = ((amount_at_end * ((1 + inflation_rate / 100) ** ages) / amount_at_start) ** (1 / ages) - 1) * 100
        elif not a_bool:
            amount_at_start = float(data['amount_at_start'])
            deposit_percent = float(data['deposit_percent'])
            inflation_rate = float(data['inflation_rate'])
            amount_at_end = float(data['amount_at_end'])
            base = (1 + deposit_percent / 100) / (1 + inflation_rate / 100)
            ages = log(amount_at_end / amount_at_start, base)
        elif not ir_bool:
            amount_at_start = float(data['amount_at_start'])
            deposit_percent = float(data['deposit_percent'])
            ages = float(data['ages'])
            amount_at_end = float(data['amount_at_end'])
            inflation_rate = ((amount_at_end / (amount_at_start * (1 + deposit_percent / 100) ** ages)) ** (1 / ages) - 1) * 100
        elif not aae_bool:
            amount_at_start = float(data['amount_at_start'])
            deposit_percent = float(data['deposit_percent'])
            ages = float(data['ages'])
            inflation_rate = float(data['inflation_rate'])
            amount_at_end = (amount_at_start * (1 + deposit_percent / 100) ** ages) / (1 + inflation_rate / 100) ** ages
        result = {
            'amount_at_start': amount_at_start,
            'deposit_percent': deposit_percent,
            'inflation_rate': inflation_rate,
            'ages': ages,
            'amount_at_end': amount_at_end
        }

        return HttpResponse(json.dumps(result))

    elif request.method == 'GET':
        return HttpResponse("There is nothing to GET ;3")
