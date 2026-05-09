
import re
import json

def clean_js_array_string(js_array_str):
    # This is a complex cleaning process due to the inconsistent and malformed nature of the source data.

    # 1. Normalize line breaks and remove leading/trailing whitespace
    js_array_str = js_array_str.strip().replace('\r\n', '\n')

    # 2. In the later part of the file (from s673), titles and ctx are multi-line and unquoted.
    # This requires a stateful parser to handle correctly.
    # Let's try to find these blocks and quote them properly.

    # Heuristic: find entries that are definitely malformed. They contain Chinese characters in title/ctx without quotes.
    # A simpler way is to split by the object delimiter `},` and process each chunk.
    
    objects = js_array_str[1:-1].strip().split('},\n  {')
    
    processed_objects = []
    for obj_text in objects:
        # Add quotes around keys
        obj_text = re.sub(r"([{,])\s*(\w+):", r'\1"\2":', obj_t
ext)
        
        # Handle the messy, multi-line values. This is the hardest part.
        # Let's find key-value pairs and manually quote the values if they aren't already.
        def quote_value(match):
            key = match.group(1)
            value = match.group(2).strip()
            # If value is a number, don't quote. If it already looks like a string, leave it.
            if value.isdigit() or (value.startswith("'") and value.endswith("'")):
                return f'{key}:{value}'
            # Otherwise, it's a messy string that needs quoting and escaping.
            else:
                # It's a multiline string, so we need to find its end.
                # The end is the next key or the end of the object string.
                end_match = re.search(r',\s*\"\w+\":', value)
                if end_match:
                    val_part = value[:end_match.start()]
                    rest = value[end_match.start():]
                    escaped_val = val_part.replace('\n', '\\n').replace('"', '\\"').strip()
                    return f'{key}:"{escaped_val}"{rest}'
                else:
                    escaped_val = value.replace('\n', '\\n').replace('"', '\\"').strip()
                    return f'{key}:"{escaped_val}"'
        
        # This is too fragile. Let's use a simpler regex to extract known fields and reconstruct.
        # This parser is specific to the structure of miComet_732.html
        
        data = {}
        id_m = re.search(r'id:\s*\'([^\']+)\'', obj_text)
        date_m = re.search(r'date:\s*\'([^\']+)\'', obj_text)
        phase_m = re.search(r'phase:\s*(\d+)', obj_text)
        side_m = re.search(r'side:\s*\'([^\']+)\'', obj_text)
        emoji_m = re.search(r'emoji:\s*\'([^\']+)\'', obj_text)
        type_m = re.search(r'type:\s*\'([^\']+)\'', obj_text)
        link_m = re.search(r'link:\s*\'([^\']+)\'', obj_text)
        
        # Title and Ctx are the most problematic fields
        title_m = re.search(r'title:\s*\'((?:\\'|[^'])*)'s*', obj_text, re.DOTALL)
        ctx_m = re.search(r'ctx:\s*\'((?:\\'|[^'])*)'s*', obj_text, re.DOTALL)

        data['id'] = id_m.group(1) if id_m else ''
        data['date'] = date_m.group(1) if date_m else ''
        data['phase'] = int(phase_m.group(1)) if phase_m else 1
        data['side'] = side_m.group(1) if side_m else 'shared'
        data['emoji'] = emoji_m.group(1) if emoji_m else '📍'
        data['type'] = type_m.group(1) if type_m else ''
        data['link'] = link_m.group(1) if link_m else ''
        data['title'] = title_m.group(1).replace("\\'", "'") if title_m else ''
        data['ctx'] = ctx_m.group(1).replace("\\'", "'") if ctx_m else ''
        processed_objects.append(data)

    return processed_objects

def process_stories(stories):
    processed = []
    year_counters = {}

    for story in stories:
        # Basic validation
        if not story.get('id') or not story.get('date'):
            continue

        # --- Generate YY-N Number ---
        year = story['date'][:4]
        if year.isdigit():
            year_counters[year] = year_counters.get(year, 0) + 1
            num = f"{year[2:]}-{year_counters[year]}"
        else:
            num = ""
        
        # --- Clean Title and Context ---
        title = story['title'].replace('\n', ' ').strip()
        ctx = story['ctx'].replace('\n', ' ').strip()
        
        final_title = title
        final_ctx = ctx

        # Special handling for newer, messy entries
        if story['id'] >= 's673' and '☄️' in title:
            full_text = title if len(title) > len(ctx) else ctx
            # Split into a title and a context. Use first sentence as title.
            match = re.match(r'(.*?[:。！？])(.*)', full_text, re.DOTALL)
            if match:
                final_title = match.group(1).strip()
                final_ctx = match.group(2).strip()
            else:
                final_title = full_text # Fallback
                final_ctx = ''
        
        # --- Standardize Type ---
        type_raw = story['type']
        if not type_raw:
            if 'clip' in ctx.lower() or 'clip' in title.lower(): type_raw = 'Clip'
            elif 'stream' in ctx.lower() or 'stream' in title.lower(): type_raw = 'Stream'
            elif 'twitter' in ctx.lower(): type_raw = 'Text'
            else: type_raw = 'Text'
        
        type_map = {
            'stream': 'Stream', 'yt': 'Stream',
            'clip': 'Clip',
            'text': 'Text', 'twitter': 'Text', 'others': 'Mixed',
            'audio': 'Audio'
        }
        final_type = type_map.get(type_raw.lower(), 'Mixed')

        # --- Extract Link ---
        final_link = story['link']
        if not final_link:
            link_match = re.search(r'https?://[\w./?=&-]+', ctx)
            if link_match:
                final_link = link_match.group(0)
                final_ctx = final_ctx.replace(final_link, '') # Remove link from context

        # Assemble the final title string with multi-language placeholders
        # We only have one language from the source, so we duplicate it.
        title_for_display = final_title.replace('|', '/') # Remove pipes from title
        full_title = f"{num} | {title_for_display} | {title_for_display} | {title_for_display}"

        processed.append({
            "id": story['id'],
            "date": story['date'],
            "phase": story['phase'],
            "side": story['side'],
            "emoji": story['emoji'],
            "title": full_title,
            "ctx": final_ctx,
            "type": final_type,
            "link": final_link,
            "img": '' # Placeholder for image
        })
    return processed

def generate_ts_file(stories):
    header = """/**
 * miComet Chronicles Data Set - Full Edition
 * Source: Parsed and cleaned from miComet_732.html
 * Last Updated: 2024-07-23
 */

export type StorySide = 'shared' | 'miko' | 'suisei' | 'others';
export type StoryType = 'Clip' | 'Stream' | 'Text' | 'Mixed' | 'Audio' | '';

export interface MiCometStory {
  id: string;
  date: string;
  phase: number;
  side: StorySide;
  emoji: string;
  title: string;
  ctx: string;
  type: StoryType;
  link?: string;
  img?: string;
}

export const MICOMET_TIMELINE: MiCometStory[] = ["""

    footer = """];"""

    story_strings = []
    for story in stories:
        # Escape single quotes in string fields
        title_esc = story['title'].replace("'", "\\'")
        ctx_esc = story['ctx'].replace("'", "\\'")
        link_esc = story['link'].replace("'", "\\'")

        story_str = (
            f"  {{\n" 
            f"    id: '{story['id']}', date: '{story['date']}', phase: {story['phase']},\n"
            f"    side: '{story['side']}', emoji: '{story['emoji']}',\n"
            f"    title: '{title_esc}',\n"
            f"    ctx: '{ctx_esc}',\n"
            f"    type: '{story['type']}', link: '{link_esc}', img: '{story['img']}'\n" 
            f"  }}"
        )
        story_strings.append(story_str)

    return header + "\n" + ",\n".join(story_strings) + "\n" + footer

if __name__ == "__main__":
    try:
        with open('miComet_732.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print("Error: miComet_732.html not found.")
        exit(1)

    script_content_match = re.search(r'<script type="text/babel">(.*?)</script>', html_content, re.DOTALL)
    if not script_content_match:
        print("Error: Could not find babel script tag.")
        exit(1)
    
    script_content = script_content_match.group(1)
    
    timeline_match = re.search(r'const TIMELINE = (\s*\[.*?\]);', script_content, re.DOTALL)
    if not timeline_match:
        print("Error: Could not find TIMELINE array in the script.")
        exit(1)
        
    js_array_string = timeline_match.group(1)

    raw_stories = clean_js_array_string(js_array_string)
    processed_stories = process_stories(raw_stories)
    
    # Add the manually corrected entry for s720
    processed_stories.append({
        "id": "s720",
        "date": "2024-01-13",
        "phase": 5,
        "side": "shared",
        "emoji": "📍",
        "title": "24-10 | 火建參觀晴空塔 | 火建、スカイツリーを見学 | ShiraKen Visits Skytree",
        "ctx": "火建成員一起去參觀晴空塔。星街一開始不敢站上透明地板，櫻巫女努力想拉她上去但拉不動。後來星街還是自己站上去了。",
        "type": "Text",
        "link": "",
        "img": "https://www.tokyo-skytree.jp/en/img/og.jpg"
    })

    # Sort stories by date
    processed_stories.sort(key=lambda x: x['date'])

    ts_file_content = generate_ts_file(processed_stories)

    # Write to a temporary file, then we will read it in the next step
    with open('src/data/miCometTimeline.ts', 'w', encoding='utf-8') as f:
        f.write(ts_file_content)
    
    print("Successfully parsed and generated src/data/miCometTimeline.ts")

