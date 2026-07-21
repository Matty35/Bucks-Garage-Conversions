# How to add photos to the website (no coding needed)

Photos you add here appear automatically on the **Our Work** page of the website
(`/our-work.html`). Two steps, both done on the GitHub website.

## Step 1 — Upload the photo

1. Open this `images` folder on GitHub.
2. Click **Add file → Upload files** (top right).
3. Drag your photo in (or click "choose your files").
4. Give the file a simple name before uploading if you can — lowercase, hyphens,
   no spaces. Good: `kingsbrook-office-after.jpg`. Avoid: `IMG_4032 (1).JPG`.
5. Click **Commit changes** (the green button).

Photo tips:
- JPG or PNG straight from your phone is fine. WebP is even better if you have it.
- Keep files under ~1MB if possible (most phones can export a "medium" size).
  Big photos make the page slow for visitors on mobile.
- Landscape (wider than tall) photos look best in the gallery.

## Step 2 — Add it to the list

1. Still in this folder, click on **`photos.txt`**.
2. Click the **pencil icon** (✏️ top right) to edit.
3. Add one line for your photo at the bottom, in this format:

   ```
   kingsbrook-office-after.jpg | Finished home office conversion on Kingsbrook
   ```

   That's the exact filename, then a `|`, then a short caption. The caption
   shows under the photo and describes it for screen readers and Google —
   say what and where, e.g. "Before: single garage in Wendover" or
   "Completed bedroom conversion, Berryfields".

4. Click **Commit changes**.

The photo appears on the Our Work page within a minute or two of the site
redeploying. Photos show in the order they appear in `photos.txt` — put your
best one first. To show a before/after pair, add them as two consecutive lines
with "Before:" and "After:" starting the captions.

## To remove or reorder photos

Edit `photos.txt` the same way — delete a line to remove a photo from the page
(the file can stay in the folder), or move lines up and down to reorder.

## Rules the site expects

- One photo per line: `filename | caption`.
- Lines starting with `#` are ignored (they're notes, like this file).
- The filename must match the uploaded file exactly, including `.jpg`/`.png`.
- Every photo needs a caption — it doubles as the alt text.
