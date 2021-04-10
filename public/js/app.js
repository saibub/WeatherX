




        
console.log('CLient side javascript file is loaded')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
const sbar=document.querySelector('#cover')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location=search.value
    sbar.remove();
    msg1.textContent="Loading..."
    msg2.textContent=""


    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            msg1.textContent=data.error
        }
        else
        {
            msg1.textContent=data.location
            msg2.textContent=data.forecastData
        }
        
    })
})
})