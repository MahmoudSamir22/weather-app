
const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')

console.log('Client side javascript file is loaded!')

const fetchWeather = (address) =>{
    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=> {
        response.json().then((data) => {
            if (data.error){
                return p1.textContent= data.error
            }
            p1.textContent = data.location;
            p2.textContent = `The weather temp is ${data.temp} C, And the humidity is ${data.hum}%`
        })
    })
}


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    p1.textContent = 'Loading...'
    p2.textContent = ''
    fetchWeather(location);
})