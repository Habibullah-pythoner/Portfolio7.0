// const scrollBar = document.getElementById('scrollBar');
        const thumb = document.getElementById('thumb');
        const mainWindow = document.getElementById('main-window');
        let isDragging = false;
        let startY;
        let startScrollTop;

        // Update the thumb position based on the main-window scroll
        function updateThumbPosition() {
            const scrollableHeight = mainWindow.scrollHeight - mainWindow.clientHeight;
            const thumbHeight = ((mainWindow.clientHeight / mainWindow.scrollHeight) * 100) - 2; // 2px margin on top and bottom
            const scrollPercentage = (mainWindow.scrollTop / scrollableHeight) * (100 - thumbHeight);

            if (scrollPercentage < 0) {
                scrollPercentage = 0;
            } else if (scrollPercentage + thumbHeight > 100) {
                scrollPercentage = 100 - thumbHeight;
            }

            thumb.style.top = scrollPercentage + '%';
        }

        // Handle thumb click and drag to scroll
        thumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = mainWindow.scrollTop;

            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaY = e.clientY - startY;
                const scrollableHeight = mainWindow.scrollHeight - mainWindow.clientHeight;
                const thumbHeight = ((mainWindow.clientHeight / mainWindow.scrollHeight) * 100) - 2; // 2px margin on top and bottom
                const maxThumbTop = 100 - thumbHeight;

                mainWindow.scrollTop = startScrollTop + (deltaY / scrollBar.clientHeight) * scrollableHeight;
                
                if (mainWindow.scrollTop < 0) {
                    mainWindow.scrollTop = 0;
                } else if (mainWindow.scrollTop > scrollableHeight) {
                    mainWindow.scrollTop = scrollableHeight;
                }

                updateThumbPosition();
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Add an event listener to listen for scroll events on the main window
        mainWindow.addEventListener('scroll', updateThumbPosition);

        // Initialize the thumb position
        updateThumbPosition();