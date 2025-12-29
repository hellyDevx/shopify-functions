(function () {

  document.addEventListener('DOMContentLoaded', function () {

    const packSelector = document.querySelector('[data-pack-selector]');

    if (!packSelector) {
      return;
    }

    const packOptions = packSelector.querySelectorAll('.pack-option');
    const hiddenInput = packSelector.querySelector('[data-pack-hidden]');

    const quantityInput = document.querySelector(
      '.product__info-wrapper .quantity__input'
    );

    if (!quantityInput) {
      return;
    }

  packOptions.forEach((option, index) => {

      option.addEventListener('click', function (e) {

        const radio = option.querySelector('input[type="radio"]');

        if (!radio) {
          return;
        }

        const qty = parseInt(radio.value, 10);

        radio.checked = true;

        // 2️⃣ Update quantity input
        quantityInput.value = qty;
        quantityInput.dispatchEvent(
          new Event('change', { bubbles: true })
        );

        console.log('[Pack Selector] Quantity input updated to:', quantityInput.value);

        // 3️⃣ Update hidden line-item property
        if (hiddenInput) {
          hiddenInput.value = qty;
          console.log('[Pack Selector] Hidden pack size updated:', hiddenInput.value);
        }

        // 4️⃣ Toggle active class
        packOptions.forEach(opt => opt.classList.remove('is-active'));
        option.classList.add('is-active');

        console.log('[Pack Selector] is-active class applied');
      });
    });

    // When the product form is submitted / Add to cart is clicked, ensure the
    // currently active pack quantity is applied to the quantity inputs so the
    // correct amount is added to cart.
    const nearestForm = packSelector.closest('form');

    function getActivePackQty() {
      // prefer .is-active class
      const active = packSelector.querySelector('.pack-option.is-active');
      if (active) {
        const r = active.querySelector('input[type="radio"]');
        if (r && r.value) return parseInt(r.value, 10) || null;
      }
      // fallback to checked radio
      const checked = packSelector.querySelector('input[type="radio"]:checked');
      if (checked && checked.value) return parseInt(checked.value, 10) || null;
      return null;
    }

    function applyPackQtyToInputs(qty) {
      if (!qty) return;
      // canonical quantity input
      const globalQty = document.querySelector('input[name="quantity"]');
      if (globalQty) {
        globalQty.value = qty;
        globalQty.dispatchEvent(new Event('input', { bubbles: true }));
        globalQty.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // theme specific quantity input
      if (typeof quantityInput !== 'undefined' && quantityInput) {
        quantityInput.value = qty;
        quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
        quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (hiddenInput) hiddenInput.value = qty;
    }

    if (nearestForm) {
      nearestForm.addEventListener('submit', function () {
        const qty = getActivePackQty();
        if (qty) applyPackQtyToInputs(qty);
      });

      // Also intercept clicks on submit buttons inside the form to synchronously
      // set the quantity before any synchronous handler runs.
      const submitButtons = nearestForm.querySelectorAll('button[type="submit"], input[type="submit"], .add-to-cart');
      submitButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const qty = getActivePackQty();
          if (qty) applyPackQtyToInputs(qty);
        });
      });
    } else {
      // fallback: listen for document-level clicks on common add-to-cart selectors
      document.addEventListener('click', function (e) {
        const target = e.target.closest && e.target.closest('.add-to-cart, button[type="submit"], input[type="submit"]');
        if (target) {
          const qty = getActivePackQty();
          if (qty) applyPackQtyToInputs(qty);
        }
      });
    }

  });
})();