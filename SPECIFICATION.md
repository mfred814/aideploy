# Project Specification: My Daily Tasks

## Purpose

Build a beginner-friendly, responsive daily task list using only HTML5, CSS3, and vanilla JavaScript.

## User experience

- Show the heading **My Daily Tasks**, a task-entry field, and an **Add task** button.
- Let a visitor add, complete, edit, and delete individual tasks.
- Show counts for all tasks, completed tasks, and pending tasks.
- Filter the displayed list by all, completed, or pending tasks.
- Show a friendly message when the list or selected filter has no tasks.
- Keep tasks after a page refresh by using browser `localStorage`.
- Work on mobile and desktop, with keyboard-accessible controls and clear focus states.

## Technical boundaries

- Use three application files: `index.html`, `style.css`, and `script.js`.
- Do not use JavaScript frameworks, CSS frameworks, or a backend service.
- Store data in the visitor's browser; the list is not synced between devices.

## Completion checks

1. Adding a non-empty task displays it and updates the counts.
2. Checking a task updates its completed state and the completed/pending counts.
3. Editing or deleting a task updates the displayed list and counts.
4. Each filter displays only matching tasks while summary counts still cover all tasks.
5. Refreshing the page restores saved tasks.
6. With no matching tasks, show a helpful empty-state message.
