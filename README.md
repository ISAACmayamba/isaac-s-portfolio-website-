# Isaac Mayamba - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Full Stack Developer from Zambia.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Dark Orange Theme**: Custom color scheme featuring dark orange (#FF8C00) and white accents
- **GitHub Integration**: Automatically fetches and displays latest projects from GitHub
- **Interactive Elements**: Smooth scrolling, hover effects, and dynamic content loading
- **Performance Optimized**: Fast loading times with optimized assets and lazy loading
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🎨 Sections

1. **Hero/Landing**: Eye-catching introduction with call-to-action buttons
2. **About Me**: Personal background, education, and interests
3. **Skills**: Showcase of programming, music, and athletic abilities
4. **Projects**: Dynamic display of GitHub repositories
5. **Contact**: Multiple ways to get in touch with social media links

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with Grid, Flexbox, and custom animations
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **GitHub API**: Dynamic project fetching
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Poppins and Fira Code typography

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for external resources and GitHub API)

### Installation

1. Clone or download this repository
2. Navigate to the `FRONT END` directory
3. Open `index.html` in your web browser

```bash
# If you have a local server (optional)
cd "FRONT END"
python -m http.server 8000
# Then visit http://localhost:8000
```

### File Structure

```
FRONT END/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 Key Features Explained

### GitHub Projects Integration

The website automatically fetches your latest repositories from GitHub using the GitHub API. It displays:
- Repository name and description
- Programming language used
- Star and fork counts
- Repository topics/tags
- Direct links to view projects

### Responsive Navigation

- Desktop: Horizontal navigation bar
- Mobile: Hamburger menu with smooth slide-in animation
- Active link highlighting based on scroll position

### Smooth Animations

- Scroll-triggered animations for sections
- Hover effects on cards and buttons
- Typing effect on hero title
- Smooth scrolling between sections

### Contact Form

- Client-side form validation
- Success message display
- Ready for backend integration

## 🎨 Color Scheme

- **Primary Orange**: #FF8C00
- **Dark Orange**: #D2691E
- **Light Orange**: #FFA500
- **White**: #FFFFFF
- **Background Dark**: #1A1A1A
- **Background Secondary**: #252525

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Updating Personal Information

1. **Name and Bio**: Edit the content in `index.html`
2. **GitHub Username**: Update the `GITHUB_USERNAME` constant in `script.js`
3. **Social Links**: Modify the href attributes in the social media sections
4. **Skills**: Add or remove skill cards in the Skills section
5. **Colors**: Adjust CSS variables in `:root` selector in `styles.css`

### Adding Your Photo

Replace the placeholder icon in the hero section:

```html
<!-- In index.html, replace: -->
<div class="image-placeholder">
    <i class="fas fa-user-circle"></i>
</div>

<!-- With: -->
<div class="image-placeholder">
    <img src="your-photo.jpg" alt="Isaac Mayamba">
</div>
```

## 🌐 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the branch and folder
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Drag and drop the `FRONT END` folder to Netlify
2. Your site will be deployed instantly

### Vercel

1. Import your GitHub repository
2. Configure build settings (if needed)
3. Deploy with one click

## 📝 To-Do / Future Enhancements

- [ ] Add a blog section
- [ ] Implement dark/light theme toggle
- [ ] Add more interactive animations
- [ ] Create a downloadable resume feature
- [ ] Add testimonials section
- [ ] Implement backend for contact form
- [ ] Add project filtering by technology
- [ ] Create a skills progress visualization

## 🤝 Contributing

This is a personal portfolio, but suggestions and feedback are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation

## 📄 License

This project is open source and available for personal use. Feel free to use it as inspiration for your own portfolio!

## 👨‍💻 About Me

**Isaac Mayamba**
- 🎓 Computer Science Student at Cavendish University
- 💻 Full Stack Developer
- 🎵 Acappella Singer
- 💪 Calisthenics Athlete
- 📍 Based in Zambia

## 📞 Contact

- **GitHub**: [@ISAACmayamba](https://github.com/ISAACmayamba)
- **Facebook**: [Isaac Mayamba](https://facebook.com/isaac.mayamba)
- **University**: [Cavendish University](https://www.cavendish.ac.zm/)

---

**Built with ❤️ by Isaac Mayamba**

*Last Updated: 2024*
