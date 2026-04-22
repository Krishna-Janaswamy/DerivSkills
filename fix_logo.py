from PIL import Image

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    for item in data:
        # If pixel is bright (white/off-white), make it transparent
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            # It's the dark 'TG' text. Let's make it pure white for dark mode
            new_data.append((255, 255, 255, 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

process_logo("public/techgen-logo.png", "public/techgen-logo-dark.png")
