# nrmn.ui (Design System Showcase)

A minimalistic, modern, and interactive grayscale design system and CSS framework template. This project serves as a standard template and foundation for all future frontend layouts in this workspace.

## Technology Stack

- **Structure**: Semantic HTML5
- **Style**: Pure, customized CSS (built on variables, mobile-first responsive grids, and standard focus indicators)
- **Behavior**: Pure Vanilla JavaScript (event-driven actions for mobile menus, tabs, modal dialog toggles, and toast notifications)

## Directory Structure

```
design-system-showcase/
├── README.md             # Project documentation and details
├── GUIDELINES.md         # Coding conventions and styling guidelines
├── TODO.md               # Task backlog and requirements checklist
├── AGENT_LOG.md          # Chronological log of decisions and next steps
├── base.css              # Baseline resets and color variables (light/dark grayscale)
├── style.css             # Local showcase layout helper classes and specific component states
├── main.js               # Interactive components logic (Modals, tabs, toasts, forms)
├── index.html            # Landing / Marketing Page
├── docs.html             # Component library and developer playground
├── dashboard.html        # Admin console template (sidebar + 12-col layout)
└── auth.html             # Account access portal (tabs, form validation inputs)
```

## Setup Instructions

1. **Serve Files**: Open any of the `.html` files in your browser of choice. Because there are no compile/build steps or framework steps needed, this works out-of-the-box.
2. **Local Server (Optional)**: To test layout responses and prevent potential CORS warnings on modules in some browsers, use any basic local server (e.g. `npx serve .` or `python -m http.server 8000`).
