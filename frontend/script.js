// Fetch and display skills
async function loadSkills() {
    try {
        const response = await fetch('http://localhost:3000/api/skills');
        const skills = await response.json();
        
        const container = document.getElementById('skills-container');
        
        if (skills.length === 0) {
            container.innerHTML = '<p>No skills added yet.</p>';
            return;
        }
        
        container.innerHTML = skills.map(skill => `
            <div class="skill-card">
                <h3>${skill.skill_name}</h3>
                <p class="category">${skill.category}</p>
                <p class="proficiency">Level: ${skill.proficiency_level}</p>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skills-container').innerHTML = 
            '<p>Error loading skills. Make sure the backend server is running.</p>';
    }
}

// Load skills when page loads
if (document.getElementById('skills-container')) {
    loadSkills();
}

// Handle contact form submission
async function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const messageDiv = document.getElementById('form-message');
    
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = 'Message sent successfully! Thank you for contacting me.';
            messageDiv.className = 'success';
            document.getElementById('contact-form').reset();
        } else {
            throw new Error('Failed to send message');
        }
        
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'Failed to send message. Please try again.';
        messageDiv.className = 'error';
    }
}

// Attach form handler when page loads
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
}