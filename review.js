// Получаем доступ к элементам на странице
const productNameInput = document.getElementById('productName');
const reviewTextInput = document.getElementById('reviewText');
const addReviewButton = document.getElementById('addReview');
const productsList = document.getElementById('productsList');
const reviewsContainer = document.getElementById('reviewsContainer');

// Функция для добавления отзыва
function addReview() {
    const productName = productNameInput.value;
    const reviewText = reviewTextInput.value;
    
    if (!productName || !reviewText) {
        alert('Пожалуйста, введите название продукта и отзыв.');
        return;
    }
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    products.push({
        name: productName,
        review: reviewText
    });
    
    localStorage.setItem('products', JSON.stringify(products));
    
    productNameInput.value = '';
    reviewTextInput.value = '';
    
    displayProducts();
}

// Функция для отображения продуктов с отзывами
function displayProducts() {
    productsList.innerHTML = '';
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = product.name;
        li.addEventListener('click', () => displayReviews(index));
        productsList.appendChild(li);
    });
}

// Функция для отображения отзывов по продукту
function displayReviews(index) {
    reviewsContainer.innerHTML = '';
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    const h2 = document.createElement('h2');
    h2.textContent = product.name;
    reviewsContainer.appendChild(h2);
    
    const p = document.createElement('p');
    p.textContent = product.review;
    reviewsContainer.appendChild(p);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить отзыв';
    deleteButton.addEventListener('click', () => {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        reviewsContainer.innerHTML = '';
    });
    
    reviewsContainer.appendChild(deleteButton);
}

addReviewButton.addEventListener('click', addReview);

displayProducts();