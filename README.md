# Nenrit Angel Lambert — Portfolio

A static portfolio website (HTML, CSS, JavaScript). No build step, no frameworks, nothing to install.

```
index.html        Homepage (all portfolio sections)
contact.html      Contact page with form and social links
css/styles.css    All styling. Colours and fonts are at the top in :root
js/main.js        Menu, scroll effects, project cards, contact form
assets/images/    Your photos (see ADD-YOUR-PHOTOS-HERE.txt)
assets/cv/        Your CV PDF (see ADD-YOUR-CV-HERE.txt)
render.yaml       Render hosting settings
```

---

## Step 1: Put the code on GitHub (in your browser)

1. Go to **github.com**, sign in, click the **+** at the top right, then **New repository**.
2. Name it something like `nenrit-portfolio`. Keep it **Public**. Do **not** tick "Add a README". Click **Create repository**.
3. On the next screen, click the link **"uploading an existing file"**.
4. Unzip the folder on your computer. Open it, select **everything inside it** (not the folder itself) and drag it all onto the GitHub page.
   `index.html` must end up at the top level of the repository, not inside another folder.
5. Scroll down and click **Commit changes**.

## Step 2: Host it on Render

1. Go to **render.com** and sign up with your GitHub account.
2. Click **New +** then **Static Site**.
3. Connect your GitHub and choose the `nenrit-portfolio` repository.
4. Use these settings:
   - **Name:** `nenrit-angel-lambert` (this becomes your web address)
   - **Branch:** `main`
   - **Build Command:** leave empty
   - **Publish Directory:** `.` (just a full stop)
5. Click **Create Static Site**. In about a minute you'll have a live link like `https://nenrit-angel-lambert.onrender.com`.

Every time you change a file on GitHub, Render updates the live site automatically.

## Step 3: Make the contact form work (free, about 5 minutes)

Render static sites can't send email by themselves, so the form uses **Formspree**.

1. Sign up at **formspree.io** with the email where you want to receive messages.
2. Click **New Form**, name it "Portfolio", and copy the form ID (the part after `/f/`, e.g. `xyzabcd`).
3. In `contact.html`, find `YOUR_FORM_ID` and replace it with your ID.
4. Send yourself a test message from the live site and confirm it in Formspree.

Until this is done, the form still works as a backup: it opens the visitor's email app with their message filled in.

## Step 4: Replace the placeholders

Edit files directly on GitHub: open a file, click the ✏️ pencil icon, make changes, click **Commit changes**.

| What | Where | Find this text |
|---|---|---|
| Email address | `index.html`, `contact.html` (2 places in each) | `your.email@example.com` |
| LinkedIn | `index.html`, `contact.html` | `YOUR-LINKEDIN` |
| X / Instagram | `index.html`, `contact.html` | `YOUR-HANDLE` |
| Phone | `contact.html` | `+234XXXXXXXXXX` |
| Form ID | `contact.html` | `YOUR_FORM_ID` |
| Site address (SEO) | `index.html`, `contact.html`, `robots.txt`, `sitemap.xml` | `YOUR-SITE.onrender.com` |
| Paralegal dates | `index.html` | `Add dates here when ready` |

**Photos:** upload into `assets/images/` using the exact names in `ADD-YOUR-PHOTOS-HERE.txt`.
On GitHub, open the folder, click **Add file**, then **Upload files**.

**CV:** upload into `assets/cv/` named `Nenrit-Angel-Lambert-CV.pdf`.

## Adding new content later

Look for comments in `index.html` that start with `TO ADD`. Each one tells you which block to copy:

- **New job or role:** copy a `<li class="role">` block in the Experience section.
- **New impact story:** copy an `<article class="story">` block. Add `story--flip` to put the image on the other side.
- **New project:** copy an `<article class="project">` block and give it a new id.

## Changing the look

All colours and fonts live at the top of `css/styles.css` under `:root`. Change `--forest` or `--champagne` and the whole site follows.
