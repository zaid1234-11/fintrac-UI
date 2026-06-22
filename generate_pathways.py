import math, random, sys

def mulberry32(seed):
    state = seed & 0xffffffff
    def rng():
        nonlocal state
        state = (state + 0x6D2B79F5) & 0xffffffff
        t = state
        t = ((t ^ (t >> 15)) * (t | 1)) & 0xffffffff
        t = (t + (((t ^ (t >> 7)) * (t | 61)) & 0xffffffff)) & 0xffffffff
        return ((t ^ (t >> 14)) & 0xffffffff) / 4294967296
    return rng

def gen(seed=7, width=2400, height=1400,
        n_seeds=9, max_depth=7,
        base_length=360, length_decay=0.70,
        base_width=1.6, width_decay=0.70,
        branch_prob0=0.34, branch_decay=0.80,
        spread_deg=30, wiggle_deg=7,
        seed_x_range=(0.2,0.8), seed_y_range=(0.65,0.98),
        seed_angle_spread=14):
    rng = mulberry32(seed)
    paths = [] 

    def grow(x, y, angle, length, depth, w):
        pts = [(x, y)]
        segs = 4 + int(rng() * 5)
        cx, cy, ca = x, y, angle
        for i in range(segs):
            ca += (rng() - 0.5) * 2 * wiggle_deg
            step = (length / segs) * (0.8 + rng() * 0.4)
            rad = math.radians(ca)
            cx += math.cos(rad) * step
            cy += math.sin(rad) * step
            pts.append((cx, cy))
            bp = branch_prob0 * (branch_decay ** depth)
            if depth < max_depth and rng() < bp:
                side = -1 if rng() < 0.5 else 1
                child_angle = ca + side * (spread_deg * (0.55 + rng() * 0.9))
                grow(cx, cy, child_angle, length * length_decay, depth + 1, w * width_decay)
        paths.append({"points": pts, "width": max(w, 0.35), "depth": depth})

    for i in range(n_seeds):
        sx = width * (seed_x_range[0] + rng() * (seed_x_range[1]-seed_x_range[0]))
        sy = height * (seed_y_range[0] + rng() * (seed_y_range[1]-seed_y_range[0]))
        sa = -90 + (rng()-0.5) * 2 * seed_angle_spread
        grow(sx, sy, sa, base_length * (0.85 + rng()*0.3), 0, base_width)

    candidates = []
    for pi, p in enumerate(paths):
        if p["depth"] < 1:
            continue
        for (x, y) in p["points"][1:-1]:
            candidates.append((x, y, pi, p["depth"]))

    links = []
    max_links = int(len(paths) * 0.55)
    tries = 0
    link_radius = width * 0.07
    while len(links) < max_links and tries < max_links * 12 and candidates:
        tries += 1
        a = candidates[int(rng() * len(candidates))]
        b = candidates[int(rng() * len(candidates))]
        if a[2] == b[2]:
            continue
        dx, dy = a[0]-b[0], a[1]-b[1]
        dist = math.hypot(dx, dy)
        if dist < width * 0.018 or dist > link_radius:
            continue
        links.append({"a": (a[0], a[1]), "b": (b[0], b[1]), "depth": max(a[3], b[3])})

    return paths, links, width, height

def smooth_path_d(points):
    if len(points) < 3:
        p = points
        return "M{:.2f},{:.2f} L{:.2f},{:.2f}".format(p[0][0],p[0][1],p[-1][0],p[-1][1])
    d = "M{:.2f},{:.2f} ".format(*points[0])
    for i in range(1, len(points)-1):
        x0,y0 = points[i]
        x1,y1 = points[i+1]
        mx, my = (x0+x1)/2, (y0+y1)/2
        d += "Q{:.2f},{:.2f} {:.2f},{:.2f} ".format(x0,y0,mx,my)
    d += "L{:.2f},{:.2f}".format(*points[-1])
    return d

def build_svg(paths, links, width, height, max_depth,
              color="#f3e6c4", base_opacity=1.0):
    layers_soft = []
    layers_core = []
    for p in paths:
        # Instead of depth fading, we just use the base opacity provided for the layer
        # maybe slight depth fading
        depth_t = p["depth"] / max(1, max_depth)
        op = base_opacity * (1 - depth_t * 0.3)
        d = smooth_path_d(p["points"])
        sw_core = round(p["width"] * 1.5, 2)
        sw_soft = round(p["width"] * 3.0 + 1.2, 2)
        layers_soft.append('<path d="{}" stroke="{}" stroke-width="{}" fill="none" stroke-linecap="round" opacity="{:.3f}"/>'.format(d, color, sw_soft, op*0.55))
        layers_core.append('<path d="{}" stroke="{}" stroke-width="{}" fill="none" stroke-linecap="round" opacity="{:.3f}"/>'.format(d, color, sw_core, op))

    link_layer = []
    for l in links:
        op = base_opacity * 0.4
        (x0,y0),(x1,y1) = l["a"], l["b"]
        mx, my = (x0+x1)/2, (y0+y1)/2 - abs(x1-x0)*0.06
        d = "M{:.2f},{:.2f} Q{:.2f},{:.2f} {:.2f},{:.2f}".format(x0,y0,mx,my,x1,y1)
        link_layer.append('<path d="{}" stroke="{}" stroke-width="1.0" fill="none" stroke-linecap="round" opacity="{:.3f}"/>'.format(d, color, op))

    svg = f'''<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="bloomSoft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
    <filter id="bloomTight" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.1" />
    </filter>
  </defs>
  <g filter="url(#bloomSoft)">
    {''.join(layers_soft)}
  </g>
  <g filter="url(#bloomTight)">
    {''.join(link_layer)}
    {''.join(layers_core)}
  </g>
</svg>'''
    return svg

if __name__ == "__main__":
    layers = [
        {"name": "pathways-back.svg", "seed": 42, "opacity": 0.03, "n_seeds": 12},
        {"name": "pathways-mid.svg", "seed": 84, "opacity": 0.06, "n_seeds": 10},
        {"name": "pathways-front.svg", "seed": 126, "opacity": 0.10, "n_seeds": 8},
        {"name": "pathways-highlight.svg", "seed": 168, "opacity": 0.14, "n_seeds": 5},
    ]

    for layer in layers:
        paths, links, w, h = gen(seed=layer["seed"], n_seeds=layer["n_seeds"])
        svg = build_svg(paths, links, w, h, max_depth=7, base_opacity=layer["opacity"])
        with open(f"public/{layer['name']}", "w") as f:
            f.write(svg)
        print(f"Generated {layer['name']} with {len(paths)} paths and {len(links)} links.")
