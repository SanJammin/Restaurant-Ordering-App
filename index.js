import { menuArray } from "./data.js";

const order = document.getElementById("order");

let total = 0;
let numDrinks = 0;
let numFoodItems = 0;
let orderList = [];

document.addEventListener("click", function(e){
    if (e.target.classList.contains("add-item")) {
        const itemId = Number(e.target.id);
        handleAddItem(itemId);
    } else if (e.target.classList.contains("remove")) {
        handleRemoveItem(e.target);
    } else if (e.target.classList.contains("purchase-btn")){
        handleOrder();
    } else if (e.target.classList.contains("exit-btn")){
        handleExit();
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

    orderList.push(targetItemObj);

    updateTotal();
};

function handleRemoveItem(removeBtn) {
    const itemContent = removeBtn.closest(".item-content");
    if (!itemContent) return;

    const itemIndex = [...document.querySelectorAll(".item-content")].indexOf(itemContent);
    if (itemIndex !== -1) {
        orderList.splice(itemIndex,1);
    }

    itemContent.remove();
    updateTotal();
};

function handleOrder() {
    document.getElementById("payment-modal").classList.remove("hidden");
    
    document.querySelectorAll("button").forEach((button) => {
        if (button.id !== "pay-btn" && button.id!== "exit-btn"){
            button.disabled = true;
        };
    });
};

function handleExit() {
    document.getElementById("payment-modal").classList.add("hidden");

    document.querySelectorAll("button").forEach((button) => {
        if (button.id !== "pay-btn" && button.id!== "exit-btn"){
            button.disabled = false;
        };
    });
};

function handlePayment() {
    document.getElementById("payment-modal").classList.add("hidden");
    document.getElementById("order").innerHTML = `
        <p class="thank-you">Thanks, ${document.getElementById("user-name").value}! Your order is on its way!</p>
    `
};

function updateTotal() {
    numDrinks = orderList.filter(item => item.category === "drink").length;
    numFoodItems = orderList.filter(item => item.category === "food").length;
    let numPairs = Math.min(numDrinks, numFoodItems);
    let discountedDrinks = 0;
    let discountedFoodItems = 0;
    let newTotal = 0;

    orderList.forEach((item, index) => {
        let itemPrice = item.price;
        let itemElement = document.querySelectorAll(".item-content")[index];
        let priceElement = itemElement.querySelector(".price");

        if (item.category === "drink" && discountedDrinks < numPairs) {
            itemPrice *= 0.9;
            discountedDrinks++;
            itemElement.classList.add("discounted");
        } else if (item.category === "food" && discountedFoodItems < numPairs) {
            itemPrice *= 0.9;
            discountedFoodItems++;
            itemElement.classList.add("discounted");
        } else {
            itemElement.classList.remove("discounted");
        };

        priceElement.textContent = `$${itemPrice.toFixed(2)}`;
        newTotal += itemPrice;
    });

    total = newTotal;

    document.getElementById("total-price").innerHTML = `
        <p>Total Price:</p>
        <p class="price">$${total.toFixed(2)}</p>
    `

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