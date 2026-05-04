const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const selectedCity = document.getElementById('selectedCity');

const allResults = Array.from(searchResults.querySelectorAll('li'));

searchInput.addEventListener('focus', function() {
    searchResults.classList.add('active');
    filterResults('');
});

searchInput.addEventListener('blur', function() {
    setTimeout(() => {
        searchResults.classList.remove('active');
    }, 200);
});

searchInput.addEventListener('input', function() {
    const keyword = this.value.trim();
    filterResults(keyword);
});

function filterResults(keyword) {
    allResults.forEach(item => {
        const text = item.textContent;
        if (keyword === '' || text.includes(keyword)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

searchResults.addEventListener('click', function(e) {
    const target = e.target;
    if (target.tagName === 'LI') {
        const city = target.dataset.city;
        selectedCity.textContent = city;
        searchInput.value = '';
        searchResults.classList.remove('active');
    }
});

document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
        searchResults.classList.remove('active');
    }
});