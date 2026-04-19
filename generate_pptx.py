"""
Generate Recovera_Pitch.pptx — clean clinical PowerPoint matching the deck visual system.
White / warm-grey backgrounds, Inter font, #1F4D2E green accent.
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import copy

# ── Colours ──────────────────────────────────────────────────────────────────
WHITE      = RGBColor(0xFF, 0xFF, 0xFF)
WARM_GREY  = RGBColor(0xF8, 0xF7, 0xF5)
INK        = RGBColor(0x0D, 0x0D, 0x0D)
INK_MID    = RGBColor(0x3D, 0x3D, 0x3D)
INK_MUTE   = RGBColor(0x6B, 0x6B, 0x6B)
INK_LIGHT  = RGBColor(0x9A, 0x9A, 0x9A)
RULE       = RGBColor(0xE8, 0xE6, 0xE3)
GREEN      = RGBColor(0x1F, 0x4D, 0x2E)
RED        = RGBColor(0xB9, 0x43, 0x2C)

# ── Slide dimensions: 16:9 widescreen (13.33 × 7.5 in) ──────────────────────
W = Inches(13.33)
H = Inches(7.5)

prs = Presentation()
prs.slide_width  = W
prs.slide_height = H

BLANK = prs.slide_layouts[6]   # completely blank layout

# ── Helper functions ─────────────────────────────────────────────────────────

def add_slide(bg_color=WHITE):
    slide = prs.slides.add_slide(BLANK)
    # Fill background
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = bg_color
    return slide


def txb(slide, text, l, t, w, h,
        size=18, bold=False, italic=False, color=INK,
        align=PP_ALIGN.LEFT, wrap=True, line_spacing=None):
    """Add a text box. l/t/w/h in Inches."""
    from pptx.util import Inches, Pt
    box = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf  = box.text_frame
    tf.word_wrap = wrap
    p   = tf.paragraphs[0]
    p.alignment = align
    if line_spacing:
        from pptx.util import Pt
        from pptx.oxml.ns import qn
        import lxml.etree as etree
        pPr = p._pPr if p._pPr is not None else p._p.get_or_add_pPr()
        lnSpc = etree.SubElement(pPr, qn('a:lnSpc'))
        spcPts = etree.SubElement(lnSpc, qn('a:spcPts'))
        spcPts.set('val', str(int(line_spacing * 100)))
    run = p.add_run()
    run.text = text
    run.font.name  = 'Inter'
    run.font.size  = Pt(size)
    run.font.bold  = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return box


def txb_multi(slide, lines, l, t, w, h,
              size=18, bold=False, italic=False, color=INK,
              align=PP_ALIGN.LEFT, line_gap_pt=6):
    """
    Add a text box with multiple lines, each line a (text, bold, italic, color) tuple
    or a plain string.  line_gap_pt adds space after each paragraph.
    """
    from pptx.util import Inches, Pt
    from pptx.oxml.ns import qn
    import lxml.etree as etree

    box = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf  = box.text_frame
    tf.word_wrap = True

    for i, line in enumerate(lines):
        if isinstance(line, str):
            txt, b, it, col = line, bold, italic, color
        else:
            # tuple: (text, bold, italic, color)  — any subset is fine
            parts = line + (None,) * (4 - len(line))
            txt  = parts[0]
            b    = parts[1] if parts[1] is not None else bold
            it   = parts[2] if parts[2] is not None else italic
            col  = parts[3] if parts[3] is not None else color

        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if line_gap_pt and i < len(lines) - 1:
            pPr = p._p.get_or_add_pPr()
            spcAft = etree.SubElement(pPr, qn('a:spcAft'))
            spcPts = etree.SubElement(spcAft, qn('a:spcPts'))
            spcPts.set('val', str(int(line_gap_pt * 100)))

        run = p.add_run()
        run.text = txt
        run.font.name   = 'Inter'
        run.font.size   = Pt(size)
        run.font.bold   = b
        run.font.italic = it
        run.font.color.rgb = col

    return box


def rule_shape(slide, l, t, w, h=0.005, color=RULE):
    """Thin horizontal rule."""
    from pptx.util import Inches
    from pptx.enum.shapes import MSO_SHAPE_TYPE
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        Inches(l), Inches(t), Inches(w), Inches(h)
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()  # no border
    return shape


def label(slide, text, l, t, w=10, align=PP_ALIGN.LEFT):
    return txb(slide, text, l, t, w, 0.3,
               size=9, bold=False, color=INK_LIGHT, align=align)


def accent_rule(slide, l, t, width=0.42, color=GREEN):
    """Short thick accent rule (green)."""
    shape = slide.shapes.add_shape(1, Inches(l), Inches(t), Inches(width), Inches(0.025))
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 00 — WHAT IT IS
# ─────────────────────────────────────────────────────────────────────────────
s0 = add_slide(WHITE)

label(s0, "MOVEMENT INTELLIGENCE  ·  PHYSIOTHERAPY", 1.5, 1.6, 10, align=PP_ALIGN.CENTER)

txb_multi(s0, [
    ("Recovera shows physios", True, False, INK),
    ("what patients did at home", True, False, INK),
    ("before every session.", True, False, GREEN),
], l=1.5, t=2.1, w=10.33, h=2.2, size=36, align=PP_ALIGN.CENTER, line_gap_pt=4)

rule_shape(s0, 6.17, 4.5, 1.0)   # centred thin rule

txb_multi(s0, [
    ("Not AI replacing the clinician.", False, False, INK_MUTE),
    ("AI giving the clinician data she has never had.", False, False, INK_MUTE),
], l=2.5, t=4.7, w=8.33, h=0.9, size=16, align=PP_ALIGN.CENTER, line_gap_pt=4)

txb(s0, "recovera", 5.8, 5.8, 1.8, 0.4,
    size=14, bold=True, color=INK, align=PP_ALIGN.CENTER)

label(s0, "NOVAUCD 2026", 5.5, 7.0, 2.33, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 01 — THE PATIENT
# ─────────────────────────────────────────────────────────────────────────────
s1 = add_slide(WARM_GREY)

# Left column placeholder (phone)
ph = s1.shapes.add_shape(1, Inches(0.6), Inches(0.8), Inches(3.8), Inches(5.9))
ph.fill.solid()
ph.fill.fore_color.rgb = RGBColor(0xE8, 0xE6, 0xE3)
ph.line.color.rgb = RULE
txb(s1, "Patient App\n(live demo in browser)", 0.6, 3.1, 3.8, 1.0,
    size=11, color=INK_LIGHT, align=PP_ALIGN.CENTER)

# Vertical divider
rule_shape(s1, 4.9, 0.8, 0.007, h=5.9, color=RULE)

# Right text column
label(s1, "THE PATIENT", 5.2, 1.1, 7.5)

txb_multi(s1, [
    ("Conor does his session.", True, False, INK),
    ("At home. Twelve minutes.", True, False, INK),
], l=5.2, t=1.55, w=7.7, h=1.4, size=28, line_gap_pt=3)

accent_rule(s1, 5.2, 3.1)

txb_multi(s1, [
    "The phone reads his movement — not video.",
    "Form, symmetry, compensation patterns.",
    "Report sent to his physio automatically.",
], l=5.2, t=3.28, w=7.7, h=1.5, size=14, color=INK_MUTE, line_gap_pt=6)

txb(s1, "Camera reading movement in real time.", 5.2, 5.0, 7.7, 0.5,
    size=13, bold=True, color=GREEN)

label(s1, "CONOR MURPHY  ·  WEEK 8  ·  ACL RECONSTRUCTION  ·  DUBLIN", 5.2, 7.05, 8.0)


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 02 — THE PHYSIO
# ─────────────────────────────────────────────────────────────────────────────
s2 = add_slide(WARM_GREY)

# Left text column
label(s2, "THE PHYSIO", 0.5, 1.1, 4.5)

txb_multi(s2, [
    ("She opens the dashboard.", True, False, INK),
    ("Already knows everything.", True, False, INK),
], l=0.5, t=1.55, w=4.5, h=1.5, size=24, line_gap_pt=3)

accent_rule(s2, 0.5, 3.1)

txb_multi(s2, [
    "Who did their exercises.",
    "Who's in pain.",
    "Who needs attention first.",
], l=0.5, t=3.28, w=4.5, h=1.4, size=13, color=INK_MUTE, line_gap_pt=8)

txb(s2, "Before a single patient walks in.", 0.5, 5.0, 4.5, 0.5,
    size=13, bold=True, color=GREEN)

label(s2, "DR. ÁINE O'BRIEN  ·  MISCP  ·  DUBLIN PHYSIO CO", 0.5, 7.05, 5.5)

# Vertical divider
rule_shape(s2, 5.3, 0.8, 0.007, h=5.9, color=RULE)

# Right column — dashboard placeholder
ph2 = s2.shapes.add_shape(1, Inches(5.55), Inches(0.55), Inches(7.3), Inches(6.2))
ph2.fill.solid()
ph2.fill.fore_color.rgb = RGBColor(0xE8, 0xE6, 0xE3)
ph2.line.color.rgb = RULE
txb(s2, "Clinician Dashboard\n(live demo in browser)", 5.55, 3.3, 7.3, 1.0,
    size=11, color=INK_LIGHT, align=PP_ALIGN.CENTER)

# Annotations
txb(s2, "← 8 patients · briefs ready", 5.55, 1.6, 3.5, 0.35, size=11, color=INK_MID)
txb(s2, "← 3 flagged by the AI", 5.55, 2.6, 3.0, 0.35, size=11, color=RED)
txb(s2, "← Conor · 4 weeks ahead", 5.55, 3.6, 3.0, 0.35, size=11, color=GREEN)


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 03 — THE PROBLEM
# ─────────────────────────────────────────────────────────────────────────────
s3 = add_slide(WHITE)

# Vertical divider (centre)
rule_shape(s3, 6.42, 0.9, 0.007, h=5.7, color=RULE)

# LEFT COLUMN
label(s3, "WITHOUT RECOVERA", 0.8, 0.9, 5.2)

txb(s3, "18", 0.8, 1.25, 5.2, 3.0,
    size=120, bold=True, color=INK)
txb(s3, "minutes", 0.8, 4.05, 5.2, 0.55,
    size=22, color=INK_MUTE)

txb_multi(s3, [
    "spent asking the patient",
    "to remember what happened",
    "at home. Every session.",
], l=0.8, t=4.7, w=5.3, h=1.0, size=14, color=INK_MUTE, line_gap_pt=4)

# Quote
quote_box = s3.shapes.add_textbox(Inches(0.8), Inches(5.9), Inches(5.2), Inches(1.2))
qt = quote_box.text_frame
qt.word_wrap = True
qp = qt.paragraphs[0]
qr = qp.add_run()
qr.text = ('"The physio is the most skilled person in the room. '
           'She spends the first third of every appointment '
           'on the weakest possible data."')
qr.font.name   = 'Inter'
qr.font.size   = Pt(11)
qr.font.italic = True
qr.font.color.rgb = INK_LIGHT

# RIGHT COLUMN
label(s3, "WITH RECOVERA", 7.0, 0.9, 5.8, align=PP_ALIGN.LEFT)
# Make label green
# (re-add with green color)
s3.shapes[-1].text_frame.paragraphs[0].runs[0].font.color.rgb = GREEN

txb(s3, "0", 7.0, 1.25, 5.5, 3.0,
    size=120, bold=True, color=GREEN)
txb(s3, "minutes", 7.0, 4.05, 5.5, 0.55,
    size=22, color=GREEN)

txb_multi(s3, [
    "spent on reconstruction.",
    "The report arrived before",
    "she walked in.",
], l=7.0, t=4.7, w=5.8, h=1.0, size=14, color=INK_MID, line_gap_pt=4)

txb_multi(s3, [
    ("The HSE and NHS don't lack physios.", True, False, INK),
    ("They lack physio time.", True, False, INK),
    ("Recovera gives it back.", True, False, GREEN),
], l=7.0, t=5.9, w=5.8, h=1.1, size=13, line_gap_pt=4)

label(s3, "SOURCE  ·  RECOVERA PHYSIO INTERVIEWS  ·  DUBLIN  ·  Q4 2025  ·  N=12",
      2.0, 7.1, 9.33, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 04 — WHY IT MATTERS
# ─────────────────────────────────────────────────────────────────────────────
s4 = add_slide(WHITE)

label(s4, "WHY IT MATTERS", 1.5, 0.65, 10, align=PP_ALIGN.CENTER)

txb(s4, "The physio gets those minutes back.", 1.2, 1.1, 10.93, 0.8,
    size=34, bold=True, color=INK, align=PP_ALIGN.CENTER)
txb(s4, "Every session. Every patient.", 1.2, 1.85, 10.93, 0.8,
    size=34, bold=True, color=GREEN, align=PP_ALIGN.CENTER)

rule_shape(s4, 6.17, 2.85, 1.0)

txb(s4, "That is not an efficiency improvement.", 1.5, 3.05, 10.33, 0.55,
    size=18, color=INK_MUTE, align=PP_ALIGN.CENTER)

txb_multi(s4, [
    ("That is how many more people", True, False, INK),
    ("a physio can actually help.", True, False, INK),
], l=1.5, t=3.75, w=10.33, h=1.0, size=22, align=PP_ALIGN.CENTER, line_gap_pt=3)

txb_multi(s4, [
    ("The HSE and NHS waiting lists are not a shortage of physios.", False, False, INK_MUTE),
    ("They are a shortage of physio time.", False, True, INK),
], l=1.5, t=5.0, w=10.33, h=0.9, size=15, align=PP_ALIGN.CENTER, line_gap_pt=5)

txb(s4, "Recovera fixes the time problem.", 1.5, 6.2, 10.33, 0.55,
    size=20, bold=True, color=GREEN, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 05 — WHY RECOVERA WINS
# ─────────────────────────────────────────────────────────────────────────────
s5 = add_slide(WARM_GREY)

label(s5, "WHY RECOVERA WINS", 1.5, 0.55, 10, align=PP_ALIGN.CENTER)

# Three companies row
companies = [
    ("Hinge Health  $6B",  "Routes around the clinician.", 1.0),
    ("Sword Health  $4B",  "Replaces the physio.",         4.67),
    ("Kaia Health  $123M", "No clinical integration.",     8.33),
]
for name, flaw, left in companies:
    txb(s5, name, left, 1.1, 3.3, 0.45, size=14, bold=True, color=INK, align=PP_ALIGN.CENTER)
    txb(s5, flaw, left, 1.52, 3.3, 0.4, size=11, color=INK_LIGHT, align=PP_ALIGN.CENTER)

rule_shape(s5, 3.17, 2.1, 7.0)

txb(s5, "Every one of them proved the market.", 1.5, 2.3, 10.33, 0.5,
    size=18, color=INK_MUTE, align=PP_ALIGN.CENTER)
txb(s5, "Every one of them got the architecture wrong.", 1.5, 2.8, 10.33, 0.5,
    size=18, color=INK_MUTE, align=PP_ALIGN.CENTER)

txb(s5, "Movement is individual.", 1.5, 3.55, 10.33, 0.65,
    size=28, bold=True, color=INK, align=PP_ALIGN.CENTER)
txb(s5, "The same exercise that heals one patient harms another.", 1.5, 4.2, 10.33, 0.55,
    size=18, color=INK_MUTE, align=PP_ALIGN.CENTER)
txb(s5, "Generic AI advice at clinical scale breaks down.", 1.5, 4.73, 10.33, 0.55,
    size=18, color=INK_MUTE, align=PP_ALIGN.CENTER)

txb(s5, "Recovera puts the data in the expert's hands.", 1.5, 5.6, 10.33, 0.55,
    size=20, bold=True, color=GREEN, align=PP_ALIGN.CENTER)
txb(s5, "The physio decides. Always.", 1.5, 6.15, 10.33, 0.5,
    size=16, bold=True, color=GREEN, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────────────────────────────────────
# SLIDE 06 — THE ASK  ("Back us.")
# ─────────────────────────────────────────────────────────────────────────────
s6 = add_slide(WHITE)

txb(s6, "€500B+ global movement health market.", 0.8, 0.55, 11.73, 0.75,
    size=28, bold=True, color=INK, align=PP_ALIGN.CENTER)
txb(s6, "No system of record for what happens between sessions.", 0.8, 1.28, 11.73, 0.55,
    size=18, color=INK_MUTE, align=PP_ALIGN.CENTER)
txb(s6, "Anywhere.", 0.8, 1.82, 11.73, 0.5,
    size=18, bold=True, color=GREEN, align=PP_ALIGN.CENTER)

rule_shape(s6, 6.17, 2.5, 1.0)

label(s6, "WHERE WE ARE", 1.5, 2.72, 10, align=PP_ALIGN.CENTER)

items = [
    "·  Functional demo — clinician dashboard and patient app",
    "·  CORU-registered physiotherapist as clinical architect",
    "·  Three pilot clinics recruited for June",
    "·  Seeking CTO to build the production system",
]
txb_multi(s6, items, 2.0, 3.1, 9.33, 1.6,
          size=13, color=INK_MID, align=PP_ALIGN.CENTER, line_gap_pt=6)

txb(s6, "We need NovaUCD.", 1.5, 4.9, 10.33, 0.75,
    size=32, bold=True, color=INK, align=PP_ALIGN.CENTER)
txb(s6, "90 days. Three clinics. One metric.", 1.5, 5.6, 10.33, 0.5,
    size=17, color=INK_MUTE, align=PP_ALIGN.CENTER)
txb_multi(s6, [
    ("A physio saying — unprompted —", False, False, INK_MUTE),
    ('"I cannot imagine going back."', True, False, INK),
], l=1.5, t=6.07, w=10.33, h=0.6, size=16, align=PP_ALIGN.CENTER, line_gap_pt=2)

txb(s6, "Back us.", 1.5, 6.75, 10.33, 0.6,
    size=38, bold=True, color=GREEN, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────────────────────────────────────
# Save
# ─────────────────────────────────────────────────────────────────────────────
out = "/mnt/user-data/outputs/Recovera_Pitch.pptx"
prs.save(out)
print(f"Saved → {out}")
