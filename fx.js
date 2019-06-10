// GLOBAL VARS
let portfolio;


window.onload = function () {

    getForEx();

    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(portfolioData){

        
        if (xhr.readyState == 4){
            portfolioData = JSON.parse(xhr.responseText);

            console.log('PORTFOLIO DATA', portfolioData);

            lastID = portfolioData[portfolioData.length-1].id;
            
            lastEntry = portfolioData[portfolioData.length-1];

            console.log('LAST DATA', lastEntry);
            console.log('LAST DATA - usd', lastEntry.usd);
            // Display /DOM MANIPULATION TO SHOW PORTFOLIO
            $("#usd").append(lastEntry.usd);
            $("#jpy").append(lastEntry.jpy);
            $("#eur").append(lastEntry.eur); 
            $("#gbp").append(lastEntry.gbp);
            
            // EVENT LISTENERS FOR BUTTONS
            $("#buyJPY").on('click', buyJPY);
            $("#sellJPY").on('click', sellJPY);

            $("#buyEUR").on('click', buyEUR);
            $("#sellEUR").on('click', sellEUR);

            $("#buyGBP").on('click', buyGBP);
            $("#sellGBP").on('click', sellGBP);

            // GET Request to Exchange Rate API (might need to make request within window.onLoad function, not xhr.onreadystate)
            

        }
    }
    xhr.open("GET", "http://localhost:3000/portfolio");
    xhr.send();
    




}


// AJAX GET to Forex API + DOM Manipulation
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

    }
    xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=USD");
    xhr.send();
}


function buyJPY(){
    let buyJPYammount = parseFloat($("#buyOrSellInputJPY").val());
    console.log("buyJPY button clicked");
    console.log("USD Spent = " + buyJPYammount);
    let gbpExRate =  currencyData.rates.JPY
    console.log("USD => JPY = "+ gbpExRate);
    let newUSD = lastEntry.usd - buyJPYammount;
    console.log("New USD = " + newUSD);

    let newJPY = (parseFloat(lastEntry.jpy) + parseFloat((buyJPYammount) * gbpExRate)).toFixed(2);

    console.log('NEW JPY = ' + newJPY);

    // AJAX Post or Put Request to forex.json
    // perform AJAX POST to forEx.json
    // update exchange
    var objJPY = {
        usd: parseFloat(newUSD),
        jpy: parseFloat(newJPY),
        eur: parseFloat(lastEntry.eur),
        gbp: parseFloat(lastEntry.gbp),
        time: new Date().getTime()


    }
    
    console.log('objJPY', objJPY);

    post(objJPY);
    

}

function post(payload) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.status);
            console.log("POST request sent");

            //  update dom with response
            if (xhr.status >= 200 && xhr.status < 300) {

                // What do when the request is successful
                let resp =  JSON.parse(xhr.responseText);

                // update DOM
                updateDOM(resp);


            }
           
        } 
    }

    xhr.open("POST", "http://localhost:3000/portfolio");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(payload));
    clearInputFields()
}

function updateDOM(resp) {
    // update last entry with response
    lastEntry = resp;

    console.log('RESP', resp);
    $("#usd").html('USD ' + resp.usd);
    $("#jpy").html('JPY ' + resp.jpy);
    $("#eur").html('EUR ' + resp.eur);
    $("#gbp").html('GBP ' + resp.gbp);

    newExRate()
}

function sellJPY(){
    let sellJPYammountStr = parseFloat($("#buyOrSellInputJPY").val());
    console.log(sellJPYammountStr);
    console.log("sellJPY button clicked");
    console.log("JPY sold = " + sellJPYammountStr);
    let gbpExRate =  currencyData.rates.JPY
    console.log("JPY => USD "+ gbpExRate);
    let newJPY = lastEntry.jpy - sellJPYammountStr;

    console.log("New JPY = " + newJPY);
    // let newJPY = (parseFloat(lastEntry.jpy) + parseFloat((buyGBPammount) * gbpExRate)).toFixed(2);
    let newUSD = (parseFloat(lastEntry.usd) + parseFloat((sellJPYammountStr) / gbpExRate)).toFixed(2);

    // AJAX Post or Put Request to forex.json
    // perform AJAX POST to forEx.json
    // update exchange
    var objJPY = {
        usd: parseFloat(newUSD),
        jpy: parseFloat(newJPY),
        eur: parseFloat(lastEntry.eur).toFixed(2),
        gbp: parseFloat(lastEntry.gbp),
        time: new Date().getTime()

    }
    
    post(objJPY);

}


// Payload 

function buyEUR(){
    let buyEURammount = parseFloat($("#buyOrSellInputEUR").val());
    console.log("buyEUR button clicked");
    console.log("USD Spent = " + buyEURammount);
    let gbpExRate =  currencyData.rates.EUR;
    console.log("USD => EUR = "+ gbpExRate);
    let newUSD = lastEntry.usd - buyEURammount;
    console.log("New USD = " + newUSD);

    let newGBP = (parseFloat(lastEntry.eur) + parseFloat((buyEURammount) * gbpExRate)).toFixed(2);

    console.log('NEW JPY = ' + newGBP);

    var objJPY = {
        usd: parseFloat(newUSD),
        jpy: parseFloat(lastEntry.jpy),
        eur: parseFloat(newGBP),
        gbp: parseFloat(lastEntry.gbp),
        time: new Date().getTime()


    }
    
    console.log('objJPY', objJPY);
    post(objJPY);     

}


function sellEUR(){
    let sellEURammount = parseFloat($("#buyOrSellInputEUR").val());
    // console.log(sellJPYammountStr);
    console.log("sellJPY button clicked");
    
    console.log("EUR sold = " + sellEURammount);
    let gbpExRate =  currencyData.rates.EUR
    console.log("EUR => USD "+ gbpExRate);
    let newGBP = lastEntry.eur - sellEURammount;

    console.log("New EUR = " + newGBP);
    // let newJPY = (parseFloat(lastEntry.jpy) + parseFloat((buyGBPammount) * gbpExRate)).toFixed(2);
    let newUSD = (parseFloat(lastEntry.usd) + parseFloat((sellEURammount) / gbpExRate)).toFixed(2);

    // AJAX Post or Put Request to forex.json
    // perform AJAX POST to forEx.json
    // update exchange
    var objJPY = {
        usd: parseFloat(newUSD),
        jpy: parseFloat(lastEntry.jpy),
        eur: parseFloat(newGBP),
        gbp: parseFloat(lastEntry.gbp),
        time: new Date().getTime()

    }
    
    post(objJPY);

}



function buyGBP(){
    let buyGBPammount = parseFloat($("#buyOrSellInputGBP").val());
    console.log("buyJPY button clicked");
    console.log("USD Spent = " + buyGBPammount);
    let gbpExRate =  currencyData.rates.GBP
    console.log("USD => GBP = "+ gbpExRate);
    let newUSD = lastEntry.usd - buyGBPammount;
    console.log("New USD = " + newUSD);

    let newGBP = (parseFloat(lastEntry.gbp) + parseFloat((buyGBPammount) * gbpExRate)).toFixed(2);

    // console.log('NEW JPY = ' + newJPY);

    // AJAX Post or Put Request to forex.json
    // perform AJAX POST to forEx.json
    // update exchange
    var objJPY = {
        usd: parseFloat(newUSD),
        jpy: parseFloat(lastEntry.jpy),
        eur: parseFloat(lastEntry.eur),
        gbp: parseFloat(newGBP),
        time: new Date().getTime()


    }
    
    console.log('objJPY', objJPY);

    post(objJPY);
    

}


function sellGBP(){
    let sellGBPammounts = parseFloat($("#buyOrSellInputGBP").val());
    // console.log(sellJPYammountStr);
    console.log("sellJPY button clicked");
 
    console.log("GBP sold = " + sellGBPammounts);
    let gbpExRate =  currencyData.rates.GBP
    console.log("GBP => USD "+ gbpExRate);
    let newGBP = lastEntry.gbp - sellGBPammounts;
 
    console.log("New GBP = " + newGBP);
    // let newJPY = (parseFloat(lastEntry.jpy) + parseFloat((buyGBPammount) * gbpExRate)).toFixed(2);
    let newUSD = (parseFloat(lastEntry.usd) + parseFloat((sellGBPammounts) / gbpExRate)).toFixed(2);
 
    // AJAX Post or Put Request to forex.json
    // perform AJAX POST to forEx.json
    // update exchange
    var objJPY = {
        usd: parseFloat(newUSD),
        jpy: parseFloat(lastEntry.jpy),
        eur: parseFloat(lastEntry.eur),
        gbp: parseFloat(newGBP),
        time: new Date().getTime()
 
    }
 
    post(objJPY);
    
 
 }

function clearInputFields(){

    $('#buyOrSellInputJPY').val('');
    $('#buyOrSellInputEUR').val('');
    $('#buyOrSellInputGBP').val('');

}


function newExRate(){

           $("#jpyEx").html(currencyData.rates.JPY.toFixed(4));
           $("#eurEx").html(currencyData.rates.EUR.toFixed(4));
           $("#gbpEx").html(currencyData.rates.GBP.toFixed(4));
}
