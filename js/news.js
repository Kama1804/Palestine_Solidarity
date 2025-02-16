document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const searchBar = document.getElementById('searchBar');

    function filterNews(filterValue, searchTerm = '') {
        newsCards.forEach(card => {
            const matchesFilter = filterValue === 'all' || card.getAttribute('data-type') === filterValue;
            const matchesSearch = card.textContent.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (matchesFilter && matchesSearch) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterNews(this.getAttribute('data-filter'), searchBar.value);
        });
    });

    // Search Functionality
    searchBar.addEventListener('input', function() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        filterNews(activeFilter, this.value);
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
});
