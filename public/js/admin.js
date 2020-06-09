const deleteProduct = (button) => {
  const productId = button.parentNode.querySelector('[name=id]').value;
  const csrf = button.parentNode.querySelector('[name=_csrf]').value;

  fetch('/admin/product/' + productId, {
    method: 'DELETE',
    headers: { 'csrf-token': csrf }
  }).then(response => console.log(response))
    .catch(err => console.log(err));
};
