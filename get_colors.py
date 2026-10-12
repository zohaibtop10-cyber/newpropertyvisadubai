import struct
import zlib

def read_png_pixels(filepath):
    with open(filepath, 'rb') as f:
        signature = f.read(8)
        assert signature == b'\x89PNG\r\n\x1a\n'
        
        idat_chunks = []
        width = height = 0
        
        while True:
            chunk_len_b = f.read(4)
            if not chunk_len_b:
                break
            chunk_len = struct.unpack('>I', chunk_len_b)[0]
            chunk_type = f.read(4)
            chunk_data = f.read(chunk_len)
            f.read(4) # crc
            
            if chunk_type == b'IHDR':
                width, height, bit_depth, color_type, _, _, _ = struct.unpack('>IIBBBBB', chunk_data)
                print(f"IHDR: {width}x{height}, bit_depth={bit_depth}, color_type={color_type}")
            elif chunk_type == b'IDAT':
                idat_chunks.append(chunk_data)
            elif chunk_type == b'IEND':
                break
                
    raw = zlib.decompress(b''.join(idat_chunks))
    # Let's inspect bytes if color_type == 6 (RGBA) or 2 (RGB)
    bpp = 4 if color_type == 6 else 3
    stride = 1 + width * bpp
    
    gold_colors = {}
    for y in range(height):
        row = raw[y * stride : (y + 1) * stride]
        filter_type = row[0] # assuming simple or filter 0 for rough sample
        for x in range(0, width, 3):
            idx = 1 + x * bpp
            r, g, b = row[idx], row[idx+1], row[idx+2]
            if r > 160 and g > 110 and b < 100 and (r - b) > 80:
                hex_c = f"#{r:02X}{g:02X}{b:02X}"
                gold_colors[hex_c] = gold_colors.get(hex_c, 0) + 1
                
    sorted_colors = sorted(gold_colors.items(), key=lambda kv: kv[1], reverse=True)
    print("Top colors:")
    for c, count in sorted_colors[:15]:
        print(f"  {c}: {count}")

read_png_pixels(r"C:\Users\HP Laptop\.gemini\antigravity-ide\brain\44c1fed3-aff5-489a-a462-e9ade04f07fa\uploaded_media_1791748854163.png")
