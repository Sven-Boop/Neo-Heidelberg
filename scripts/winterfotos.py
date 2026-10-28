#!/usr/bin/env python3
"""Winterfotos für die Website (Shooting „NEO - WINTERKARTE 26’“, Selina Gargiullo).

Einzige Datendatei: app/winterkarte/fotos.json (Gericht-Kennung → Bildnummer #1–#431).

  python3 scripts/winterfotos.py
      erzeugt alle fehlenden/veralteten WebP-Bilder:
        Gerichte → public/menu/w26-<kennung>.webp (längste Seite 1400 px, quality 80)
        Orte     → public/img/w26/<schlüssel>.webp (längste Seite 1600 px, quality 80)
      und meldet WebP-Bilder, die niemand mehr braucht (--aufraeumen löscht sie).

  python3 scripts/winterfotos.py --namen svens-namen.json [--ersetzen]
      spielt Svens Benennung ein. Erlaubte Formen:
        [[nr, "Gerichtname"], ...]   oder   [[nr, "kennung", "Gerichtname"], ...]
        [{"nr": 12, "gericht": "Toro Tataki"}, ...]   oder   {"12": "Toro Tataki", ...}
      Der Name wird gegen die Karte (deutsch, englisch oder Kennung) gesucht.
      Je Gericht gilt das Foto mit der kleinsten Nummer; ein schon gesetztes Winterfoto bleibt,
      außer mit --ersetzen. Unbekannte Namen werden aufgelistet und nicht übernommen.
      Fotos, die Sven als „nicht verwenden“, „Koch“, „raus“ o. ä. markiert, werden übersprungen.
      Danach ohne --namen erneut laufen lassen (oder --bauen anhängen).

Quelle der Fotos: ~/Pictures/Galerie Selina Gargiullo/NEO - WINTERKARTE 26/NNN_<id>.jpg
(oder --quelle <ordner> mit <id>.jpg bzw. NNN_<id>.jpg; Nummer → id über scripts/winter26-ids.txt).
"""
import json, os, re, sys, unicodedata
from PIL import Image, ImageOps

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOTOS = os.path.join(REPO, 'app/winterkarte/fotos.json')
KARTE = os.path.join(REPO, 'app/winterkarte/karte.json')
IDS = os.path.join(REPO, 'scripts/winter26-ids.txt')
QUELLE = os.path.expanduser('~/Pictures/Galerie Selina Gargiullo/NEO - WINTERKARTE 26')
SPERRWORTE = ('nicht verwenden', 'nicht nehmen', 'raus', 'koch', 'löschen', 'loeschen', 'weg', 'unscharf', '-', '?')


def arg(name, default=None):
    if name in sys.argv:
        i = sys.argv.index(name)
        return sys.argv[i + 1] if i + 1 < len(sys.argv) else default
    return default


def norm(s):
    s = s.lower().replace('ß', 'ss').replace('²', '2').replace('’', '').replace("'", '')
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


def gerichte_der_karte():
    k = json.load(open(KARTE))
    namen = {}
    for s in k['seiten']:
        for r in s['rubriken']:
            for it in r['items']:
                if not it.get('id') or it.get('weg'):
                    continue
                for n in (it['name'], it.get('name_en') or '', it['id'], it['id'][2:]):
                    if n:
                        namen.setdefault(norm(n), set()).add(it['id'])
    return namen, k


def quelle_fuer(nr, ids, ordner):
    pid = ids[nr - 1]
    for kandidat in (f'{nr:03d}_{pid}.jpg', f'{pid}.jpg'):
        p = os.path.join(ordner, kandidat)
        if os.path.exists(p):
            return p
    raise SystemExit(f'Foto #{nr} ({pid}) fehlt in {ordner}')


def webp(src, ziel, laenge):
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    im.thumbnail((laenge, laenge), Image.LANCZOS)
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    tmp = ziel + '.tmp'
    im.save(tmp, 'WEBP', quality=80, method=6)
    os.replace(tmp, ziel)


def bauen(daten, ordner):
    ids = open(IDS).read().split()
    stand_datei = os.path.join(REPO, 'scripts/.winterfotos-stand.json')
    try:
        stand = json.load(open(stand_datei))
    except Exception:
        stand = {}
    gebraucht = set()
    neu = 0
    auftraege = []
    for kid, g in daten['gerichte'].items():
        if g.get('nr'):
            auftraege.append((g['nr'], os.path.join(REPO, 'public/menu', 'w26-' + kid[2:] + '.webp'), 1400))
    for key, o in daten.get('orte', {}).items():
        auftraege.append((o['nr'], os.path.join(REPO, 'public/img/w26', key + '.webp'), 1600))
    for nr, ziel, laenge in auftraege:
        rel = os.path.relpath(ziel, REPO)
        gebraucht.add(rel)
        if stand.get(rel) == nr and os.path.exists(ziel):
            continue
        webp(quelle_fuer(nr, ids, ordner), ziel, laenge)
        stand[rel] = nr
        neu += 1
        print(f'  #{nr:<4} → {rel} ({os.path.getsize(ziel)//1024} KB)')
    stand = {k: v for k, v in stand.items() if k in gebraucht}
    json.dump(stand, open(stand_datei, 'w'), indent=1, sort_keys=True)
    print(f'{neu} Bilder neu erzeugt, {len(auftraege)} insgesamt.')
    # Verwaiste Winterbilder
    waisen = []
    for ordnerrel, muster in (('public/menu', r'^w26-.*\.webp$'), ('public/img/w26', r'.*\.webp$')):
        d = os.path.join(REPO, ordnerrel)
        if os.path.isdir(d):
            for f in sorted(os.listdir(d)):
                rel = os.path.join(ordnerrel, f)
                if re.match(muster, f) and rel not in gebraucht:
                    waisen.append(rel)
    if waisen:
        print('Nicht mehr gebraucht:', *waisen, sep='\n  ')
        if '--aufraeumen' in sys.argv:
            for w in waisen:
                os.remove(os.path.join(REPO, w))
            print('gelöscht.')


def namen_einspielen(daten, datei):
    roh = json.load(open(datei))
    paare = []
    if isinstance(roh, dict):
        roh = [[int(k), v] for k, v in roh.items()]
    for e in roh:
        if isinstance(e, dict):
            paare.append((int(e.get('nr') or e.get('nummer')), e.get('id') or e.get('kennung'), e.get('gericht') or e.get('name') or ''))
        elif len(e) >= 3:
            paare.append((int(e[0]), e[1], e[2]))
        else:
            paare.append((int(e[0]), None, e[1]))
    namen, _ = gerichte_der_karte()
    ersetzen = '--ersetzen' in sys.argv
    unbekannt, mehrdeutig, je = [], [], {}
    for nr, kid, name in sorted(paare):
        text = (name or '').strip()
        if not text and not kid:
            continue
        if any(norm(text) == norm(w) or norm(text).startswith(norm(w) + ' ') for w in SPERRWORTE if norm(w)) or text in ('-', '?'):
            continue
        treffer = set()
        if kid:
            treffer = set(namen.get(norm(kid), set()))
        if not treffer:
            treffer = set(namen.get(norm(text), set()))
        if len(treffer) != 1:
            (mehrdeutig if treffer else unbekannt).append((nr, text, sorted(treffer)))
            continue
        je.setdefault(treffer.pop(), []).append(nr)
    karte_namen = {it['id']: it['name'] for s in json.load(open(KARTE))['seiten'] for r in s['rubriken'] for it in r['items'] if it.get('id')}
    geaendert = 0
    for kid, nrs in je.items():
        alt = daten['gerichte'].get(kid, {})
        if alt.get('nr') and not ersetzen:
            if alt['nr'] not in nrs:
                print(f'  {karte_namen[kid]}: Winterfoto #{alt["nr"]} bleibt (Sven: {nrs}; --ersetzen nimmt #{nrs[0]})')
            daten['gerichte'][kid]['weitere'] = sorted(set(nrs) - {alt['nr']})
            continue
        daten['gerichte'][kid] = {'nr': nrs[0], 'gericht': karte_namen[kid]}
        if len(nrs) > 1:
            daten['gerichte'][kid]['weitere'] = nrs[1:]
        geaendert += 1
        print(f'  {karte_namen[kid]} ← #{nrs[0]}' + (f' (weitere: {nrs[1:]})' if len(nrs) > 1 else ''))
    # Reihenfolge wie in der Karte
    reihenfolge = list(karte_namen)
    daten['gerichte'] = {k: daten['gerichte'][k] for k in sorted(daten['gerichte'], key=lambda k: reihenfolge.index(k) if k in reihenfolge else 999)}
    json.dump(daten, open(FOTOS, 'w'), ensure_ascii=False, indent=1)
    print(f'{geaendert} Gerichte bekommen ein Winterfoto.')
    for titel, liste in (('Unbekannte Namen (nicht übernommen)', unbekannt), ('Mehrdeutige Namen (nicht übernommen)', mehrdeutig)):
        if liste:
            print(titel + ':')
            for nr, text, t in liste:
                print(f'  #{nr}: „{text}“' + (f' → {t}' if t else ''))
    ohne = [karte_namen[k] for k in karte_namen if k not in daten['gerichte']]
    print(f'Ohne Foto ({len(ohne)}):', ', '.join(ohne))


if __name__ == '__main__':
    daten = json.load(open(FOTOS))
    if arg('--namen'):
        namen_einspielen(daten, arg('--namen'))
        if '--bauen' not in sys.argv:
            sys.exit(0)
        daten = json.load(open(FOTOS))
    bauen(daten, arg('--quelle', QUELLE))
