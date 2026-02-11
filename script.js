// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations (AOS-like)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===================================
// GitHub Projects Fetcher
// ===================================
const GITHUB_USERNAME = 'ISAACmayamba';
const projectsGrid = document.getElementById('projectsGrid');

async function fetchGitHubProjects() {
    try {
        // Fetch user's repositories
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter out forked repos and sort by stars/updated date
        const originalRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 3); // Get top 3 projects
        
        displayProjects(originalRepos);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        displayError();
    }
}

function displayProjects(repos) {
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-info-circle"></i>
                <p>No projects found. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = repos.map((repo, index) => {
        const description = repo.description || 'No description available';
        const language = repo.language || 'Code';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const topics = repo.topics || [];
        
        // Generate a unique image for each project using a placeholder service
        // Specific images for each project
        const projectImages = [
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center'
        ];

        const projectImage = projectImages[index] || projectImages[0];
        
        return `
            <div class="project-card" data-aos="fade-up" data-tilt>
                <div class="project-image">
                    <img src="${projectImage}" alt="${repo.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <i class="fas fa-code" style="display:none;"></i>
                </div>
                <div class="project-header">
                    <h3>
                        <i class="fab fa-github"></i>
                        ${repo.name}
                    </h3>
                </div>
                <div class="project-body">
                    <p class="project-description">${description}</p>
                    <div class="project-stats">
                        <div class="project-stat">
                            <i class="fas fa-code"></i>
                            <span>${language}</span>
                        </div>
                        <div class="project-stat">
                            <i class="fas fa-star"></i>
                            <span>${stars}</span>
                        </div>
                        <div class="project-stat">
                            <i class="fas fa-code-branch"></i>
                            <span>${forks}</span>
                        </div>
                    </div>
                    ${topics.length > 0 ? `
                        <div class="project-topics">
                            ${topics.slice(0, 5).map(topic => `<span class="topic">${topic}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="project-footer">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                        View Project <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-observe new elements for animations
    document.querySelectorAll('.project-card[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Add 3D tilt effect to project cards (React-like interactivity)
    add3DTiltEffect();
}

function displayError() {
    projectsGrid.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load projects. Please visit my <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">GitHub profile</a> directly.</p>
        </div>
    `;
}

// Fetch projects when page loads (only if projectsGrid exists)
if (projectsGrid) {
    document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
}

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Since we don't have a backend, we'll show a success message
        // In a real application, you would send this data to a server
        showFormMessage('success', 'Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Log to console (for demonstration)
        console.log('Form submitted:', formData);
    });
}

function showFormMessage(type, message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
        border: 2px solid ${type === 'success' ? 'var(--primary-color)' : 'var(--accent)'};
        color: var(--text-primary);
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    messageDiv.textContent = message;
    
    // Insert message after form
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// ===================================
// Typing Effect for Hero Section
// ===================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    // Only on larger screens
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// ===================================
// Performance Optimization
// ===================================
// Lazy load images if any are added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Easter Egg: Konami Code
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add a fun animation or message
    const body = document.body;
    body.style.animation = 'rainbow 2s linear infinite';
    
    // Create CSS animation if it doesn't exist
    if (!document.getElementById('rainbow-animation')) {
        const style = document.createElement('style');
        style.id = 'rainbow-animation';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: var(--primary-color);
        padding: 2rem;
        border-radius: 16px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    message.innerHTML = '🎉 You found the secret! 🎉<br><small style="font-size: 1rem;">Isaac is awesome!</small>';
    document.body.appendChild(message);
    
    setTimeout(() => {
        body.style.animation = '';
        message.remove();
    }, 3000);
}

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hello, Developer!', 'color: #FF8C00; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Isaac Mayamba\'s Portfolio', 'color: #FFA500; font-size: 16px;');
console.log('%cInterested in the code? Check out the repository!', 'color: #D2691E; font-size: 14px;');
console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'color: #FF8C00; font-size: 12px;');

// ===================================
// 3D Tilt Effect (React-like interactivity)
// ===================================
function add3DTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===================================
// Particle Background Effect (React-like)
// ===================================
function createParticles() {
    const body = document.body;
    if (!body) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 140, 0, ${Math.random() * 0.6 + 0.4});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    body.appendChild(particlesContainer);

    // Add CSS animation for particles
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Creating particles...');
    createParticles();
});

// ===================================
// Initialize
// ===================================
console.log('Portfolio website initialized successfully! 🎉');

