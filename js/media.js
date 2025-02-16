// Create a modal (popup) window for displaying media content
// This modal will be used to show photos, videos, infographics, and audio in a larger format
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <button class="close-modal">&times;</button>
        <div class="modal-media-container"></div>
        <div class="modal-description"></div>
    </div>
`;
document.body.appendChild(modal);

// Find all buttons with class 'view-full-btn' and add click event listeners to each one
// These buttons will trigger the modal to open and display the media content
document.querySelectorAll('.view-full-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Find the parent container that holds all information about this media item
        const mediaItem = this.closest('.media-item');
        // Get the type of media (photo, video, infographic, or audio) from the data-type attribute
        const mediaType = mediaItem.getAttribute('data-type');
        // Get references to the containers where we'll put the media and its description
        const mediaContainer = modal.querySelector('.modal-media-container');
        const description = modal.querySelector('.modal-description');
        
        // Remove any existing content from the media container
        mediaContainer.innerHTML = '';
        
        // Handle different types of media differently based on their type
        switch(mediaType) {
            case 'photo':
                // For photos: Create a copy of the original image and display it in the modal
                const img = mediaItem.querySelector('img').cloneNode(true);
                img.className = 'modal-media';
                mediaContainer.appendChild(img);
                break;
                
            case 'video':
                const videoElement = mediaItem.querySelector('iframe');
                if (videoElement) {
                    // For YouTube videos: Create a new iframe with enhanced settings
                    const newIframe = document.createElement('iframe');
                    
                    // Get the video URL from the original iframe
                    let videoSrc = videoElement.src;
                    
                    // Modify YouTube URL to add better viewing options:
                    // - autoplay: automatically start playing
                    // - fs: enable fullscreen option
                    // - modestbranding: reduce YouTube branding
                    // - rel: disable related videos
                    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
                        videoSrc = videoSrc.replace('watch?v=', 'embed/');
                        
                        if (!videoSrc.includes('?')) {
                            videoSrc += '?';
                        } else {
                            videoSrc += '&';
                        }
                        videoSrc += 'autoplay=1&fs=1&modestbranding=1&rel=0';
                    }
                    
                    // Set up the new iframe with proper attributes for security and functionality
                    newIframe.src = videoSrc;
                    newIframe.className = 'modal-media';
                    newIframe.setAttribute('allowfullscreen', 'true');
                    newIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                    
                    // Make the video container responsive
                    mediaContainer.style.width = '90vw';  // 90% of viewport width
                    mediaContainer.style.height = '80vh'; // 80% of viewport height
                    
                    mediaContainer.appendChild(newIframe);
                } else {
                    // For regular HTML5 videos: Create a copy of the video element
                    const video = mediaItem.querySelector('video').cloneNode(true);
                    video.className = 'modal-media';
                    mediaContainer.appendChild(video);
                }
                break;
                
            case 'infographic':
                // For infographics: Create a copy of the image and display it
                const infographic = mediaItem.querySelector('img').cloneNode(true);
                infographic.className = 'modal-media';
                mediaContainer.appendChild(infographic);
                break;
                
            case 'audio':
                // For audio: Display both the associated image and the audio player
                const audioImg = mediaItem.querySelector('img').cloneNode(true);
                audioImg.className = 'modal-media';
                const audio = mediaItem.querySelector('audio').cloneNode(true);
                mediaContainer.appendChild(audioImg);
                mediaContainer.appendChild(audio);
                break;
        }
        
        // Copy the description from the original media item to the modal
        // Remove the 'view full' button from the description as it's not needed in the modal
        description.innerHTML = mediaItem.querySelector('.media-content').innerHTML;
        description.querySelector('.view-full-btn')?.remove();
        
        // Make the modal visible
        modal.style.display = 'block';
    });
});

// Add event listeners for closing the modal:
// 1. When clicking the close button
modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
});

// 2. When clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Prevent the modal from closing when clicking inside the modal content
modal.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
}); 

// Wait for the entire webpage to load before initializing features
document.addEventListener('DOMContentLoaded', function() {
    /* Mobile Menu System
     * Purpose: Makes the website navigation work well on mobile devices
     * How it works:
     * - Finds the menu button and navigation links
     * - When menu button is clicked, shows/hides the navigation menu
     * - Uses 'active' class to control visibility
     */
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    /* Media Filter System
     * Purpose: Allows users to filter different types of media content
     * How it works:
     * - Finds all filter buttons and media items
     * - When a filter button is clicked:
     *   1. Updates which button looks active
     *   2. Shows/hides media items based on their type
     *   3. Adds smooth fade animation when showing items
     */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mediaItems = document.querySelectorAll('.media-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            mediaItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                
                if (filterValue === 'all' || itemType === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* Image Lazy Loading System
     * Purpose: Improves page load performance by loading images only when needed
     * How it works:
     * - Uses Intersection Observer to watch for images entering the viewport
     * - When an image becomes visible:
     *   1. Loads the actual image from data-src attribute
     *   2. Removes the data-src attribute once loaded
     */
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* Audio Player Management System
     * Purpose: Ensures a better audio listening experience
     * How it works:
     * - Finds all audio players on the page
     * - When one audio starts playing, pauses all other audio
     * - Prevents multiple audio files from playing simultaneously
     */
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(player => {
        player.addEventListener('play', function() {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });
    });
});