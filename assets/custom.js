Shopify.formatMoney = function(cents, format) { if (typeof cents == 'string') { cents = cents.replace('.', ''); } var value = ''; var placeholderRegex = /{{\s*(\w+)\s*}}/; var formatString = (format || this.money_format); function defaultOption(opt, def) { return (typeof opt == 'undefined' ? def : opt); } function formatWithDelimiters(number, precision, thousands, decimal) { precision = defaultOption(precision, 2); thousands = defaultOption(thousands, ','); decimal = defaultOption(decimal, '.'); if (isNaN(number) || number == null) { return 0; } number = (number / 100.0).toFixed(precision); var parts = number.split('.'), dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands), cents = parts[1] ? (decimal + parts[1]) : ''; return dollars + cents; } switch (formatString.match(placeholderRegex)[1]) { case 'amount': value = formatWithDelimiters(cents, 2); break; case 'amount_no_decimals': value = formatWithDelimiters(cents, 0); break; case 'amount_with_comma_separator': value = formatWithDelimiters(cents, 2, '.', ','); break; case 'amount_no_decimals_with_comma_separator': value = formatWithDelimiters(cents, 0, '.', ','); break; } return formatString.replace(placeholderRegex, value); };
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
        desc: '.pdp-desc',
        image: '.pdp-popup-image img'
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
        popup.querySelector(selectors.price).innerText = Shopify.formatMoney(product.price);
        popup.querySelector(selectors.desc).innerHTML = product.description;
        popup.querySelector(selectors.image).src = product.featured_image;
    }


    // reset popup on close
    function resetPopup(popup){

    }

});
