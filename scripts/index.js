const toggle = document.querySelector('.toggle');
const menu = document.querySelector(".menu");
// Get all menu li items
const items = document.querySelectorAll('.item');
// Get all menu submenu li items
const submenuitems = document.querySelectorAll('.subitem');

function toggleMenu() {
    items.forEach(function(item) {
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

function toggleSubMenuItem() {
    // click out/off from submenu - if submenu is already active remove submenu parent class and each sub menu list item class
    if (this.classList.contains("submenu-active")) {
        this.classList.remove("submenu-active");
        const retElems = this.getElementsByClassName("subitem");
        [...retElems].forEach(function(item) {
            item.classList.remove('subdisplay');

        });
        // else check if submenu is already active anywhere else within the menu and remove both submenu parent class and each sub menu list item class
        // before adding submenu parent class and each sub menu list item class for the chosen/clicked submenu
    } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        [...submenuitems].forEach(function(item) {
            item.classList.remove("subdisplay");
        });
        this.classList.add("submenu-active");
        const retElems = this.getElementsByClassName("subitem");
        [...retElems].forEach(function(item) {
                item.classList.add("subdisplay");
            })
            // default state when a submenu is first clicked after initial page load
    } else {
        const retElems = this.getElementsByClassName("subitem");
        [...retElems].forEach(function(item) {
            item.classList.add("subdisplay");
        })
        this.classList.add("submenu-active");
    }
}
// iterate through li items and attach toggleSubMenu function to clcik and keypress events
for (let item of items) {
    if (item.querySelector('.submenu')) {
        item.addEventListener('click', toggleSubMenuItem, false);
        item.addEventListener('keypress', toggleSubMenuItem, false);
    }
}