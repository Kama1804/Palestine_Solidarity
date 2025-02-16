    // Array of resource objects containing information about available documents
    const resources = [
        {
            type: 'pdf',
            title: 'Educational Resource Guide',
            author: 'Palestine Solidarity Movement',
            date: 'January 2025',
            link: 'pdf/LIBERA1.pdf'
        },
        {
            type: 'pdf',
            title: 'Community Action Toolkit',
            author: 'Palestine Solidarity Movement',
            date: 'February 2025',
            link: 'pdf/resources-on-palestine.pdf'
        },
        {
            type: 'pdf',
            title: 'Anti-Palestinian Racism in the Media',
            author: 'Visual Palestine',
            date: 'February 2025',
            link: 'pdf/anti-palestinian-racism-in-the-media-1.pdf'
        },
        {
            type: 'pdf',
            title: 'Gaza on the eighth day',
            author: 'Social Developmental Forum',
            date: 'October 2023',
            link: 'pdf/Gaza--8thDay.pdf'
        },
        {
            type: 'pdf',
            title: 'Ethical Investment Policy  ',
            author: 'BDSMovement',
            date: 'November 2024',
            link: 'pdf/newsletter.pdf'
        },
        {
            type: 'word',
            title: 'The EU-Israel Association Agreement (Euro-Med)',
            author: 'Ireland Palestine Solidarity Campaign',
            date: 'Julai 2009',
            link: 'word/ipsc_euromed_factsheet.doc'
        },
        {
            type: 'word',
            title: 'How Israel torpedoed the ceasefire to produce a casus belli',
            author: 'Ireland Palestine Solidarity Campaign',
            date: 'January 2009',
            link: 'word/ipsc_gaza_ceasefire_broken_by_israel.doc'
        },
        {
            type: 'word',
            title: 'Israel’s Violations of UN Resolutions',
            author: 'Ireland Palestine Solidarity Campaign',
            date: 'March 2008',
            link: 'word/ipsc_unresolutions_factsheet.doc'
        }
    ];
    
    // Cache DOM elements for better performance
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tableBody = document.getElementById('resourcesTableBody');
    
    // Track current filter and search state
    let currentFilter = 'all';  // Default to showing all resources
    let searchTerm = '';        // Empty search term by default
    
    /**
     * Returns the appropriate CSS class for the resource type badge
     * @param {string} type - The resource type (pdf/word)
     * @returns {string} CSS class name for the badge
     */
    function getBadgeClass(type) {
        return `badge badge-${type}`;
    }
    
    /**
     * Renders the resources table based on current filter and search criteria
     * Filters resources based on:
     * 1. Current selected type filter (all/pdf/word)
     * 2. Search term (matches against title and author)
     */
    function renderTable() {
        const filteredResources = resources.filter(resource => {
            // Check if resource matches current filter
            const matchesFilter = currentFilter === 'all' || resource.type === currentFilter;
            // Check if resource matches search term
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                resource.author.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    
        // Generate table HTML for filtered resources
        tableBody.innerHTML = filteredResources.map(resource => `
            <tr>
                <td><span class="${getBadgeClass(resource.type)}">${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span></td>
                <td>${resource.title}</td>
                <td class="author-col">${resource.author}</td>
                <td class="date-col">${resource.date}</td>
                <td>
                    <button class="download-btn" onclick="handleDownload('${resource.link}', '${resource.title}')">
                        Download
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    /**
     * Handles resource download
     * Creates a temporary link element to trigger file download
     * @param {string} link - The resource file path
     * @param {string} title - The resource title
     */
    function handleDownload(link, title) {
        const fileName = link.split('/').pop();
        const a = document.createElement('a');
        a.href = link;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    // Event Listeners
    
    // Search input handler - updates search term and re-renders table
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderTable();
    });
    
    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update current filter and re-render table
            currentFilter = button.getAttribute('data-filter');
            renderTable();
        });
    });
    
    // Initial table render
    renderTable();