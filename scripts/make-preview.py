"""Genera el fragmento HTML de la vista previa publicada: python3 scripts/make-preview.py <salida.html>
Requiere: VITE_MEMORY=1 npx vite build -c vite.artifact.config.ts"""
import re, sys
h = open('dist-artifact/index.html').read()
js = re.search(r'<script type="module"[^>]*>(.*?)</script>', h, re.S).group(1)
css = re.search(r'<style[^>]*>(.*?)</style>', h, re.S).group(1)
fonts = ''.join(re.findall(r'<link[^>]*fonts\.googleapis\.com[^>]*>', h))
assert '</script' not in js.lower()
open(sys.argv[1], 'w').write(f'''<title>MDS Clientes</title>
<meta name="description" content="App de clientes de Inversiones MDS">
<link rel="preconnect" href="https://fonts.googleapis.com">
{fonts}
<style>{css}
html,body{{height:auto}}</style>
<div id="root"></div>
<script type="module">{js}</script>
''')
