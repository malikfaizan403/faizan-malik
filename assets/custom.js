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

        buildForm(product);
    }

    function buildForm(product) {

        const optionsContainer = document.getElementById('productOptions');

          // Extract unique option values
            const optionValues = {};
            product.variants.forEach(variant => {
                Object.keys(variant).forEach(key => {
                    if (key.startsWith('option')) {
                        const optionName = `Option ${key.replace('option', '').trim()}`;
                        if (!optionValues[optionName]) {
                            optionValues[optionName] = new Set();
                        }
                        optionValues[optionName].add(variant[key]);
                    }
                });
            });

            console.log(optionValues);

            // Create option fields
            Object.keys(optionValues).forEach(optionName => {
                const fieldContainer = document.createElement('div');
                fieldContainer.classList.add('option-field');

                const label = document.createElement('label');
                label.textContent = `${optionName}:`;
                fieldContainer.appendChild(label);

                const values = Array.from(optionValues[optionName]);

                if (values.length > 1) {
                    if (optionName.includes('Option 1')) {
                        // Use a select dropdown for options like sizes
                        const select = document.createElement('select');
                        select.id = optionName.toLowerCase().replace(/\s+/g, '_');
                        select.name = optionName.toLowerCase().replace(/\s+/g, '_');

                        values.forEach(value => {
                            const optionElement = document.createElement('option');
                            optionElement.value = value;
                            optionElement.textContent = value;
                            select.appendChild(optionElement);
                        });
                        fieldContainer.appendChild(select);
                    } else {
                        // Use radio buttons for other options like colors
                        values.forEach(value => {
                            const radioContainer = document.createElement('div');
                            const radio = document.createElement('input');
                            radio.type = 'radio';
                            radio.id = `${optionName.toLowerCase().replace(/\s+/g, '_')}_${value}`;
                            radio.name = optionName.toLowerCase().replace(/\s+/g, '_');
                            radio.value = value;

                            const radioLabel = document.createElement('label');
                            radioLabel.setAttribute('for', radio.id);
                            radioLabel.textContent = value;

                            radioContainer.appendChild(radio);
                            radioContainer.appendChild(radioLabel);
                            fieldContainer.appendChild(radioContainer);
                        });
                    }
                }

                optionsContainer.appendChild(fieldContainer);
            });

        // Handle form submission
        // document.getElementById('addToCartForm').addEventListener('submit', function(event) {
        //     event.preventDefault();

        //     const selectedOptions = {};
        //     product.options.forEach(option => {
        //         if (option.type === 'select') {
        //             selectedOptions[option.name.toLowerCase()] = document.getElementById(option.name.toLowerCase()).value;
        //         } else if (option.type === 'radio') {
        //             const selectedRadio = document.querySelector(`input[name="${option.name.toLowerCase()}"]:checked`);
        //             selectedOptions[option.name.toLowerCase()] = selectedRadio ? selectedRadio.value : null;
        //         }
        //     });

        //     // Find the variant ID based on selected options
        //     const selectedVariant = product.variants.find(variant =>
        //         product.options.every(option =>
        //             variant[option.name.toLowerCase()] === selectedOptions[option.name.toLowerCase()]
        //         )
        //     );

        //     if (selectedVariant) {
        //         document.getElementById('variantId').value = selectedVariant.id;

        //         // Prepare and send the request to add to cart
        //         addToCart(selectedVariant.id);
        //     } else {
        //         alert('Please select a valid option.');
        //     }

        // });

    }

    // reset popup on close
    function resetPopup(popup){

    }

    // Function to add item to the cart
    function addToCart(variantId, quantity = 1) {
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: variantId,
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Item added to cart:', data);
            // Handle success (e.g., show a message, update cart UI)
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            // Handle error
        });
    }

});
