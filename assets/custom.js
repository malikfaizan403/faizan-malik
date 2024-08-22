// slight blur animation for page load..
document.addEventListener("DOMContentLoaded", (event) => {


    setTimeout(() => {
        document.body.classList.add('is-loaded')
    }, 500);

    // popup

    let selectors = {
        triggers: '.popup-trigger',
        closers: '.closepopup',
        popupWrap: '.pdp-popup-wrapper',
        section: '.the-grid',
        title: '.pdp-product-detail > h4',
        price: '.pdp-price',
        desc: '.pdp-desc'
    }

    let triggers = document.querySelectorAll(selectors.triggers);
    let closeBtns = document.querySelectorAll(selectors.closers);

    if(closeBtns){
        closeBtns.forEach(closeBtn => {
            closeBtn.addEventListener('click',()=>{
                closeBtn.closest(selectors.popupWrap).classList.remove('is-active');
            });
        });
    }


    if(triggers){
        triggers.forEach((trigger)=>{
            trigger.addEventListener('click',(el)=>{
                let product = JSON.parse(trigger.querySelector('script').textContent);
                buildPopup(trigger, product);
            })
        })
    }

    function buildPopup(trigger, product){

        let section = trigger.closest(selectors.section);
        let popupContainer = section.querySelector(selectors.popupWrap);
        popupContainer.classList.add('is-active');

        addProductData(popupContainer, product);
    }

    function addProductData(popup, product) {
        console.log(product);
        popup.querySelector(selectors.title).innerText = product.title;
        popup.querySelector(selectors.price).innerText = product.price;
        popup.querySelector(selectors.desc).innerHTML = product.description;
    }

});
