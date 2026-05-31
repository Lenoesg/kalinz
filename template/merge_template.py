#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Template Merger - Combine template source files into final template.xml
Usage: python merge_template.py
"""

import os
from pathlib import Path
from datetime import datetime

def read_file(file_path):
    """Baca file dengan encoding UTF-8"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"⚠️  File tidak ditemukan: {file_path}")
        return ""

def merge_templates():
    """Merge semua template files menjadi satu"""
    
    template_dir = Path(__file__).parent
    output_file = template_dir.parent / "template.xml"
    backup_dir = template_dir.parent / "backup"
    
    # Buat backup
    if output_file.exists():
        backup_name = f"template-{datetime.now().strftime('%Y%m%d-%H%M%S')}.xml"
        backup_file = backup_dir / backup_name
        backup_dir.mkdir(exist_ok=True)
        
        import shutil
        shutil.copy2(output_file, backup_file)
        print(f"✅ Backup dibuat: {backup_name}")
    
    # Urutan file untuk merge
    merge_order = [
        # XML Declaration & HTML opening
        "xml_declaration",
        
        # HEAD section
        "head/meta.xml",
        "head/title.xml",
        "head/social.xml",
        "head/preconnect.xml",
        "head/analytics.xml",
        "head/layout-skin.xml",
        "config/template-settings.xml",
        "config/custom-css.xml",
        
        # STYLES section
        "styles/variables.xml",
        "styles/reset.css",
        "styles/base.css",
        "styles/header.css",
        "styles/nav.css",
        "styles/content.css",
        "styles/sidebar.css",
        "styles/widgets.css",
        "styles/comments.css",
        "styles/footer.css",
        "styles/responsive.css",
        
        # BODY CONTENT
        "widgets/header-widget.xml",
        "snippets/filter-message.xml",
        "snippets/breadcrumbs.xml",
        "snippets/post-title.xml",
        "snippets/post-info.xml",
        "snippets/post-snippet.xml",
        "snippets/post-body.xml",
        "snippets/read-more.xml",
        "snippets/share-buttons.xml",
        "snippets/author-profile.xml",
        "snippets/pagination.xml",
        "snippets/error-message.xml",
        
        # SIDEBAR WIDGETS
        "widgets/featured-post-widget.xml",
        "widgets/blog-widget.xml",
        "widgets/popular-post-widget.xml",
        "widgets/profile-widget.xml",
        "widgets/label-widget.xml",
        "widgets/page-list-widget.xml",
        "widgets/archive-widget.xml",
        "widgets/subscribe-widget.xml",
        "widgets/stats-widget.xml",
        
        # SCRIPTS
        "scripts/defer.js",
        "scripts/menu.js",
        "scripts/search.js",
        "scripts/toc.js",
        "scripts/related-post.js",
        "scripts/infinite-scroll.js",
        "scripts/lazyload.js",
        "scripts/ads.js",
        "config/custom-js-footer.xml",
        
        # Closing tags
        "xml_closing",
    ]
    
    print("🔄 Mulai merge template files...")
    print(f"📁 Template directory: {template_dir}")
    print(f"📄 Output file: {output_file}\n")
    
    content = []
    
    for item in merge_order:
        if item == "xml_declaration":
            content.append('<?xml version="1.0" encoding="UTF-8"?>')
            content.append('<!DOCTYPE html>')
            content.append('<html b:css=\'false\' b:defaultwidgetversion=\'2\' b:layoutsVersion=\'3\'')
            content.append('    expr:dir=\'data:blog.languageDirection\' expr:lang=\'data:blog.locale\'')
            content.append('    xmlns=\'http://www.w3.org/1999/xhtml\' xmlns:b=\'http://www.google.com/2005/gml/b\'')
            content.append('    xmlns:data=\'http://www.google.com/2005/gml/data\'')
            content.append('    xmlns:expr=\'http://www.google.com/2005/gml/expr\'>')
            content.append('  <head>')
            print("✏️  Menambahkan: XML Declaration")
        
        elif item == "xml_closing":
            content.append('  </head>')
            content.append('  <body expr:class=\'data:view.bodyClass\'>')
            content.append('  </body>')
            content.append('</html>')
            print("✏️  Menambahkan: XML Closing Tags")
        
        else:
            file_path = template_dir / item
            if file_path.exists():
                file_content = read_file(file_path)
                if file_content.strip():
                    content.append(file_content)
                    print(f"✏️  Menambahkan: {item}")
                else:
                    print(f"⚠️  File kosong: {item}")
            else:
                print(f"❌ File tidak ditemukan: {item}")
    
    # Tulis ke output file
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(content))
        
        file_size = output_file.stat().st_size / 1024  # KB
        print(f"\n✅ Merge berhasil!")
        print(f"📊 File size: {file_size:.2f} KB")
        print(f"✨ File output: {output_file}")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error saat menulis file: {e}")
        return False

if __name__ == "__main__":
    merge_templates()
