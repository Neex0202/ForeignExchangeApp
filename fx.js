window.onload = function () {

    getPortfolio();
    getForEx();

    // Event Listeners for Buttons
   // $("#buyJPY").on("click", buyJPY)

}
// AJAX GET req to our jSON-Server which shows our portfolio
function getPortfolio() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.status);
            userArr = JSON.parse(xhr.responseText)
            console.log(userArr);
            // console.log(userArr[userArr.length-1].name);
            $("#name").append(userArr[0].name);
            $("#USD").append(userArr[0].usd);
            $("#jpy").append(userArr[0].jpy);
            $("#eur").append(userArr[0].eur);
            $("#gbp").append(userArr[0].gbp);
        } 
    }
    // var i = userArr.length-1;
    // xhr.open("GET", 'http://localhost:3000/portfolio/?id=1');
    xhr.open("GET", 'http://localhost:3000/portfolio/?id=1');

    xhr.send();


}

// AJAX GET request to ForEx API
function getForEx() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log('READY');
            currencyData = JSON.parse(xhr.responseText);
            // console.log(currencyDataJPY);
            // DOM MANIPULATION
            // console.log(currencyData.rates.JPY)
            $("#jpyEx").html(currencyData.rates.JPY);
            $("#eurEx").html(currencyData.rates.EUR);
            $("#gbpEx").html(currencyData.rates.GBP);
        } 

        $("#buyJPY").on("click", buyJPY)
        $("#buyEUR").on("click", buyEUR)
        $("#buyGBP").on("click", buyGBP)
    }
    xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=USD");
    xhr.send();
}


function buyJPY() {
    console.log("buyJPY clicked");
    let buyJPYammountStr = $("#buyOrSellInputJPY").val();
    let buyJPYammountNum = Number(buyJPYammountStr);
    


    // perform AJAX POST to forEx.json
    var objJPY = {
        // WRONG NUMBER
        usd: buyJPYammountNum,
        // calculate correct exchange ammount
        jpy: buyJPYammountNum * currencyData.rates.JPY

    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.status);
            console.log("POST request sent") 
            // getForEx();           
        } 
    }

    xhr.open("POST", "http://localhost:3000/portfolio/?id=1");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(objJPY));
    // getForEx();  

}

// buyEUR Function
function buyEUR() {
    console.log("buyJPY clicked");
    let buyEURammountStr = $("#buyOrSellInputEUR").val();
    let buyEURammountNum = Number(buyEURammountStr);
    console.log(buyEURammountNum);

    // perform AJAX POST to forEx.json
    var objJPY = {
        // WRONG NUMBER
        usd: buyEURammountNum,
        // calculate correct exchange ammount
        eur: buyEURammountNum * currencyData.rates.EUR

    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.status);
            console.log("POST request sent") 
            // getForEx();           
        } 
    }

    xhr.open("POST", "http://localhost:3000/portfolio/?id=1");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(objJPY));
    // getForEx();  

}


function buyGBP() {
    console.log("buyGBP clicked");
    let buyGBPammountStr = $("#buyOrSellInputGBP").val();
    let buyGBPammountNum = Number(buyGBPammountStr);
    console.log(buyGBPammountNum);

    // perform AJAX POST to forEx.json
    var objJPY = {
        // WRONG NUMBER
        usd: buyGBPammountNum,
        // calculate correct exchange ammount
        eur: buyGBPammountNum * currencyData.rates.GBP

    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.status);
            console.log("POST request sent")
            // AJAX PUT REQUEST??? 
                       
        } 
    }

    xhr.open("POST", "http://localhost:3000/portfolio/?id=1");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(objJPY));
    // getForEx();  

}






//  LOGIC FOR Buying Forex
// -  x(how much you want to buy in USD) * JPY = y (ammount purchased JPY)
//  New Balance - x = Balance;
// AJAX GET newPortfolio();


// Logic for Selling Forex
// x (how much you want to sell in JPY) * 