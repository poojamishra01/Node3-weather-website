

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const Msg1=document.querySelector('#Msg1')
const Msg2=document.querySelector('#Msg2')

weatherForm.addEventListener('submit',(eventObject)=>{
    eventObject.preventDefault()
    const location =search.value
  //  console.log(location)
     Msg1.textContent='Loading...'
     Msg2.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            Msg1.textContent= data.error
         }
        else
        {
            Msg1.textContent=data.location
            Msg2.textContent=data.forecast
        }
    })
})
})