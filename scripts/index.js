const toggle = document.querySelector('.toggle');
const listNodes = document.querySelectorAll('.item');
const menu = document.querySelector(".menu");

const submenuitems = document.querySelectorAll('.subitem');

function toggleMenu() {
    listNodes.forEach(function(item) {
        if (item.classList.contains('hidden')) {
            item.classList.remove("hidden");
            toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
            setTimeout(function() {
                item.classList.remove('visuallyhidden');
            }, 20);
        } else {
            item.classList.add('visuallyhidden');
            item.addEventListener('transitionend', function(e) {
                item.classList.add('hidden');
                toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
            }, {
                capture: false,
                once: true,
                passive: false
            });
        }
    })
}

toggle.addEventListener('click', toggleMenu, false);

// Submenus
const items = document.querySelectorAll('.item');

function toggleSubMenuItem() {
    if (this.classList.contains("submenu-active")) {
        const retElems = this.getElementsByClassName("subitem");
        [...retElems].forEach(function(item) {
            item.classList.add('visuallyhidden');
            item.addEventListener('transitionend', function(e) {
                item.classList.add('hidden');
            }, {
                capture: false,
                once: true,
                passive: false
            });
        });

        this.classList.remove("submenu-active");
    } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        this.classList.add("submenu-active");
    } else {
        const retElems = this.getElementsByClassName("subitem");
        [...retElems].forEach(function(item) {
            if (item.classList.contains('hidden')) {
                item.classList.remove("hidden");
                //toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
                setTimeout(function() {
                    item.classList.remove('visuallyhidden');
                }, 20);
            }
        })

        this.classList.add("submenu-active");
    }
}

// function toggleItem() {
//     if (this.classList.contains("submenu-active")) {
//         this.classList.remove("submenu-active");
//     } else if (menu.querySelector(".submenu-active")) {
//         menu.querySelector(".submenu-active").classList.remove("submenu-active");
//         this.classList.add("submenu-active");
//     } else {
//         this.classList.add("submenu-active");
//     }
// }

for (let item of items) {
    if (item.querySelector('.submenu')) {
        item.addEventListener('click', toggleSubMenuItem, false);
        item.addEventListener('keypress', toggleSubMenuItem, false);
    }
}