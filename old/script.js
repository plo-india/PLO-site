document.addEventListener('DOMContentLoaded', () => {
    initDynamicBanner();
    initAccordions();
    initAnswerToggles();
    initTableSearch();
    initResultsFilter();
    initCentreSearch();
    initMobileMenu();
    initEmailLinks();
    initImageCarousel();
    updateTimeline();
});

(function () {
    const carousel = document.querySelector('.plo-home-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.plo-home-carousel-track');
    const slides = carousel.querySelectorAll('.plo-home-carousel-slide');
    const prev = carousel.querySelector('.plo-home-carousel-arrow.prev');
    const next = carousel.querySelector('.plo-home-carousel-arrow.next');
    const dots = carousel.querySelectorAll('.plo-home-carousel-dots button');
    let current = 0;
    let timer;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function startAutoPlay() {
        clearInterval(timer);
        timer = setInterval(() => showSlide(current + 1), 5000);
    }

    prev.addEventListener('click', () => { showSlide(current - 1); startAutoPlay(); });
    next.addEventListener('click', () => { showSlide(current + 1); startAutoPlay(); });
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { showSlide(index); startAutoPlay(); });
    });

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startAutoPlay);

    showSlide(0);
    startAutoPlay();
})();

// Dynamic Banner Engine (Date Based)
function initDynamicBanner() {
    const bannerText = document.getElementById("banner-text");
    const bannerLink = document.getElementById("banner-link");

    if (!bannerText || !bannerLink) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // =====================================================
    // PLO 2027 TIMELINE DATES
    // =====================================================

    // Step 1 - Round 1 Registration
    const registrationStart = new Date("2026-09-19");
    const registrationEnd   = new Date("2026-10-31");

    // Step 2 - Round 1 Results
    const resultsDate = new Date("2027-01-15");

    // Step 3 - Round 2 APLO
    const aploStart = new Date("2027-03-01");
    const aploEnd   = new Date("2027-04-30");

    // Step 4 - Round 2 CAMP
    const campStart = new Date("2027-05-01");
    const campEnd   = new Date("2027-06-30");

    // Step 5 - IOL 2027
    const iolStart = new Date("2027-07-01");
    const iolEnd   = new Date("2027-07-28");


    // =====================================================
    // DYNAMIC BANNER
    // =====================================================

    // BEFORE REGISTRATION
    if (today < registrationStart) {

        bannerText.textContent =
            "PLO 2026-2027 Registration opens 19 September 2026!";

        bannerLink.textContent = "View Timeline →";
        bannerLink.href = "index.html#timeline";

    }

    // REGISTRATION OPEN
    else if (today >= registrationStart && today <= registrationEnd) {

        bannerText.textContent =
            "PLO 2026-2027 Registration is OPEN — Last date 31 October 2026!";

        bannerLink.textContent = "Register Now →";
        bannerLink.href = "registration.html";

    }

    // AFTER REGISTRATION → BEFORE RESULTS
    else if (today > registrationEnd && today < resultsDate) {

        bannerText.textContent =
            "Round 1 registration is closed. Results will be announced on 15 January 2027.";

        bannerLink.textContent = "View Timeline →";
        bannerLink.href = "index.html#timeline-wrapper";

    }

    // ROUND 1 RESULTS
    else if (today >= resultsDate && today < aploStart) {

        bannerText.textContent =
            "Round 1 Results are now LIVE! Check your scores and rankings.";

        bannerLink.textContent = "Check Results →";
        bannerLink.href = "results.html";

    }

    // APLO
    else if (today >= aploStart && today <= aploEnd) {

        bannerText.textContent =
            "Round 2 APLO is underway! Good luck to all participants.";

        bannerLink.textContent = "Learn More →";
        bannerLink.href = "about.html";

    }

    // CAMP
    else if (today >= campStart && today <= campEnd) {

        bannerText.textContent =
            "Round 2 CAMP is underway in Hyderabad!";

        bannerLink.textContent = "Camp Details →";
        bannerLink.href = "about.html";

    }

    // IOL
    else if (today >= iolStart && today <= iolEnd) {

        bannerText.textContent =
            "IOL 2027 is here! Best of luck to Team India!";

        bannerLink.textContent = "Learn More →";
        bannerLink.href = "about.html";

    }

    // AFTER IOL
    else {

        bannerText.textContent =
            "IOL 2027 has concluded. Stay tuned for results and updates!";

        bannerLink.textContent = "Check Results →";
        bannerLink.href = "results.html";
    }
}

// Email Links Handler
function initEmailLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allows default mailto behavior
            // Additional tracking or logging can be added here if needed
        });
    });
}

// Accordion Toggles
function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Answer Toggles for Practice Problems
function initAnswerToggles() {
    const toggleBtns = document.querySelectorAll('.toggle-answer-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const answerBox = btn.nextElementSibling;
            if (answerBox.style.display === "block") {
                answerBox.style.display = "none";
                btn.innerText = "Show Answer & Explanation";
            } else {
                answerBox.style.display = "block";
                btn.innerText = "Hide Answer";
            }
        });
    });
}

// Table Search and Pagination
function initTableSearch() {
    const table = document.getElementById('resourcesTable');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const allRows = Array.from(tbody.querySelectorAll('tr'));
    const searchInput = document.getElementById('resourceSearch');
    const entriesSelect = document.getElementById('entriesSelect');
    const difficultySelect = document.getElementById('difficultySelect');
    const paginationInfo = document.getElementById('paginationInfo');
    const paginationButtons = document.getElementById('paginationButtons');

    let currentPage = 1;
    let entriesPerPage = parseInt(entriesSelect ? entriesSelect.value : 10, 10);
    let filteredRows = [...allRows];

    function renderTable() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedDifficulty = difficultySelect ? difficultySelect.value : 'all';

        // Filter rows by text search AND difficulty level
        filteredRows = allRows.filter(row => {
            const matchesSearch = row.innerText.toLowerCase().includes(searchTerm);
            const rowDifficulty = row.dataset.difficulty || '';
            const matchesDifficulty = selectedDifficulty === 'all' || rowDifficulty === selectedDifficulty;

            return matchesSearch && matchesDifficulty;
        });

        const totalEntries = filteredRows.length;
        const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        allRows.forEach(row => row.style.display = 'none');

        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = Math.min(startIdx + entriesPerPage, totalEntries);

        for (let i = startIdx; i < endIdx; i++) {
            if (filteredRows[i]) {
                filteredRows[i].style.display = '';
            }
        }

        if (paginationInfo) {
            if (totalEntries === 0) {
                paginationInfo.textContent = 'Showing 0 to 0 of 0 entries';
            } else {
                paginationInfo.textContent = `Showing ${startIdx + 1} to ${endIdx} of ${totalEntries} entries`;
            }
        }

        renderPaginationControls(totalPages);
    }

    function renderPaginationControls(totalPages) {
        if (!paginationButtons) return;
        paginationButtons.innerHTML = '';

        // Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        paginationButtons.appendChild(prevBtn);

        // Helper to add single page button
        const addPageBtn = (page) => {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${page === currentPage ? 'active' : ''}`;
            pageBtn.textContent = page;
            pageBtn.addEventListener('click', () => {
                currentPage = page;
                renderTable();
            });
            paginationButtons.appendChild(pageBtn);
        };

        // Helper to add ellipsis
        const addEllipsis = () => {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationButtons.appendChild(ellipsis);
        };

        // Page number buttons with dynamic ellipsis layout
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) addPageBtn(i);
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) addPageBtn(i);
                addEllipsis();
                addPageBtn(totalPages);
            } else if (currentPage >= totalPages - 3) {
                addPageBtn(1);
                addEllipsis();
                for (let i = totalPages - 4; i <= totalPages; i++) addPageBtn(i);
            } else {
                addPageBtn(1);
                addEllipsis();
                for (let i = currentPage - 1; i <= currentPage + 1; i++) addPageBtn(i);
                addEllipsis();
                addPageBtn(totalPages);
            }
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = 'Next';
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
        paginationButtons.appendChild(nextBtn);
    }

    /* Event Listeners */
    searchInput?.addEventListener('keyup', () => {
        currentPage = 1;
        renderTable();
    });

    entriesSelect?.addEventListener('change', (e) => {
        entriesPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        renderTable();
    });

    difficultySelect?.addEventListener('change', () => {
        currentPage = 1;
        renderTable();
    });

    renderTable();
}

// Dropdown Toggle
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        dropdownContent.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            dropdownContent.classList.remove("show");
        }
    });
}

// Results Filter
function initResultsFilter(){
    const yearButtons = document.querySelectorAll(".year-btn");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".year-panel");

    if(!yearButtons.length) return;

    let currentYear = "2026";
    let currentTab = "iol";

    function render(){
        panels.forEach(panel => panel.classList.remove("active"));

        const active = document.getElementById(`${currentYear}-${currentTab}`);
        if(active) active.classList.add("active");

        yearButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.year === currentYear);
        });

        tabButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.tab === currentTab);
        });
    }

    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentYear = btn.dataset.year;
            render();
        });
    });

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentTab = btn.dataset.tab;
            render();
        });
    });

    render();
}

// Centre Search
function initCentreSearch() {
    const searchInput = document.getElementById('centreSearch');
    if (!searchInput) return;

    const centreItems = document.querySelectorAll('.centre-item');
    const centresContainer = document.querySelector('.centres-results');

    function filterCentres() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        centreItems.forEach(item => {
            const text = item.innerText.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        // Show/hide no results message
        let noResultsMsg = document.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No centres found matching your search.';
                centresContainer.appendChild(noResultsMsg);
            }
        } else {
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    }

    searchInput.addEventListener('keyup', filterCentres);
    searchInput.addEventListener('change', filterCentres);
}

// Mobile Hamburger Menu
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuToggle.textContent =
            navMenu.classList.contains("show") ? "✕" : "☰";
    });

    const dropdownBtn = document.querySelector(".dropdown-btn");

    if (dropdownBtn) {
        dropdownBtn.addEventListener("click", function (e) {
            if (window.innerWidth <= 1040) {
                e.preventDefault();
                this.parentElement.classList.toggle("active");
            }
        });
    }

    document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 1040) {
                navMenu.classList.remove("show");
                menuToggle.textContent = "☰";
            }
        });
    });
}

/* =========================================================
   INTERACTIVE TIMELINE
   ========================================================= */

function updateTimeline() {
    const timelineRows = document.querySelectorAll(
        ".timeline-row[data-date]"
    );

    if (!timelineRows.length) {
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activeFound = false;

    timelineRows.forEach((row) => {
        const dateValue = row.dataset.date;

        if (!dateValue) {
            return;
        }

        const eventDate = new Date(dateValue + "T00:00:00");

        row.classList.remove(
            "completed",
            "active",
            "upcoming",
            "expanded"
        );

        if (eventDate < today) {
            // Event is completed
            row.classList.add("completed");

        } else if (!activeFound) {
            // First future/current event = active event
            row.classList.add("active");
            activeFound = true;

        } else {
            // Remaining events are future events
            row.classList.add("upcoming");
        }
    });
}

/* =========================================================
   RESULTS ARCHIVE PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", initResultsArchive);

function initResultsArchive() {
    const yearButtons = document.querySelectorAll('.year-sidebar .year-btn');
    const tabButtons = document.querySelectorAll('.result-tabs .tab-btn');
    const allPanels = document.querySelectorAll('.year-panel');

    if (!yearButtons.length || !tabButtons.length) return;

    let currentYear = document.querySelector('.year-sidebar .year-btn.active')?.dataset.year || '2026';
    let currentTab = 'iol';

    // Helper: Checks if a panel element exists and contains actual records/content
    function hasPanelData(year, tab) {
        const panel = document.getElementById(`${year}-${tab}`);
        if (!panel) return false;

        // Included '.year-description' so narrative panels are recognized as valid content
        const hasContent = panel.querySelector('tr, .team-heading, .archive-table, .year-description');
        return Boolean(hasContent && panel.textContent.trim().length > 0);
    }

    // Function to show the active panel and toggle tab visibility
    function updateDisplay() {
        let availableTabs = [];

        // 1. Check which tabs have data for the current active year
        tabButtons.forEach(btn => {
            const tabName = btn.dataset.tab;
            if (hasPanelData(currentYear, tabName)) {
                btn.style.display = 'inline-block';
                availableTabs.push(tabName);
            } else {
                btn.style.display = 'none';
            }
        });

        // 2. Fallback to the first available tab if current selection isn't available for this year
        if (!availableTabs.includes(currentTab) && availableTabs.length > 0) {
            currentTab = availableTabs[0];
        }

        // 3. Update Tab Button Styles
        tabButtons.forEach(btn => {
            if (btn.dataset.tab === currentTab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 4. Hide all year panels & show only the selected active panel
        allPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.style.display = 'none';
        });

        const activePanel = document.getElementById(`${currentYear}-${currentTab}`);
        if (activePanel) {
            activePanel.classList.add('active');
            activePanel.style.display = 'block';
        }
    }

    // Year Sidebar Click Event
    yearButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            yearButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentYear = btn.dataset.year;
            updateDisplay();
        });
    });

    // Sub-Tab Click Event (IOL / Camp / PLO)
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = btn.dataset.tab;
            updateDisplay();
        });
    });

    // Initial load call
    updateDisplay();
}

/* =========================================================
   HINT TOGGLE FOR SAMPLE PROBLEM
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const hintBtn = document.getElementById('toggleHintBtn');
    const hintBox = document.getElementById('hintBox');

    if (hintBtn && hintBox) {
        hintBtn.addEventListener('click', () => {
            // Check if the box is currently unblurred
            const isUnblurred = hintBox.classList.contains('unblurred');

            if (isUnblurred) {
                hintBox.classList.remove('unblurred');
                hintBtn.textContent = 'Click to reveal hint!';
            } else {
                hintBox.classList.add('unblurred');
                hintBtn.textContent = 'Click to blur hint!';
            }
        });
    }
});

/* =========================================================
   IMAGE CAROUSEL FOR ABOUT/RESOURCES SECTION
   ========================================================= */

function initImageCarousel() {
    const carousels = document.querySelectorAll('.image-carousel');

    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');

        if (items.length <= 1) {
            // Hide controls if only one image
            const controls = carousel.querySelector('.carousel-controls');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (controls) controls.style.display = 'none';
            return;
        }

        let currentIndex = 0;
        let autoScrollInterval;

        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
            resetAutoScroll();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
            resetAutoScroll();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoScroll();
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
        }

        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }

        // Event Listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Initial setup
        updateCarousel();
        startAutoScroll();
    });
}