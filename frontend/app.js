import './assets/css/index.css';
import { marked } from 'marked';

// Import all markdown files eagerly using Vite's glob import
const markdownFiles = import.meta.glob('./assets/markdown/**/*.md', { query: '?raw', import: 'default', eager: true });

function extractTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : 'Untitled';
}

// Build the search index/structure
const docsList = [];

for (const [path, content] of Object.entries(markdownFiles)) {
    const relativePath = path.replace('./assets/markdown/', '').replace('.md', '');
    const parts = relativePath.split('/');
    const title = extractTitle(content);
    
    docsList.push({
        path: relativePath,
        title: title,
        content: content,
        category: parts.length > 1 ? parts[0].replace(/^\d+-/, '').replace(/-/g, ' ') : 'General'
    });
}

// Sort docs by path
docsList.sort((a, b) => a.path.localeCompare(b.path));

// Group by category
const groupedDocs = docsList.reduce((acc, doc) => {
    if (!acc[doc.category]) {
        acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
}, {});

// DOM Elements
const sidebarEl = document.getElementById('sidebar');
const sidebarNavEl = document.getElementById('sidebar-nav');
const welcomeViewEl = document.getElementById('welcome-view');
const docViewEl = document.getElementById('doc-view');
const docContentEl = document.getElementById('doc-content');
const themeToggleBtn = document.getElementById('theme-toggle');
const browseDocsBtn = document.getElementById('browse-docs-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarSearchInput = document.getElementById('sidebar-search-input');

// Pagination Elements
const prevDocBtn = document.getElementById('prev-doc-btn');
const nextDocBtn = document.getElementById('next-doc-btn');
const prevDocTitle = document.getElementById('prev-doc-title');
const nextDocTitle = document.getElementById('next-doc-title');

// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode'); // Default to dark
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
};

function initMobileMenu() {
    if (!mobileMenuBtn || !sidebarOverlay || !sidebarEl) return;
    
    const toggleMenu = () => {
        sidebarEl.classList.toggle('show-sidebar');
        sidebarOverlay.classList.toggle('show-overlay');
    };
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    sidebarOverlay.addEventListener('click', toggleMenu);
    
    sidebarNavEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            toggleMenu();
        }
    });
}

function initSearch() {
    if (!sidebarSearchInput) return;
    
    sidebarSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const categories = sidebarNavEl.querySelectorAll('.category-group');
        
        categories.forEach(group => {
            const links = group.querySelectorAll('a');
            let hasMatch = false;
            
            links.forEach(link => {
                if (link.textContent.toLowerCase().includes(query)) {
                    link.style.display = 'block';
                    hasMatch = true;
                } else {
                    link.style.display = 'none';
                }
            });
            
            if (hasMatch) {
                group.style.display = 'block';
                if (query.trim() !== '') {
                    group.querySelector('.category-header').classList.remove('collapsed');
                    group.querySelector('.category-items').classList.remove('collapsed');
                }
            } else {
                group.style.display = 'none';
            }
        });
    });
}

function renderSidebar() {
    let html = '';
    
    for (const [category, docs] of Object.entries(groupedDocs)) {
        // Category Header (Collapsible)
        html += `
            <div class="category-group">
                <div class="category-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <span>${category}</span>
                </div>
                <div class="category-items">
                    ${docs.map(doc => `<a href="#" data-path="${doc.path}">${doc.title}</a>`).join('')}
                </div>
            </div>
        `;
    }
    
    sidebarNavEl.innerHTML = html;
    
    // Add collapse toggle logic
    const headers = sidebarNavEl.querySelectorAll('.category-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('collapsed');
            const items = header.nextElementSibling;
            items.classList.toggle('collapsed');
        });
    });

    // Add click event listeners for docs
    const links = sidebarNavEl.querySelectorAll('a[data-path]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = e.target.getAttribute('data-path');
            loadContent(path);
        });
    });
}

function loadContent(path) {
    const doc = docsList.find(d => d.path === path);
    if (doc) {
        // Hide welcome, show doc
        welcomeViewEl.style.display = 'none';
        docViewEl.style.display = 'block';
        
        // Render markdown
        docContentEl.innerHTML = marked.parse(doc.content);
        
        // Add Copy Buttons to code blocks
        docContentEl.querySelectorAll('pre').forEach(pre => {
            const btn = document.createElement('button');
            btn.className = 'copy-code-btn';
            btn.textContent = 'Copy';
            
            btn.addEventListener('click', () => {
                const code = pre.querySelector('code');
                if (code) {
                    navigator.clipboard.writeText(code.innerText).then(() => {
                        btn.textContent = 'Copied!';
                        btn.classList.add('copied');
                        setTimeout(() => {
                            btn.textContent = 'Copy';
                            btn.classList.remove('copied');
                        }, 2000);
                    });
                }
            });
            
            pre.appendChild(btn);
        });
        
        // Highlight active link
        document.querySelectorAll('#sidebar-nav a').forEach(a => {
            a.classList.remove('active');
        });
        const activeLink = document.querySelector(`#sidebar-nav a[data-path="${path}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Ensure parent category is open
            const categoryItems = activeLink.closest('.category-items');
            if (categoryItems && categoryItems.classList.contains('collapsed')) {
                categoryItems.classList.remove('collapsed');
                categoryItems.previousElementSibling.classList.remove('collapsed');
            }
        }
        
        // Update pagination buttons
        const currentIndex = docsList.findIndex(d => d.path === path);
        
        if (currentIndex > 0) {
            const prevDoc = docsList[currentIndex - 1];
            prevDocBtn.classList.remove('hidden');
            prevDocTitle.textContent = prevDoc.title;
            prevDocBtn.onclick = () => loadContent(prevDoc.path);
        } else {
            prevDocBtn.classList.add('hidden');
        }

        if (currentIndex < docsList.length - 1 && currentIndex !== -1) {
            const nextDoc = docsList[currentIndex + 1];
            nextDocBtn.classList.remove('hidden');
            nextDocTitle.textContent = nextDoc.title;
            nextDocBtn.onclick = () => loadContent(nextDoc.path);
        } else {
            nextDocBtn.classList.add('hidden');
        }
        
        // Scroll to top
        document.getElementById('main-content').scrollTop = 0;
    }
}

function renderHomeSections() {
    const categoryGridEl = document.getElementById('home-category-grid');
    const featuredListEl = document.getElementById('home-featured-list');
    
    if (!categoryGridEl || !featuredListEl) return;
    
    // Render Categories
    let categoryHtml = '';
    const categories = Object.keys(groupedDocs);
    
    categories.forEach(category => {
        const docCount = groupedDocs[category].length;
        categoryHtml += `
            <div class="category-card" data-category="${category}">
              <svg class="category-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <h3>${category}</h3>
              <p>${docCount} ${docCount === 1 ? 'Topic' : 'Topics'} available</p>
            </div>
        `;
    });
    
    categoryGridEl.innerHTML = categoryHtml;
    
    // Add click listeners to category cards
    categoryGridEl.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            if (groupedDocs[cat] && groupedDocs[cat].length > 0) {
                loadContent(groupedDocs[cat][0].path);
            }
        });
    });
    
    // Render Featured Topics (pick up to 4 topics randomly or from start)
    let featuredHtml = '';
    const featuredDocs = docsList.slice(0, 4);
    
    featuredDocs.forEach(doc => {
        featuredHtml += `
            <div class="featured-item" data-path="${doc.path}">
              <div class="featured-title">
                <svg style="width:16px;height:16px;margin-right:8px;vertical-align:text-bottom;color:var(--primary-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                ${doc.title}
              </div>
              <div class="featured-meta">${doc.category}</div>
            </div>
        `;
    });
    
    featuredListEl.innerHTML = featuredHtml;
    
    // Add click listeners to featured items
    featuredListEl.querySelectorAll('.featured-item').forEach(item => {
        item.addEventListener('click', () => {
            const path = item.getAttribute('data-path');
            loadContent(path);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DocsApp Learning Platform initialized.');
    initTheme();
    initMobileMenu();
    initSearch();
    renderSidebar();
    renderHomeSections();
    
    // Browse Docs button logic
    if (browseDocsBtn && docsList.length > 0) {
        browseDocsBtn.addEventListener('click', () => {
            loadContent(docsList[0].path);
        });
    }
});
