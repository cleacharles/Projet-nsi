document.addEventListener("DOMContentLoaded", function(){
    const customSelectTrigger = document.querySelector("#custom-select")
    const customOptions = document.querySelector('#custom-options')
    const customOptionsItems = document.querySelectorAll("#custom-options li")
    const customDefault = document.querySelector("#custom-default")
    const hiddenInput = document.querySelector("#hiddenInput")

    customSelectTrigger.addEventListener('click', function(){
        customOptions.classList.toggle('open')
    })

    customOptionsItems.forEach(option => {
        option.addEventListener("click", function(){
            customDefault.innerHTML = `
            ${this.textContent}
            <span class="material-icons">expand_more</span>
            `
            hiddenInput.value = this.getAttribute('data-value')
        })
    })
})