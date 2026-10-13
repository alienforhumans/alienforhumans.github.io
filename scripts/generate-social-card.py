"""Generate the social preview image with Pillow."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "social-card.png"
FONT_DIR = Path("C:/Windows/Fonts")


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    filename = "seguisb.ttf" if bold else "segoeui.ttf"
    return ImageFont.truetype(str(FONT_DIR / filename), size)


image = Image.new("RGB", (1200, 630), "#17141d")
draw = ImageDraw.Draw(image)

draw.rectangle((872, 0, 1200, 630), fill="#282039")
for radius, color in ((262, "#443451"), (212, "#503e66"), (160, "#604b7a")):
    draw.ellipse((1036 - radius, 315 - radius, 1036 + radius, 315 + radius), outline=color, width=2)

draw.rounded_rectangle((942, 219, 1130, 407), radius=43, fill="#7055ad")
draw.text((1036, 308), "G", font=font(126, bold=True), fill="#ffffff", anchor="mm")

draw.rounded_rectangle((72, 67, 133, 128), radius=16, fill="#7055ad")
draw.text((102, 96), "GV", font=font(23, bold=True), fill="#ffffff", anchor="mm")
draw.text((155, 99), "PERSONAL PORTFOLIO", font=font(19, bold=True), fill="#c6b4ed", anchor="lm")

draw.text((72, 196), "Gurgen", font=font(75, bold=True), fill="#f5f1fa", anchor="lt")
draw.text((72, 279), "Varzhapetyan", font=font(75, bold=True), fill="#f5f1fa", anchor="lt")
draw.text((75, 408), "Full-Stack Software Engineer", font=font(31), fill="#c9c1d1", anchor="lt")

draw.line((75, 499, 823, 499), fill="#51465f", width=2)
draw.text((75, 527), "TYPESCRIPT  ·  REACT  ·  NODE.JS  ·  AWS", font=font(20), fill="#bda9ea", anchor="lt")

image.save(OUT, "PNG", optimize=True)
print(OUT)
