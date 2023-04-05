//All selector in this project
const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection');
const showMsg = document.querySelector('.msg');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');


//data / state
let productData = getDataFromLocalStorage();
function getDataFromLocalStorage()
{
    let items = '';
    if(localStorage.getItem('productItems') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
}

function saveDataToLocalStorage(item){
    let items = '';
    if(localStorage.getItem('productItems') === null){
        items = [];
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    }else{
        items = JSON.parse(localStorage.getItem('productItems'));
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    }
    return items;
}


function deleteItemFromLocalStorage(id){
    const items = JSON.parse(localStorage.getItem('productItems'));


    let result = items.filter(productItem =>{
        return productItem.id !== id;
    });
    localStorage.setItem('productItems', JSON.stringify(result));
    if(result.length === 0) location.reload();
}

function getData(productList){
    if(productData.length > 0){
            let li = '';
            showMsg.textContent = '';
            productList.forEach( product => {
            li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${product.id}`;
            li.innerHTML = `<strong>${product.name}</strong>-
            <span class="price">$${product.price}</span>
            <i class="fa fa-trash float-end delete-product"></i>`;
            productListUL.appendChild(li);
        });
    }else{
        showMsg.innerHTML = 'Please add item to your catalog';
    }
    
}
getData(productData);

addBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    let id;
    if(productData.length === 0){
        id = 0;
    }else{
        id = productData[productData.length - 1].id + 1;
    }
    if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))){
        alert('Please fill up necessary information');
    }else{
        productData.push({
            id,
            name,
            price
        })
        saveDataToLocalStorage({
            id,
            name,
            price
        });
        productListUL.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }
    // console.log(name, price);
})

productListUL.addEventListener('click', (e) =>{
    if(e.target.classList.contains('delete-product')){
        // e.target.parentElement.remove();

        //removing target from the UI
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);

        //removing item from the store
        //Getting id
        const id = parseInt(target.id.split('-')[1]);
        // console.log(typeof id);
        let result = productData.filter(productItem =>{
            return productItem.id !== id;
        });
        productData = result;
        deleteItemFromLocalStorage(id);
       
    }
})

//searching
filterInput.addEventListener('keyup', e =>{
    const text = e.target.value.toLowerCase();
    let itemLength = 0;
    document.querySelectorAll('.collection .collection-item').forEach(item =>{
        const productName = item.firstElementChild.textContent.toLowerCase();
        if(productName.indexOf(text) === -1){
            item.style.display = 'none';
        }else{
            item.style.display = 'block';
            ++itemLength;
        }
    })
    itemLength > 0 ? showMessage():showMessage('No item found');
})

function showMessage(Message = ''){
    showMsg.innerHTML = Message;
    // if(fetchMessage) {
    //     showMsg.innerHTML = 'please add Item to your catalog';
    // }else if(searchMessage){
    //     showMessage.innerHTML = 'No item meet your criteria';
    // }
}