import gsap from "gsap";
import SplitType from "split-type";

// ==========================================
// 1. Element References
// ==========================================
const navContent = document.querySelector(".nav-content");
const navLogo = document.querySelector(".nav-logo");

// ==========================================
// 2. Menu Content Data
// ==========================================
const menuData = {
    socials: [
        "Bluesky", "Instagram", "Pinterest", "Facebook", "LinkedIn", "X"
    ],
    legal: [
        "Cookie Policy", "Accessibility", "Data Rights", "Disclosures"
    ],
    primary: [
        "Home", "Experiments", "Latest Updates", "Documentation", "Community"
    ],
    secondary: [
        "Playground", "Build Something", "Activity Feed", "Profile"
    ]
};

// ==========================================
// 3. Dynamic HTML Generation
// ==========================================
const generateMenu = () => {
    // Inject Logo
    navLogo.innerHTML = `
        <a href="#">
            <img src="/assets/images/logo.png" alt="Joby Aviation Logo" />
        </a>
    `;

    // Inject 4 Menu Backgrounds
    for (let i = 0; i < 4; i++) {
        const bg = document.createElement("div");
        bg.className = "nav-bg";
        navContent.appendChild(bg);
    }

    // Inject Navigation Links Structure
    const items = document.createElement("div");
    items.className = "nav-items";
    
    items.innerHTML = `
        <div class="nav-items-col">
            <div class="nav-socials">
                ${menuData.socials.map(link => `<a href="#">${link}</a>`).join("")}
            </div>
            <div class="nav-legal">
                ${menuData.legal.map(link => `<a href="#">${link}</a>`).join("")}
            </div>
        </div>
        
        <div class="nav-items-col">
            <div class="nav-primary-links">
                ${menuData.primary.map(link => `<a href="#">${link}</a>`).join("")}
            </div>
            <div class="nav-secondary-links">
                ${menuData.secondary.map(link => `<a href="#">${link}</a>`).join("")}
            </div>
        </div>
    `;
    
    navContent.appendChild(items);
};

// Run Generation
generateMenu();

// Get references after generation
const navToggler = document.querySelector(".nav-toggler");
const navBgs = document.querySelectorAll(".nav-bg");
const navItems = document.querySelector(".nav-items");

// ==========================================
// 4. Style Initialization (GSAP Powered)
// ==========================================
const initStyles = () => {
    // Hero Section Styling
    gsap.set(".hero-top", { 
        fontSize: "0.9rem", 
        textTransform: "uppercase", 
        letterSpacing: "4px", 
        fontWeight: 500, 
        opacity: 0.6, 
        fontFamily: "'Google Sans', sans-serif" 
    });

    gsap.set(".hero-middle", { 
        fontSize: "clamp(3rem, 10vw, 7rem)", 
        fontWeight: 700, 
        textTransform: "uppercase", 
        letterSpacing: "-2px", 
        lineHeight: 0.9 
    });

    gsap.set(".hero-bottom", { 
        fontSize: "1.1rem", 
        lineHeight: 1.6, 
        maxWidth: "500px", 
        opacity: 0.8, 
        marginTop: "1.5rem" 
    });

    gsap.set(".hero-attribution", { 
        bottom: "2.5rem", 
        right: "3rem", 
        fontSize: "0.85rem", 
        fontWeight: 500, 
        textTransform: "uppercase", 
        letterSpacing: "1px", 
        opacity: 0.7 
    });

    // Navigation Layout
    gsap.set(".nav-logo img", { 
        width: "200px", 
        height: "auto" 
    });

    gsap.set(".nav-items", { 
        gap: "2rem", 
        padding: "8rem", 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" 
    });
    
    gsap.set(".nav-items-col:nth-child(1)", { 
        flex: 2, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between", 
        gap: "2rem" 
    });

    gsap.set(".nav-items-col:nth-child(2)", { 
        flex: 4, 
        display: "flex", 
        gap: "2rem", 
        justifyContent: "space-between" 
    });

    // Sub-menu Titles Styling
    gsap.set(".nav-items-col a", { 
        width: "fit-content", 
        letterSpacing: "-2%", 
        lineHeight: 1.1, 
        marginBottom: "0.5rem" 
    });

    gsap.set(".nav-socials a", { 
        fontSize: "1.25rem" 
    });

    gsap.set(".nav-legal a", { 
        fontSize: "0.9rem", 
        color: "var(--legal-color)" 
    });

    gsap.set(".nav-primary-links a", { 
        fontSize: "3rem" 
    });

    gsap.set(".nav-secondary-links a", { 
        fontSize: "1.5rem" 
    });

    // Menu BG Slides Setup
    const colors = ["#57cea5", "#063124", "#0b5c43", "#21ba80"];
    gsap.set(navBgs, { 
        scaleY: 0, 
        backgroundColor: (i) => colors[i] 
    });

    // Link Text Splitting
    new SplitType(".nav-items a", { 
        types: "lines", 
        lineClass: "line" 
    });

    const linkBlocks = [
        ".nav-socials .line", 
        ".nav-legal .line", 
        ".nav-primary-links .line", 
        ".nav-secondary-links .line"
    ];

    gsap.set(linkBlocks.join(", "), { 
        y: "100%" 
    });

    return linkBlocks;
};

const linkBlocks = initStyles();

// ==========================================
// 5. Animation Timeline Setup
// ==========================================
let isMenuOpen = false;
let isAnimating = false;

const tl = gsap.timeline({
    paused: true,
    onComplete: () => { 
        isAnimating = false; 
    },
    onReverseComplete: () => {
        gsap.set(linkBlocks.join(", "), { y: "100%" });
        isAnimating = false;
    },
});

tl.to(navBgs, { 
    scaleY: 1, 
    duration: 0.75, 
    stagger: 0.1, 
    ease: "power3.inOut" 
})
.to(navItems, { 
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
    duration: 0.75, 
    ease: "power3.inOut" 
}, "-=0.6");

// ==========================================
// 6. Interaction Logic
// ==========================================
navToggler.addEventListener("click", () => {
    if (isAnimating) return;
    
    isAnimating = true;

    navToggler.classList.toggle("open");
    navContent.classList.toggle("open");

    if (!isMenuOpen) {
        tl.currentLabel();
        tl.play();
        
        gsap.to(linkBlocks.join(", "), { 
            y: "0%", 
            duration: 0.75, 
            stagger: 0.05, 
            ease: "power3.out", 
            delay: 0.85 
        });
    } else {
        tl.reverse();
    }
    
    isMenuOpen = !isMenuOpen;
});
