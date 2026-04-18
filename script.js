document.addEventListener("DOMContentLoaded", function(){
    const customSelectTrigger = document.querySelector("#custom-select")
    const customOptions = document.querySelector('#custom-options')
    const hiddenInput = document.querySelector("#hiddenInput")

    customSelectTrigger.addEventListener('click', function(){
        customOptions.classList.toggle('open')
    })
})