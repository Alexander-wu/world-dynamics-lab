# World Dynamics Lab

Research group homepage and internship recruitment site for Hao Wu and Yuan Gao, Tsinghua University, associated with Prof. Xiaomeng Huang’s research group.

Live site: https://alexander-wu.github.io/world-dynamics-lab/

## Editing

- `index.html`: research, publication, team, and recruitment content.
- `styles.css`: responsive page design.
- `app.js`: paper filters, email drafting, and conceptual canvas artwork.
- `assets/`: favicon and Yuan Gao’s publicly available profile photograph.

GitHub Pages publishes the repository root from `main`. `.nojekyll` preserves the static files without Jekyll processing. No build or server-side storage is required. Application drafts are composed locally and sent only through the visitor’s own mail client.

## Sources

Publication links are embedded in the page. Contact details were checked against the authors’ public homepages on 2026-10-18:

- https://alexander-wu.github.io/hao-wu/
- https://yuangao-yg.github.io/
- https://faculty.dess.tsinghua.edu.cn/huangxiaomeng/zh_CN/index.htm

Yuan Gao portrait source: https://yuangao-yg.github.io/images/avatar.jpg

The hero canvas is a conceptual illustration. Publication thumbnails use original paper figures hosted by coauthor Yuan Gao. Full-resolution JPEGs are preserved, with resized WebP previews for efficient loading. See `assets/papers/sources.json` for individual image sources.

## Typography and Tsinghua identity

- English: locally hosted EB Garamond. Chinese: system KaiTi / Kaiti SC, with locally hosted LXGW WenKai TC as fallback. Font licenses are in `assets/fonts/`; WenKai is subset to the page's Chinese characters and punctuation, so regenerate the subset if adding new Chinese copy.
- Tsinghua seal: official visual identity page https://vi.tsinghua.edu.cn/gk/xxbz/xh.htm ; original image https://vi.tsinghua.edu.cn/__local/8/1C/21/2F02A66E31BF084FE340463BB47_B9A95F73_185BC.jpg . The image is preserved unchanged; CSS frames the seal and blends its white background into the pale purple surface.
- Primary purple: #660874; background: #f6f0fa. The page continues to describe its existing affiliation with Prof. Xiaomeng Huang's group.

## Interactive research globe

The Canvas globe uses precomputed spherical paths, illuminated particles and two orbital trails. Hovering a globe region or research hotspot reveals its direction card; clicking a hotspot pins or switches the card. The card links to filtered publications (World Models / AI for Science) or the research overview (Multimodal & Agents). Touch, keyboard focus, Escape, close and outside-click are supported. Animation respects reduced-motion preferences, pauses offscreen and can be paused manually. All graphics are illustrative, not measured research data.

## Chinese and English versions

Use `?lang=zh` and `?lang=en` for shareable language-specific URLs; section anchors are preserved. The header offers a persistent Chinese / English switch. An explicit URL takes priority over the saved language choice, which takes priority over the browser language. Without JavaScript the Chinese source remains available.

`language.js` contains English copy bindings and translations for dynamic messages. Chinese source copy stays in `index.html`. The switch preserves filters, form input, and selected research interests; application drafts use the current language and address both researchers directly. Publication counts, globe cards, figure captions, accessibility labels, descriptions, and browser back/forward navigation are localized.
