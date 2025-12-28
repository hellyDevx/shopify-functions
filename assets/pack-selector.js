(function () {
  console.log('[Pack Selector] Script file loaded');

  document.addEventListener('DOMContentLoaded', function () {
    console.log('[Pack Selector] DOMContentLoaded fired');

    const packSelector = document.querySelector('[data-pack-selector]');
    console.log('[Pack Selector] packSelector:', packSelector);

    if (!packSelector) {
      console.warn('[Pack Selector] ❌ No pack selector found');
      return;
    }

    const packOptions = packSelector.querySelectorAll('.pack-option');
    const hiddenInput = packSelector.querySelector('[data-pack-hidden]');

    console.log('[Pack Selector] packOptions count:', packOptions.length);
    console.log('[Pack Selector] hiddenInput:', hiddenInput);

    const quantityInput = document.querySelector(
      '.quantity__input'
    );

    console.log('[Pack Selector] quantityInput:', quantityInput);

    if (!quantityInput) {
      console.warn('[Pack Selector] ❌ Quantity input not found');
      return;
    }

    packOptions.forEach((option, index) => {
      console.log(`[Pack Selector] Binding click to option ${index}`, option);

      option.addEventListener('click', function (e) {
        console.log('[Pack Selector] 👉 Option clicked', option);

        const radio = option.querySelector('input[type="radio"]');
        console.log('[Pack Selector] radio:', radio);

        if (!radio) {
          console.warn('[Pack Selector] ❌ Radio not found inside option');
          return;
        }

        const qty = parseInt(radio.value, 10);
        console.log('[Pack Selector] Selected qty:', qty);

        // 1️⃣ Set radio checked
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

    console.log('[Pack Selector] ✅ Initialization complete');
  });
})();