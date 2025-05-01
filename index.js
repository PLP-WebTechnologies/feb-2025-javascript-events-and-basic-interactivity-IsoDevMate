
document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to current button
            this.classList.add('active');

            // Show the corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const inner = item.querySelector('.accordion-inner');

        header.addEventListener('click', function() {
            // Toggle the active class
            const isActive = item.classList.contains('active');

            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                const accContent = accItem.querySelector('.accordion-content');
                accContent.style.maxHeight = null;
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = inner.offsetHeight + 'px';
            }
        });
    });

    // Shuffle images functionality
    const shuffleBtn = document.querySelector('.shuffle-btn');
    const gallery = document.querySelector('.gallery');
    const imageContainers = Array.from(document.querySelectorAll('.image-container'));

    shuffleBtn.addEventListener('click', function() {
        // Disable the button during animation
        this.disabled = true;

        // Fade out all images
        imageContainers.forEach(container => {
            container.style.opacity = '0';
            container.style.transform = 'scale(0.8)';
        });

        // Shuffle the array
        const shuffled = shuffleArray([...imageContainers]);

        // Wait for fade out animation to complete
        setTimeout(() => {
            // Remove all image containers from gallery
            imageContainers.forEach(container => {
                gallery.removeChild(container);
            });

            // Add them back in the shuffled order
            shuffled.forEach(container => {
                gallery.appendChild(container);
            });

            // Fade them back in
            setTimeout(() => {
                shuffled.forEach(container => {
                    container.style.opacity = '1';
                    container.style.transform = 'scale(1)';
                });

                // Re-enable the button
                this.disabled = false;

                // Show status message
                showStatusMessage('Images shuffled successfully!');
            }, 50);
        }, 500);
    });

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Form submission handling
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Show success message
        showStatusMessage(`Thank you, ${name}! Your message has been sent.`);

        // Reset the form
        this.reset();
    });

    // Status message function
    function showStatusMessage(message) {
        const statusEl = document.getElementById('status-message');
        statusEl.textContent = message;
        statusEl.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            statusEl.classList.remove('show');
        }, 3000);
    }

    // Secret action for double-click (Easter egg)
    document.addEventListener('dblclick', function(e) {
        if (e.target.tagName === 'IMG') {
            // Apply a fun filter when double-clicking images
            const currentFilter = e.target.style.filter;
            if (currentFilter.includes('hue-rotate')) {
                e.target.style.filter = 'sepia(20%)';
            } else {
                e.target.style.filter = 'sepia(20%) hue-rotate(180deg)';
            }
            showStatusMessage('You found a secret effect! Double-click again to revert.');
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'S' to shuffle (when not typing in an input)
        if (e.key.toLowerCase() === 's' &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA') {
            shuffleBtn.click();
        }

        // Press numbers 1-3 to switch tabs (when not typing in an input)
        if (['1', '2', '3'].includes(e.key) &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA') {
            tabBtns[parseInt(e.key) - 1].click();
        }
    });

    // Long press detection for mobile devices
    let timer;
    let longPressDuration = 500; // ms

    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'IMG') {
            timer = setTimeout(() => {
                // Apply a fun filter when long-pressing images
                const currentFilter = e.target.style.filter;
                if (currentFilter.includes('grayscale')) {
                    e.target.style.filter = 'sepia(20%)';
                } else {
                    e.target.style.filter = 'grayscale(100%)';
                }
                showStatusMessage('You found a secret effect! Long press again to revert.');
            }, longPressDuration);
        }
    });

    // Clear the timer if touch ends before long press duration
    document.addEventListener('touchend', function() {
        clearTimeout(timer);
    });
});
