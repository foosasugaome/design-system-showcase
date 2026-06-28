# Coding & Design Guidelines

This document outlines the standard coding practices and visual design system guidelines for all future projects inheriting this structure.

## 1. Coding Standards

### HTML
- Use strict semantic elements (`<header>`, `<main>`, `<aside>`, `<footer>`, `<section>`).
- Always specify `alt` attributes for images, proper `aria-*` tags for interactive components, and unique `id` selectors for inputs.
- Keep structural HTML clean of inline styles.

### CSS
- Maintain separation between custom properties (theme tokens) in `:root` and selector implementations.
- Prefer class-based selections over raw tag styling.
- All colors must utilize CSS Custom Properties to guarantee consistent light/dark automatic toggles (`prefers-color-scheme`).
- Organize rules sequentially: resets first, then typography, then structural layouts, and finally individual components.

### JavaScript
- Use modular, reusable helper functions.
- Keep JS styling updates limited to class state toggling (`element.classList.toggle('open')`) rather than direct inline style injection.
- Ensure event listeners are cleaned up or delegated where appropriate to avoid memory leaks.

---

## 2. Design Guidelines

### Color Palette (Grayscale)
| Token Name | Light Theme Hex | Dark Theme Hex | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#fcfcfc` | `#09090b` | Base application background |
| `--bg-secondary` | `#f4f4f5` | `#18181b` | Cards, secondary surfaces, codeblocks |
| `--bg-tertiary` | `#e4e4e7` | `#27272a` | Active state indicators, subtle borders |
| `--border-color` | `#e4e4e7` | `#27272a` | Standard dividers and component borders |
| `--text-primary` | `#18181b` | `#fafafa` | High-contrast main reading text |
| `--text-secondary`| `#52525b` | `#a1a1aa` | Secondary instructions and bios |
| `--accent` | `#09090b` | `#fafafa` | Highlight components, primary button color |

### Typography Scale
- **System Stack**: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Heading 1**: `2.25rem` (36px), Bold, line-height `1.25`
- **Heading 2**: `1.75rem` (28px), Semi-bold, margin-top `1.5em`
- **Heading 3**: `1.35rem` (22.4px), Semi-bold, margin-top `1.25em`
- **Base Body**: `1rem` (16px), Regular, line-height `1.5`
- **Helper/Small Text**: `0.875rem` (14px) and `0.75rem` (12px)

### Transitions & Animation
- **Hover Transitions**: Use a fast cubic-bezier transition (e.g. `0.15s ease` or `0.25s cubic-bezier(0.4, 0, 0.2, 1)`).
- **Transforms**: Use slight translations (`translateY(-2px)`) and subtle scaling (`scale(0.98)` for buttons on click) to communicate interaction.

---

## 3. Interactive Components Guidelines

### Command Palette (`Ctrl+K` / `⌘K`)
- **Aesthetic**: Grayscale dark overlay with a centered search panel card and keyboard shortcut footer.
- **Dynamic Labels**: Detect platform OS on load. Display Mac-friendly `⌘K` or Windows/Linux-friendly `Ctrl+K` badges dynamically on trigger indicators.
- **Accessibilities**: Support arrow keys (`ArrowUp`/`ArrowDown`), select execution (`Enter`), and exit closure (`Esc`).

### Collapsible Accordions
- **Dynamic Height**: Avoid hardcoding container heights. Set `max-height` programmatically in JS based on `content.scrollHeight` to expand panel containers smoothly.
- **Auto-Collapse**: Mutually collapse open sibling elements in the same group on select to maintain layout structure.
- **Rotatable Chevrons**: Include chevron indicators that rotate `180deg` on active open state.

### Slide-Out Drawer Panels
- **Layout**: Panel drawers fixed to the viewport edge (`max-width: 400px`) that translate horizontally (`translateX(100%)` to `0`).
- **Scroll Lock**: Set `overflow: hidden` on the page body context while drawers are active to prevent double-scrollbars and background shifts.

### Preloaders & Async Feedback
- **Non-blocking (Top Progress Bar)**: A thin `3px` line running across the viewport ceiling. Utilize dynamic transition stages (`25%`, `60%`, `85%`) to simulate fetch loading before animating to `100%` and fading out on completion.
- **Blocking (Modal Loader)**: A blur-overlay (`blur(6px)`) dialog centering an infinite linear rotation spinner. Only use this blocking pattern for transactional write actions (payments, form processing, settings cache writes) to protect system states.

