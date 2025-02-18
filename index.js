import { menuArray } from "./data.js";

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
                <button class="add-item">+</button>
            </div>
        `
    });

    return menuHtml;
};

function render() {
    document.getElementById("menu").innerHTML = getMenuHtml();
}

render();