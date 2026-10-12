import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_deck(lang="sq"):
    is_sq = (lang == "sq")
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # blank layout

    # Color Palette
    COLOR_BG = RGBColor(248, 250, 252) # #f8fafc
    COLOR_CARD = RGBColor(255, 255, 255)
    COLOR_BORDER = RGBColor(226, 232, 240) # #e2e8f0
    COLOR_PRIMARY = RGBColor(15, 23, 42) # #0f172a
    COLOR_SECONDARY = RGBColor(51, 65, 85) # #334155
    COLOR_MUTED = RGBColor(100, 116, 139) # #64748b
    COLOR_BLUE = RGBColor(29, 78, 216) # #1d4ed8
    COLOR_GREEN = RGBColor(4, 120, 87) # #047857
    COLOR_SUBTLE = RGBColor(241, 245, 249) # #f1f5f9

    logo_path = os.path.join(os.path.dirname(__file__), "public", "cat_logo_clean.jpg")
    if not os.path.exists(logo_path):
        logo_path = os.path.join(os.path.dirname(__file__), "cat_logo_clean.jpg")

    def add_base_slide(slide_title, slide_category):
        slide = prs.slides.add_slide(blank_layout)
        
        # Background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()

        # Slide Card
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.6), Inches(11.733), Inches(6.3))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER
        card.line.width = Pt(1.5)

        # Category Badge
        cat_box = slide.shapes.add_textbox(Inches(1.2), Inches(0.9), Inches(10.5), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = slide_category.upper()
        p_cat.font.name = "Segoe UI"
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = COLOR_BLUE

        # Title
        t_box = slide.shapes.add_textbox(Inches(1.2), Inches(1.25), Inches(10.5), Inches(0.7))
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = slide_title
        p_t.font.name = "Segoe UI"
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_PRIMARY

        # Footer
        footer_box = slide.shapes.add_textbox(Inches(1.2), Inches(6.4), Inches(10.9), Inches(0.35))
        tf_f = footer_box.text_frame
        p_f = tf_f.paragraphs[0]
        p_f.text = f"SHTEGU.APP • {('Përgatitur për Driton Hapçiu • Prishtinë 2026' if is_sq else 'Prepared for Driton Hapçiu • Prishtina Pilot 2026')}"
        p_f.font.name = "Segoe UI"
        p_f.font.size = Pt(9.5)
        p_f.font.color.rgb = COLOR_MUTED

        return slide

    def add_card(slide, left, top, width, height, title, body, bg_color=COLOR_CARD, border_color=COLOR_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)

        tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), height - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.name = "Segoe UI"
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_PRIMARY
        p1.space_after = Pt(6)

        p2 = tf.add_paragraph()
        p2.text = body
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(11)
        p2.font.color.rgb = COLOR_SECONDARY
        return card

    # ==================== SLIDE 1: THE URBAN ARBITRAGE ====================
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_BG
    bg1.line.fill.background()

    card1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.6), Inches(11.733), Inches(6.3))
    card1.fill.solid()
    card1.fill.fore_color.rgb = COLOR_CARD
    card1.line.color.rgb = COLOR_BORDER
    card1.line.width = Pt(1.5)

    if os.path.exists(logo_path):
        s1.shapes.add_picture(logo_path, Inches(1.2), Inches(1.0), Inches(1.3), Inches(1.3))

    h1_box = s1.shapes.add_textbox(Inches(2.7), Inches(0.95), Inches(9.2), Inches(1.4))
    tf1 = h1_box.text_frame
    tf1.word_wrap = True
    p_badge = tf1.paragraphs[0]
    p_badge.text = "SHTEGU.APP • " + ("PREZANTIM MASTER PËR INVESTITORIN • PRISHTINË 2026" if is_sq else "MASTER INVESTOR BRIEFING • PRISHTINA 2026")
    p_badge.font.name = "Segoe UI"
    p_badge.font.size = Pt(10)
    p_badge.font.bold = True
    p_badge.font.color.rgb = COLOR_BLUE

    p_title1 = tf1.add_paragraph()
    p_title1.text = "Ne Nuk Ndërtojmë Vendparkime. Ne Monetizojmë Asfaltin e Bllokuar." if is_sq else "We Don't Build Parking Lots. We Monetize Trapped Asphalt."
    p_title1.font.name = "Segoe UI"
    p_title1.font.size = Pt(22)
    p_title1.font.bold = True
    p_title1.font.color.rgb = COLOR_PRIMARY

    # Reality & Solution Boxes
    add_card(s1, Inches(1.2), Inches(2.55), Inches(5.3), Inches(1.85),
             "Arbitrazhi Urban në Prishtinë" if is_sq else "The Urban Arbitrage in Prishtina",
             "Në qendrat komerciale (Pejton, Qendër, Qafë), shoferët sillen 20–40 minuta duke djegur karburant. Njëkohësisht, qindra hyrje private dhe oborre rrinë krejt bosh pas drynave gjatë orarit të punës." if is_sq
             else "In Prishtina commercial centers (Pejton, Qendër, Qafa), drivers circle 20–40 minutes per trip. Simultaneously, hundreds of private driveways and clinic spots sit idle behind manual padlocks.")

    add_card(s1, Inches(6.8), Inches(2.55), Inches(5.3), Inches(1.85),
             "Zgjidhja Autonome Shtegu" if is_sq else "The Shtegu Solution",
             "Barriera inteligjente me energji diellore dhe Bluetooth (BLE) të montuara direkt mbi beton. Shoferët ulin barrierën me 1 klikim — me zero punime civile, zero gërmime dhe zero leje komunale." if is_sq
             else "Surface-mounted, solar-powered BLE smart barriers deployed directly onto concrete. Drivers discover, reserve, and lower barriers with a single tap — zero civil works, zero trenching, zero permits.",
             bg_color=COLOR_SUBTLE)

    # 4 Stat Boxes (Highlighting €60 Net CapEx and 50 Days Payback!)
    stats = [
        ("Capex Neto / Vend" if is_sq else "Net CapEx / Stall", "€60", "€110 kosto - €50 tarifë montimi" if is_sq else "€110 landed - €50 host fee", COLOR_PRIMARY),
        ("FCF Neto / Muaj" if is_sq else "Net FCF / Stall", "€35.90", "Pas 70% ndarjeje me pronarin" if is_sq else "After 70% host rev-share", COLOR_GREEN),
        ("Kthimi i Përshpejtuar" if is_sq else "Accelerated Payback", "50 Ditë" if is_sq else "50 Days", "~1.67 Muaj deri në kthim" if is_sq else "~1.67 Months break-even", COLOR_BLUE),
        ("Alokimi Angel" if is_sq else "Angel Allocation", "€25k – €30k", "15.0% Common Equity", COLOR_PRIMARY)
    ]
    for idx, (label, val, sub, col) in enumerate(stats):
        box_left = Inches(1.2) + Inches(idx * 2.8)
        sb = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, box_left, Inches(4.65), Inches(2.6), Inches(1.4))
        sb.fill.solid()
        sb.fill.fore_color.rgb = COLOR_CARD
        sb.line.color.rgb = COLOR_BORDER
        sb.line.width = Pt(1)

        tb_s = s1.shapes.add_textbox(box_left + Inches(0.15), Inches(4.75), Inches(2.3), Inches(1.2))
        tfs = tb_s.text_frame
        tfs.word_wrap = True

        ps1 = tfs.paragraphs[0]
        ps1.text = label.upper()
        ps1.font.size = Pt(8.5)
        ps1.font.bold = True
        ps1.font.color.rgb = COLOR_MUTED

        ps2 = tfs.add_paragraph()
        ps2.text = val
        ps2.font.size = Pt(18)
        ps2.font.bold = True
        ps2.font.color.rgb = col

        ps3 = tfs.add_paragraph()
        ps3.text = sub
        ps3.font.size = Pt(8.5)
        ps3.font.color.rgb = COLOR_MUTED

    f1 = s1.shapes.add_textbox(Inches(1.2), Inches(6.35), Inches(10.9), Inches(0.35))
    f1.text_frame.paragraphs[0].text = f"Founder: Besmir   •   Platform: shtegu.app   •   {'Përgatitur për: Driton Hapçiu' if is_sq else 'Prepared for: Driton Hapçiu'}"
    f1.text_frame.paragraphs[0].font.size = Pt(10)
    f1.text_frame.paragraphs[0].font.color.rgb = COLOR_MUTED

    # ==================== SLIDE 2: THE HARDWARE MOAT ====================
    s2 = add_base_slide(
        "Barriera Fizike dhe Teknologjike (E Gatshme & Pa Rreziqe)" if is_sq else "The Hardware Moat (De-Risked & Ready)",
        "Sllajdi 02 • Pajisja dhe Protokolli i Siguruar" if is_sq else "Slide 02 • De-Risked Hardware & Protocol"
    )
    add_card(s2, Inches(1.2), Inches(2.1), Inches(5.3), Inches(3.7),
             "Prodhimi Direkt nga Fabrika (ODM)" if is_sq else "Direct ODM Manufacturing Sourced",
             ("• Kosto e Ulët: Blerja bazë e siguruar në $35–$45 për barrierë (MOQ 5). Mbërritur në Prishtinë: ~€110 all-in.\n\n"
              "• Zero Punime Rrjeti: Panel diellor monokristalin + bateri industriale e testuar deri në -15°C me 60+ ditë rezervë pa diell.\n\n"
              "• Ndërtim i Pathyeshëm: Rezistencë 5 ton ndaj shtypjes së makinës, certifikim IP67 kundër shiut/borës dhe sustë 180° me sirenë alarmi 100 dB.") if is_sq else
             ("• Ultra-Low Unit Cost: Raw hardware secured at $35–$45 per automated barrier (MOQ 5). Landed in Prishtina: ~€110 all-in.\n\n"
              "• Zero Infrastructure Works: Self-sustaining solar panel + cold-rated industrial battery down to -15°C with 60+ days standby.\n\n"
              "• Indestructible Build: 5-ton compressive drive-over load, IP67 waterproof enclosure, 180° anti-collision clutch & 100 dB tamper siren."))

    add_card(s2, Inches(6.8), Inches(2.1), Inches(5.3), Inches(3.7),
             "Programi Bazë & Komunikimi" if is_sq else "Firmware & Connectivity",
             ("• Nordic UART BLE 5.0: Protokoll standard i hapur (UUID: 6E400001-...). Integrim i plotë me aplikacionin tonë celular.\n\n"
              "• Zero Kosto Mujore SIM: €0.00 / muaj. Telefoni i shoferit shërben si urë interneti (gateway) drejt serverit në cloud.\n\n"
              "• Monitorim Pasiv i Vendit: Transmeton statusin (0 = lirë, 1 = zënë) direkt përmes sinjaleve pa tel BLE beacon (< 15m).\n\n"
              "• Montim në 15 Minuta: Bulonat standardë M10 montohen pa pasur nevojë për leje komunale apo kyçje me KEDS.") if is_sq else
             ("• Nordic UART BLE 5.0: Open protocol standard (UUID: 6E400001-...). Seamless custom mobile app integration.\n\n"
              "• Zero Cellular SIM Cost: €0.00 / month. The driver's smartphone acts as the secure internet gateway to cloud.\n\n"
              "• Passive Occupancy Sensing: Broadcasts spot status (0 = vacant, 1 = occupied) directly in raw BLE advertising beacons.\n\n"
              "• 15-Minute Mount: Standard M10 expansion bolts secure the barrier with zero reliance on municipal street permits."))

    # ==================== SLIDE 3: TECHNICAL ARCHITECTURE ====================
    s3 = add_base_slide(
        "Arkitektura Teknike: Komunikimi & Monitorimi i Rrjetit" if is_sq else "Technical Architecture: Communication & Fleet Monitoring",
        "Sllajdi 03 • Topologjia IoT & Protokolli Nordic UART" if is_sq else "Slide 03 • IoT System Topology & Nordic UART"
    )
    add_card(s3, Inches(1.2), Inches(2.0), Inches(10.9), Inches(1.4),
             "Topologjia e Sistemit në Kohë Reale (Phone-as-Gateway)" if is_sq else "Real-Time System Topology (Phone-as-Gateway)",
             ("Shtegu Cloud (PostgreSQL / Redis / 4-Byte Key Auth) <---> HTTPS / REST <---> Mobile App (Flutter BLE Bridge) <---> BLE 5.0 Nordic UART (20-Byte Frame) <---> Barriera Inteligjente Autonome.\n"
              "Kursimi: Eliminon plotësisht kartat SIM prej €3–€5/muaj për çdo vendparkim.") if is_sq else
             ("Shtegu Cloud (PostgreSQL / Redis / 4-Byte Key Auth) <---> HTTPS / REST <---> Mobile App (Flutter BLE Bridge) <---> BLE 5.0 Nordic UART (20-Byte Frame) <---> Autonomous Smart Barrier.\n"
              "Capital Efficiency: Completely eliminates €3–€5/month cellular SIM cards per individual street stall."),
             bg_color=COLOR_SUBTLE)

    add_card(s3, Inches(1.2), Inches(3.6), Inches(3.45), Inches(2.6),
             "1. Rrjedha Live" if is_sq else "1. Live Command Flow",
             ("• Zbulimi: Beacon pa pairing (< 15m).\n"
              "• Çelësi: 4-bajtësh nga MAC në cloud.\n"
              "• Korniza: 20-bajtëshe (DDTC 0x14 0x01).\n"
              "• Ekzekutimi: Ulet në 75mm për 4-6s me faturë RX në cloud.") if is_sq else
             ("• Discovery: Beacon without pairing (<15m).\n"
              "• Cloud Key: 4-byte key derived from MAC.\n"
              "• Payload: 20-byte frame (DDTC 0x14 0x01).\n"
              "• Drop Speed: 75mm in 4-6s with RX confirmation."))

    add_card(s3, Inches(4.9), Inches(3.6), Inches(3.45), Inches(2.6),
             "2. Telemetria Pasive" if is_sq else "2. Passive Mesh Telemetry",
             ("• Sinjale të hapura shëndeti çdo 1,000ms:\n"
              "  B1: Firmware version\n"
              "  B2: Bateria (0-9) + Zënia (0/1)\n"
              "  B3: Pozicioni + Error (0xEE)\n"
              "• Çdo përdorues brenda 20m dërgon të dhënat në server pa e kuptuar.") if is_sq else
             ("• Autonomous beacons every 1,000ms:\n"
              "  B1: Firmware revision\n"
              "  B2: Battery (0-9) + Occupancy (0/1)\n"
              "  B3: Arm status + Fault (0xEE)\n"
              "• Crowdsourced sync forwards packets."))

    add_card(s3, Inches(8.65), Inches(3.6), Inches(3.45), Inches(2.6),
             "3. Qendra Komerciale" if is_sq else "3. Commercial Clusters",
             ("• 1 Gateway industrial BLE-në-MQTT (~€35 ESP32/Teltonika) për krejt parkingun.\n"
              "• Wi-Fi i objektit ose 1 SIM e përbashkët.\n"
              "• Transmetim në kohë reale i 30+ vendeve me vonesë nën 1 sekondë.") if is_sq else
             ("• 1 Industrial BLE-to-MQTT unit (~€35 ESP32/Teltonika) on-site.\n"
              "• Facility Wi-Fi or 1 shared SIM.\n"
              "• Real-time concurrent tracking of 30+ stalls with sub-second latency."))

    # ==================== SLIDE 4: CORE BUSINESS MODEL (3 MODES & PILLARS) ====================
    s4 = add_base_slide(
        "Modeli i Biznesit: 3 Nivelet Operacionale & Shtyllat e Fitimit" if is_sq else "Core Business Model: The 3 Operating Modes & Revenue Pillars",
        "Sllajdi 04 • Modeli i Biznesit me 3 Nivele" if is_sq else "Slide 04 • Core Business Model: 3 Modes"
    )
    add_card(s4, Inches(1.2), Inches(2.0), Inches(3.45), Inches(2.2),
             "Mode 1: Personal (Hyrje Private)" if is_sq else "Mode 1: Personal (Private Driveways)",
             ("• €50 tarifë montimi fillestare + kontratë 12-mujore.\n"
              "• Ndarje fitimi 70/30 në favor të pronarit.\n"
              "• Hapet automatikisht për publikun nga ora 08:30 deri 16:30 kur pronari është në punë.") if is_sq else
             ("• €50 upfront installation fee + 12-month lock-in contract.\n"
              "• 70/30 parking revenue-share in favor of host.\n"
              "• Unlocks automatically between 08:30 and 16:30 while owner works."))

    add_card(s4, Inches(4.9), Inches(2.0), Inches(3.45), Inches(2.2),
             "Mode 2: Lokal (Klinika, Noterë, Zyra)" if is_sq else "Mode 2: Local (Clinics, Notaries, Offices)",
             ("• €50 tarifë montimi fillestare + kontratë 12-mujore.\n"
              "• €50 – €70 / muaj abonim fiks.\n"
              "• Ditën: Hyrje falas për stafin/klientët. Mbrëmjeve & fundjavave: Parkim publik me pagesë (70/30).") if is_sq else
             ("• €50 upfront installation fee + 12-month lock-in contract.\n"
              "• Flat monthly subscription (€50 – €70 / month).\n"
              "• Daytime: Free whitelist entry. Evenings/weekends: Paid public parking (70/30)."))

    add_card(s4, Inches(8.65), Inches(2.0), Inches(3.45), Inches(2.2),
             "Mode 3: Enterprise (Kulla & 30+ Vende)" if is_sq else "Mode 3: Enterprise (30+ Stall Complexes)",
             ("• €300 / muaj abonim fiks SaaS.\n"
              "• Gateway IoT i dedikuar në objekt.\n"
              "• Panel qendror në ueb, hapje në grup në distancë, harta të ngarkesës dhe çmime dinamike.") if is_sq else
             ("• €300 / month flat SaaS retainer.\n"
              "• On-site stationary IoT BLE Gateway.\n"
              "• Centralized facility dashboard, remote multi-stall overrides, heatmaps & dynamic rates."))

    # 2 Revenue Pillars at bottom
    add_card(s4, Inches(1.2), Inches(4.4), Inches(5.3), Inches(1.7),
             "Pllakat Reklamuese A4 Forex (Baza e Parave)" if is_sq else "Physical A4 Micro-Billboards (Cash Floor)",
             "Pllakë 3mm Forex (~€1.80 printim) me qira €15–€25/muaj (llogaritur €18/muaj) për dentistët dhe farmacitë lokale. Mbulon serverin para se të parkojë makina e parë." if is_sq else
             "Rigid 3mm Forex plate (~€1.80 print cost) leased at €15–€25/mo (modeled at €18/mo) to adjacent pharmacies/dentists. Covers cloud & server costs before a car parks.",
             bg_color=COLOR_SUBTLE)

    add_card(s4, Inches(6.8), Inches(4.4), Inches(5.3), Inches(1.7),
             "Kuleta e Parapaguar (Zero Humbje Bankare)" if is_sq else "Zero Micro-Transactions (Prepaid Wallet)",
             "Mbushjet blihen në paketa €5, €10 dhe €15. Kjo shmang komisionet bankare prej €0.20 + 2.5% për pagesat prej €1.00, duke garantuar likuiditet të menjëhershëm në llogari." if is_sq else
             "Drivers load wallet balances in blocks of €5, €10, or €15, eliminating fixed €0.20 + 2.5% swipe fees on €1.00 charges. Shtegu holds upfront float liquidity.",
             bg_color=COLOR_SUBTLE)

    # ==================== SLIDE 5: UNIT ECONOMICS & ACCELERATED PAYBACK (50 DAYS) ====================
    s5 = add_base_slide(
        "Ekonomia për Njësi dhe Kthimi në ~50 Ditë" if is_sq else "Ground-Truth Unit Economics & Accelerated Payback (~50 Days)",
        "Sllajdi 05 • Ekonomia për Njësi & Kthimi i Përshpejtuar" if is_sq else "Slide 05 • Unit Economics & Accelerated Payback"
    )
    add_card(s5, Inches(1.2), Inches(2.1), Inches(5.3), Inches(4.0),
             "Pasqyra Mujore Për Vendparkim" if is_sq else "Monthly Stall P&L (Single Spot Breakdown)",
             ("• Qarkullimi Bruto (3.5 orë @ €1.00, 22 ditë):  €77.00\n"
              "• Pjesa e Pronarit të Pronës (70%):               (€53.90)\n"
              "• Marzha e Shtegut nga Parkimi (30%):             €23.10\n"
              "• Pllaka Reklamuese A4 Forex:                     +€18.00\n"
              "• Procesimi Bankar & Serveri:                     (€5.20)\n\n"
              "Fluksi Neto Operacional i Lirë (FCF):   €35.90 / muaj") if is_sq else
             ("• Gross Parking Volume (3.5 hrs @ €1, 22 days):   €77.00\n"
              "• Host Revenue Share (70%):                       (€53.90)\n"
              "• Shtegu Net Parking Cut (30%):                   €23.10\n"
              "• Physical A4 Forex Ad Lease:                     +€18.00\n"
              "• Payment Processing & Cloud Buffer:              (€5.20)\n\n"
              "Net Free Operating Cash Flow (FCF):     €35.90 / month"))

    add_card(s5, Inches(6.8), Inches(2.1), Inches(5.3), Inches(4.0),
             "Kthimi i Përshpejtuar brenda 50 Ditëve" if is_sq else "The 50-Day Capital Recovery Calculation",
             ("Kostoja e Mbërritur e Barrierës:       €110.00\n"
              "Tarifa Fillestare e Montimit:          -€50.00\n"
              "Ekspozimi Neto i Kapitalit:             €60.00\n\n"
              "Formula e Kthimit të Plotë:\n"
              "€60.00 Capex Neto / €35.90 FCF = 1.67 Muaj (~50 Ditë)\n\n"
              "Përparësia për Investitorin:\n"
              "Rreziku neto për barrierë ulet nga €110 në vetëm €60. Çdo vend e shlyen plotësisht koston brenda 50 ditëve, duke gjeneruar fitim të pastër për 10+ muajt e mbetur të kontratës 12-mujore.") if is_sq else
             ("Landed Unit Cost (Hardware + DHL + Anchors):  €110.00\n"
              "Upfront Host Installation Fee:               -€50.00\n"
              "Net Out-of-Pocket CapEx Exposure:              €60.00\n\n"
              "Hardware Payback Period:\n"
              "€60.00 Net CapEx / €35.90 Monthly FCF = 1.67 Mos (~50 Days)\n\n"
              "Key Takeaway for Investor:\n"
              "Net capital risk per deployed stall is slashed from €110 to €60. Asset achieves full recovery in ~50 days, generating recurring yield for the remaining 10+ months of the locked contract."),
             bg_color=COLOR_SUBTLE)

    # ==================== SLIDE 6: LEAN OPERATIONS & CREATOR DISTRIBUTION ====================
    s6 = add_base_slide(
        "Operimi Pa Shpenzime (Zero Burn) & Shpërndarja me Krijues" if is_sq else "Lean Operations (Zero Burn) & Hyper-Local Creator Distribution",
        "Sllajdi 06 • Efiçenca Operacionale & Marketingu" if is_sq else "Slide 06 • Lean Operations & Creator Distribution"
    )
    add_card(s6, Inches(1.2), Inches(2.1), Inches(5.3), Inches(3.8),
             "Disiplina Operacionale Zero Burn" if is_sq else "Zero Burn Operational Discipline",
             ("• Qira Zyre: €0. Operim direkt në terren nga themeluesi; pajisjet ruhen në automjet/garazh.\n\n"
              "• Paga Fikse: €0. Aplikacioni, serveri dhe integrimet programore kryhen nga vetë themeluesi.\n\n"
              "• Montimi me Copë: €15 / Vend. Paguhen teknikë me trapan hilti vetëm në ditët e shpimit; zero detyrime fikse mujore.\n\n"
              "• Shpenzim Mujor Fiks: ~€50 për cloud dhe bazën e të dhënave.") if is_sq else
             ("• Office Overhead: €0. Founder-led mobile field operations; inventory stored in vehicle/garage.\n\n"
              "• Fixed Payroll: €0. Mobile app, cloud architecture, and firmware handled directly by founder.\n\n"
              "• Piece-Rate Installation: €15 per barrier paid to gig drillers on anchor days, avoiding fixed payroll liabilities.\n\n"
              "• Fixed Monthly Burn: ~€50 strictly for cloud databases and domain hosting."))

    add_card(s6, Inches(6.8), Inches(2.1), Inches(5.3), Inches(3.8),
             "Shpërndarja Hiper-Lokale (CAC < €0.25)" if is_sq else "Hyper-Local Creator Distribution (CAC < €0.25)",
             ("• Partneritete me Krijues Masivë: Bashkëpunim me krijues me ndikim masiv në Prishtinë (Burim Pacolli, Don Zhugani).\n\n"
              "• Kode Referimi (BURIM, DONI): Ofron €2 kredit falas parkimi për shoferët e rinj.\n\n"
              "• Kosto e Ulët e Blerjes (CAC < €0.25): Rrjeti viral në TikTok dhe Instagram konverton shoferët direkt në përdorues aktivë pa djegur buxhete në reklama të zakonshme.") if is_sq else
             ("• High-Reach Creator Distribution: Direct promotion with top Prishtina creators (Burim Pacolli, Don Zhugani).\n\n"
              "• Referral Promo Codes (BURIM, DONI): Provides €2 introductory parking credit for new drivers.\n\n"
              "• Sub-€0.25 CAC: Viral TikTok/Instagram content drives immediate app downloads and wallet top-ups without speculative marketing spend."),
             bg_color=COLOR_SUBTLE)

    # ==================== SLIDE 7: GROWTH PROJECTIONS ====================
    s7 = add_base_slide(
        "Parashikimet e Rritjes (Shtrirja në Prishtinë)" if is_sq else "Growth Projections (Prishtina Rollout)",
        "Sllajdi 07 • Plani i Rritjes në Prishtinë" if is_sq else "Slide 07 • Scaling Roadmap"
    )
    add_card(s7, Inches(1.2), Inches(2.2), Inches(3.45), Inches(3.8),
             "Faza 1 (M1–M3)" if is_sq else "Phase 1 (M1–M3)",
             ("Validimi i Pilotit (10–20 Vende)\n\n"
              "• Shtrirje në Pejton qendrore.\n"
              "• Tarifa €50 për montim e vërtetuar me pronarët.\n"
              "• Kthim i plotë i kapitalit brenda 50 ditëve.") if is_sq else
             ("Pilot Validation (10–20 Stalls)\n\n"
              "• Deployed across central Pejton.\n"
              "• €50 upfront host fee validated.\n"
              "• Full capital payback in ~50 days."))

    add_card(s7, Inches(4.9), Inches(2.2), Inches(3.45), Inches(3.8),
             "Faza 2 (M4–M9)" if is_sq else "Phase 2 (M4–M9)",
             ("Zgjerimi në Korridore (50–75 Vende)\n\n"
              "• Zgjerim në Qendër, Qafë dhe Ulpianë.\n"
              "• Kontratat e para B2B me klinika/zyra (€70/muaj).\n"
              "• Monetizimi i pllakave reklamuese Forex A4.") if is_sq else
             ("Corridor Expansion (50–75 Stalls)\n\n"
              "• Expansion in Qendër, Qafa, Ulpianë.\n"
              "• First wave of B2B contracts (€70/mo).\n"
              "• Initial Forex ad plates monetized."))

    add_card(s7, Inches(8.65), Inches(2.2), Inches(3.45), Inches(3.8),
             "Faza 3 (M10–M15)" if is_sq else "Phase 3 (M10–M15)",
             ("Rritja në Shkallë të Gjerë (150 Vende)\n\n"
              "• €5,300+ deri €6,800+ FCF neto mujor.\n"
              "• EBITDA vjetore mbi €81,000+.\n"
              "• Vlerësimi i Synuar: €650,000 – €1,000,000.") if is_sq else
             ("Scale (150 Active Stalls)\n\n"
              "• €5,300+ to €6,800+ monthly net FCF.\n"
              "• Annual EBITDA exceeding €81,000+.\n"
              "• Target Valuation: €650k – €1.0M."),
             bg_color=COLOR_SUBTLE)

    # ==================== SLIDE 8: THE INVESTMENT OFFER ====================
    s8 = add_base_slide(
        "Oferta e Investimit dhe Shpërndarja e Fondeve" if is_sq else "The Investment Offer & Use of Funds",
        "Sllajdi 08 • Kushtet e Investimit & Term Sheet" if is_sq else "Slide 08 • Term Sheet & Use of Funds"
    )
    off_stats = [
        ("Shuma e Investimit" if is_sq else "Investment Amount", "€25k – €30k", "Aksione / Marrëveshje e Konvertueshme" if is_sq else "Equity / Convertible Note", COLOR_BLUE),
        ("Aksione të Ofruara" if is_sq else "Equity Stake", "15.0%", "Aksione të Zakonshme të Pastra" if is_sq else "Clean Common Equity", COLOR_PRIMARY),
        ("Paga e Themeluesit" if is_sq else "Founder Draw", "€0", "100% Para në Pajisje Fitimprurëse" if is_sq else "100% Cash into Deployable Assets", COLOR_GREEN)
    ]
    for idx, (label, val, sub, col) in enumerate(off_stats):
        box_left = Inches(1.2) + Inches(idx * 3.75)
        sb = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, box_left, Inches(2.0), Inches(3.5), Inches(1.3))
        sb.fill.solid()
        sb.fill.fore_color.rgb = COLOR_CARD
        sb.line.color.rgb = COLOR_BORDER
        sb.line.width = Pt(1)

        tb_s = s8.shapes.add_textbox(box_left + Inches(0.15), Inches(2.1), Inches(3.2), Inches(1.1))
        tfs = tb_s.text_frame
        tfs.word_wrap = True

        ps1 = tfs.paragraphs[0]
        ps1.text = label.upper()
        ps1.font.size = Pt(8.5)
        ps1.font.bold = True
        ps1.font.color.rgb = COLOR_MUTED

        ps2 = tfs.add_paragraph()
        ps2.text = val
        ps2.font.size = Pt(18)
        ps2.font.bold = True
        ps2.font.color.rgb = col

        ps3 = tfs.add_paragraph()
        ps3.text = sub
        ps3.font.size = Pt(8.5)
        ps3.font.color.rgb = COLOR_MUTED

    add_card(s8, Inches(1.2), Inches(3.45), Inches(10.9), Inches(1.3),
             "Shpërndarja e Kapitalit" if is_sq else "Capital Deployment Breakdown",
             ("• 70% Blerja Direkte e Pajisjeve: Prodhimi dhe transporti DHL i 80–100 barrierave inteligjente.\n"
              "• 15% Montimi & Shenjat: Trapanë hilti, bulona të blinduar ankorimi dhe pllaka reklamuese Forex.\n"
              "• 15% Rezervë Likuiditeti: Depozita për integrimin bankar, regjistrimet ligjore dhe rezerva operacionale.") if is_sq else
             ("• 70% Hardware Procurement: Direct batch production & express air logistics for 80–100 smart barriers.\n"
              "• 15% Field Tooling & Signage: Industrial hammer drills, anchor hardware, and branded Forex ad plates.\n"
              "• 15% Reserve Capital: Merchant processor liquidity reserves and legal registrations."))

    # Updated Closing Pitch Note for Driton with 50-day payback & €50 fee!
    add_card(s8, Inches(1.2), Inches(4.9), Inches(10.9), Inches(1.3),
             "Fjala Përmbyllëse për Z. Driton" if is_sq else "Closing Pitch Note for Mr. Driton",
             ('"Z. Driton, ky nuk është një aplikacion që kërkon pesë vite djegie kapitali për të shpresuar për fitim. '
              'Me modelin tonë të ri, pronarët e vendeve paguajnë €50 menjëherë për montim dhe nënshkruajnë kontratë 12-mujore. '
              'Kjo e ul rrezikun tonë neto nga €110 në vetëm €60 për barrierë. Me fluksin tonë mujor të parave, çdo vendparkim e shlyen plotësisht koston e tij brenda 50 ditëve. '
              'Nuk kemi shpenzime zyre, nuk kemi rroga të kota mujore dhe nuk varemi nga tenderët e komunës. '
              '100% e investimit tënd shkon direkt në pajisje fizike fitimprurëse në rrugët e Prishtinës. '
              'Le të nisim pilotin e parë në Pejton këtë muaj."') if is_sq else
             ('"Mr. Driton, this is not an app hoping to make money in five years by burning cash on marketing. '
              'With our upgraded model, hosts pay €50 upfront for installation and sign a 12-month lock-in contract. '
              'This drops our net CapEx risk from €110 down to just €60 per barrier. With our monthly cash flow, each stall completely recovers its cost in ~50 days. '
              'We have zero office overhead, zero unnecessary payroll, and zero reliance on municipal tenders. '
              '100% of your investment goes directly into deployable, revenue-generating physical hardware. '
              'Let us launch the first Pejton corridor pilot this month."'),
             bg_color=COLOR_SUBTLE)

    filename = f"Shtegu_Investor_Deck_{lang.upper()}.pptx"
    output_path = os.path.join(os.path.dirname(__file__), filename)
    prs.save(output_path)
    print(f"Successfully generated: {output_path}")
    return output_path

if __name__ == "__main__":
    build_deck("sq")
    build_deck("en")
