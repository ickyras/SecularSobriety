// Secular Sobriety Counter & Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Sobriety counter
    let sobrietyDays = localStorage.getItem('sobrietyDays') || 0;
    updateCounter();
    
    // Update counter daily
    function updateCounter() {
        const today = new Date();
        const sobrietyDate = localStorage.getItem('sobrietyStartDate');
        if (sobrietyDate) {
            const startDate = new Date(sobrietyDate);
            sobrietyDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        }
        localStorage.setItem('sobrietyDays', sobrietyDays);
        document.getElementById('days-sober').textContent = sobrietyDays;
        
        // Progress ring animation
        const circle = document.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const progress = Math.min((sobrietyDays % 365) / 365, 1);
        circle.style.strokeDasharray = `${circumference * progress} ${circumference}`;
    }
    
    // Reset sobriety date button
    document.getElementById('reset-btn')?.addEventListener('click', function() {
        if (confirm('Reset sobriety counter?')) {
            localStorage.removeItem('sobrietyStartDate');
            sobrietyDays = 0;
            updateCounter();
        }
    });
    
    // Set new sobriety date
    document.getElementById('set-date-btn')?.addEventListener('click', function() {
        const date = prompt('Enter sobriety start date (YYYY-MM-DD):');
        if (date && !isNaN(Date.parse(date))) {
            localStorage.setItem('sobrietyStartDate', date);
            updateCounter();
        }
    });
    
    // Daily affirmation rotation
    const affirmations = [
        "One day at a time.",
        "You are enough.",
        "Progress, not perfection.",
        "Freedom is sobriety.",
        "Strength in sobriety.",
        "Clear mind, strong will."
    ];
    
    setInterval(() => {
        const randomAffirm = affirmations[Math.floor(Math.random() * affirmations.length)];
        document.getElementById('affirmation') && (document.getElementById('affirmation').textContent = randomAffirm);
    }, 10000); // Change every 10 seconds
    
    // Dark mode toggle
    document.getElementById('dark-toggle')?.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Mobile menu toggle
    document.querySelector('.menu-toggle')?.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
    
    updateCounter(); // Initial load
});
