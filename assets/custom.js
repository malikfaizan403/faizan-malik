// slight blur animation for page load..
document.addEventListener("DOMContentLoaded", (event) => {


    setTimeout(() => {
        document.body.classList.add('is-loaded')
    }, 500);


    let triggers = document.querySelectorAll('.popup-trigger');

    if(triggers){
        triggers.forEach((trigger)=>{
            trigger.addEventListener('click',()=>{
                let product = JSON.parse(this.querySelector('script').textContent);
                console.log(product);
            })
        })
    }

    function buildPopup(){

    }

});
