// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);

// Typing animation for header
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 20}deg)
            rotateY(${(x - rect.width/2) / 20}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'none';
    });
});

// Skills progress animation
document.querySelectorAll('.skill-progress').forEach(progress => {
    const percentage = progress.getAttribute('data-progress');
    progress.style.width = '0%';
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progress.style.width = percentage;
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(progress);
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.classList.add('dark-mode-toggle');
darkModeToggle.innerHTML = '🌙';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Form submission feedback
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', function(e) {
    // Change button text to show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    submitButton.disabled = true;

    // Reset button state after submission (form will redirect)
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
        submitButton.disabled = false;
    }, 2000);
}); 