#!/usr/bin/env python3
"""Crop each verbatim paragraph out of the original PDF as an image.

Driven by pdftotext -bbox word coordinates: for every verbatim string in
mlops-paper-full.js we locate the matching run of words in the page word
stream and crop that exact region (splitting across columns / pages when a
paragraph flows over a boundary). Output: fp-*.png crops + manifest.js.

REGENERATE (intermediates are not committed — recreate them first):
  cd paper-crops
  pdftoppm  -png -r 200 "<paper>.pdf" page
  pdftotext -bbox        "<paper>.pdf" bbox.html
  python3 crop.py
"""
import re, os, json, html
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BBOX = os.path.join(HERE, "bbox.html")
JS   = os.path.join(ROOT, "mlops-paper-full.js")
PAGE_MID_PT = 306.0          # column split (page width 612pt)
PAD = 7                      # px padding around a crop

# ---- 1. parse bbox: per-page word list (pt coords, top-left origin) ----
raw = open(BBOX, encoding="utf-8").read()
page_blocks = re.split(r"<page ", raw)[1:]
pages = []   # list of dict(width,height, words=[(xMin,yMin,xMax,yMax,text)])
for pb in page_blocks:
    m = re.match(r'width="([\d.]+)" height="([\d.]+)"', pb)
    w, h = float(m.group(1)), float(m.group(2))
    words = []
    for wm in re.finditer(
        r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>',
        pb, re.S):
        x0, y0, x1, y1 = map(float, wm.group(1, 2, 3, 4))
        txt = html.unescape(wm.group(5))
        words.append((x0, y0, x1, y1, txt))
    pages.append({"w": w, "h": h, "words": words})

# ---- 2. global stream + normalized concat string with index map ----
def norm(s):
    return "".join(c.lower() for c in s if c.isalnum())

stream = []   # (page_idx, x0,y0,x1,y1, text)
for pi, pg in enumerate(pages):
    for wd in pg["words"]:
        stream.append((pi,) + wd)

concat = []
char2word = []
for wi, (pi, x0, y0, x1, y1, txt) in enumerate(stream):
    nt = norm(txt)
    concat.append(nt)
    char2word.extend([wi] * len(nt))
CONCAT = "".join(concat)

# ---- 3. extract verbatim strings (in array order) from the JS ----
js = open(JS, encoding="utf-8").read()
verbatims = re.findall(r"verbatim:\s*`([^`]*)`", js)
print("verbatim entries found:", len(verbatims))

# ---- 4. open page images, compute pt->px scale per page ----
imgs = []
for pi in range(len(pages)):
    p = os.path.join(HERE, f"page-{pi+1:02d}.png")
    im = Image.open(p).convert("RGB")
    imgs.append(im)
SCALE = imgs[0].width / pages[0]["w"]   # ~2.778 at 200dpi

def find_range(vtext):
    """Return (start_word_idx, end_word_idx) inclusive, or None."""
    nv = norm(vtext)
    if not nv:
        return None
    # Try a few start offsets (the PDF text-layer occasionally injects junk
    # glyphs like "D2" from overlapping role icons) and a few anchor lengths.
    for off in (0, 2, 4, 8, 14):
        if off >= len(nv):
            break
        for slen in (45, 35, 25, 18, 12):
            head = nv[off:off + slen]
            if len(head) < 8:
                continue
            s = CONCAT.find(head)
            if s == -1:
                continue
            for elen in (45, 35, 25, 18, 12):
                tail = nv[-elen:]
                e = CONCAT.find(tail, s)
                if e == -1:
                    continue
                e_end = e + len(tail) - 1
                return (char2word[s], char2word[e_end])
            approx_end_char = min(len(CONCAT) - 1, s + (len(nv) - off) - 1)
            return (char2word[s], char2word[approx_end_char])
    return None

def col_of(x0, x1):
    return 0 if (x0 + x1) / 2.0 < PAGE_MID_PT else 1

manifest = {}
misses = []
for i, v in enumerate(verbatims):
    eid = f"fp-{i}"
    rng = find_range(v)
    if not rng:
        misses.append((eid, v[:60]))
        continue
    s, e = rng
    words = stream[s:e + 1]
    # group by (page, column) preserving first appearance order
    groups = {}
    order = []
    for (pi, x0, y0, x1, y1, txt) in words:
        key = (pi, col_of(x0, x1))
        if key not in groups:
            groups[key] = []
            order.append(key)
        groups[key].append((x0, y0, x1, y1))
    crops = []
    for gi, key in enumerate(order):
        pi, _col = key
        bx = sorted(groups[key], key=lambda b: b[1])
        # Drop trailing blocks separated by a big vertical gap (e.g. footnotes,
        # figure captions that share the column under the paragraph).
        lhs = sorted(b[3] - b[1] for b in bx)
        lh = lhs[len(lhs) // 2] if lhs else 10
        kept = [bx[0]]
        for b in bx[1:]:
            if b[1] - kept[-1][3] > 2.2 * lh:
                break
            kept.append(b)
        bx = kept
        x0 = min(b[0] for b in bx); y0 = min(b[1] for b in bx)
        x1 = max(b[2] for b in bx); y1 = max(b[3] for b in bx)
        im = imgs[pi]
        px0 = max(0, int(x0 * SCALE) - PAD)
        py0 = max(0, int(y0 * SCALE) - PAD)
        px1 = min(im.width,  int(x1 * SCALE) + PAD)
        py1 = min(im.height, int(y1 * SCALE) + PAD)
        if px1 - px0 < 8 or py1 - py0 < 8:
            continue
        crop = im.crop((px0, py0, px1, py1))
        fn = f"{eid}-{gi}.png"
        crop.save(os.path.join(HERE, fn))
        crops.append("paper-crops/" + fn)
    if crops:
        manifest[eid] = crops
    else:
        misses.append((eid, v[:60]))

# ---- 5. write manifest.js ----
with open(os.path.join(HERE, "manifest.js"), "w", encoding="utf-8") as f:
    f.write("/* AUTO-GENERATED by paper-crops/crop.py — verbatim paragraph image crops */\n")
    f.write("window.MLOPS_CROPS = " + json.dumps(manifest, indent=0) + ";\n")

print("crops written for", len(manifest), "entries")
print("misses:", len(misses))
for m in misses:
    print("  MISS", m)
