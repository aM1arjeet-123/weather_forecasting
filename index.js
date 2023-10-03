//bbca01ae05e6606bbe5ac5b918c3904d
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const userTab = document.querySelector('.my');
const searchTab = document.querySelector('.search');
const grantAccess = document.querySelector('.grant');
const userInfo = document.querySelector('.info');
const loading = document.querySelector('.loading');
const btn1 = document.querySelector('.btn1');
const btn3 = document.querySelector('.btn3');
const input1 = document.querySelector('.input1');
const search = document.querySelector('.searchTab');

// console.log(userInfo);
const apiid = "bbca01ae05e6606bbe5ac5b918c3904d";
let currentTab = userTab;
currentTab.classList.add("frade");
getFromSessionStorage();

userTab.addEventListener('click', ()=>{
    switchs(userTab);
});
searchTab.addEventListener('click',()=>{
    switchs(searchTab);
});

function switchs(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("frade");
        currentTab=clickedTab;
        console.log(currentTab);
        currentTab.classList.add("frade");
        if(!search.classList.contains("active")){
            grantAccess.classList.remove("active");
            userInfo.classList.remove("active");
            search.classList.add("active");
            console.log("amarjeet");


        }
        else{
            console.log("jeet");
            grantAccess.classList.remove("active");
            userInfo.classList.remove("active");
            search.classList.remove("active");

            getFromSessionStorage();
        }
    }

}
function getFromSessionStorage(){
    const localCoordinate = sessionStorage.getItem("user-coordinate");
    console.log(localCoordinate);
    if(!localCoordinate){
        grantAccess.classList.add("active");
    }
    else{
        console.log("let");
        const coordinate = JSON.parse(localCoordinate);
        fetchUserData(coordinate);
    }
}

async function fetchUserData(coordinate){
    const {lat , lon} = coordinate;
    // let late = 26.7606;
    // let lon = 83.3732;
    grantAccess.classList.remove("active");
    loading.classList.add("active");
    try{
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiid}`);
        let data = await resp.json();
        loading.classList.remove("active");
        console.log("hello",data);
        userInfo.classList.add("active");
        renderFtechData(data);

    }
    catch(e){
        grantAccess.classList.remove("active");
        console.log("hello jeet");
    }

}
function geolocation1(){
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
}

else{
    console.log("cancel");
}
}
function showPosition(position){
    const userCoordinate={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinate" , JSON.stringify(userCoordinate));
    fetchUserData(userCoordinate);
}

btn1.addEventListener('clcik',geolocation1());


function renderFtechData(weatherInfo){
    const cityName = document.querySelector('.city-name');
    const cityCountry = document.querySelector('.con');
    const desc = document.querySelector('.desc');
    const ima = document.querySelector('.ima');
    const temp = document.querySelector('.temp');
    const winds = document.querySelector('.winds');
    const humidity = document.querySelector('.humidity');
    const clouds = document.querySelector('.clouds');

    cityName.innerText = weatherInfo?.name;
    cityCountry.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    ima.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    let x= weatherInfo?.main?.temp;
    let y = Math.floor(x-273);
    temp.innerText=y;
    winds.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    clouds.innerText = weatherInfo?.clouds?.all;
}
btn3.addEventListener('click',(e)=>{
    e.preventDefault();
    let cityNames = input1.value;
   

    if(cityNames===""){
        return ;
    }
    else{
       fetchUserDateCity(cityNames);
    };
});
async function fetchUserDateCity(city){
    grantAccess.classList.remove("active");
    userInfo.classList.remove("active");
    loading.classList.add("active");
    let limit =1;
    try{
        let resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiid}`);
        let data = await resp.json();
        console.log("hello",data);
        loading.classList.remove("active");
        userInfo.classList.add("active");
        sendData(data);
       

    }
    catch(e){
        
        console.log("hello");

    }
}
function sendData(data){
    let late= data?.[0]?.lat;
    let lon = data?.[0]?.lon;
    sendDatas(late , lon);
    
}

async function sendDatas(lat , long){
    
    let late = lat;
    let lon = long;
    grantAccess.classList.remove("active");
    loading.classList.add("active");
    try{
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiid}`);
        let data = await resp.json();
        loading.classList.remove("active");
        console.log("hello",data);
        userInfo.classList.add("active");
        renderFtechData(data);

    }
    catch(e){
        grantAccess.classList.remove("active");
        console.log("hello");
    }
}