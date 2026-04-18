document.addEventListener("DOMContentLoaded", function(){
    const customSelectTrigger = document.querySelector("#custom-select")
    const customOptions = document.querySelector('#custom-options')

    customSelectTrigger.addEventListener('click', function(){
        customOptions.classList.toggle('open')
    })
})