/* ===========================
   JavaScript — Portfolio Website
=========================== */

'use strict';

// ===========================
// LOADING SCREEN
// ===========================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.style.overflow = 'visible';
  }, 2400);
});

document.body.style.overflow = 'hidden';

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, .project-card, .cert-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    cursorFollower.style.width = '50px';
    cursorFollower.style.height = '50px';
    cursorFollower.style.borderColor = 'rgba(168,85,247,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
    cursorFollower.style.borderColor = 'rgba(79,121,247,0.5)';
  });
});

// ===========================
// NAVBAR
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  toggleBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active Nav Link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===========================
// BACK TO TOP
// ===========================
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// DARK / LIGHT THEME TOGGLE
// ===========================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===========================
// TYPING ANIMATION
// ===========================
const typingTexts = [
  'Python Developer',
  'Web Developer',
  'MCA Student',
  'Problem Solver',
  'Creative Thinker'
];

let typeIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeWriter() {
  const current = typingTexts[typeIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % typingTexts.length;
    speed = 400;
  }
  setTimeout(typeWriter, speed);
}

typeWriter();

// ===========================
// SCROLL REVEAL (Intersection Observer)
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children
      const children = entry.target.querySelectorAll('.reveal');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 120);
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        setTimeout(() => { bar.style.width = targetWidth; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-group').forEach(group => skillObserver.observe(group));

// ===========================
// TILT EFFECT ON PROJECT CARDS
// ===========================
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===========================
// CONTACT FORM VALIDATION
// ===========================
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');
const closePopup = document.getElementById('closePopup');

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('error');
  error.textContent = message;
  return false;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('error');
  error.textContent = '';
}

['name', 'email', 'message'].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('input', () => {
      clearError(id, id + 'Error');
    });
  }
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  clearError('name', 'nameError');
  clearError('email', 'emailError');
  clearError('message', 'messageError');

  if (!name || name.length < 2) {
    showError('name', 'nameError', 'Please enter your full name (at least 2 characters).');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError('email', 'emailError', 'Please enter a valid email address.');
    isValid = false;
  }

  if (!message || message.length < 10) {
    showError('message', 'messageError', 'Message must be at least 10 characters long.');
    isValid = false;
  }

  if (isValid) {
    // Show success popup (no backend)
    successPopup.classList.add('active');
    contactForm.reset();
  }
});

closePopup.addEventListener('click', () => {
  successPopup.classList.remove('active');
});

successPopup.addEventListener('click', e => {
  if (e.target === successPopup) {
    successPopup.classList.remove('active');
  }
});

// ===========================
// PARTICLE CANVAS
// ===========================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomBetween(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: randomBetween(1, 3),
      dx: randomBetween(-0.4, 0.4),
      dy: randomBetween(-0.4, 0.4),
      opacity: randomBetween(0.2, 0.7),
      color: Math.random() > 0.5 ? '79,121,247' : '168,85,247'
    };
  }

  const PARTICLE_COUNT = 80;
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,121,247,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
    });
    connectParticles();
    animId = requestAnimationFrame(animate);
  }

  animate();
})();

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// DOWNLOAD RESUME BUTTON (Placeholder)
// ===========================
document.getElementById('downloadResumeBtn').addEventListener('click', function(e) {
  e.preventDefault();
  // In production, replace href with actual resume PDF path
  const a = document.createElement('a');
  a.href = 'resume.pdf';
  a.download = 'Swetaprangya_Sahoo_Resume.pdf';
  a.click();
});

// ===========================
// FADE-IN KEYFRAME INJECTION
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

// ===========================
// PROFILE PICTURE EDIT
// ===========================
(function initProfileEdit() {
  const editBtn       = document.getElementById('editProfileBtn');
  const modal         = document.getElementById('editProfileModal');
  const closeModalBtn = document.getElementById('closeEditModal');
  const cancelBtn     = document.getElementById('cancelEditBtn');
  const saveBtn       = document.getElementById('saveProfileBtn');
  const fileInput     = document.getElementById('profileImageInput');
  const previewImg    = document.getElementById('profilePreviewImg');
  const heroImg       = document.getElementById('heroImg');
  const hintText      = document.getElementById('previewHint');

  let pendingDataUrl = null;

  // On page load: restore saved profile picture if any
  const savedPic = localStorage.getItem('portfolio-profile-pic');
  if (savedPic) {
    heroImg.src = savedPic;
  }

  function openModal() {
    // Reset state each open
    pendingDataUrl = null;
    saveBtn.disabled = true;
    fileInput.value = '';
    previewImg.src = heroImg.src;
    hintText.textContent = 'Preview will appear above';
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // File selected — show preview
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      hintText.textContent = '⚠ Please select a valid image file.';
      saveBtn.disabled = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      pendingDataUrl = e.target.result;
      previewImg.src = pendingDataUrl;
      hintText.textContent = '✓ New photo ready — click Save Changes to apply.';
      saveBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  });

  // Save — apply to hero image and persist
  saveBtn.addEventListener('click', () => {
    if (!pendingDataUrl) return;
    heroImg.src = pendingDataUrl;
    try {
      localStorage.setItem('portfolio-profile-pic', pendingDataUrl);
    } catch (e) {
      // localStorage quota exceeded — still update in-memory
    }
    // Show brief saved indicator
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
      saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
      closeModal();
    }, 1000);
  });
})(); // ← closes initProfileEdit

// ===========================
// ABOUT ME EDIT
// ===========================
(function initAboutEdit() {
  const editBtn   = document.getElementById('editAboutBtn');
  const modal     = document.getElementById('editAboutModal');
  const closeBtn  = document.getElementById('closeAboutModal');
  const cancelBtn = document.getElementById('cancelAboutBtn');
  const saveBtn   = document.getElementById('saveAboutBtn');

  const para1El   = document.getElementById('aboutPara1');
  const para2El   = document.getElementById('aboutPara2');
  const eduEl     = document.getElementById('factEducation');
  const locEl     = document.getElementById('factLocation');
  const expEl     = document.getElementById('factExperience');
  const certEl    = document.getElementById('factCertifications');

  const inp1    = document.getElementById('editPara1');
  const inp2    = document.getElementById('editPara2');
  const inpEdu  = document.getElementById('editEducation');
  const inpLoc  = document.getElementById('editLocation');
  const inpExp  = document.getElementById('editExperience');
  const inpCert = document.getElementById('editCertifications');

  const STORAGE_KEY = 'portfolio-about-data';

  // Restore saved data on page load
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (saved) {
    if (saved.para1)  para1El.textContent = saved.para1;
    if (saved.para2)  para2El.textContent = saved.para2;
    if (saved.edu)    eduEl.textContent   = saved.edu;
    if (saved.loc)    locEl.textContent   = saved.loc;
    if (saved.exp)    expEl.textContent   = saved.exp;
    if (saved.cert)   certEl.textContent  = saved.cert;
  }

  function openModal() {
    inp1.value    = para1El.textContent.trim();
    inp2.value    = para2El.textContent.trim();
    inpEdu.value  = eduEl.textContent.trim();
    inpLoc.value  = locEl.textContent.trim();
    inpExp.value  = expEl.textContent.trim();
    inpCert.value = certEl.textContent.trim();
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    saveBtn.disabled = false;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const data = {
      para1 : inp1.value.trim()    || para1El.textContent.trim(),
      para2 : inp2.value.trim()    || para2El.textContent.trim(),
      edu   : inpEdu.value.trim()  || eduEl.textContent.trim(),
      loc   : inpLoc.value.trim()  || locEl.textContent.trim(),
      exp   : inpExp.value.trim()  || expEl.textContent.trim(),
      cert  : inpCert.value.trim() || certEl.textContent.trim(),
    };

    para1El.textContent = data.para1;
    para2El.textContent = data.para2;
    eduEl.textContent   = data.edu;
    locEl.textContent   = data.loc;
    expEl.textContent   = data.exp;
    certEl.textContent  = data.cert;

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => closeModal(), 900);
  });
})();

// ===========================
// SKILLS EDIT
// ===========================
(function initSkillsEdit() {
  const editBtn   = document.getElementById('editSkillsBtn');
  const modal     = document.getElementById('editSkillsModal');
  const closeBtn  = document.getElementById('closeSkillsModal');
  const cancelBtn = document.getElementById('cancelSkillsBtn');
  const saveBtn   = document.getElementById('saveSkillsBtn');

  if (!editBtn || !modal) return;

  const textareas = [
    document.getElementById('editSkillsGroup1'),
    document.getElementById('editSkillsGroup2'),
    document.getElementById('editSkillsGroup3')
  ];

  const STORAGE_KEY = 'portfolio-skills-data';

  const knownColors = {
    'Python': '#3776AB', 'Java': '#f89820', 'C': '#A8B9CC',
    'HTML5': '#E34F26', 'CSS3': '#1572B6', 'JavaScript': '#F7DF1E',
    'MySQL': '#4479A1', 'Data Structures': '#a855f7', 'Git & GitHub': '#F05032'
  };

  const fallbackColors = [
    '#2ecc71', '#e74c3c', '#9b59b6', '#3498db', '#f1c40f', '#1abc9c', '#e67e22', '#16a085', '#27ae60', '#2980b9'
  ];

  function getSkillColor(name) {
    if (knownColors[name]) return knownColors[name];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
       hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return fallbackColors[Math.abs(hash) % fallbackColors.length];
  }

  function renderSkills(skillsData) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid || !skillsData) return;

    const groups = skillsGrid.querySelectorAll('.skills-group');
    if (groups.length !== 3) return;

    skillsData.forEach((groupData, idx) => {
      const groupEl = groups[idx];
      const title = groupEl.querySelector('.skills-group-title');
      groupEl.innerHTML = '';
      if(title) groupEl.appendChild(title);

      groupData.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        
        const info = document.createElement('div');
        info.className = 'skill-info';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = skill.name;
        const pctSpan = document.createElement('span');
        pctSpan.textContent = skill.percent + '%';
        
        info.appendChild(nameSpan);
        info.appendChild(pctSpan);

        const bar = document.createElement('div');
        bar.className = 'skill-bar';
        const fill = document.createElement('div');
        fill.className = 'skill-fill';
        fill.setAttribute('data-width', skill.percent);
        fill.style.width = skill.percent + '%';
        fill.style.setProperty('--color', getSkillColor(skill.name));

        bar.appendChild(fill);
        item.appendChild(info);
        item.appendChild(bar);
        
        groupEl.appendChild(item);
      });
    });
  }

  // Initial load
  let saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      renderSkills(JSON.parse(saved));
    } catch(e){}
  }

  function extractCurrentSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    const groups = skillsGrid.querySelectorAll('.skills-group');
    const result = [];
    
    groups.forEach((group) => {
      const groupSkills = [];
      const items = group.querySelectorAll('.skill-item');
      items.forEach(item => {
        const spans = item.querySelectorAll('.skill-info span');
        if (spans.length >= 2) {
          const name = spans[0].textContent.trim();
          const pct = spans[1].textContent.replace('%', '').trim();
          groupSkills.push(`${name}, ${pct}`);
        }
      });
      result.push(groupSkills.join('\n'));
    });
    return result;
  }

  function openModal() {
    const currentData = extractCurrentSkills();
    textareas.forEach((ta, idx) => {
      if (ta) ta.value = currentData[idx] || '';
    });
    
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    saveBtn.disabled = false;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const skillsData = textareas.map(ta => {
      if (!ta) return [];
      return ta.value.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && line.includes(','))
        .map(line => {
           let parts = line.split(',');
           let pctStr = parts[1].trim().replace(/%/g, '');
           return {
             name: parts[0].trim(),
             percent: parseInt(pctStr) || 0
           };
        });
    });

    renderSkills(skillsData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(skillsData)); } catch(e) {}

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => closeModal(), 900);
  });
})();

// ===========================
// PROJECTS EDIT
// ===========================
(function initProjectsEdit() {
  const STORAGE_KEY = 'portfolio-projects-data';
  const editBtn = document.getElementById('editProjectsBtn');
  const modal = document.getElementById('editProjectsModal');
  if (!editBtn || !modal) return;
  
  const closeBtn = document.getElementById('closeProjectsModal');
  const cancelBtn = document.getElementById('cancelProjectsBtn');
  const saveBtn = document.getElementById('saveProjectBtn');
  const deleteBtn = document.getElementById('deleteProjectBtn');
  const addNewBtn = document.getElementById('addNewProjectBtn');

  const selector = document.getElementById('projectSelector');
  const inpName = document.getElementById('editProjectName');
  const inpDesc = document.getElementById('editProjectDesc');
  const inpCat = document.getElementById('editProjectCategories');
  const inpBadges = document.getElementById('editProjectBadges');
  const inpDemo = document.getElementById('editProjectDemo');
  const inpGithub = document.getElementById('editProjectGithub');
  
  const imgInput = document.getElementById('projectImageInput');
  const previewImg = document.getElementById('projectPreviewImg');
  const placeholderIcon = document.getElementById('projectPlaceholderIcon');

  let projectsData = [];
  let currentEditingId = 'new';
  let pendingImgDataUrl = null;

  function loadInitialData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        projectsData = JSON.parse(saved);
        renderProjects();
        return;
      } catch(e) {}
    }
    // Else parse from DOM
    projectsData = [];
    document.querySelectorAll('.projects-grid .project-card').forEach((card, idx) => {
      const id = 'proj_' + Date.now() + '_' + idx;
      const categories = card.getAttribute('data-category') || '';
      const name = card.querySelector('.project-info h3')?.textContent || '';
      const desc = card.querySelector('.project-info p')?.textContent || '';
      
      let img = '';
      const imgEl = card.querySelector('.project-img');
      if (imgEl) img = imgEl.getAttribute('src');
      
      const badgeEls = card.querySelectorAll('.project-badges .badge');
      const badges = Array.from(badgeEls).map(b => b.textContent.trim());

      const links = card.querySelectorAll('.project-overlay a');
      let demoUrl = '#', githubUrl = '#';
      if (links.length > 0) demoUrl = links[0].getAttribute('href');
      if (links.length > 1) githubUrl = links[1].getAttribute('href');

      projectsData.push({ id, name, desc, img, categories, badges, demoUrl, githubUrl });
    });
  }

  function getBadgeClass(text) {
    const t = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    return 'badge-' + t;
  }

  function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    projectsData.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card glass-card tilt-card reveal visible';
      card.setAttribute('data-category', p.categories);

      let mediaHtml = '';
      if (p.img) {
        mediaHtml = `<img src="${p.img}" alt="${p.name}" class="project-img" />`;
      } else {
        mediaHtml = `<div class="project-img-placeholder"><i class="fas fa-layer-group"></i><span>${p.name}</span></div>`;
      }

      const badgesHtml = (p.badges || []).map(b => `<span class="badge ${getBadgeClass(b)}">${b}</span>`).join('');

      card.innerHTML = `
        <div class="project-img-wrapper">
          ${mediaHtml}
          <div class="project-overlay">
            <a href="${p.demoUrl}" class="btn btn-sm btn-primary" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="${p.githubUrl}" class="btn btn-sm btn-outline" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
        <div class="project-info">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="project-badges">${badgesHtml}</div>
        </div>
      `;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });

      grid.appendChild(card);
      if (typeof revealObserver !== 'undefined') revealObserver.observe(card);
    });

    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) activeBtn.click();
  }

  function updateSelector() {
    selector.innerHTML = '<option value="new">-- Add New Project --</option>';
    projectsData.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name || 'Untitled Project';
      selector.appendChild(opt);
    });
    selector.value = currentEditingId;
  }

  function populateForm(id) {
    currentEditingId = id;
    pendingImgDataUrl = null;
    if (id === 'new') {
      inpName.value = '';
      inpDesc.value = '';
      inpCat.value = '';
      inpBadges.value = '';
      inpDemo.value = '#';
      inpGithub.value = '#';
      imgInput.value = '';
      previewImg.style.display = 'none';
      placeholderIcon.style.display = 'flex';
      deleteBtn.style.display = 'none';
    } else {
      const p = projectsData.find(x => x.id === id);
      if (!p) return;
      inpName.value = p.name;
      inpDesc.value = p.desc;
      inpCat.value = p.categories;
      inpBadges.value = (p.badges || []).join(', ');
      inpDemo.value = p.demoUrl;
      inpGithub.value = p.githubUrl;
      imgInput.value = '';
      if (p.img) {
         previewImg.src = p.img;
         previewImg.style.display = 'block';
         placeholderIcon.style.display = 'none';
      } else {
         previewImg.src = '';
         previewImg.style.display = 'none';
         placeholderIcon.style.display = 'flex';
      }
      deleteBtn.style.display = 'block';
    }
  }

  selector.addEventListener('change', () => {
    populateForm(selector.value);
  });

  imgInput.addEventListener('change', () => {
    const file = imgInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      pendingImgDataUrl = e.target.result;
      previewImg.src = pendingImgDataUrl;
      previewImg.style.display = 'block';
      placeholderIcon.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  function openModal() {
    loadInitialData();
    currentEditingId = 'new';
    updateSelector();
    populateForm('new');
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  if (addNewBtn) {
    addNewBtn.addEventListener('click', () => {
      selector.value = 'new';
      populateForm('new');
    });
  }

  saveBtn.addEventListener('click', () => {
    const newDoc = {
      id: currentEditingId === 'new' ? 'proj_' + Date.now() : currentEditingId,
      name: inpName.value.trim(),
      desc: inpDesc.value.trim(),
      categories: inpCat.value.trim(),
      badges: inpBadges.value.split(',').map(b=>b.trim()).filter(b=>b),
      demoUrl: inpDemo.value.trim() || '#',
      githubUrl: inpGithub.value.trim() || '#',
    };

    if (pendingImgDataUrl) {
       newDoc.img = pendingImgDataUrl;
    } else {
       if (currentEditingId !== 'new') {
          const oldP = projectsData.find(x => x.id === currentEditingId);
          newDoc.img = oldP ? oldP.img : '';
       } else {
          newDoc.img = '';
       }
    }

    if (currentEditingId === 'new') {
       projectsData.push(newDoc);
    } else {
       const idx = projectsData.findIndex(x => x.id === currentEditingId);
       if (idx >= 0) projectsData[idx] = newDoc;
    }

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsData)); } catch(e) {}
    renderProjects();

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
       saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Project';
       saveBtn.disabled = false;
       updateSelector();
       populateForm(newDoc.id); // select what we just edited
    }, 900);
  });

  deleteBtn.addEventListener('click', () => {
    if (currentEditingId === 'new') return;
    if (confirm('Are you sure you want to delete this project?')) {
       projectsData = projectsData.filter(x => x.id !== currentEditingId);
       try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsData)); } catch(e) {}
       renderProjects();
       updateSelector();
       populateForm('new');
    }
  });

  // Call on load
  loadInitialData();

})();

// ===========================
// EXPERIENCE EDIT
// ===========================
(function initExperienceEdit() {
  const STORAGE_KEY = 'portfolio-experience-data';
  const editBtn = document.getElementById('editExperienceBtn');
  const modal = document.getElementById('editExperienceModal');
  if (!editBtn || !modal) return;
  
  const closeBtn = document.getElementById('closeExperienceModal');
  const cancelBtn = document.getElementById('cancelExperienceBtn');
  const saveBtn = document.getElementById('saveExperienceBtn');
  const deleteBtn = document.getElementById('deleteExperienceBtn');
  const addNewBtn = document.getElementById('addNewExperienceBtn');

  const selector = document.getElementById('experienceSelector');
  const inpTitle = document.getElementById('editExpTitle');
  const inpCompany = document.getElementById('editExpCompany');
  const inpYear = document.getElementById('editExpYear');
  const inpDesc = document.getElementById('editExpDesc');
  const inpTags = document.getElementById('editExpTags');

  let expData = [];
  let currentEditingId = 'new';

  function getExpTagIcon(text) {
    const t = text.toLowerCase();
    if(t.includes('python')) return 'fab fa-python';
    if(t.includes('html')) return 'fab fa-html5';
    if(t.includes('css')) return 'fab fa-css3-alt';
    if(t.includes('js') || t.includes('javascript')) return 'fab fa-js';
    if(t.includes('dev')) return 'fas fa-project-diagram';
    if(t.includes('scripting')) return 'fas fa-terminal';
    return 'fas fa-check-circle';
  }

  function loadInitialData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        expData = JSON.parse(saved);
        renderExperience();
        return;
      } catch(e) {}
    }
    expData = [];
    document.querySelectorAll('.timeline .timeline-item').forEach((item, idx) => {
      const id = 'exp_' + Date.now() + '_' + idx;
      const title = item.querySelector('.timeline-header h3')?.textContent || '';
      const company = item.querySelector('.timeline-header h4')?.textContent || '';
      const yearStr = item.querySelector('.timeline-date')?.textContent || '';
      const year = yearStr.trim();
      const desc = item.querySelector('p')?.textContent || '';
      const badgeEls = item.querySelectorAll('.timeline-tags .tech-badge');
      const tags = Array.from(badgeEls).map(b => b.textContent.trim());

      expData.push({ id, title, company, year, desc, tags });
    });
  }

  function renderExperience() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    timeline.innerHTML = '';
    
    expData.forEach(p => {
      const item = document.createElement('div');
      item.className = 'timeline-item reveal visible';

      const tagsHtml = (p.tags || []).map(t => `<span class="tech-badge small"><i class="${getExpTagIcon(t)}"></i> ${t}</span>`).join('');

      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content glass-card">
          <div class="timeline-header">
            <div>
              <h3>${p.title}</h3>
              <h4>${p.company}</h4>
            </div>
            <span class="timeline-date"><i class="fas fa-calendar-alt"></i> ${p.year}</span>
          </div>
          <p>${p.desc}</p>
          <div class="timeline-tags">${tagsHtml}</div>
        </div>
      `;
      timeline.appendChild(item);
      if (typeof revealObserver !== 'undefined') revealObserver.observe(item);
    });
  }

  function updateSelector() {
    selector.innerHTML = '<option value="new">-- Add New Experience --</option>';
    expData.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.company ? `${p.title} at ${p.company}` : p.title || 'Untitled';
      selector.appendChild(opt);
    });
    selector.value = currentEditingId;
  }

  function populateForm(id) {
    currentEditingId = id;
    if (id === 'new') {
      inpTitle.value = '';
      inpCompany.value = '';
      inpYear.value = '';
      inpDesc.value = '';
      inpTags.value = '';
      deleteBtn.style.display = 'none';
    } else {
      const p = expData.find(x => x.id === id);
      if (!p) return;
      inpTitle.value = p.title;
      inpCompany.value = p.company;
      inpYear.value = p.year;
      inpDesc.value = p.desc;
      inpTags.value = (p.tags || []).join(', ');
      deleteBtn.style.display = 'block';
    }
  }

  selector.addEventListener('change', () => {
    populateForm(selector.value);
  });

  if (addNewBtn) {
    addNewBtn.addEventListener('click', () => {
      selector.value = 'new';
      populateForm('new');
    });
  }

  function openModal() {
    loadInitialData();
    currentEditingId = 'new';
    updateSelector();
    populateForm('new');
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const newDoc = {
      id: currentEditingId === 'new' ? 'exp_' + Date.now() : currentEditingId,
      title: inpTitle.value.trim(),
      company: inpCompany.value.trim(),
      year: inpYear.value.trim(),
      desc: inpDesc.value.trim(),
      tags: inpTags.value.split(',').map(t=>t.trim()).filter(t=>t)
    };

    if (currentEditingId === 'new') {
       expData.push(newDoc);
    } else {
       const idx = expData.findIndex(x => x.id === currentEditingId);
       if (idx >= 0) expData[idx] = newDoc;
    }

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(expData)); } catch(e) {}
    renderExperience();

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
       saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Experience';
       saveBtn.disabled = false;
       updateSelector();
       populateForm(newDoc.id);
    }, 900);
  });

  deleteBtn.addEventListener('click', () => {
    if (currentEditingId === 'new') return;
    if (confirm('Are you sure you want to delete this experience entry?')) {
       expData = expData.filter(x => x.id !== currentEditingId);
       try { localStorage.setItem(STORAGE_KEY, JSON.stringify(expData)); } catch(e) {}
       renderExperience();
       updateSelector();
       populateForm('new');
    }
  });

  loadInitialData();
})();

// ===========================
// CERTIFICATIONS EDIT
// ===========================
(function initCertificationsEdit() {
  const STORAGE_KEY = 'portfolio-certifications-data';
  const editBtn = document.getElementById('editCertificationsBtn');
  const modal = document.getElementById('editCertificationsModal');
  if (!editBtn || !modal) return;
  
  const closeBtn = document.getElementById('closeCertificationsModal');
  const cancelBtn = document.getElementById('cancelCertificationsBtn');
  const saveBtn = document.getElementById('saveCertificationsBtn');
  const deleteBtn = document.getElementById('deleteCertBtn');
  const addNewBtn = document.getElementById('addNewCertBtn');

  const selector = document.getElementById('certSelector');
  const inpTitle = document.getElementById('editCertTitle');
  const inpIcon = document.getElementById('editCertIcon');
  const inpIssuer = document.getElementById('editCertIssuer');
  const inpDesc = document.getElementById('editCertDesc');
  const inpLink = document.getElementById('editCertLink');

  let certData = [];
  let currentEditingId = 'new';

  function loadInitialData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        certData = JSON.parse(saved);
        renderCertifications();
        return;
      } catch(e) {}
    }
    certData = [];
    document.querySelectorAll('.certs-grid .cert-card').forEach((card, idx) => {
      const id = 'cert_' + Date.now() + '_' + idx;
      const title = card.querySelector('h3')?.textContent || '';
      const desc = card.querySelector('p')?.textContent || '';
      const issuer = card.querySelector('.cert-issuer')?.textContent || '';
      
      let icon = 'fas fa-certificate';
      const iconEl = card.querySelector('.cert-icon i');
      if (iconEl) icon = iconEl.className;
      
      let verifyLink = '#';
      const linkEl = card.querySelector('.btn-verify');
      if (linkEl) verifyLink = linkEl.getAttribute('href');

      certData.push({ id, title, desc, issuer, icon, verifyLink });
    });
  }

  function renderCertifications() {
    const grid = document.querySelector('.certs-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    certData.forEach(p => {
      const card = document.createElement('div');
      card.className = 'cert-card glass-card reveal visible';

      card.innerHTML = `
        <div class="cert-icon"><i class="${p.icon}"></i></div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <span class="cert-issuer">${p.issuer}</span>
        <a href="${p.verifyLink}" target="_blank" class="btn btn-sm btn-outline btn-verify">Verify <i class="fas fa-external-link-alt"></i></a>
      `;
      grid.appendChild(card);
      if (typeof revealObserver !== 'undefined') revealObserver.observe(card);
    });
  }

  function updateSelector() {
    selector.innerHTML = '<option value="new">-- Add New Certification --</option>';
    certData.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.title || 'Untitled';
      selector.appendChild(opt);
    });
    selector.value = currentEditingId;
  }

  function populateForm(id) {
    currentEditingId = id;
    if (id === 'new') {
      inpTitle.value = '';
      inpIcon.value = 'fas fa-certificate';
      inpIssuer.value = '';
      inpDesc.value = '';
      inpLink.value = '';
      deleteBtn.style.display = 'none';
    } else {
      const p = certData.find(x => x.id === id);
      if (!p) return;
      inpTitle.value = p.title;
      inpIcon.value = p.icon;
      inpIssuer.value = p.issuer;
      inpDesc.value = p.desc;
      inpLink.value = p.verifyLink;
      deleteBtn.style.display = 'block';
    }
  }

  selector.addEventListener('change', () => {
    populateForm(selector.value);
  });

  if (addNewBtn) {
    addNewBtn.addEventListener('click', () => {
      selector.value = 'new';
      populateForm('new');
    });
  }

  function openModal() {
    loadInitialData();
    currentEditingId = 'new';
    updateSelector();
    populateForm('new');
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const newDoc = {
      id: currentEditingId === 'new' ? 'cert_' + Date.now() : currentEditingId,
      title: inpTitle.value.trim(),
      icon: inpIcon.value.trim() || 'fas fa-certificate',
      issuer: inpIssuer.value.trim(),
      desc: inpDesc.value.trim(),
      verifyLink: inpLink.value.trim() || '#'
    };

    if (currentEditingId === 'new') {
       certData.push(newDoc);
    } else {
       const idx = certData.findIndex(x => x.id === currentEditingId);
       if (idx >= 0) certData[idx] = newDoc;
    }

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(certData)); } catch(e) {}
    renderCertifications();

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
       saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Certification';
       saveBtn.disabled = false;
       updateSelector();
       populateForm(newDoc.id);
    }, 900);
  });

  deleteBtn.addEventListener('click', () => {
    if (currentEditingId === 'new') return;
    if (confirm('Are you sure you want to delete this certification?')) {
       certData = certData.filter(x => x.id !== currentEditingId);
       try { localStorage.setItem(STORAGE_KEY, JSON.stringify(certData)); } catch(e) {}
       renderCertifications();
       updateSelector();
       populateForm('new');
    }
  });

  loadInitialData();
})();

// ===========================
// CONTACT EDIT & FORM SENDER
// ===========================
(function initContactEdit() {
  const STORAGE_KEY = 'portfolio-contact-data';
  const editBtn = document.getElementById('editContactBtn');
  const modal = document.getElementById('editContactModal');
  
  // Elements that display data
  const emLinkEl = document.querySelector('.contact-info .contact-item a[href^="mailto:"]');
  const liLinkEl = document.querySelector('.contact-info .contact-item a[href*="linkedin.com"]');
  const ghLinkEl = document.querySelector('.contact-info .contact-item a[href*="github.com"]');
  
  if (!editBtn || !modal || !emLinkEl || !liLinkEl || !ghLinkEl) return;
  
  const closeBtn = document.getElementById('closeContactModal');
  const cancelBtn = document.getElementById('cancelContactBtn');
  const saveBtn = document.getElementById('saveContactBtn');

  // Input fields
  const inpEmail = document.getElementById('editContactEmail');
  const inpLiName = document.getElementById('editContactLinkedinName');
  const inpLiUrl = document.getElementById('editContactLinkedinUrl');
  const inpGhName = document.getElementById('editContactGithubName');
  const inpGhUrl = document.getElementById('editContactGithubUrl');

  function renderContact(data) {
    emLinkEl.href = 'mailto:' + data.email;
    emLinkEl.textContent = data.email;
    
    liLinkEl.href = data.linkedinUrl;
    liLinkEl.textContent = data.linkedinName;
    
    ghLinkEl.href = data.githubUrl;
    ghLinkEl.textContent = data.githubName;
  }

  function loadInitialData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        renderContact(data);
      } catch(e) {}
    }
  }

  function populateForm() {
    inpEmail.value = emLinkEl.textContent.trim();
    inpLiName.value = liLinkEl.textContent.trim();
    inpLiUrl.value = liLinkEl.getAttribute('href');
    inpGhName.value = ghLinkEl.textContent.trim();
    inpGhUrl.value = ghLinkEl.getAttribute('href');
  }

  function openModal() {
    populateForm();
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const newData = {
      email: inpEmail.value.trim(),
      linkedinName: inpLiName.value.trim(),
      linkedinUrl: inpLiUrl.value.trim() || '#',
      githubName: inpGhName.value.trim(),
      githubUrl: inpGhUrl.value.trim() || '#'
    };

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newData)); } catch(e) {}
    renderContact(newData);

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
       saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Details';
       saveBtn.disabled = false;
       closeModal();
    }, 900);
  });

  loadInitialData();

  // Contact Form Sender Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
     contactForm.addEventListener('submit', function(e) {
       e.preventDefault();
       const name = document.getElementById('name').value.trim();
       const email = document.getElementById('email').value.trim();
       const message = document.getElementById('message').value.trim();
       
       if (!name || !email || !message) {
         alert("Please fill in all fields.");
         return;
       }
       
       const targetEmail = emLinkEl.textContent.trim() || 'swetaprangya@example.com';
       const subject = encodeURIComponent("Portfolio Contact from " + name);
       const body = encodeURIComponent(message + "\n\n---\nSender Email: " + email);
       
       // Trigger mailto to open default email client
       window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
       
       contactForm.reset();
       const btn = contactForm.querySelector('button[type="submit"]');
       const oldHtml = btn.innerHTML;
       btn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
       btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
       setTimeout(() => {
         btn.innerHTML = oldHtml;
         btn.style.background = '';
       }, 3000);
     });
  }

})();

// ===========================
// RESUME EDIT
// ===========================
(function initResumeEdit() {
  const STORAGE_KEY = 'portfolio-resume-data';
  const editBtn = document.getElementById('editResumeBtn');
  const modal = document.getElementById('editResumeModal');
  const dlBtn = document.getElementById('downloadResumeBtn');
  if (!editBtn || !modal || !dlBtn) return;
  
  const closeBtn = document.getElementById('closeResumeModal');
  const cancelBtn = document.getElementById('cancelResumeBtn');
  const saveBtn = document.getElementById('saveResumeBtn');

  const inpLink = document.getElementById('editResumeLink');
  const fileInput = document.getElementById('resumeFileInput');
  const clearFileBtn = document.getElementById('clearResumeFileBtn');
  const statusText = document.getElementById('resumeFileStatus');

  let resumeData = { type: 'link', value: '#' };
  let pendingFileDataUrl = null;

  function setDownloadBtnAttributes(data) {
    if (data.type === 'link') {
       dlBtn.href = data.value || '#';
       dlBtn.removeAttribute('download');
       dlBtn.target = '_blank';
    } else if (data.type === 'file') {
       dlBtn.href = data.value;
       dlBtn.setAttribute('download', 'Swetaprangya_Sahoo_Resume.pdf');
       dlBtn.removeAttribute('target');
    }
  }

  function loadInitialData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        resumeData = JSON.parse(saved);
        setDownloadBtnAttributes(resumeData);
      } catch(e) {}
    } else {
      // Default from HTML
      resumeData = { type: 'link', value: dlBtn.getAttribute('href') || '#' };
    }
  }

  function updateModalUI() {
    if (resumeData.type === 'link') {
      inpLink.value = resumeData.value === '#' ? '' : resumeData.value;
      pendingFileDataUrl = null;
      fileInput.value = '';
      statusText.textContent = 'No file uploaded yet.';
      clearFileBtn.style.display = 'none';
    } else {
      inpLink.value = '';
      pendingFileDataUrl = resumeData.value;
      fileInput.value = '';
      statusText.textContent = 'Current Resume File Uploaded \u2713';
      clearFileBtn.style.display = 'inline-block';
    }
  }

  function openModal() {
    loadInitialData();
    updateModalUI();
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      pendingFileDataUrl = e.target.result;
      inpLink.value = ''; // clear link if file goes up
      statusText.textContent = 'New File Selected \u2713';
      clearFileBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  });

  clearFileBtn.addEventListener('click', () => {
    pendingFileDataUrl = null;
    fileInput.value = '';
    statusText.textContent = 'File cleared. Provide a link above.';
    clearFileBtn.style.display = 'none';
  });

  saveBtn.addEventListener('click', () => {
    if (pendingFileDataUrl) {
      resumeData = { type: 'file', value: pendingFileDataUrl };
    } else {
      const linkVal = inpLink.value.trim() || '#';
      resumeData = { type: 'link', value: linkVal };
    }

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData)); } catch(e) {}
    setDownloadBtnAttributes(resumeData);

    const oldHtml = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
       saveBtn.innerHTML = oldHtml;
       saveBtn.disabled = false;
       closeModal();
    }, 900);
  });

  loadInitialData();

  // If user clicks the button without configuring it first
  dlBtn.addEventListener('click', (e) => {
    if (dlBtn.getAttribute('href') === '#') {
      e.preventDefault();
      alert("Resume isn't set up yet! Click the Edit (pencil) icon next to the button to add a link or upload your PDF.");
      openModal();
    }
  });

})();

// ===========================
// HIGHLIGHT CARDS EDIT
// ===========================
(function initHighlightsEdit() {
  const STORAGE_KEY = 'portfolio-highlights-data';
  const editBtn = document.getElementById('editHighlightsBtn');
  const modal = document.getElementById('editHighlightsModal');
  if (!editBtn || !modal) return;
  
  const closeBtn = document.getElementById('closeHighlightsModal');
  const cancelBtn = document.getElementById('cancelHighlightsBtn');
  const saveBtn = document.getElementById('saveHighlightsBtn');
  const deleteBtn = document.getElementById('deleteHighlightBtn');
  const addNewBtn = document.getElementById('addNewHighlightBtn');

  const selector = document.getElementById('highlightSelector');
  const inpTitle = document.getElementById('editHighlightTitle');
  const inpIcon = document.getElementById('editHighlightIcon');
  const inpDesc = document.getElementById('editHighlightDesc');

  let highlightData = [];
  let currentEditingId = 'new';

  function loadInitialData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        highlightData = JSON.parse(saved);
        renderHighlights();
        return;
      } catch(e) {}
    }
    highlightData = [];
    document.querySelectorAll('.about-highlights .highlight-card').forEach((card, idx) => {
      const id = 'hl_' + Date.now() + '_' + idx;
      const title = card.querySelector('h3')?.textContent || '';
      const desc = card.querySelector('p')?.textContent || '';
      
      let icon = 'fas fa-star';
      const iconEl = card.querySelector('i');
      if (iconEl) icon = iconEl.className;
      
      highlightData.push({ id, title, desc, icon });
    });
  }

  function renderHighlights() {
    const container = document.querySelector('.about-highlights');
    if (!container) return;
    container.innerHTML = '';
    
    highlightData.forEach(p => {
      const card = document.createElement('div');
      card.className = 'highlight-card glass-card reveal visible';
      card.innerHTML = `
        <i class="${p.icon}"></i>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      `;
      container.appendChild(card);
      if (typeof revealObserver !== 'undefined') revealObserver.observe(card);
    });
  }

  function updateSelector() {
    selector.innerHTML = '<option value="new">-- Add New Card --</option>';
    highlightData.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.title || 'Untitled';
      selector.appendChild(opt);
    });
    selector.value = currentEditingId;
  }

  function populateForm(id) {
    currentEditingId = id;
    if (id === 'new') {
      inpTitle.value = '';
      inpIcon.value = 'fas fa-star';
      inpDesc.value = '';
      deleteBtn.style.display = 'none';
    } else {
      const p = highlightData.find(x => x.id === id);
      if (!p) return;
      inpTitle.value = p.title;
      inpIcon.value = p.icon;
      inpDesc.value = p.desc;
      deleteBtn.style.display = 'block';
    }
  }

  selector.addEventListener('change', () => {
    populateForm(selector.value);
  });

  if (addNewBtn) {
    addNewBtn.addEventListener('click', () => {
      selector.value = 'new';
      populateForm('new');
    });
  }

  function openModal() {
    loadInitialData();
    currentEditingId = 'new';
    updateSelector();
    populateForm('new');
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  editBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const newDoc = {
      id: currentEditingId === 'new' ? 'hl_' + Date.now() : currentEditingId,
      title: inpTitle.value.trim(),
      icon: inpIcon.value.trim() || 'fas fa-star',
      desc: inpDesc.value.trim()
    };

    if (currentEditingId === 'new') {
       highlightData.push(newDoc);
    } else {
       const idx = highlightData.findIndex(x => x.id === currentEditingId);
       if (idx >= 0) highlightData[idx] = newDoc;
    }

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(highlightData)); } catch(e) {}
    renderHighlights();

    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
       saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Card';
       saveBtn.disabled = false;
       updateSelector();
       populateForm(newDoc.id);
    }, 900);
  });

  deleteBtn.addEventListener('click', () => {
    if (currentEditingId === 'new') return;
    if (confirm('Are you sure you want to delete this highlight card?')) {
       highlightData = highlightData.filter(x => x.id !== currentEditingId);
       try { localStorage.setItem(STORAGE_KEY, JSON.stringify(highlightData)); } catch(e) {}
       renderHighlights();
       updateSelector();
       populateForm('new');
    }
  });

  loadInitialData();
})();
