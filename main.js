var rb_mini = document.getElementById("rb_mini");
var rb_personal = document.getElementById("rb_personal");
var rb_mortgage = document.getElementById("rb_mortgage");
var money_range = document.getElementById("money_range");
var time_range = document.getElementById("time_range");
var time_block = document.getElementById("time_block");
var fee = document.getElementById("fee");
var money_amount = document.getElementById("money_amount");
var total = document.getElementById("total");
var time_amount = document.getElementById("time_amount");
var payment_text = document.getElementById("payment");
var message = document.getElementById("message");
var v = document.querySelector('.rangeV');
var mini_interes = 1.15, //not variable by time range
personal_interes = 0.09, mortgage_interes = 0.04;
//
var money_range_step = parseInt(money_range.step), money_range_min = parseInt(money_range.min), money_range_max = parseInt(money_range.max), money_range_value = parseInt(money_range.value), 
//
time_range_step = parseInt(time_range.step), time_range_min = parseInt(time_range.min), time_range_max = parseInt(time_range.max), time_range_value = parseInt(time_range.value);
//
var mini_money_step = 50, mini_money_min = 100, mini_money_max = 900, 
//
personal_money_step = 100, personal_money_min = 1000, personal_money_max = 9000, 
//
mortgage_money_step = 1000, mortgage_money_min = 10000, mortgage_money_max = 150000, 
//
personal_time_min = 1, personal_time_max = 5, 
//
mortgage_time_min = 1, mortgage_time_max = 25;
//Needed for manipulating states
var miniBool = false, personalBool = false, mortgageBool = false;
//const newValue = 0, newPosition = 0;
var message_text = "<p>Los miniprestamos deben cancelarse en un lapzo m\u00E1ximo de 1 mes</p>";
//
//personalRange(); //set by default when load
onChange(); //Look for wich is checked
//RADIO BUTTONS ON CHANGE
function onChange() {
    if (rb_mini.checked) {
        payment_text.style.display = "none";
        time_block.style.display = "none";
        message.style.display = "block";
        message.innerHTML = message_text;
        miniBool = true;
        personalBool = false;
        mortgageBool = false;
        miniRange();
    }
    if (rb_personal.checked) {
        payment_text.style.display = "block";
        time_block.style.display = "block";
        message.style.display = "none";
        personalBool = true;
        miniBool = false;
        mortgageBool = false;
        personalRange();
    }
    if (rb_mortgage.checked) {
        payment_text.style.display = "block";
        time_block.style.display = "block";
        message.style.display = "none";
        mortgageBool = true;
        personalBool = false;
        miniBool = false;
        mortgageRange();
    }
}
//MONEY RANGE VARIATION, called only once when change radio button
//used for changing ranges properties values
function miniRange() {
    //IMPORTANT: Need to access directly the string type value of each range property
    //intead the number type declarated before
    money_range.step = (mini_money_step).toString();
    money_range.min = (mini_money_min).toString();
    money_range.max = (mini_money_max).toString();
    money_range.value = (mini_money_min * 2).toString();
    money_amount.innerHTML = money_range.value;
    miniTotal(parseInt(money_range.value));
}
function personalRange() {
    money_range.step = (personal_money_step).toString();
    money_range.min = (personal_money_min).toString();
    money_range.max = (personal_money_max).toString();
    money_range.value = (personal_money_min).toString();
    money_amount.innerHTML = money_range.value;
    time_range.min = (personal_time_min).toString();
    time_range.max = (personal_time_max).toString();
    time_range.value = (personal_time_min).toString();
    time_range_value = personal_time_min;
    time_amount.innerHTML = time_range.value;
    message.style.display = "none";
    personalOutput(personal_money_min);
}
function mortgageRange() {
    money_range.step = (mortgage_money_step).toString();
    money_range.min = (mortgage_money_min).toString();
    money_range.max = (mortgage_money_max).toString();
    money_range.value = (mortgage_money_min).toString();
    money_amount.innerHTML = money_range.value;
    time_range.min = (mortgage_time_min).toString();
    time_range.max = (mortgage_time_max).toString();
    time_range.value = (mortgage_time_min).toString();
    time_range_value = mortgage_time_min;
    time_amount.innerHTML = time_range.value;
    message.style.display = "none";
    setTimeout(function () {
        mortgageOutput(mortgage_money_min);
    }, 0);
}
//RANGE SLIDERS
money_range.oninput = function () {
    money_amount.innerHTML = money_range.value;
    //Call some funcition only if bool = true
    if (miniBool) {
        miniTotal(parseInt(money_range.value));
    }
    if (personalBool) {
        personalOutput(parseInt(money_range.value));
    }
    if (mortgageBool) {
        mortgageOutput(parseInt(money_range.value));
    }
};
time_range.oninput = function () {
    time_range_value = parseInt(time_range.value);
    time_amount.innerHTML = time_range.value;
    if (personalBool) {
        personalOutput(parseInt(money_range.value));
    }
    if (mortgageBool) {
        mortgageOutput(parseInt(money_range.value));
    }
};
//ARITHMETIC CALCULATIONS
function miniTotal(value) {
    total.innerHTML = (value * mini_interes).toFixed(2) + " €";
}
function personalOutput(value) {
    increasePersonal();
    generalEquation(value, personal_interes);
}
function mortgageOutput(value) {
    increaseMortgage();
    generalEquation(value, mortgage_interes);
}
function generalEquation(money_value, interes_value) {
    setTimeout(function () {
        var interes = (money_value * interes_value).toFixed(2);
        var intereses = parseFloat(interes) * parseInt(time_range.value);
        total.innerHTML = money_value + intereses + " €";
        fee.innerHTML = ((money_value + intereses) / (parseInt(time_range.value) * 12)).toFixed(2) + " €";
    }, 0);
}
function increasePersonal() {
    if (time_range.value == "2") {
        personal_interes = 0.1;
    }
    if (time_range.value == "3") {
        personal_interes = 0.105;
    }
    if (time_range.value == "4") {
        personal_interes = 0.11;
    }
    if (time_range.value == "5") {
        personal_interes = 0.1105;
    }
}
function increaseMortgage() {
    if (time_range_value >= 5) {
        mortgage_interes = 0.041;
    }
    if (time_range_value >= 10) {
        mortgage_interes = 0.042;
    }
    if (time_range_value >= 15) {
        mortgage_interes = 0.043;
    }
    if (time_range_value >= 20) {
        mortgage_interes = 0.044;
    }
}
//SLIDER STYLES
rangeMoneyStyles();
rangeTimeStyles();
function rangeMoneyStyles() {
    rangeStyles('range_v', money_range);
}
function rangeTimeStyles() {
    rangeStyles('range_v_time', time_range);
}
function rangeStyles(v_element, range_slider) {
    var v = document.getElementById(v_element), setValue = function () {
        var 
        //            newValue = Number((money_range.value - money_range.min) * 100 / (money_range.max - money_range.min)),
        //         newValue : number = (parseInt(time_range.value) - parseInt(time_range.min)) * 100 / (parseInt(time_range.max) - parseInt(time_range.min)),
        newValue = ((range_slider.value - range_slider.min) * 100 / (range_slider.max - range_slider.min)), newPosition = 10 - (newValue * 0.2);
        v.innerHTML = "<span>" + range_slider.value + "</span>";
        v.style.left = "calc(" + newValue + "% + (" + newPosition + "px))";
    };
    range_slider.addEventListener('input', setValue);
    rb_mini.addEventListener("change", setValue);
    rb_personal.addEventListener("change", setValue);
    rb_mortgage.addEventListener("change", setValue);
    document.addEventListener("DOMContentLoaded", setValue);
}
