# Development

How to run and edit [digitalb.in](https://digitalb.in).

## Develop

```sh
npm install
npm run dev    # dev server, reloads when content changes
npm run build  # type check + build to ./dist
```

Pushing to `main` builds and deploys to GitHub Pages.

## Content

Every markdown file in [`content/`](./content) is one VHS tape. Files are
sorted by filename, so the number prefix decides the order in the pile.

```md
---
name: viaplay      # text on the tape sticker, also becomes the url (/viaplay)
label: exp.
---

# Viaplay

## 2020 - present

Regular markdown. Inline HTML works too, e.g. `<contact-form></contact-form>`.
```

To add a tape, add a file. To remove one, delete the file.

## Profile readme

`README.md` is what shows on the GitHub profile. Its header and the tape
spines are generated into `.github/readme/` – after adding or renaming a
project in `content/`, run `npm run readme` and paste the printed tape lines
into `README.md`.
