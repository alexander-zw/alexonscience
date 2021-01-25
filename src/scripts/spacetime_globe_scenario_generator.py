"""
This script can be used to generate a custom scenario for the spacetime globe.

The default grid is x = -4..4, t = -2..5.

For reference:
    blue person: 0
    orange person: 1
    orange cat: 2
    blue person with lightbulb off: 3
    blue person with lightbulb on: 4
    photon facing right: 5
    photon facing left: 6
    orange person with clock: 7
    box: 8
    box burning: 9
    box burnt: 10
    ashes: 11
    cat tail: 12
    cat head: 13
    lightbulb off: 14
    lightbulb on: 15
    blue person with gun: 16
    bullet: 17
    orange person on earth: 18
    blue person on rocket facing right: 19
    blue person on rocket facing left: 20
"""

# Format: image index, start t, start x, end t, end x, step size in t
# (or if start and end t are the same, the step size is in x).
objects = [
    [0, -2, -4, -2, 4, 0.5],
    [2, -1, -4, -1, 4, 0.5],
    [9, 0, -4, 0, 4, 0.5],
    [17, 1, -4, 1, 4, 0.5],
    [1, 2, -4, 2, 4, 0.5],
    [15, 3, -4, 3, 4, 0.5],
    [18, 4, -4, 4, 4, 0.5],
    [19, 5, -4, 5, 4, 0.5],
]

for obj in objects:
    image_ind, t1, x1, t2, x2, step = obj
    points = []
    if t1 == t2:
        num_steps = int((x2 - x1) / step)
        t_step = (t2 - t1) / num_steps
        x_step = step
    else:
        num_steps = int((t2 - t1) / step)
        t_step = step
        x_step = (x2 - x1) / num_steps
    for i in range(num_steps + 1):
        t, x = t1 + i * t_step, x1 + i * x_step
        print(f"{{ t: {t}, x: {x}, image: eventImages[{image_ind}] }},")
