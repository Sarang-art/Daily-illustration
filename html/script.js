// This will ensure the code only runs once
if (!window.tabsInitialized) {
  window.tabsInitialized = true;
  
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active classes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Activate clicked tab
        const tabId = button.getAttribute('data-tab');
        button.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });
  });
}

  // Toggle functionality
document.querySelectorAll('.collect-btn').forEach(button => {
  button.addEventListener('click', function() {
    const isCollected = this.getAttribute('data-collected') === 'true';
    const icon = this.querySelector('.collect-icon');
    
    this.setAttribute('data-collected', !isCollected);
    icon.classList.toggle('bi-heart');
    icon.classList.toggle('bi-heart-fill');
    this.querySelector('.btn-text').textContent = isCollected ? ' Collect' : ' Collected';
    
    // Save state if needed
    const itemId = this.closest('[data-item-id]')?.getAttribute('data-item-id');
    if (itemId) localStorage.setItem(`collected_${itemId}`, !isCollected);
  });

  // Load saved state on page load
  const itemId = button.closest('[data-item-id]')?.getAttribute('data-item-id');
  if (itemId && localStorage.getItem(`collected_${itemId}`) === 'true') {
    button.setAttribute('data-collected', 'true');
    button.querySelector('.collect-icon').classList.replace('bi-heart', 'bi-heart-fill');
    button.querySelector('.btn-text').textContent = ' Collected';
  }
});
// If you MUST keep button inside <a>
document.querySelectorAll('.collect-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    // Rest of your click handler...
  });
});


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.classList.add('menu-open');
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Scroll behavior for navbar
    let lastScrollPosition = 0;
    const desktopNavbar = document.querySelector('.navbar');
    const mobileNavbar = document.querySelector('.mobile-navbar');
    const navbarHeight = 70; // Match your navbar height
    
    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        
        // At top of page - always show
        if (currentScrollPosition <= 0) {
            if (window.innerWidth > 768) {
                desktopNavbar.style.transform = 'translateY(0)';
            } else {
                mobileNavbar.style.transform = 'translateY(0)';
            }
            return;
        }
        
        // Scrolling up - show navbar
        if (currentScrollPosition < lastScrollPosition) {
            if (window.innerWidth > 768) {
                desktopNavbar.style.transform = 'translateY(0)';
            } else {
                mobileNavbar.style.transform = 'translateY(0)';
            }
        } 
        // Scrolling down - hide navbar
        else if (currentScrollPosition > lastScrollPosition + 50) {
            if (window.innerWidth > 768) {
                desktopNavbar.style.transform = 'translateY(-100%)';
            } else {
                mobileNavbar.style.transform = 'translateY(-100%)';
            }
        }
        
        lastScrollPosition = currentScrollPosition;
    }
    
    // Initialize navbar position
    if (window.innerWidth > 768) {
        desktopNavbar.style.transform = 'translateY(0)';
    } else {
        mobileNavbar.style.transform = 'translateY(0)';
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle resize between mobile and desktop
    function handleResize() {
        if (window.innerWidth > 768) {
            mobileNavbar.style.transform = 'translateY(-100%)';
            desktopNavbar.style.transform = window.pageYOffset <= 0 ? 'translateY(0)' : 'translateY(0)';
        } else {
            desktopNavbar.style.transform = 'translateY(-100%)';
            mobileNavbar.style.transform = window.pageYOffset <= 0 ? 'translateY(0)' : 'translateY(0)';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Display current date
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString(undefined, options);
        currentDateElement.textContent = currentDate;
    }
});