// Chatbot knowledge base and logic
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.quickReplies = [
            "Tell me about your experience",
            "What are your skills?",
            "Tell me about your projects",
            "How can I contact you?",
            "What's your education background?"
        ];
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            // Professional Experience
            experience: {
                keywords: ['experience', 'work', 'job', 'career', 'professional', 'employment', 'current role', 'position'],
                responses: [
                    "I'm currently working as a Senior Technical Consultant at Ushur, where I lead advanced technical engagements and strategic solution architecture. Previously, I worked as a Technical Consultant and Associate Technical Consultant at Ushur, Software Engineer R&D Intern at EFI, Cloud Engineering Intern at Zendesk, and Solutions Engineer at Oracle.",
                    "My professional journey includes roles at Ushur (Senior Technical Consultant, Technical Consultant, Associate Technical Consultant), EFI (Software Engineer R&D Intern), Zendesk (Cloud Engineering Intern), and Oracle (Solutions Engineer). I have experience in AI-powered automation, cloud engineering, and full-stack development."
                ]
            },
            
            // Current Role at Ushur
            ushur: {
                keywords: ['ushur', 'current', 'senior technical consultant', 'present role', 'current job'],
                responses: [
                    "I'm currently a Senior Technical Consultant at Ushur, where I lead advanced technical engagements and strategic solution architecture for enterprise clients. I drive innovation in AI-powered customer experience automation and deliver complex integrations across multiple platforms.",
                    "At Ushur, I mentor junior consultants and develop best practices for technical solution delivery. I also spearhead research and development initiatives to enhance platform capabilities and client success metrics."
                ]
            },
            
            // Skills
            skills: {
                keywords: ['skills', 'technologies', 'programming', 'languages', 'tools', 'expertise', 'proficient'],
                responses: [
                    "My technical skills include Python (97%), C (94%), JavaScript (86%), AWS (90%), and Full Stack Development (90%). I'm proficient in Docker, Kubernetes, React, Node.js, SQL, HTML5, CSS3, and various cloud technologies.",
                    "I specialize in Python, C, JavaScript, AWS cloud services, full-stack development, Docker, Kubernetes, React, Node.js, and database management. I also have experience with Go, WordPress, and GitHub for version control."
                ]
            },
            
            // Projects
            projects: {
                keywords: ['projects', 'portfolio', 'work', 'built', 'developed', 'created'],
                responses: [
                    "Some of my notable projects include BetaBrain (Full Stack Application with React.js and Node.js using Clarifai API), IoT Based Real-time Pulse Monitoring system (Capstone Project), ParkSafe (Inrix Hackathon project for safe parking spots), and Lifesaver (Blood bank management system).",
                    "I've worked on several interesting projects: BetaBrain (face detection app), IoT pulse monitoring system, ParkSafe (parking safety API), and Lifesaver (blood bank system). These projects showcase my skills in full-stack development, IoT, and cloud technologies."
                ]
            },
            
            // Education
            education: {
                keywords: ['education', 'degree', 'university', 'college', 'school', 'graduated', 'masters', 'bachelors'],
                responses: [
                    "I have a Master of Science in Computer Science from Santa Clara University (GPA: 3.75) and a Bachelor of Technology in Electronics and Communication from PES University (GPA: 3.67). I also completed a minor in Computer Science at PES University (GPA: 3.78).",
                    "I graduated with a Master's in Computer Science from Santa Clara University and a Bachelor's in Electronics and Communication from PES University. My education focused on computer science, networking, and technology."
                ]
            },
            
            // Certifications
            certifications: {
                keywords: ['certifications', 'certificates', 'certified', 'awards', 'achievements', 'credentials'],
                responses: [
                    "I hold several certifications including IBM Data Science Professional, AWS Certified Developer, and Certified Oracle Cloud Architect Associate and Autonomous Database Specialist. I also received an Oracle Spot Award for exceptional performance.",
                    "My certifications include IBM Data Science Professional, AWS Certified Developer, and Oracle Cloud Architect Associate. I also published a research paper on IoT-based pulse monitoring systems."
                ]
            },
            
            // Contact
            contact: {
                keywords: ['contact', 'reach', 'email', 'phone', 'linkedin', 'github', 'connect', 'get in touch'],
                responses: [
                    "You can reach me at pkonduru4@gmail.com or call me at +1 (408) 334-6791. I'm also active on LinkedIn and GitHub. Feel free to use the contact form on my website or connect with me on social media!",
                    "Contact me via email at pkonduru4@gmail.com or phone at +1 (408) 334-6791. You can also find me on LinkedIn and GitHub. I'm always open to discussing new opportunities and collaborations!"
                ]
            },
            
            // Location
            location: {
                keywords: ['location', 'where', 'based', 'live', 'address', 'city', 'state'],
                responses: [
                    "I'm based in San Jose, California (975 S 1st St, San Jose CA 95110). I'm open to remote work opportunities and can relocate if needed.",
                    "I'm located in San Jose, California and am available for both remote and on-site opportunities."
                ]
            },
            
            // General greeting
            greeting: {
                keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
                responses: [
                    "Hello! I'm Prateek's AI assistant. I can help you learn about his professional experience, skills, projects, education, and more. What would you like to know?",
                    "Hi there! I'm here to answer questions about Prateek's background, experience, and skills. Feel free to ask me anything!"
                ]
            },
            
            // Default fallback
            default: {
                keywords: [],
                responses: [
                    "I'm not sure I understand that question. Could you try asking about my experience, skills, projects, education, or contact information?",
                    "I'd be happy to help! Try asking about my professional experience, technical skills, projects, education background, or how to contact me.",
                    "Let me help you learn about Prateek! You can ask about his work experience, technical skills, projects, education, or contact details."
                ]
            }
        };
    }

    init() {
        console.log('Initializing chatbot...');
        // HTML is already in the template, just attach event listeners
        this.attachEventListeners();
        this.addWelcomeMessage();
        console.log('Chatbot initialized successfully!');
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container">
                <div id="chatbot-button" class="chatbot-btn">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge">1</span>
                </div>
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <h4>Ask me anything!</h4>
                        <button id="chatbot-close" class="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    <div class="chatbot-input-container">
                        <div class="quick-replies" id="quick-replies">
                            <!-- Quick reply buttons will be added here -->
                        </div>
                        <div class="input-group">
                            <input type="text" id="chatbot-input" placeholder="Type your message..." />
                            <button id="chatbot-send" class="chatbot-send-btn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const button = document.getElementById('chatbot-button');
        const window = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        button.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Add quick replies
        this.addQuickReplies();
    }

    addQuickReplies() {
        const quickRepliesContainer = document.getElementById('quick-replies');
        quickRepliesContainer.innerHTML = this.quickReplies.map(reply => 
            `<button class="quick-reply-btn" data-message="${reply}">${reply}</button>`
        ).join('');

        // Add event listeners to quick reply buttons
        quickRepliesContainer.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.sendMessage(message);
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        if (this.isOpen) {
            window.style.display = 'block';
            window.classList.add('chatbot-open');
            button.classList.add('chatbot-active');
            document.getElementById('chatbot-input').focus();
        } else {
            this.closeChatbot();
        }
    }

    closeChatbot() {
        this.isOpen = false;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        window.style.display = 'none';
        window.classList.remove('chatbot-open');
        button.classList.remove('chatbot-active');
    }

    addWelcomeMessage() {
        this.addMessage('bot', "Hello! I'm Prateek's AI assistant. I can help you learn about his professional experience, skills, projects, education, and more. What would you like to know?");
    }

    addMessage(sender, message, isTyping = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        if (isTyping) {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    ${message}
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageElement;
    }

    sendMessage(message = null) {
        const input = document.getElementById('chatbot-input');
        const userMessage = message || input.value.trim();
        
        if (!userMessage) return;
        
        // Add user message
        this.addMessage('user', userMessage);
        input.value = '';
        
        // Show typing indicator
        const typingMessage = this.addMessage('bot', '', true);
        
        // Simulate typing delay
        setTimeout(() => {
            typingMessage.remove();
            const response = this.getResponse(userMessage);
            this.addMessage('bot', response);
        }, 1000 + Math.random() * 1000);
    }

    getResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check each knowledge base category
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            if (category === 'default') continue;
            
            for (const keyword of data.keywords) {
                if (message.includes(keyword.toLowerCase())) {
                    const responses = data.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
        
        // Check for specific patterns
        if (message.includes('what') && message.includes('do')) {
            return "I work as a Technical Consultant at Ushur, focusing on AI-powered customer experience automation and technical solution delivery.";
        }
        
        if (message.includes('where') && message.includes('work')) {
            return "I currently work at Ushur as a Technical Consultant, and I'm based in San Jose, California.";
        }
        
        if (message.includes('when') && message.includes('start')) {
            return "I started my current role at Ushur in October 2023 as an Associate Technical Consultant and was promoted to Technical Consultant in June 2024.";
        }
        
        if (message.includes('how') && message.includes('contact')) {
            return "You can contact me at pkonduru4@gmail.com or +1 (408) 334-6791. I'm also available on LinkedIn and GitHub!";
        }
        
        // Default response
        const defaultResponses = this.knowledgeBase.default.responses;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        new PortfolioChatbot();
    }, 100);
});
