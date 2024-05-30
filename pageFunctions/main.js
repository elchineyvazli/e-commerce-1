const products = document.getElementById('products');
const card = document.createElement('div');
const exmImages = document.createElement('div');
const image = document.createElement('div');
const cardInfos = document.createElement('div');
const prodColors = document.createElement('div');
const prodList = document.createElement('ul');
const prodName = document.createElement('h1');
const prodPrice = document.createElement('h1');
const addToCart = document.createElement('button');

const hoverLoginContainer = document.getElementById("hoverLoginContainer");

prodName.innerText = 'Sport shoes';
prodPrice.innerText = '7.93';
addToCart.innerText = 'ADD TO CART';

products.appendChild(card);
card.appendChild(exmImages);
card.appendChild(image);
card.appendChild(cardInfos);
cardInfos.appendChild(prodName);
cardInfos.appendChild(prodPrice);
cardInfos.appendChild(prodColors);
cardInfos.appendChild(prodList);
cardInfos.appendChild(addToCart);

card.className = "card";
exmImages.className = "exmImages";
prodName.className = "prodName";
prodPrice.className = "prodPrice";
prodColors.className = "prodColors";
image.className = "image";
cardInfos.className = "cardInfos";
addToCart.className = "addToCart";

for (let i = 0; i < 4; i++) {
    const img = document.createElement('div');
    img.className = "img";
    exmImages.appendChild(img);
}

for (let i = 0; i < 4; i++) {
    const color = document.createElement('div');
    color.className = "color";
    prodColors.appendChild(color);
    // console.log(prodColors.children);
}

for (let i = 0; i < 4; i++) {
    const prodListLi = document.createElement('li');
    prodListLi.className = "prodListLi";
    prodListLi.innerText = prodListLi.innerText.length > 0 ? "ELCIN" : "Empty";
    prodList.appendChild(prodListLi);
}

//! Header buttons
const choosingButtons = document.getElementsByClassName('choosingButton');
choosingButtons[0].style.color = '#3B945E';
for (let i = 0; i < choosingButtons.length; i++) {
    choosingButtons[i].addEventListener('mouseover', function () {
        choosingButtons[i].style.textDecoration = 'none';
        choosingButtons[i].style.setProperty('--hoverBeforeValue', "100%");
    })
    choosingButtons[i].addEventListener('mouseleave', function () {
        choosingButtons[i].style.textDecoration = 'none';
        choosingButtons[i].style.setProperty('--hoverBeforeValue', "0%");
    })
    choosingButtons[i].addEventListener('click', function () {
        choosingButtons[i].style.color = '#3B945E';
        for (let j = 0; j < choosingButtons.length; j++) {
            if (i != j) {
                choosingButtons[j].style.color = 'black';
            }
        }
    })
}

//! Hamburger menu
const hMenu = document.getElementById('hMenu');
const lines = document.getElementsByClassName('line');
let isX = false;

hMenu.addEventListener('click', function () {
    if (!isX) {
        lines[0].style.transform = "rotate(45deg)";
        lines[0].style.width = "26px";
        lines[0].style.margin = "0px 0 0 -4px";
        lines[1].style.display = "none";
        lines[2].style.transform = "rotate(-45deg)";
        lines[2].style.width = "26px";
        lines[2].style.margin = " -6px 0 0 -4px";
    } else {
        lines[0].style.transform = "rotate(0deg)";
        lines[0].style.width = "26px";
        lines[0].style.margin = "0";
        lines[1].style.display = "flex";
        lines[2].style.transform = "rotate(0deg)";
        lines[2].style.width = "26px";
        lines[2].style.margin = "0";
    }
    isX = !isX;
});

const imgs = document.getElementsByClassName('img');
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function () {
        imgs[i].style.border = "solid 2px green";
        imgs[i].parentElement.parentElement.children[1].style.backgroundImage = `url(${imgs[i].currentStyle || window.getComputedStyle(imgs[i], false).backgroundImage.slice(4, -1).replace(/"/g, "")})`
        for (let j = 0; j < imgs.length; j++) {
            if (i != j) {
                imgs[j].style.border = "#CDCDCD solid 1px";
            }
        }
        // console.log(imgs[i].parentElement.parentElement.children[1]);
        // console.log(imgs[i].currentStyle || window.getComputedStyle(imgs[i], false).backgroundImage.slice(4, -1).replace(/"/g, ""));
    })
}

const colors = document.getElementsByClassName('color');
for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', function () {
        colors[i].style.border = "solid 2px green";
        for (let j = 0; j < colors.length; j++) {
            if (i != j) {
                colors[j].style.border = "#CDCDCD solid 1px";
            }
        }
    })
}

prodPrice.style.setProperty("--prevValue", "'$25'");
prodPrice.style.setProperty("--vacancyType", "'$'");

const login = document.getElementById('login')
const register = document.getElementById('register');
const myFavourites = document.getElementById('myFavourites');
const myBasket = document.getElementById('myBasket');

login.addEventListener('click', function () {
    window.location.href = '../pages/login.html';
    localStorage.setItem('loginPage', "login");
});
register.addEventListener('click', function () {
    window.location.href = '../pages/login.html';
    localStorage.setItem('loginPage', "register");
});
myFavourites.addEventListener('click', function () {
    if (!localStorage.getItem('userId')) {
        window.location.href = '../pages/login.html';
        localStorage.setItem('loginPage', "login");
    } else {

    }
});
myBasket.addEventListener('click', function () {
    if (!localStorage.getItem('userId')) {
        window.location.href = '../pages/login.html';
        localStorage.setItem('loginPage', "login");
    } else {

    }
});

let userId = localStorage.getItem('userId') && localStorage.getItem('userId');

if (localStorage.getItem('userId')) {

    for (let i = 0; i < hoverLoginContainer.children.length; i++) {
        hoverLoginContainer.children[i].style.display = "none";
    }

    const aboutMe = document.createElement('div');
    aboutMe.id = "aboutMe";
    const allDeliveries = document.createElement('div');
    allDeliveries.id = "allDeliveries";
    const signOut = document.createElement('div');
    signOut.id = "signOut";

    aboutMe.innerHTML = `<i class="fa-solid fa-user"></i>İstifadəçi bilgiləri`;
    allDeliveries.innerHTML = `<i class="fa-solid fa-truck"></i>Sifarişlərim`;
    signOut.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>Çıxış et`;

    aboutMe.addEventListener('click', function () {
        window.location.href = "../pages/user.html";
    })

    hoverLoginContainer.style.width = "250%";
    hoverLoginContainer.appendChild(aboutMe);
    hoverLoginContainer.appendChild(allDeliveries);
    hoverLoginContainer.appendChild(signOut);

    console.log(hoverLoginContainer.children);
}

// fetch("../data/data.json")
//     .then(res => res.json())
//     .then(data => {

//     })