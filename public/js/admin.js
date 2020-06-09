const deleteProduct = (button) => {
  const productId = button.parentNode.querySelector('[name=id]').value;
  const csrf = button.parentNode.querySelector('[name=_csrf]').value;

  const productElement = button.closest('article');

  fetch('/admin/product/' + productId, {
    method: 'DELETE',
    headers: { 'csrf-token': csrf }
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      // To Support IE
      // productElement.parentNode.removeChild(productElement);
      productElement.remove();
    })
    .catch(err => console.log(err));
};
