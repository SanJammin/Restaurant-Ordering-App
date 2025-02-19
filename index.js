import { menuArray } from "./data.js";

const order = document.getElementById("order");

let total = 0;

document.addEventListener("click", function(e){
    if (e.target.classList.contains("add-item")) {
        const itemId = Number(e.target.id);
        handleAddItem(itemId);
    } else if (e.target.classList.contains("remove")) {
        handleRemoveItem(e.target);
    } else if (e.target.classList.contains("purchase-btn")){
        handleOrder();
    };
});

document.getElementById("payment-modal").addEventListener("submit", (e) => {
    e.preventDefault();
    handlePayment();
});

function handleAddItem(itemId){
    const targetItemObj = menuArray.find(item =>
        item.id === itemId);
    
    const orderItem = document.getElementById("order-item");

    const itemContent = document.createElement("div");
    itemContent.classList.add("item-content");

    const itemName = document.createElement("p");
    itemName.classList.add("item-name");
    itemName.textContent = targetItemObj.name;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "remove";

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$${targetItemObj.price}`;

    itemContent.appendChild(itemName);
    itemContent.appendChild(removeBtn);
    itemContent.appendChild(price);

    orderItem.appendChild(itemContent);

    updateTotal(targetItemObj.price);
};

function handleRemoveItem(removeBtn) {
    const itemContent = removeBtn.closest(".item-content");
    if (!itemContent) return;

    const priceText = itemContent.querySelector(".price").textContent;
    const itemPrice = Number(priceText.replace("$", ""));

    itemContent.remove();
    updateTotal(-itemPrice);
};

function handleOrder() {
    document.getElementById("payment-modal").classList.remove("hidden");
};

function handlePayment() {
    document.getElementById("payment-modal").classList.add("hidden");
    document.getElementById("order").innerHTML = `
        <p class="thank-you">Thanks, ${document.getElementById("user-name").value}! Your order is on its way!</p>
    `
};

function updateTotal(price) {
    total += price;
    document.getElementById("total-price").innerHTML = `
        <p>Total Price:</p>
        <p class="price">$${total}</p>
    `;

    order.classList.toggle("hidden", total <= 0);
};

function getMenuHtml () {
    return menuArray.map(item => `
            <div class="menu-item">
                <p class="menu-item-emoji">${item.emoji}</p>
                <div class="menu-item-description">
                    <h2 class="menu-item-name">${item.name}</h2>
                    <p class="menu-item-ingredients">${item.ingredients.join(", ")}</p>
                    <p class="menu-item-price">$${item.price}</p>
                </div>
                <button class="add-item" id="${item.id}">+</button>
            </div>
        `
    ).join("");
};

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml();
};


renderMenu();