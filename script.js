// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navbar toggle functionality
    const navbarToggle = document.getElementById('navbar-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (navbarToggle) navbarToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (navbarToggle) navbarToggle.classList.remove('active');
                }
            }
        });
    });

    // External page links handler
    document.querySelectorAll('a[href^="page-"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('href').replace('page-', '');
            loadPage(page);
        });
    });
    
    // Function to load external pages
    function loadPage(pageName) {
        // In a real implementation, this would navigate to another page
        // For now, we'll simulate with an alert
        alert(`Navigating to ${pageName} page`);
        // You could use window.location.href = `${pageName}.html`; for actual navigation
    }

    // Animation on scroll for cards
    const cards = document.querySelectorAll('.card');
    
    function checkCards() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                card.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkCards();
    
    // Check on scroll
    window.addEventListener('scroll', checkCards);

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    function performSearch(query) {
        if (!query.trim()) return;
        
        // Create search results container if it doesn't exist
        let searchResults = document.getElementById('search-results');
        if (!searchResults) {
            searchResults = document.createElement('div');
            searchResults.id = 'search-results';
            searchResults.className = 'search-results';
            document.querySelector('.search-container').appendChild(searchResults);
        }
        
        // Simulate search results
        const courses = [
            { title: 'Artificial Intelligence', category: 'Technology' },
            { title: 'Data Science', category: 'Technology' },
            { title: 'Web Development', category: 'Programming' },
            { title: 'Mathematics Class 10', category: 'Academic' },
            { title: 'English Grammar', category: 'Language' }
        ];
        
        const filteredResults = courses.filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) || 
            course.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length > 0) {
            searchResults.innerHTML = '';
            filteredResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h4>${result.title}</h4>
                    <p>${result.category}</p>
                `;
                resultItem.addEventListener('click', () => {
                    alert(`You selected: ${result.title}`);
                    searchResults.innerHTML = '';
                });
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
        }
    }

    // Question Papers functionality
    const classSelect = document.getElementById('class-select');
    const loadPapersButton = document.getElementById('load-papers');
    const papersContainer = document.getElementById('papers-container');
    
    if (classSelect && loadPapersButton && papersContainer) {
        loadPapersButton.addEventListener('click', function() {
            const selectedClass = classSelect.value;
            if (!selectedClass) {
                alert('Please select a class first');
                return;
            }
            
            // Clear previous papers
            papersContainer.innerHTML = '';
            
            // In a real implementation, this would fetch papers from an API
            // For now, we'll simulate with dummy data
            const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];
            const years = ['2024', '2023', '2022', '2021'];
            
            subjects.forEach(subject => {
                years.forEach(year => {
                    const paperCard = document.createElement('div');
                    paperCard.className = 'card';
                    paperCard.innerHTML = `
                        <i class="fas fa-file-alt"></i>
                        <h3>${subject}</h3>
                        <p>Class ${selectedClass} - ${year}</p>
                        <a href="#" class="btn download-btn" data-subject="${subject}" data-year="${year}" data-class="${selectedClass}">Download</a>
                    `;
                    papersContainer.appendChild(paperCard);
                    
                    // Add animation
                    setTimeout(() => {
                        paperCard.classList.add('visible');
                    }, 100);
                });
            });
            
            // Add event listeners to download buttons
            document.querySelectorAll('.download-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const subject = this.getAttribute('data-subject');
                    const year = this.getAttribute('data-year');
                    const classNum = this.getAttribute('data-class');
                    alert(`Downloading ${subject} paper for Class ${classNum} - ${year}`);
                });
            });
        });
    }

    // Course catalog functionality
    const courseContainer = document.getElementById('course-container');
    if (courseContainer) {
        // Populate with more courses
        const additionalCourses = [
            { title: 'Machine Learning', icon: 'fas fa-brain', description: 'Learn ML algorithms and applications' },
            { title: 'Blockchain Technology', icon: 'fas fa-link', description: 'Understand cryptocurrency and blockchain' },
            { title: 'Digital Marketing', icon: 'fas fa-bullhorn', description: 'Master SEO, SEM and social media marketing' },
            { title: 'Graphic Design', icon: 'fas fa-palette', description: 'Create stunning visuals and designs' },
            { title: 'Financial Accounting', icon: 'fas fa-calculator', description: 'Learn Tally and accounting principles' },
            { title: 'Advanced Excel', icon: 'fas fa-table', description: 'Master formulas, macros and data analysis' },
            { title: 'Python Programming', icon: 'fab fa-python', description: 'Learn Python from basics to advanced' },
            { title: 'Mobile App Development', icon: 'fas fa-mobile-alt', description: 'Build Android and iOS applications' }
        ];
        
        additionalCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'card';
            courseCard.innerHTML = `
                <i class="${course.icon}"></i>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="#" class="btn enroll-btn" data-course="${course.title}">Enroll Now</a>
            `;
            courseContainer.appendChild(courseCard);
        });
        
        // Add event listeners to enroll buttons
        document.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const course = this.getAttribute('data-course');
                showEnrollmentForm(course);
            });
        });
    }
    
    function showEnrollmentForm(courseName) {
        // Create modal for enrollment
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Enroll in ${courseName}</h2>
                <form id="enrollment-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" required>
                    </div>
                    <button type="submit" class="btn">Submit</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 10);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Form submission
        modal.querySelector('#enrollment-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            alert(`Thank you ${name} for enrolling in ${courseName}! We'll contact you soon.`);
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    }

    // Newsletter subscription
    const emailInput = document.getElementById('email-input');
    const subscribeBtn = document.getElementById('subscribe-btn');
    
    if (emailInput && subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value;
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert(`Thank you for subscribing with ${email}!\nYou will receive our latest updates.`);
            emailInput.value = '';
        });
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Google Sign-In callback
    window.handleCredentialResponse = function(response) {
        // This function would handle the Google Sign-In response
        console.log("Google Sign-In successful!");
        // In a real implementation, you would verify the token on your server
    };
    
    // Initialize interactive games
    initializeGames();
});

// Create interactive games
function createMathGame() {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    gameContainer.innerHTML = `
        <div class="game-header">
            <h2>Math Challenge</h2>
            <p>Score: <span id="score">0</span></p>
            <p>Time: <span id="timer">60</span>s</p>
        </div>
        <div class="game-content">
            <div id="question"></div>
            <input type="number" id="answer" placeholder="Your answer">
            <button id="submit-answer" class="btn">Submit</button>
        </div>
    `;
    
    document.body.appendChild(gameContainer);
    
    let score = 0;
    let timeLeft = 60;
    let currentQuestion = {};
    let timer;
    
    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let answer;
        switch(operation) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '*': answer = num1 * num2; break;
        }
        
        document.getElementById('question').textContent = `${num1} ${operation} ${num2} = ?`;
        currentQuestion = { answer };
    }
    
    function startGame() {
        score = 0;
        timeLeft = 60;
        document.getElementById('score').textContent = score;
        document.getElementById('timer').textContent = timeLeft;
        
        generateQuestion();
        
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert(`Game over! Your score: ${score}`);
                gameContainer.remove();
            }
        }, 1000);
    }
    
    document.getElementById('submit-answer').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('answer').value);
        
        if (userAnswer === currentQuestion.answer) {
            score += 10;
            document.getElementById('score').textContent = score;
        }
        
        document.getElementById('answer').value = '';
        generateQuestion();
    });
    
    startGame();
}

function createMemoryGame() {
    alert("Memory game would launch here!");
    // Implement a memory matching game
}

function initializeGames() {
    // Add event listeners to game buttons
    document.querySelectorAll('#games .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const gameType = this.parentElement.querySelector('h3').textContent;
            
            switch(gameType) {
                case 'Math Games':
                    createMathGame();
                    break;
                case 'Memory Games':
                    createMemoryGame();
                    break;
                case 'Geography Quiz':
                    alert("Geography Quiz would launch here!");
                    break;
                case 'Spelling Bee':
                    alert("Spelling Bee would launch here!");
                    break;
                default:
                    alert(`${gameType} would launch here!`);
            }
        });
    });
}
