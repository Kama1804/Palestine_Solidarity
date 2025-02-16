
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnMenuBtn = menuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Add scroll header effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            img.classList.add('loaded');
        });
    });

    // Initialize current year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Palestine Solidarity Movement. All rights reserved.`;
    }

    // Get all the statistics elements by their IDs
    const aidNumberElement = document.getElementById('aidNumber');
    const eventsNumberElement = document.getElementById('eventsNumber');
    const volunteersNumberElement = document.getElementById('volunteersNumber');

    // Define the target numbers for each statistic
    const statistics = {
        aidNumber: {
            element: aidNumberElement,
            target: 5000    // Target number for humanitarian aid
        },
        eventsNumber: {
            element: eventsNumberElement,
            target: 25      // Target number for community events
        },
        volunteersNumber: {
            element: volunteersNumberElement,
            target: 1000    // Target number for active volunteers
        }
    };

    // Function to animate counting up to a target number
    function animateNumber(element, target) {
        // Start from zero
        let currentNumber = 0;
        
        // Calculate how much to increment each step
        // We want the animation to take about 2 seconds (100 steps)
        const increment = target / 100;
        
        // Update the number every 20 milliseconds
        const timer = setInterval(function() {
            // Add the increment to the current number
            currentNumber += increment;
            
            // Update the element with the rounded current number
            element.textContent = Math.round(currentNumber);
            
            // If we've reached or exceeded the target
            if (currentNumber >= target) {
                // Set the final number
                element.textContent = target;
                // Stop the animation
                clearInterval(timer);
            }
        }, 20); // 20ms interval between updates
    }

    // Create an observer to watch when statistics come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the statistics section is visible
            if (entry.isIntersecting) {
                // Start animation for each statistic
                Object.values(statistics).forEach(stat => {
                    animateNumber(stat.element, stat.target);
                });
                // Stop observing after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Start animation when element is 50% visible
        threshold: 0.5
    });

    // Start observing the statistics grid
    const statsSection = document.querySelector('.statistics-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
