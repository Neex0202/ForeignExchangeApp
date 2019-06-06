window.onload = function(){
 
    getPortfolio()

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
            $("#USD").append(userArr[0].jpy);
            $("#USD").append(userArr[0].eur);
            $("#USD").append(userArr[0].gbp);

            // portfolioDOM();
        }else{
            console.log("error")
            
        }
    }
    // CHANGE URL STRING WITH RIGHT PARAMETERS
    xhr.open("GET", 'http://localhost:3000/portfolio/?id=1');

    xhr.send();


}


function portfolioDOM(){



};