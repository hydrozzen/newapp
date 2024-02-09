const API_KEY = "8a6b525c9925801914d2702fe4683567";
const url = 'https://gnews.io/api/v4/search?q=';

window.addEventListener('load', () => fetchNews('India'));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('news-card-template');
    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        // if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    const newsUrl = cardClone.querySelector('#news-url');

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    });
    newsSource.innerHTML = `${article.source.name}  •  ${date}`;
    newsDesc.innerHTML = article.description;
    newsUrl.href = article.url;
}

const navUl = document.querySelectorAll('#nav-links-container ul li');
navUl.forEach((item) => {
    item.addEventListener('click', () => {
        onNavItemClick(item.id);
    })
})
let currentSelectedNavItem = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNavItem?.classList.remove('active');
    currentSelectedNavItem = navItem;
    currentSelectedNavItem.classList.add('active');
    NavLinksContainer.classList.remove('open');
    if (bars.classList.contains('fa-xmark')) {
        bars.classList.remove('fa-xmark');
        bars.classList.add('fa-bars');
    }
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    currentSelectedNavItem?.classList.remove('active');
    currentSelectedNavItem = null;
})

const hamIcon = document.getElementById('ham-icon');
const NavLinksContainer = document.getElementById('nav-links-container');
const bars = document.getElementById('bars');
hamIcon.addEventListener('click', () => {
    NavLinksContainer.classList.toggle('open');
    if (bars.classList.contains('fa-bars')) {
        bars.classList.remove('fa-bars');
        bars.classList.add('fa-xmark');
    } else {
        bars.classList.remove('fa-xmark');
        bars.classList.add('fa-bars');
    }
})


// for Dark Mode
const toggleSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);