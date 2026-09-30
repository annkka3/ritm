"""Draws the app icons: sunrise gradient square with the rhythm mark (open ring + dot)."""
from PIL import Image, ImageDraw
import math

A, B, INK = (255, 178, 62), (255, 93, 120), (43, 18, 8)

def gradient(n):
    img = Image.new('RGB', (n, n))
    px = img.load()
    for y in range(n):
        for x in range(n):
            t = (x + y) / (2 * (n - 1))
            px[x, y] = tuple(round(A[i] + (B[i] - A[i]) * t) for i in range(3))
    return img

def mark(img, scale):
    n = img.width
    S = 4  # supersample for smooth edges
    big = Image.new('L', (n * S, n * S), 0)
    d = ImageDraw.Draw(big)
    c, r, w = n * S / 2, n * S * 0.25 * scale, n * S * 0.075 * scale
    # open ring: 300° arc starting at the top, gap on the upper left
    box = [c - r, c - r, c + r, c + r]
    d.arc(box, start=-90 + 0, end=-90 + 300, fill=255, width=round(w))
    for ang in (-90, -90 + 300):  # round caps
        a = math.radians(ang)
        cx, cy = c + (r - w / 2) * math.cos(a), c + (r - w / 2) * math.sin(a)
        d.ellipse([cx - w / 2, cy - w / 2, cx + w / 2, cy + w / 2], fill=255)
    dot = n * S * 0.075 * scale
    d.ellipse([c - dot, c - dot, c + dot, c + dot], fill=255)
    m = big.resize((n, n), Image.LANCZOS)
    img.paste(Image.new('RGB', (n, n), INK), (0, 0), m)
    return img

def rounded(img, radius):
    n = img.width
    S = 4
    m = Image.new('L', (n * S, n * S), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, n * S - 1, n * S - 1], radius=radius * S, fill=255)
    out = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    out.paste(img, (0, 0), m.resize((n, n), Image.LANCZOS))
    return out

rounded(mark(gradient(512), 1.0), 112).save('icons/icon-512.png')
rounded(mark(gradient(192), 1.0), 42).save('icons/icon-192.png')
mark(gradient(512), 0.78).save('icons/maskable-512.png')      # full bleed, mark inside the safe zone
mark(gradient(180), 0.9).save('icons/apple-touch-icon.png')    # iOS rounds the corners itself
rounded(mark(gradient(64), 1.0), 14).save('icons/favicon-64.png')
print('icons done')
