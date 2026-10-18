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
