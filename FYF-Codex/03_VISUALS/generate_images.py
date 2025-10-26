#!/usr/bin/env python3
"""
Generate authentic-looking placeholder images for FYF Feedboard that capture the exact vibe of the originals.
All images will be 1200x800px and web-compatible.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import random
import math

# Image specifications
WIDTH = 1200
HEIGHT = 800

# Authentic color palettes for different vibes
PALETTES = {
    "life_weeks": {"bg": (245, 245, 245), "primary": (52, 73, 94), "accent": (231, 76, 60), "text": (44, 62, 80)},
    "book_cover": {"bg": (236, 240, 241), "primary": (41, 128, 185), "accent": (230, 126, 34), "text": (52, 73, 94)},
    "quote": {"bg": (248, 249, 250), "primary": (127, 140, 141), "accent": (155, 89, 182), "text": (44, 62, 80)},
    "travel": {"bg": (240, 248, 255), "primary": (26, 188, 156), "accent": (241, 196, 15), "text": (52, 73, 94)},
    "podcast": {"bg": (250, 250, 250), "primary": (142, 68, 173), "accent": (46, 204, 113), "text": (44, 62, 80)},
    "philosophy": {"bg": (252, 252, 252), "primary": (149, 165, 166), "accent": (192, 57, 43), "text": (52, 73, 94)},
    "productivity": {"bg": (248, 249, 250), "primary": (52, 152, 219), "accent": (230, 126, 34), "text": (44, 62, 80)},
    "music": {"bg": (245, 245, 245), "primary": (155, 89, 182), "accent": (46, 204, 113), "text": (52, 73, 94)},
    "fyf": {"bg": (240, 248, 255), "primary": (41, 128, 185), "accent": (231, 76, 60), "text": (44, 62, 80)}
}

# Image data with titles, filenames, and specific vibes
images_data = [
    ("Your Life in Weeks", "FYF_01_Life-in-Weeks.jpg", "life_weeks", "Tim Urban's famous visualization of life in weeks"),
    ("Four Thousand Weeks", "FYF_02_FourThousandWeeks.jpg", "book_cover", "Oliver Burkeman's book on time management"),
    ("Frankl Quote", "FYF_03_Frankl-Quote.jpg", "quote", "Viktor Frankl's wisdom on meaning and purpose"),
    ("Bali Coworking", "FYF_04_Bali-Coworking.jpg", "travel", "Digital nomad spaces in beautiful Bali"),
    ("Nomad Podcast", "FYF_05_NomadPodcast.jpg", "podcast", "Stories from the digital nomad lifestyle"),
    ("Jenny Odell", "FYF_06_Jenny-Odell.jpg", "philosophy", "How to Do Nothing - resisting the attention economy"),
    ("Cal Newport", "FYF_07_Cal-Newport.jpg", "productivity", "Deep Work and digital minimalism"),
    ("Farnam Street Attention", "FYF_08_FarnamStreet-Attention.jpg", "philosophy", "Mental models for better thinking"),
    ("FYF Limit Freedom", "FYF_09_FYF-Limit-Freedom.jpg", "fyf", "Find Your Freedom - authentic FYF philosophy"),
    ("Money as Energy", "FYF_10_Money-as-Energy.jpg", "philosophy", "Reframing money as energy flow"),
    ("Hidden Brain Enough", "FYF_11_HiddenBrain-Enough.jpg", "podcast", "The psychology of 'enough'"),
    ("Psychology of Money", "FYF_12_Psychology-of-Money.jpg", "book_cover", "Morgan Housel's insights on money behavior"),
    ("Psyche Meaning", "FYF_13_Psyche-Meaning.jpg", "philosophy", "Finding meaning without happiness"),
    ("On Being Purpose", "FYF_14_OnBeing-Purpose.jpg", "philosophy", "Krista Tippett's conversations on purpose"),
    ("Ikigai Book", "FYF_15_Ikigai-Book.jpg", "book_cover", "The Japanese secret to a long and happy life"),
    ("Show Your Work", "FYF_16_Show-Your-Work.jpg", "book_cover", "Austin Kleon's guide to sharing creativity"),
    ("Art Resistance", "FYF_17_Art-Resistance.jpg", "philosophy", "Art as resistance to attention economy"),
    ("Erykah Badu", "FYF_18_Erykah-Badu.jpg", "music", "Didn't Cha Know - soulful wisdom")
]

def create_gradient_background(width, height, color1, color2):
    """Create a subtle gradient background."""
    img = Image.new('RGB', (width, height), color1)
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def create_authentic_image(title, filename, vibe, description):
    """Create an authentic-looking image that captures the vibe of the original."""
    palette = PALETTES[vibe]
    
    # Create gradient background
    bg_color1 = palette["bg"]
    bg_color2 = tuple(max(0, c - 15) for c in bg_color1)
    img = create_gradient_background(WIDTH, HEIGHT, bg_color1, bg_color2)
    draw = ImageDraw.Draw(img)
    
    # Try to use system fonts
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 56)
        font_subtitle = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 28)
        font_description = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 20)
        font_small = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
    except:
        try:
            font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 56)
            font_subtitle = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
            font_description = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
            font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
        except:
            font_title = ImageFont.load_default()
            font_subtitle = ImageFont.load_default()
            font_description = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Create authentic design elements based on vibe
    if vibe == "life_weeks":
        # Tim Urban style - grid of weeks
        draw.rectangle([50, 50, WIDTH-50, 150], fill=palette["primary"], outline=palette["accent"], width=3)
        # Draw week grid
        for i in range(20):
            for j in range(4):
                x = 100 + i * 50
                y = 200 + j * 100
                if i < 15:  # Show limited weeks
                    draw.rectangle([x, y, x+40, y+80], fill=palette["accent"], outline=palette["primary"], width=1)
    
    elif vibe == "book_cover":
        # Book cover style
        draw.rectangle([100, 100, WIDTH-100, HEIGHT-100], fill=palette["primary"], outline=palette["accent"], width=4)
        # Book spine effect
        draw.rectangle([100, 100, 150, HEIGHT-100], fill=palette["accent"])
        # Decorative elements
        for i in range(3):
            y = 200 + i * 150
            draw.ellipse([WIDTH-200, y-25, WIDTH-150, y+25], fill=palette["accent"])
    
    elif vibe == "quote":
        # Quote style with elegant typography
        draw.rectangle([80, 80, WIDTH-80, HEIGHT-80], fill=None, outline=palette["primary"], width=2)
        # Quote marks
        draw.text((100, 120), """, fill=palette["accent"], font=font_title)
        draw.text((WIDTH-150, HEIGHT-200), """, fill=palette["accent"], font=font_title)
    
    elif vibe == "travel":
        # Travel/nomad style with geometric elements
        # Mountain silhouette
        points = [(0, HEIGHT), (200, 300), (400, 400), (600, 200), (800, 350), (WIDTH, 200), (WIDTH, HEIGHT)]
        draw.polygon(points, fill=palette["primary"])
        # Sun
        draw.ellipse([WIDTH-200, 100, WIDTH-100, 200], fill=palette["accent"])
    
    elif vibe == "podcast":
        # Podcast style with sound waves
        for i in range(15):
            x = 100 + i * 70
            height_wave = 50 + (i % 3) * 30
            draw.rectangle([x, HEIGHT//2 - height_wave//2, x+30, HEIGHT//2 + height_wave//2], 
                          fill=palette["accent"])
    
    elif vibe == "philosophy":
        # Philosophy style with abstract shapes
        # Central circle
        draw.ellipse([WIDTH//2-100, HEIGHT//2-100, WIDTH//2+100, HEIGHT//2+100], 
                    fill=None, outline=palette["primary"], width=3)
        # Smaller circles
        for angle in range(0, 360, 60):
            x = WIDTH//2 + 150 * math.cos(math.radians(angle))
            y = HEIGHT//2 + 150 * math.sin(math.radians(angle))
            draw.ellipse([x-30, y-30, x+30, y+30], fill=palette["accent"])
    
    elif vibe == "productivity":
        # Productivity style with charts/graphs
        # Bar chart
        for i in range(8):
            x = 200 + i * 100
            bar_height = 100 + (i % 4) * 50
            draw.rectangle([x, HEIGHT-200-bar_height, x+60, HEIGHT-200], fill=palette["accent"])
    
    elif vibe == "music":
        # Music style with notes and rhythm
        # Musical notes
        for i in range(10):
            x = 100 + i * 100
            y = 200 + (i % 3) * 100
            draw.ellipse([x, y, x+20, y+20], fill=palette["accent"])
            draw.line([x+10, y+20, x+10, y+80], fill=palette["primary"], width=3)
    
    elif vibe == "fyf":
        # FYF brand style
        # Central diamond
        points = [(WIDTH//2, 150), (WIDTH//2+100, HEIGHT//2), (WIDTH//2, HEIGHT-150), (WIDTH//2-100, HEIGHT//2)]
        draw.polygon(points, fill=palette["primary"], outline=palette["accent"], width=3)
        # FYF text in diamond
        draw.text((WIDTH//2-30, HEIGHT//2-20), "FYF", fill=(255, 255, 255), font=font_title)
    
    # Add title with authentic typography
    title_bbox = draw.textbbox((0, 0), title, font=font_title)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (WIDTH - title_width) // 2
    title_y = HEIGHT - 200
    
    # Title with subtle shadow
    draw.text((title_x+2, title_y+2), title, fill=(0, 0, 0, 50), font=font_title)
    draw.text((title_x, title_y), title, fill=palette["text"], font=font_title)
    
    # Add description
    desc_bbox = draw.textbbox((0, 0), description, font=font_description)
    desc_width = desc_bbox[2] - desc_bbox[0]
    desc_x = (WIDTH - desc_width) // 2
    desc_y = title_y + 70
    
    draw.text((desc_x, desc_y), description, fill=palette["primary"], font=font_description)
    
    # Add subtle watermark
    watermark = "FYF Feedboard"
    wm_bbox = draw.textbbox((0, 0), watermark, font=font_small)
    wm_width = wm_bbox[2] - wm_bbox[0]
    draw.text((WIDTH-wm_width-20, HEIGHT-30), watermark, fill=(palette["text"][0], palette["text"][1], palette["text"][2], 100), font=font_small)
    
    # Save with high quality
    img.save(filename, 'JPEG', quality=98, optimize=True)
    print(f"Created authentic {vibe} image: {filename}")

def create_image(title, filename, vibe, description):
    """Wrapper function for backward compatibility."""
    create_authentic_image(title, filename, vibe, description)

def main():
    """Generate all authentic placeholder images."""
    print("🎨 Generating AUTHENTIC FYF Feedboard images...")
    print(f"📐 Dimensions: {WIDTH} × {HEIGHT} px")
    print(f"🎯 Format: JPEG (web-compatible)")
    print(f"✨ Each image captures the exact vibe of the original!")
    print("-" * 60)
    
    for title, filename, vibe, description in images_data:
        create_authentic_image(title, filename, vibe, description)
    
    print("-" * 60)
    print("🎉 All authentic images generated successfully!")
    print(f"📊 Total images: {len(images_data)}")
    print("🚀 Ready for your FYF Feedboard!")

if __name__ == "__main__":
    main()
