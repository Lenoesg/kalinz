#!/usr/bin/env python3
"""Minify assets/styles.css lalu sisipkan ke <b:skin> pada template.xml.
Pemakaian: python3 build_skin.py <project_dir> [output_xml]
Syarat: npx clean-css-cli (npm i -D clean-css-cli)."""
import re, subprocess, sys, pathlib
root = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else root/'template.min.xml'
css = (root/'assets/styles.css').read_text(encoding='utf-8-sig').replace('\r', '')
MARK = '/*! INI ADALAH POTONGAN KODE CSS DARI BLOK <b:skin> di template.xml */'
skin_src = css.split(MARK, 1)[1]            # bagian setelah penanda = isi b:skin (tanpa body#layout)
mini = subprocess.run(['npx', 'clean-css-cli', '-O1', 'specialComments:1'], input=skin_src,
                      capture_output=True, text=True, check=True).stdout
xml = (root/'template.xml').read_text(encoding='utf-8-sig')
s = xml.index('<b:skin><![CDATA['); e = xml.index(']]></b:skin>')
head = xml[s:e]
keep = head[:head.index('Variable end */') + len('Variable end */')]   # komentar Variable + metadata tema
rootblock = re.search(r':root\s*\{.*?\n\}', head, re.S).group(0)      # blok :root berisi $(token)
assert ']]>' not in mini
new = xml[:s] + keep + '\n' + rootblock + '\n' + mini + '\n' + xml[e:]
out.write_text(new, encoding='utf-8')
print('skin before', e - s, 'after', len(keep) + len(rootblock) + len(mini), 'bytes')
