let 
// toDay= document.getElementById('today'),
 dateOfWeather= document.getElementById('dateOfWeather'),
 cityLocation=document.getElementById('cityLocation'),
 todayDegree=document.getElementById("todayDegree"),
 todayIcon=document.getElementById('todayIcon'),
 todayDesciption=document.getElementById('todayDesciption'),
 todayhumidity=document.getElementById('todayhumidity'),
 todayWind=document.getElementById('todayWind'),
 todayDirection=document.getElementById('todayDirection'),
 days=["Sun","Mon","Tu","We","Th","Fr","Sa"],
 month=['Jan',"Feb","Mar","Apr","May","Jun",'Jul',"Aug","Sep","Oct","Nov","Dec"];
 var apiResponse;
 var responseData;
 let day = new Date();
 let nextDay=document.getElementsByClassName('nextDay'),
 nextDayMoth=document.getElementsByClassName('nextDayMoth'),
 nextDayIcon=document.getElementsByClassName('nextDayIcon'),
 nextDayLocation=document.getElementsByClassName('nextDayLocation')
 ,maxforecast=document.getElementsByClassName('maxforecast'),
 avghumidity=document.getElementsByClassName('avghumidity'),
 maxwind=document.getElementsByClassName('maxwind');
//  moonPhase=document.getElementsByClassName('moonPhase');
let serach=document.getElementById('serach');

async function getWeather(actualcity='cairo'){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${actualcity}&days=3`)
    let responseData= await apiResponse.json();
    console.log(responseData);
    
    function disweather(){
       
         // icant call this in responsedata in any scope???????????????????
        cityLocation.innerHTML=responseData.location.name;   
        todayDegree.innerHTML=`${responseData.current.temp_c}  <sub>o</sub>C`;
        todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`);
        todayDesciption.innerHTML=responseData.current.condition.text;
        todayhumidity.innerHTML=`${responseData.current.humidity}%`;
        todayWind.innerHTML=`${responseData.current.wind_kph} Km/h`;
        todayDirection.innerHTML= `${responseData.current.wind_dir}`          
    
    }
    function nextDayWeather(){
        for(let i=0;i<nextDay.length;i++){

            actualMonth=month[day.getMonth()];
            let nextForecast=days[new Date(responseData.forecast.forecastday[i].date).getDay()];
            nextDay[i].innerHTML=nextForecast; 
            nextDayLocation[i].innerHTML=`${responseData.location.name}`
            nextDayMoth[i].innerHTML=`${new Date(responseData.forecast.forecastday[i+1].date).getDate()}`;
            nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
            maxforecast[i].innerHTML=`${responseData.forecast.forecastday[i+1].day.maxtemp_c}  <sub>oC</sub>`;
            avghumidity[i].innerHTML=`${responseData.forecast.forecastday[i+1].day.avghumidity}%`;
            maxwind[i].innerHTML=`${responseData.forecast.forecastday[i+1].day.maxwind_kph}Km/h `;
            // moonPhase[i].innerHTML=`${responseData.forecast.forecastday[i+1].astro.moon_phase}`

           
        }
        
    } 

    displaytoday();
    disweather();
    nextDayWeather();
   
}
getWeather();

function displaytoday(){
  
     actualDay=days[day.getDay()],
    actualMonth=month[day.getMonth()];

    // toDay.innerHTML=actualDay;
    dateOfWeather.innerHTML=`${day.getDate()} ${actualMonth}`;


}
serach.addEventListener('keyup',function(){
   let actualcity= serach.value;
   
   getWeather(actualcity);
   
})
