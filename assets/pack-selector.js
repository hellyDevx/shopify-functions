document.addEventListener('change', function (e) {
  const radio = e.target;
  if (!radio.matches('[name="quantity"]')) return;

  const option = radio.closest('.pack-option');
  if (!option) return;

  const selector = option.closest('.pack-selector');
  if (!selector) return;

  // Remove active from all
  selector.querySelectorAll('.pack-option').forEach(el => {
    el.classList.remove('is-active');
  });

  // Activate selected
  option.classList.add('is-active');
});
