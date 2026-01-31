# AppHub UI Style Guide (iOS 17 Native)

This project checks strictly against Apple's Human Interface Guidelines.

## 1. Core Principles

- **Clarity:** Text is legible at every size, icons are precise and lucid.
- **Deference:** Fluid motion and a crisp, beautiful interface help people understand and interact with content without competing for it.
- **Depth:** Distinct visual layers and realistic motion convey hierarchy.

## 2. Colors (Semantic)

We use iOS System Colors. **Do not use hex codes directly.** Use these variables:

| Variable | Use Case |
|----------|----------|
| `--ios-blue` | CTAs, Links, Active States |
| `--ios-red` | Destructive actions, Errors |
| `--ios-green` | Success, Validation |
| `--ios-gray` | Secondary text, inactive icons |
| `--system-background` | Main page background (White / Black) |
| `--secondary-system-grouped-background` | Cards, List Items (Lt Gray / Dk Gray) |

## 3. Typography (SF Pro)

- `h1`: 34px Bold (Page Titles, "Today")
- `h2`: 22px-28px Bold (Section Headers)
- Body: 17px Regular (Standard text)
- Caption: 13px (Secondary labels)

## 4. Components

### Buttons

All buttons must be large enough for touch (min height 44px).

```html
<button class="ios-btn ios-btn-primary">Primary Action</button>
<button class="ios-btn ios-btn-secondary">Secondary Action</button>
```

### Cards

Use `.ios-card` for grouped content. In "List Lists", use standard rows.

```html
<div class="ios-card">
  <div class="ios-list-item">Row 1</div>
  <div class="ios-list-item">Row 2</div>
</div>
```

### Navigation

- **Top:** `<NavigationBar />` (Sticky, Glassmorphism)
- **Bottom:** `<BottomTabBar />` (Mobile only, Glassmorphism)

## 5. Admin Tables

Admin tables follow the "Settings List" aesthetic.

- **Container:** `.admin-table-container` (Rounded corners, overflow handling)
- **Table:** `.admin-table`
- **Headers:** Uppercase, small, gray.
- **Rows:** 17px text, hair-line separator.

```html
<div class="admin-table-container">
  <table class="admin-table">
    <thead>
       <tr><th>Name</th><th>Status</th></tr>
    </thead>
    <tbody>
       <tr><td>App Name</td><td><span class="status-badge status-published">Published</span></td></tr>
    </tbody>
  </table>
</div>
```

## 6. Do's and Don'ts

- **DO** use rounded corners (`var(--radius-md)`).
- **DO** use padding (`16px` standard).
- **DON'T** use material ripples.
- **DON'T** use drop shadows (except very subtle ones).
- **DON'T** use generic "Android" blues or greens.
