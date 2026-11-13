# My Daily Tasks

A cheerful, responsive todo app made with plain HTML, CSS, and JavaScript. Add tasks, check them off, edit or delete them, and refresh the page without losing your list. Your tasks are stored in the browser on your own device.

## Features

- Add, edit, complete, and delete tasks
- View total, completed, and pending task counts
- Filter the list to show all, pending, or completed tasks
- Save and restore tasks with browser `localStorage`
- Friendly empty-list messages, small animations, and a responsive layout
- Keyboard-friendly controls, accessible labels, and reduced-motion support

## Project files

- `index.html` — the page content and the places where the app displays tasks and counts
- `style.css` — the colors, layout, responsive rules, and animations
- `script.js` — the task actions, filters, counts, rendering, and local storage
- `SPECIFICATION.md` — a short description of the project requirements

## Run it locally

1. Download or clone this project to your computer.
2. Open the project folder.
3. Double-click `index.html` to open it in a modern browser.
4. Add a task and refresh the page to see that it was saved.

No package installation or build step is needed. You can also open the folder in Visual Studio Code and use the **Live Server** extension if you prefer a local web-server preview.

## How the code works

### 1. HTML: the page structure

`index.html` creates the content the browser can display: the heading, task-entry form, three summary numbers, filter buttons, task list, and friendly empty state. The IDs such as `task-input` and `task-list` give JavaScript reliable ways to find those elements. The script is loaded with `defer`, so the browser waits until the HTML has been read before running it.

### 2. CSS: the appearance

`style.css` sets the colors and typography, styles the card and controls, and adds hover effects and subtle animations. Its media queries adjust spacing and sizing for narrow screens. The reduced-motion rule respects visitors who have asked their device to limit animation.

### 3. JavaScript: task behavior

`script.js` keeps the tasks in an array. Each task has an ID, text, and completed status. When you add, edit, check, or delete a task, JavaScript updates that array and redraws the visible list. The filter buttons change which tasks are drawn, while the summary counts always describe the whole list.

### 4. Saving tasks

After a change, `saveTasks()` turns the array into JSON text and stores it in `localStorage`. When the page opens, `loadTasks()` reads the saved text and turns it back into an array. This storage belongs to the current browser on the current device; it is not an online account or a cloud backup.

## Publish with GitHub Pages

### Create a GitHub repository

1. Sign in at [github.com](https://github.com/).
2. Select **New repository** (or open the **+** menu and choose **New repository**).
3. Enter a repository name, such as `my-daily-tasks`.
4. Choose **Public** if you want anyone to view the source, or choose **Private** if that suits your needs. GitHub Pages availability can depend on your account plan for private repositories.
5. Select **Create repository**. You can leave the README option unchecked because this project already has one.

### Upload and push the files

1. Open a terminal in the project folder. In VS Code, choose **Terminal → New Terminal**.
2. Run these commands, replacing `YOUR-USERNAME` with your GitHub username and `my-daily-tasks` with your repository name:

   ```bash
   git init
   git add index.html style.css script.js README.md SPECIFICATION.md
   git commit -m "Create my daily tasks app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/my-daily-tasks.git
   git push -u origin main
   ```

3. If Git asks you to sign in, follow the browser sign-in instructions. GitHub no longer accepts your account password for HTTPS Git operations; use its sign-in flow or a personal access token.
4. Refresh the repository page. Your files should appear there.

If Git says a remote named `origin` already exists, check it with `git remote -v` and use the URL for the correct repository before pushing.

### Turn on GitHub Pages

1. Open the repository on GitHub.
2. Select **Settings**, then select **Pages** in the sidebar.
3. Under **Build and deployment**, choose **Deploy from a branch** as the source.
4. Choose the `main` branch and the `/(root)` folder, then select **Save**.
5. Wait a few minutes. The Pages section will show the live site URL when deployment is ready.

### Find your repository and website links

- The repository link is `https://github.com/YOUR-USERNAME/my-daily-tasks`.
- The website link is usually `https://YOUR-USERNAME.github.io/my-daily-tasks/`.
- Use the exact live URL shown under **Settings → Pages** if it differs.

After changing files locally, publish the update with:

```bash
git add .
git commit -m "Update todo app"
git push
```

GitHub Pages deploys the latest pushed version automatically. Since the app is static, it does not need a server-side database.
