document.addEventListener('DOMContentLoaded', function() {
  const packSelector = document.querySelector('[data-pack-selector]');
  
  if (!packSelector) return;

  const packOptions = packSelector.querySelectorAll('.pack-option');
  const hiddenInput = packSelector.querySelector('[data-pack-hidden]');
  const originalPrice = parseFloat(packSelector.dataset.originalPrice);
  const quantityInput = document.querySelector('input[name="quantity"]');

  // Handle pack option clicks
  packOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      packOptions.forEach(opt => opt.classList.remove('is-active'));
      
      // Add active class to clicked option
      this.classList.add('is-active');
      
      // Get the radio input and its value
      const radio = this.querySelector('input[type="radio"]');
      const qty = parseInt(radio.value);
      console.log('Selected pack quantity:', qty);
      // Check the radio
      radio.checked = true;
      
      // Update hidden input for line item property
      if (hiddenInput) {
        hiddenInput.value = qty;
      }
      
      // Update main quantity input
      if (quantityInput) {
        quantityInput.value = qty;
      }
    
    });
  });

  // Initialize prices on page load
  if (packOptions.length > 0) {
    packOptions[0].click();
  }
});