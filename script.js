// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for feature cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add sticky header behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const waitlistEmail = document.getElementById('waitlistEmail');
    const waitlistMessage = document.getElementById('waitlistMessage');

    // Get existing waitlist from localStorage or initialize empty array
    const getWaitlist = () => {
        const waitlist = localStorage.getItem('waitlist');
        return waitlist ? JSON.parse(waitlist) : [];
    };

    // Save email to waitlist
    const saveToWaitlist = (email) => {
        const waitlist = getWaitlist();
        if (waitlist.includes(email)) {
            throw new Error('This email is already on the waitlist!');
        }
        waitlist.push(email);
        localStorage.setItem('waitlist', JSON.stringify(waitlist));
    };

    // Handle form submission
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = waitlistEmail.value.trim();
        waitlistMessage.className = 'waitlist-message';
        
        try {
            saveToWaitlist(email);
            waitlistMessage.textContent = 'Thank you! You have been added to the waitlist.';
            waitlistMessage.classList.add('success');
            waitlistForm.reset();
        } catch (error) {
            waitlistMessage.textContent = error.message;
            waitlistMessage.classList.add('error');
        }
    });
}); 