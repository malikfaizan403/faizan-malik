// slight blur animation for page load..
document.addEventListener("DOMContentLoaded", (event) => {


    setTimeout(() => {
        document.body.classList.add('is-loaded')
    }, 500);


    let triggers = document.querySelectorAll('.popup-trigger');
    let closeBtns = document.querySelectorAll('.closepopup');

    if(closeBtns){
        closeBtns.forEach(closeBtn => {
            closeBtn.addEventListener('click',()=>{
                closeBtn.closest('.pdp-popup-wrapper').classList.remove('is-active');
            });
        });
    }


    if(triggers){
        triggers.forEach((trigger)=>{
            trigger.addEventListener('click',(el)=>{
                console.log(el);
                let product = JSON.parse(trigger.querySelector('script').textContent);
                buildPopup(trigger, product);
            })
        })
    }

    function buildPopup(trigger, product){
        let section = trigger.closest('.the-grid');
        let popupContainer = section.querySelector('.pdp-popup-wrapper');
        popupContainer.classList.add('is-active');
    }

});
