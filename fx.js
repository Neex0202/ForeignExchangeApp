window.onload = function(){
 
    getPortfolio();
    getForEx();

}

function getPortfolio(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            console.log(xhr.status);
            var userArr = JSON.parse(xhr.responseText)
            console.log(userArr);
            console.log(userArr[0].name);
            $("#name").append(userArr[0].name);
            $("#USD").append(userArr[0].usd);
            $("#jpy").append(userArr[0].jpy);
            $("#eur").append(userArr[0].eur);
            $("#gbp").append(userArr[0].gbp);

            // portfolioDOM();
        }else{
            console.log("error")
            
        }
    }
    // CHANGE URL STRING WITH RIGHT PARAMETERS
    xhr.open("GET", 'http://localhost:3000/portfolio/?id=1');

    xhr.send();


}

function getForEx(){




// AJAX GET request to ForEx API
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        // check from Jason's code

        var currencyDataJPY = JSON.parse(xhr.responseText);
        console.log(currencyDataJPY);
        
        // DOM MANIPULATION
        console.log(currencyDataJPY.rates.JPY)
        $("#jpyEx").append(currencyDataJPY.rates.JPY);
        $("#eurEx").append(currencyDataJPY.rates.EUR);
        $("#gbpEx").append(currencyDataJPY.rates.GBP);

    }else{
        console.log("Error: JPY data not found")
    }

}
    // FIND API URL FOR JPY CURRENCY EXCHANGE
 xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=USD");
 xhr.send();

}

//  LOGIC FOR Buying Forex
// -  x(how much you want to buy in USD) * JPY = y (ammount purchased JPY)
//  New Balance - x = Balance;
// AJAX GET newPortfolio();


// Logic for Selling Forex
// x (how much you want to sell in JPY) * 