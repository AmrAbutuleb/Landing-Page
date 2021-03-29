/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();
const sectionlist = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//function to check if an element is in view or not
function inView (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

//function to create an HTML 'a' element
function createHTML (id,name){
    const item = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return item;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    for(let i = 0; i<sectionlist.length; i++){
        const newItem = document.createElement('li');
        let list = [];
        list.push(sectionlist[i].getAttribute('data-nav'));
        list.push(sectionlist[i].getAttribute('id'));
        newItem.innerHTML = createHTML(list[0], list[1])
        fragment.appendChild(newItem);
    }
    const navBarList = document.getElementById('navbar__list')
    navBarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport

function setActiveClass(){
    for (let i=0; i < sectionlist.length; i++){
        if (inView(sectionlist[i])){
            sectionlist[i].classList.add("your-active-class");
        }else{
            sectionlist[i].classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: 'smooth'})
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click
const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click', function(event){
    scrollToElement(event)
})
// Set sections as active
document.addEventListener('scroll', function(){
    setActiveClass();
});