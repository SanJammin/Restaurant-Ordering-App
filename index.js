import { menuArray } from "./data.js";

document.addEventListener("click", function(e){
    if (e.target.classList.contains("add-item")) {
        const itemId = Number(e.target.id);
        handleAddItem(itemId);
    }
});

function handleAddItem(itemId){
    document.getElementById("order").classList.remove("hidden");

    const targetItemObj = menuArray.filter(function(item){
        return item.id === itemId;
    })[0];
};

function getMenuHtml () {
    let menuHtml = ``;

    menuArray.forEach(item => {
        menuHtml += `
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
    });

    return menuHtml;
};

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml();
}

renderMenu();