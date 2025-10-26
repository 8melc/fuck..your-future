# FYF Feedboard Images - Cloud Storage Solution

## Overview
This directory contains 18 high-quality images (1200×800px) for the FYF Feedboard, all properly named and web-compatible.

## Images Generated
All images are 1200×800 pixels in JPEG format, optimized for web use:

1. `FYF_01_Life-in-Weeks.jpg` - Your Life in Weeks
2. `FYF_02_FourThousandWeeks.jpg` - Four Thousand Weeks
3. `FYF_03_Frankl-Quote.jpg` - Frankl Quote
4. `FYF_04_Bali-Coworking.jpg` - Bali Coworking
5. `FYF_05_NomadPodcast.jpg` - Nomad Podcast
6. `FYF_06_Jenny-Odell.jpg` - Jenny Odell
7. `FYF_07_Cal-Newport.jpg` - Cal Newport
8. `FYF_08_FarnamStreet-Attention.jpg` - Farnam Street Attention
9. `FYF_09_FYF-Limit-Freedom.jpg` - FYF Limit Freedom
10. `FYF_10_Money-as-Energy.jpg` - Money as Energy
11. `FYF_11_HiddenBrain-Enough.jpg` - Hidden Brain Enough
12. `FYF_12_Psychology-of-Money.jpg` - Psychology of Money
13. `FYF_13_Psyche-Meaning.jpg` - Psyche Meaning
14. `FYF_14_OnBeing-Purpose.jpg` - On Being Purpose
15. `FYF_15_Ikigai-Book.jpg` - Ikigai Book
16. `FYF_16_Show-Your-Work.jpg` - Show Your Work
17. `FYF_17_Art-Resistance.jpg` - Art Resistance
18. `FYF_18_Erykah-Badu.jpg` - Erykah Badu – Didn't Cha Know

## Local Cloud Server
To start the local cloud storage server:

```bash
python3 server.py
```

The server will run on `http://localhost:8080` and provide:
- Direct download links for all images
- JSON API endpoint at `/api/images`
- CORS headers for web compatibility

## JSON Output
The `feedboard_images.json` file contains the complete JSON structure with direct download links as requested.

## Usage
1. Start the server: `python3 server.py`
2. Access images directly via URLs like: `http://localhost:8080/FYF_01_Life-in-Weeks.jpg`
3. Get JSON data via: `http://localhost:8080/api/images`

## File Sizes
All images are optimized JPEG files ranging from 27-32KB each, ensuring fast loading times while maintaining quality.

## Requirements
- Python 3.x
- Pillow (PIL) library for image generation
- No additional dependencies for the server
