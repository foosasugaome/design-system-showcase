/**
 * design-system-showcase
 * Interactive logic for UI elements
 */

const COMMANDS = [
  { text: 'Go to Home Page', category: 'Navigation', icon: 'home', action: () => window.location.href = 'index.html', shortcut: 'G H' },
  { text: 'Go to Component Showcase', category: 'Navigation', icon: 'box', action: () => window.location.href = 'docs.html', shortcut: 'G C' },
  { text: 'Go to System Dashboard', category: 'Navigation', icon: 'grid', action: () => window.location.href = 'dashboard.html', shortcut: 'G D' },
  { text: 'Go to Login Portal', category: 'Navigation', icon: 'user', action: () => window.location.href = 'auth.html', shortcut: 'G L' },
  { text: 'Go to Split Blog Post', category: 'Navigation', icon: 'type', action: () => window.location.href = 'blog.html', shortcut: 'G B' },
  { text: 'Go to Settings Console', category: 'Navigation', icon: 'settings', action: () => window.location.href = 'settings.html', shortcut: 'G S' },
  { text: 'Toggle Light/Dark Theme', category: 'System', icon: 'sun-moon', action: () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.click();
  }, shortcut: 'T T' },
  { text: 'Set Font to Inter', category: 'Typography', icon: 'type', action: () => {
    const switcher = document.getElementById('font-switcher');
    if (switcher) { switcher.value = 'inter'; switcher.dispatchEvent(new Event('change')); }
  }, shortcut: 'F I' },
  { text: 'Set Font to Roboto', category: 'Typography', icon: 'type', action: () => {
    const switcher = document.getElementById('font-switcher');
    if (switcher) { switcher.value = 'roboto'; switcher.dispatchEvent(new Event('change')); }
  }, shortcut: 'F R' },
  { text: 'Set Font to Ubuntu', category: 'Typography', icon: 'type', action: () => {
    const switcher = document.getElementById('font-switcher');
    if (switcher) { switcher.value = 'ubuntu'; switcher.dispatchEvent(new Event('change')); }
  }, shortcut: 'F U' },
  { text: 'Set Font to Default', category: 'Typography', icon: 'type', action: () => {
    const switcher = document.getElementById('font-switcher');
    if (switcher) { switcher.value = 'default'; switcher.dispatchEvent(new Event('change')); }
  }, shortcut: 'F D' },
  { text: 'Show Test Toast Notification', category: 'System', icon: 'bell', action: () => window.showToast('Test notification triggered from Command Palette.'), shortcut: 'S T' }
];

document.addEventListener('DOMContentLoaded', () => {
  const initializers = [
    initThemeToggle,
    initFontSwitcher,
    initDropdowns,
    initMobileMenu,
    initTabs,
    initModals,
    initFormInteractivity,
    initDashboardLoadingSimulation,
    initCommandPalette,
    initAccordions,
    initDrawers,
    initAutocompleteInput,
    initPasswordValidator,
    initSegmentedControls,
    initRangeSliders,
    initFileUploader,
    initEmailSuggestion,
    initPhoneFormatter,
    initEmailValidation,
    initCodeCopy,
    initPlayground,
    initBreadcrumbs
  ];
  
  initializers.forEach(fn => {
    try {
      if (typeof fn === 'function') {
        fn();
      }
    } catch (e) {
      console.warn(`Failed to initialize ${fn.name}:`, e);
    }
  });
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.navbar-menu');
  
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      
      // Toggle button icon representation or aria-expanded if needed
      const isExpanded = menu.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Tabs Component Interactivity
 */
function initTabs() {
  const containers = document.querySelectorAll('.tab-container');
  
  containers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active from all buttons in this container
        buttons.forEach(btn => btn.classList.remove('active'));
        // Remove active from all panels in this container
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Add active to current button and matching panel
        button.classList.add('active');
        const activePanel = container.querySelector(`.tab-panel[data-tab="${targetTab}"]`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  });
}

/**
 * Modal Interactivity (Trigger and Close)
 */
function initModals() {
  // Opening Modals
  const triggers = document.querySelectorAll('[data-modal-target]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        openModal(modal);
      }
    });
  });

  // Closing Modals
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close on backdrop click
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalElement = document.querySelector('.modal-overlay.open');
      if (openModalElement) {
        closeModal(openModalElement);
      }
    }
  });
}

function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Focus the first focusable element
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex="0"]');
  if (focusable) {
    setTimeout(() => focusable.focus(), 100);
  }
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Toast Notification Dispatcher
 * Can be called programmatically
 */
window.showToast = function(message, duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = 'inherit';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontSize = '1.1rem';
  closeBtn.style.padding = '0 0.25rem';
  closeBtn.onclick = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.95)';
    toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  };

  toast.appendChild(textSpan);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px) scale(0.95)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }
  }, duration);
};

/**
 * Mock Forms Submission Logic
 */
function initFormInteractivity() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        // Simulate network latency
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          window.showToast('Action completed successfully!');
          form.reset();
        }, 1200);
      }
    });
  });
}

/**
 * Theme Switcher Logic (Light/Dark Toggle)
 */
function initThemeToggle() {
  // Feather icons SVG path equivalents
  const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  
  function syncToggleIcon() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    const icon = document.getElementById('theme-toggle-icon');
    if (!icon) return;
    
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const targetIcon = theme === 'dark' ? sunIcon : moonIcon;
    const targetTitle = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    
    if (icon.innerHTML !== targetIcon) {
      icon.innerHTML = targetIcon;
    }
    if (toggleBtn.getAttribute('title') !== targetTitle) {
      toggleBtn.setAttribute('title', targetTitle);
    }
  }

  // Retrieve saved preference or fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = 'light';
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    currentTheme = 'dark';
  }
  
  // Set current theme state
  document.documentElement.setAttribute('data-theme', currentTheme);
  syncToggleIcon();
  
  // Resilient event delegation click listener
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-toggle');
    if (btn) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      syncToggleIcon();
      
      if (window.showToast) {
        window.showToast(`Switched to ${newTheme} mode`);
      }
    }
  });

  // Watch for Blazor/SPA DOM swaps to automatically restore icon paths (resilient loop prevention)
  const observer = new MutationObserver((mutations) => {
    const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0);
    if (hasAddedNodes) {
      observer.disconnect();
      syncToggleIcon();
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Blazor Enhanced Navigation load listener to restore html theme attribute
  document.addEventListener('blazor-enhanced-load', () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = 'light';
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      currentTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
    syncToggleIcon();
  });

  // Bulletproof periodic fallback check (every 300ms) to ensure sync in all SPAs
  setInterval(syncToggleIcon, 300);
}

/**
 * Font Switcher Logic
 */
function initFontSwitcher() {
  const switcher = document.getElementById('font-switcher');
  if (!switcher) return;
  
  // Set initial selected value
  const savedFont = localStorage.getItem('font') || 'default';
  switcher.value = savedFont;
  
  switcher.addEventListener('change', (e) => {
    const selectedFont = e.target.value;
    if (selectedFont === 'default') {
      document.documentElement.removeAttribute('data-font');
      localStorage.removeItem('font');
      window.showToast('Restored default typography');
    } else {
      document.documentElement.setAttribute('data-font', selectedFont);
      localStorage.setItem('font', selectedFont);
      const fontName = selectedFont.charAt(0).toUpperCase() + selectedFont.slice(1);
      window.showToast(`Typography switched to ${fontName}`);
    }
  });
}

/**
 * Mobile Navigation Dropdowns Accordion Toggle
 */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (!trigger) return;
    
    // Toggle on mobile
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
            const otherChevron = other.querySelector('.chevron');
            if (otherChevron) otherChevron.style.transform = '';
          }
        });
        
        dropdown.classList.toggle('active');
        
        // Rotate mobile chevron
        const chevron = trigger.querySelector('.chevron');
        if (chevron) {
          chevron.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : '';
        }
      }
    });
  });
  
  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const chevron = dropdown.querySelector('.chevron');
        if (chevron) chevron.style.transform = '';
      });
    }
  });
}

/**
 * Dashboard Loading Simulation
 */
function initDashboardLoadingSimulation() {
  const loadBtn = document.getElementById('simulate-load-btn');
  const kpiGrid = document.querySelector('.grid.col-3');
  const tableBody = document.querySelector('table tbody');
  if (!loadBtn || !kpiGrid || !tableBody) return;
  
  // Cache original HTML
  const originalKpiHTML = kpiGrid.innerHTML;
  const originalTableHTML = tableBody.innerHTML;
  
  loadBtn.addEventListener('click', () => {
    window.showToast('Simulating network latency...');
    loadBtn.disabled = true;
    
    // Set KPI cards to skeletons
    kpiGrid.innerHTML = `
      <div class="card">
        <div class="skeleton skeleton-text short" style="margin-bottom: 12px;"></div>
        <div class="skeleton skeleton-title" style="height: 36px; margin-bottom: 12px; width: 40%;"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
      <div class="card">
        <div class="skeleton skeleton-text short" style="margin-bottom: 12px;"></div>
        <div class="skeleton skeleton-title" style="height: 36px; margin-bottom: 12px; width: 45%;"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
      <div class="card">
        <div class="skeleton skeleton-text short" style="margin-bottom: 12px;"></div>
        <div class="skeleton skeleton-title" style="height: 36px; margin-bottom: 12px; width: 35%;"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
    `;
    
    // Set table body rows to skeletons
    tableBody.innerHTML = `
      <tr>
        <td><div class="skeleton skeleton-text" style="width: 70%;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 50%;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 60px;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 40px;"></div></td>
      </tr>
      <tr>
        <td><div class="skeleton skeleton-text" style="width: 60%;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 45%;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 60px;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 35px;"></div></td>
      </tr>
      <tr>
        <td><div class="skeleton skeleton-text" style="width: 80%;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 55%;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 60px;"></div></td>
        <td><div class="skeleton skeleton-text" style="width: 50px;"></div></td>
      </tr>
    `;
    
    // Restore after 1.5 seconds
    setTimeout(() => {
      kpiGrid.innerHTML = originalKpiHTML;
      tableBody.innerHTML = originalTableHTML;
      loadBtn.disabled = false;
      window.showToast('Dashboard metrics loaded successfully');
    }, 1500);
  });
}

/**
 * Command Palette Logic
 */
function initCommandPalette() {
  const overlay = document.getElementById('command-palette');
  const input = document.getElementById('command-search-input');
  const list = document.getElementById('command-palette-list');
  if (!overlay || !input || !list) return;
  
  // OS Detection for Trigger Button
  const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent || navigator.platform || "");
  const triggers = document.querySelectorAll('.command-palette-trigger, #os-palette-key');
  triggers.forEach(trigger => {
    trigger.textContent = isMac ? '⌘K' : 'Ctrl+K';
    trigger.setAttribute('title', isMac ? 'Search Commands (' + (isMac ? '⌘K' : 'Ctrl+K') + ')' : 'Search Commands (Ctrl+K)');
  });
  
  // Click handler for button triggers
  const btnTriggers = document.querySelectorAll('.palette-trigger-btn, #global-palette-btn');
  btnTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  });
  
  let activeIndex = 0;
  let filteredCommands = [...COMMANDS];
  
  // Icon dictionary
  const icons = {
    home: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    box: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>`,
    grid: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
    user: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    'sun-moon': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    type: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
    bell: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
  };
  
  function renderCommands() {
    list.innerHTML = '';
    if (filteredCommands.length === 0) {
      list.innerHTML = `<li class="command-palette-item" style="cursor: default; justify-content: center;"><span class="command-palette-item-text" style="color: var(--text-tertiary);">No commands found matching "${input.value}"</span></li>`;
      return;
    }
    
    filteredCommands.forEach((cmd, idx) => {
      const li = document.createElement('li');
      li.className = `command-palette-item ${idx === activeIndex ? 'active' : ''}`;
      li.innerHTML = `
        <div class="command-palette-item-left">
          <span class="command-palette-item-icon">${icons[cmd.icon] || ''}</span>
          <span class="command-palette-item-text">${cmd.text}</span>
        </div>
        <span class="command-palette-item-shortcut">${cmd.shortcut}</span>
      `;
      li.addEventListener('click', () => {
        executeCommand(cmd);
      });
      list.appendChild(li);
    });
    
    // Scroll active item into view
    const activeEl = list.children[activeIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }
  
  function executeCommand(cmd) {
    closePalette();
    cmd.action();
  }
  
  function openPalette() {
    overlay.classList.add('open');
    input.value = '';
    activeIndex = 0;
    filteredCommands = [...COMMANDS];
    renderCommands();
    setTimeout(() => input.focus(), 50);
  }
  
  function closePalette() {
    overlay.classList.remove('open');
  }
  
  // Listen for keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    // Open: Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    
    // Commands input listening
    if (!overlay.classList.contains('open')) return;
    
    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filteredCommands.length;
      renderCommands();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderCommands();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        executeCommand(filteredCommands[activeIndex]);
      }
    }
  });
  
  input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    filteredCommands = COMMANDS.filter(cmd => 
      cmd.text.toLowerCase().includes(val) || 
      cmd.category.toLowerCase().includes(val) ||
      cmd.shortcut.toLowerCase().replace(' ', '').includes(val.replace(' ', ''))
    );
    activeIndex = 0;
    renderCommands();
  });
  
  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePalette();
    }
  });
}

/**
 * Accordion Component Logic
 */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.closest('.accordion');
      if (!accordion) return;
      const content = accordion.querySelector('.accordion-content');
      if (!content) return;
      const isOpen = accordion.classList.contains('open');
      
      // Auto-collapse siblings in the same accordion group
      const group = accordion.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion').forEach(item => {
          if (item !== accordion) {
            item.classList.remove('open');
            item.querySelector('.accordion-content').style.maxHeight = '0px';
          }
        });
      }
      
      // Toggle current item
      if (isOpen) {
        content.style.maxHeight = '0px';
        accordion.classList.remove('open');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        accordion.classList.add('open');
      }
    });
  });
}

/**
 * Slide-Out Drawer Component Logic
 */
function initDrawers() {
  const triggerButtons = document.querySelectorAll('[data-drawer-target]');
  const closeButtons = document.querySelectorAll('[data-drawer-close]');
  
  triggerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const drawerId = btn.getAttribute('data-drawer-target');
      const drawer = document.getElementById(drawerId);
      if (drawer) {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock screen scroll
        setTimeout(() => {
          drawer.querySelector('.drawer').style.transform = 'translateX(0)';
        }, 10);
      }
    });
  });
  
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.drawer-overlay');
      if (drawer) {
        const innerDrawer = drawer.querySelector('.drawer');
        if (innerDrawer) {
          innerDrawer.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
          drawer.classList.remove('open');
          document.body.style.overflow = ''; // Unlock scroll
        }, 280);
      }
    });
  });
  
  // Close on backdrop click
  document.querySelectorAll('.drawer-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        const innerDrawer = overlay.querySelector('.drawer');
        if (innerDrawer) {
          innerDrawer.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }, 280);
      }
    });
  });
}

/**
 * Top Viewport Progress Bar Engine
 */
let progressBarEl = null;
function getProgressBar() {
  if (!progressBarEl) {
    progressBarEl = document.createElement('div');
    progressBarEl.className = 'top-progress-bar';
    document.body.appendChild(progressBarEl);
  }
  return progressBarEl;
}

window.startProgress = function() {
  const bar = getProgressBar();
  bar.style.width = '0%';
  bar.classList.add('active');
  // force reflow
  bar.offsetWidth;
  
  // Progress increments
  setTimeout(() => { bar.style.width = '25%'; }, 50);
  setTimeout(() => { bar.style.width = '60%'; }, 350);
  setTimeout(() => { bar.style.width = '85%'; }, 800);
};

window.stopProgress = function() {
  const bar = getProgressBar();
  bar.style.width = '100%';
  setTimeout(() => {
    bar.classList.remove('active');
    setTimeout(() => {
      bar.style.width = '0%';
    }, 200);
  }, 200);
};

/**
 * Blocking Transactional Loader Engine
 */
let blockingLoaderEl = null;
function getBlockingLoader() {
  if (!blockingLoaderEl) {
    blockingLoaderEl = document.createElement('div');
    blockingLoaderEl.className = 'blocking-loader-overlay';
    blockingLoaderEl.innerHTML = `
      <div class="blocking-loader-card">
        <div class="spinner"></div>
        <div class="blocking-loader-text" id="blocking-loader-msg">Processing...</div>
        <div class="blocking-loader-subtext">Please do not refresh this page.</div>
      </div>
    `;
    document.body.appendChild(blockingLoaderEl);
  }
  return blockingLoaderEl;
}

window.showBlockingLoader = function(msg) {
  const loader = getBlockingLoader();
  document.getElementById('blocking-loader-msg').textContent = msg || 'Processing...';
  loader.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.hideBlockingLoader = function() {
  const loader = getBlockingLoader();
  loader.classList.remove('open');
  document.body.style.overflow = '';
};

/**
 * Simulations for Docs Page triggers
 */
window.simulateTopBarProgress = function() {
  window.startProgress();
  window.showToast('Initializing network buffer...');
  setTimeout(() => {
    window.stopProgress();
    window.showToast('Data packets retrieved successfully');
  }, 2000);
};

window.simulateBlockingLoader = function() {
  window.showBlockingLoader('Synchronizing security credentials...');
  setTimeout(() => {
    window.hideBlockingLoader();
    window.showToast('Credentials successfully compiled');
  }, 2500);
};

/**
 * Search Autocomplete Suggestion Engine
 */
const DATABASE_MOCK = [
  { name: 'Ada Lovelace', type: 'User' },
  { name: 'Alan Turing', type: 'User' },
  { name: 'auth-service', type: 'Repo' },
  { name: 'analytics-dashboard', type: 'Repo' },
  { name: 'base.css', type: 'File' },
  { name: 'style.css', type: 'File' },
  { name: 'Grace Hopper', type: 'User' },
  { name: 'main.js', type: 'File' },
  { name: 'index.html', type: 'File' },
  { name: 'docs.html', type: 'File' },
  { name: 'blog.html', type: 'File' },
  { name: 'settings.html', type: 'File' }
];

function initAutocompleteInput() {
  const input = document.getElementById('db-search-input');
  const dropdown = document.getElementById('db-autocomplete-dropdown');
  const clearBtn = document.getElementById('db-search-clear');
  if (!input || !dropdown) return;
  
  let activeIndex = -1;
  let matches = [];
  
  function renderMatches() {
    dropdown.innerHTML = '';
    if (matches.length === 0) {
      dropdown.classList.remove('open');
      return;
    }
    
    matches.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = `autocomplete-item ${idx === activeIndex ? 'active' : ''}`;
      li.innerHTML = `
        <span>${item.name}</span>
        <span class="autocomplete-item-meta">${item.type}</span>
      `;
      li.addEventListener('click', () => {
        selectItem(item);
      });
      dropdown.appendChild(li);
    });
    
    dropdown.classList.add('open');
  }
  
  function selectItem(item) {
    input.value = item.name;
    dropdown.classList.remove('open');
    if (clearBtn) clearBtn.style.display = 'flex';
    activeIndex = -1;
    window.showToast(`Selected from database: ${item.name} (${item.type})`);
  }
  
  input.addEventListener('input', () => {
    const val = input.value.toLowerCase().trim();
    if (!val) {
      matches = [];
      dropdown.classList.remove('open');
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }
    
    if (clearBtn) clearBtn.style.display = 'flex';
    
    matches = DATABASE_MOCK.filter(item => 
      item.name.toLowerCase().includes(val) || 
      item.type.toLowerCase().includes(val)
    );
    activeIndex = -1;
    renderMatches();
  });
  
  input.addEventListener('keydown', (e) => {
    if (!dropdown.classList.contains('open') || matches.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % matches.length;
      renderMatches();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + matches.length) % matches.length;
      renderMatches();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && matches[activeIndex]) {
        selectItem(matches[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('open');
    }
  });
  
  // Clear input
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      matches = [];
      dropdown.classList.remove('open');
      clearBtn.style.display = 'none';
      input.focus();
    });
  }
  
  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

/**
 * Password Strength Validator
 */
function initPasswordValidator() {
  const input = document.getElementById('pass-strength-field');
  const bar = document.getElementById('pass-strength-bar');
  const ruleLength = document.getElementById('rule-length');
  const ruleNumber = document.getElementById('rule-number');
  const ruleSpecial = document.getElementById('rule-special');
  
  if (!input) return;
  
  input.addEventListener('input', () => {
    const val = input.value;
    const hasLength = val.length >= 8;
    const hasNumber = /\d/.test(val);
    const hasSpecial = /[@$!%*?&]/.test(val);
    
    // Update checklist
    if (hasLength) ruleLength.className = 'valid'; else ruleLength.className = 'invalid';
    if (hasNumber) ruleNumber.className = 'valid'; else ruleNumber.className = 'invalid';
    if (hasSpecial) ruleSpecial.className = 'valid'; else ruleSpecial.className = 'invalid';
    
    // Calculate strength
    let score = 0;
    if (val.length > 0) {
      if (hasLength) score++;
      if (hasNumber) score++;
      if (hasSpecial) score++;
    }
    
    // Update bar class
    bar.className = 'strength-bar';
    if (score === 1) {
      bar.classList.add('weak');
    } else if (score === 2) {
      bar.classList.add('medium');
    } else if (score === 3) {
      bar.classList.add('strong');
    }
  });
}

/**
 * Segmented Controls Slider Sync
 */
function initSegmentedControls() {
  const segments = document.querySelectorAll('.segmented-control');
  segments.forEach(control => {
    const inputs = control.querySelectorAll('input[type="radio"]');
    const slider = control.querySelector('.segmented-slider');
    
    function updateSlider() {
      const checked = control.querySelector('input[type="radio"]:checked');
      if (checked) {
        const label = checked.nextElementSibling;
        slider.style.width = label.offsetWidth + 'px';
        slider.style.transform = `translateX(${label.offsetLeft - 2}px)`;
      }
    }
    
    inputs.forEach(input => {
      input.addEventListener('change', updateSlider);
    });
    
    // Initial layout sizing
    setTimeout(updateSlider, 100);
    
    // Update slider on window resize
    window.addEventListener('resize', updateSlider);
  });
}

/**
 * Interactive Range Sliders with Tooltips
 */
function initRangeSliders() {
  const sliders = document.querySelectorAll('.range-slider');
  sliders.forEach(slider => {
    const tooltip = slider.nextElementSibling;
    if (!tooltip) return;
    
    function updateTooltip() {
      const val = slider.value;
      const min = slider.min ? slider.min : 0;
      const max = slider.max ? slider.max : 100;
      const percent = ((val - min) / (max - min)) * 100;
      
      tooltip.textContent = `${val}%`;
      tooltip.style.left = `calc(${percent}% + (${8 - percent * 0.16}px))`;
    }
    
    slider.addEventListener('input', updateTooltip);
    setTimeout(updateTooltip, 100);
  });
}

/**
 * Drag-and-Drop Mock File Uploader
 */
function initFileUploader() {
  const zone = document.getElementById('drop-zone');
  const input = document.getElementById('drop-file-input');
  const text = document.getElementById('drop-text');
  const progress = document.getElementById('drop-progress');
  const progressBar = document.getElementById('drop-progress-bar');
  
  if (!zone || !input) return;
  
  zone.addEventListener('click', (e) => {
    if (e.target !== input) {
      input.click();
    }
  });
  
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('dragover');
  });
  
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });
  
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0].name);
    }
  });
  
  input.addEventListener('change', () => {
    if (input.files.length > 0) {
      handleUpload(input.files[0].name);
    }
  });
  
  function handleUpload(filename) {
    text.textContent = `Uploading "${filename}"...`;
    progress.style.display = 'block';
    progressBar.style.width = '0%';
    
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      progressBar.style.width = percent + '%';
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          text.textContent = `Successfully uploaded: ${filename}`;
          progress.style.display = 'none';
          window.showToast(`Uploaded file: ${filename}`);
        }, 300);
      }
    }, 100);
  }
}

/**
 * Email Suffix Suggestions Engine
 */
function initEmailSuggestion() {
  const input = document.getElementById('email-suggest-input');
  const dropdown = document.getElementById('email-suggest-dropdown');
  if (!input || !dropdown) return;
  
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
  
  input.addEventListener('input', () => {
    const val = input.value.trim();
    dropdown.innerHTML = '';
    
    if (!val || (val.includes('@') && val.split('@')[1].includes('.'))) {
      dropdown.classList.remove('open');
      return;
    }
    
    const atIndex = val.indexOf('@');
    let username = val;
    let typedDomain = '';
    
    if (atIndex > -1) {
      username = val.substring(0, atIndex);
      typedDomain = val.substring(atIndex + 1);
    }
    
    if (!username) {
      dropdown.classList.remove('open');
      return;
    }
    
    const matches = domains.filter(d => d.startsWith(typedDomain));
    if (matches.length === 0) {
      dropdown.classList.remove('open');
      return;
    }
    
    matches.forEach(domain => {
      const li = document.createElement('li');
      li.className = 'autocomplete-item';
      li.innerHTML = `
        <span>${username}<strong>@${domain}</strong></span>
        <span class="autocomplete-item-meta">Suggest</span>
      `;
      li.addEventListener('click', () => {
        input.value = `${username}@${domain}`;
        dropdown.classList.remove('open');
        input.focus();
        window.showToast(`Completed email: ${input.value}`);
        // Dispatch input event to trigger any validation listeners
        input.dispatchEvent(new Event('input'));
      });
      dropdown.appendChild(li);
    });
    
    dropdown.classList.add('open');
  });
  
  // Close suggestion on click outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

/**
 * Phone Number Auto Formatter ( (555) 000-0000 )
 */
function initPhoneFormatter() {
  const telInputs = document.querySelectorAll('.tel-input');
  telInputs.forEach(input => {
    function updateValue() {
      const selectionStart = input.selectionStart;
      const originalLength = input.value.length;
      
      const raw = input.value.replace(/\D/g, '');
      const limited = raw.substring(0, 10);
      
      let formatted = '';
      if (limited.length > 0) {
        const p1 = limited.substring(0, 3);
        const p2 = limited.substring(3, 6);
        const p3 = limited.substring(6, 10);
        
        if (limited.length <= 3) {
          formatted = `(${p1}`;
        } else if (limited.length <= 6) {
          formatted = `(${p1}) ${p2}`;
        } else {
          formatted = `(${p1}) ${p2}-${p3}`;
        }
      }
      
      input.value = formatted;
      input.setAttribute('data-raw', limited);
      
      // Preserve cursor position
      const newLength = formatted.length;
      let newCursorPos = selectionStart + (newLength - originalLength);
      if (newCursorPos < 0) newCursorPos = 0;
      if (newCursorPos > newLength) newCursorPos = newLength;
      
      input.setSelectionRange(newCursorPos, newCursorPos);
    }
    
    input.addEventListener('input', updateValue);
    
    // Auto format if prepopulated on load
    if (input.value) {
      updateValue();
    }
  });
}

/**
 * Reactive Email Validation
 */
function initEmailValidation() {
  const input = document.getElementById('email-suggest-input');
  const msg = document.getElementById('email-validation-msg');
  if (!input || !msg) return;
  
  let hasInteracted = false;
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function checkValidation() {
    const val = input.value.trim();
    if (!val) {
      input.classList.remove('invalid');
      msg.className = 'validation-message';
      msg.textContent = '';
      return;
    }
    
    const isValid = validateEmail(val);
    if (isValid) {
      input.classList.remove('invalid');
      msg.className = 'validation-message success';
      msg.textContent = 'Valid email address format';
    } else {
      input.classList.add('invalid');
      msg.className = 'validation-message error';
      msg.textContent = 'Please enter a valid email address (e.g., name@example.com)';
    }
  }
  
  input.addEventListener('blur', () => {
    hasInteracted = true;
    checkValidation();
  });
  
  input.addEventListener('input', () => {
    if (hasInteracted) {
      checkValidation();
    }
  });
}

/**
 * Interactive Code Blocks Copy Handler
 */
function initCodeCopy() {
  const preElements = document.querySelectorAll('pre');
  
  preElements.forEach(pre => {
    // Check if already wrapped
    let wrapper = pre.parentElement;
    if (!wrapper.classList.contains('code-block-wrapper')) {
      wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
    }
    
    // Check if button already exists (to avoid duplicate initialization on update)
    if (wrapper.querySelector('.copy-code-btn')) return;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.type = 'button';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    
    // SVG icons for Copy and Check
    const copyIcon = `<svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    const checkIcon = `<svg class="icon icon-sm" viewBox="0 0 24 24" style="stroke: #10b981;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    
    copyBtn.innerHTML = `${copyIcon}<span>Copy</span>`;
    wrapper.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', () => {
      const codeElement = pre.querySelector('code');
      const textToCopy = codeElement ? codeElement.innerText : pre.innerText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.innerHTML = `${checkIcon}<span style="color: #10b981;">Copied!</span>`;
        copyBtn.classList.add('copied');
        
        if (window.showToast) {
          window.showToast('Code copied to clipboard!');
        }
        
        setTimeout(() => {
          copyBtn.innerHTML = `${copyIcon}<span>Copy</span>`;
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        if (window.showToast) {
          window.showToast('Failed to copy code block.');
        }
      });
    });
  });
}

/**
 * Interactive Component Playground Logic
 */
function initPlayground() {
  const compType = document.getElementById('play-type');
  const compText = document.getElementById('play-text');
  const compPadding = document.getElementById('play-padding');
  const compRadius = document.getElementById('play-radius');
  const compBg = document.getElementById('play-bg');
  const compTextColor = document.getElementById('play-textcolor');
  const compShadow = document.getElementById('play-shadow');
  
  const previewPane = document.getElementById('play-preview-pane');
  const codeOutputHtml = document.getElementById('play-code-html');
  const codeOutputCss = document.getElementById('play-code-css');
  
  if (!compType || !previewPane) return;
  
  function updatePlayground() {
    const type = compType.value;
    const textVal = compText.value || (type === 'button' ? 'Click Me' : 'Card Title');
    const paddingVal = compPadding.value;
    const radiusVal = compRadius.value;
    const bgVal = compBg.value;
    const textColVal = compTextColor.value;
    const shadowVal = compShadow.value;
    
    // Clear and build preview
    previewPane.innerHTML = '';
    
    // Formulate inline styles
    let elementStyles = `padding: ${paddingVal}px; border-radius: ${radiusVal}px; `;
    
    // BG logic
    if (bgVal === 'accent') {
      elementStyles += `background-color: var(--accent); `;
    } else {
      elementStyles += `background-color: var(--bg-${bgVal}); `;
    }
    
    // Text Color logic
    if (textColVal === 'accent-foreground') {
      elementStyles += `color: var(--accent-foreground); `;
    } else {
      elementStyles += `color: var(--text-${textColVal}); `;
    }
    
    // Shadow logic
    let shadowCss = '';
    if (shadowVal !== 'none') {
      elementStyles += `box-shadow: var(--shadow-${shadowVal}); `;
      shadowCss = `\n  box-shadow: var(--shadow-${shadowVal});`;
    }
    
    // Border logic
    if (bgVal !== 'accent' && bgVal !== 'tertiary') {
      elementStyles += `border: 1px solid var(--border-color); `;
    } else {
      elementStyles += `border: none; `;
    }
    
    let previewElement;
    let htmlCode = '';
    
    if (type === 'button') {
      previewElement = document.createElement('button');
      previewElement.className = 'playground-preview-element btn';
      previewElement.innerText = textVal;
      previewElement.setAttribute('style', elementStyles);
      previewPane.appendChild(previewElement);
      
      const borderMarkup = (bgVal !== 'accent' && bgVal !== 'tertiary') ? '\n  border: 1px solid var(--border-color);' : '';
      const bgMarkup = bgVal === 'accent' ? 'var(--accent)' : `var(--bg-${bgVal})`;
      const textMarkup = textColVal === 'accent-foreground' ? 'var(--accent-foreground)' : `var(--text-${textColVal})`;
      
      htmlCode = `<button class="btn custom-btn">${textVal}</button>`;
      
      codeOutputCss.innerText = `.custom-btn {
  padding: ${paddingVal}px;
  border-radius: ${radiusVal}px;
  background-color: ${bgMarkup};
  color: ${textMarkup};${borderMarkup}${shadowCss}
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.custom-btn:active {
  transform: scale(0.98);
}`;
    } else {
      previewElement = document.createElement('div');
      previewElement.className = 'playground-preview-element card';
      previewElement.setAttribute('style', `${elementStyles} width: 100%; max-width: 380px; text-align: left; display: block;`);
      
      const title = document.createElement('h3');
      title.style.marginTop = '0';
      title.style.marginBottom = '0.5rem';
      title.innerText = textVal;
      
      const desc = document.createElement('p');
      desc.style.margin = '0';
      desc.style.fontSize = '0.875rem';
      desc.style.color = textColVal === 'primary' ? 'var(--text-secondary)' : 'inherit';
      desc.style.opacity = textColVal === 'accent-foreground' ? '0.8' : '1';
      desc.innerText = 'This card component was generated and styled dynamically using nrmn.ui tokens.';
      
      previewElement.appendChild(title);
      previewElement.appendChild(desc);
      previewPane.appendChild(previewElement);
      
      const borderMarkup = (bgVal !== 'accent' && bgVal !== 'tertiary') ? '\n  border: 1px solid var(--border-color);' : '';
      const bgMarkup = bgVal === 'accent' ? 'var(--accent)' : `var(--bg-${bgVal})`;
      const textMarkup = textColVal === 'accent-foreground' ? 'var(--accent-foreground)' : `var(--text-${textColVal})`;
      
      htmlCode = `<div class="card custom-card">
  <h3>${textVal}</h3>
  <p>This card component was generated and styled dynamically using nrmn.ui tokens.</p>
</div>`;
      
      codeOutputCss.innerText = `.custom-card {
  padding: ${paddingVal}px;
  border-radius: ${radiusVal}px;
  background-color: ${bgMarkup};
  color: ${textMarkup};${borderMarkup}${shadowCss}
}`;
    }
    
    codeOutputHtml.innerText = htmlCode;
    
    // Re-initialize code copy wrappers and buttons
    initCodeCopy();
  }
  
  // Bind listeners
  const controls = [compType, compText, compPadding, compRadius, compBg, compTextColor, compShadow];
  controls.forEach(control => {
    if (control) {
      const eventType = (control.tagName === 'INPUT' && control.type === 'range') || control.tagName === 'TEXTAREA' ? 'input' : 'change';
      if (control.tagName === 'INPUT' && control.type === 'text') {
        control.addEventListener('input', updatePlayground);
      } else {
        control.addEventListener(eventType, updatePlayground);
      }
    }
  });
  
  // Initialize slider value bubbles/tooltips if applicable
  compPadding.addEventListener('input', (e) => {
    const bubble = document.getElementById('play-padding-val');
    if (bubble) bubble.innerText = `${e.target.value}px`;
  });
  
  compRadius.addEventListener('input', (e) => {
    const bubble = document.getElementById('play-radius-val');
    if (bubble) bubble.innerText = `${e.target.value}px`;
  });
  
  // Initial run
  updatePlayground();
}

/**
 * Breadcrumb Dropdown Interaction
 */
function initBreadcrumbs() {
  const dropdowns = document.querySelectorAll('.breadcrumb-dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.breadcrumb-dropdown-trigger');
    if (!trigger) return;
    
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Close other breadcrumb dropdowns
      dropdowns.forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('open');
        }
      });
      
      dropdown.classList.toggle('open');
    });
  });
  
  // Close all breadcrumb dropdowns on outside click
  document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
    });
  });
}

