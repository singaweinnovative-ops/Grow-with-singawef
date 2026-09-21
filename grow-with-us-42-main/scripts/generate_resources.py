from fpdf import FPDF

INK = (46, 36, 25)
GOLD = (201, 154, 70)
CLAY = (177, 90, 52)
CREAM = (251, 246, 236)
MUTED = (90, 80, 68)

OUT_DIR = "public/resources"


def cover(pdf: FPDF, kicker: str, title: str, subtitle: str):
    pdf.add_page()
    pdf.set_fill_color(*INK)
    pdf.rect(0, 0, 210, 297, style="F")
    pdf.set_xy(20, 40)
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 8, kicker.upper())
    pdf.set_xy(20, 100)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 30)
    pdf.multi_cell(160, 13, title)
    pdf.set_xy(20, pdf.get_y() + 6)
    pdf.set_text_color(*CREAM)
    pdf.set_font("Helvetica", "", 13)
    pdf.multi_cell(160, 7, subtitle)
    pdf.set_xy(20, 265)
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, "SINGAWE FOUNDATION NPC  ·  YOUR JOURNEY. OUR COMMITMENT.")


def body_page(pdf: FPDF):
    pdf.add_page()
    pdf.set_fill_color(*CREAM)
    pdf.rect(0, 0, 210, 297, style="F")
    pdf.set_margins(20, 20, 20)
    pdf.set_auto_page_break(auto=True, margin=22)


def heading(pdf: FPDF, text: str):
    if pdf.get_y() > 250:
        body_page(pdf)
    pdf.ln(4)
    pdf.set_text_color(*CLAY)
    pdf.set_font("Helvetica", "B", 15)
    pdf.multi_cell(0, 8, text)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(0.6)
    y = pdf.get_y() + 1
    pdf.line(20, y, 60, y)
    pdf.ln(6)


def para(pdf: FPDF, text: str):
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 11)
    pdf.multi_cell(0, 6.4, text)
    pdf.ln(2)


def bullet(pdf: FPDF, text: str):
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_x(24)
    pdf.multi_cell(170, 6.4, f"-  {text}")
    pdf.ln(0.5)


def footer_note(pdf: FPDF, doc_id: str):
    pdf.set_y(-18)
    pdf.set_text_color(*MUTED)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(0, 6, f"SINGAWE Foundation NPC  ·  {doc_id}  ·  singawefoundation.org", align="C")


class ResourcePDF(FPDF):
    def footer(self):
        self.set_y(-18)
        self.set_text_color(*MUTED)
        self.set_font("Helvetica", "", 8)
        self.cell(0, 6, self.doc_id, align="C")


def new_pdf(doc_id: str) -> ResourcePDF:
    pdf = ResourcePDF()
    pdf.doc_id = f"SINGAWE Foundation NPC  ·  {doc_id}  ·  singawefoundation.org"
    pdf.set_auto_page_break(auto=True, margin=22)
    return pdf


# 1. SINGAWE Foundation Guide -------------------------------------------------
pdf = new_pdf("Foundation Guide")
cover(pdf, "Foundation Guide", "The SINGAWE Foundation Guide", "Who we are, what we believe, and how the walk works.")
body_page(pdf)
heading(pdf, "What SINGAWE means")
para(pdf, "SINGAWE means \"We Are For You.\" SINGAWE Foundation NPC is a South African Non-Profit "
          "Company established under the Companies Act, 2008, operating independently and without "
          "political affiliation. We identify talent, remove barriers, and walk alongside individuals "
          "through mentorship, education, STEAM, entrepreneurship and leadership.")
heading(pdf, "Our philosophy")
para(pdf, "Identify potential. Remove barriers. Stay. We believe every individual possesses the "
          "potential to achieve meaningful success, and that potential most often stalls at a barrier: "
          "information, resources, networks, guidance, confidence. We name those barriers honestly and "
          "work to reduce them, rather than creating dependency.")
heading(pdf, "Our language")
for term, formerly in [
    ("Journeyers (formerly Mentees)", "The individuals at the centre of our work."),
    ("Guides (formerly Mentors)", "Professionals, students and community leaders who walk beside a Journeyer."),
    ("Torchbearers (formerly Alumni)", "Journeyers who completed a programme and now open doors for others."),
    ("Stewards (formerly Board & Executive)", "Those entrusted with the Foundation's purpose and public trust."),
    ("Companions (formerly Volunteers & Partners)", "Schools, businesses and individuals who shorten the journey for everyone."),
]:
    bullet(pdf, f"{term}  -  {formerly}")
heading(pdf, "Our four programmes")
for name, body in [
    ("Pathfinder  -  Access & Awareness", "Finding opportunities and preparing the application, not just announcing the deadline."),
    ("Walk-Along  -  Mentorship", "Every Journeyer matched with a Guide for a structured, safeguarded relationship."),
    ("Makers Lab  -  STEAM & Innovation", "Practical science, technology, engineering, arts and mathematics."),
    ("Torch  -  Leadership Development", "Leadership as service, developed through labs and service projects."),
]:
    bullet(pdf, f"{name}: {body}")
heading(pdf, "Safeguarding, always")
para(pdf, "Every Guide and representative is screened and briefed before being matched with a "
          "Journeyer. Journeyers are never asked to pay for access to mentorship, guidance or "
          "opportunity support. Concerns can be raised at any time, in confidence, without affecting a "
          "Journeyer's place in a programme.")
pdf.output(f"{OUT_DIR}/singawe-foundation-guide.pdf")


# 2. Opportunity Application Guide -------------------------------------------
pdf = new_pdf("Opportunity Application Guide")
cover(pdf, "Pathfinder", "Opportunity Application Guide", "A step-by-step guide to applying for bursaries, study places, work and competitions.")
body_page(pdf)
heading(pdf, "Before you start")
for b in [
    "Gather your ID document (or your 13-digit ID number), latest results and proof of address.",
    "Make a folder  -  physical or digital  -  for every document a funder or institution might ask for.",
    "Note every closing date. Most opportunities do not accept late applications, no exceptions.",
]:
    bullet(pdf, b)
heading(pdf, "Applying for funding (bursaries and scholarships)")
para(pdf, "NSFAS and most bursary schemes open annually. Apply as early as the window opens  -  do "
          "not wait for an acceptance letter first. Keep a copy of every submitted application and its "
          "reference number.")
heading(pdf, "Applying to study")
para(pdf, "University and TVET college applications usually open mid-year for the following year's "
          "intake. If you do not receive a place, the Central Applications Clearing House (CACH) opens "
          "in January as a second route into an institution with space available.")
heading(pdf, "Applying for work")
para(pdf, "SAYouth.mobi is a zero-rated platform listing learnerships, internships and entry-level "
          "work across every province  -  it does not use your mobile data to browse.")
heading(pdf, "Entering a competition")
para(pdf, "For science and innovation competitions such as the Eskom Expo for Young Scientists, "
          "start your project early and rehearse explaining it out loud  -  judges mark understanding, "
          "not memorised scripts.")
heading(pdf, "Do not apply alone")
para(pdf, "COMHACK runs group application sprints and TACA sits beside you until submit is pressed. "
          "Both are free. If anything above is unclear, get help applying through the SINGAWE website "
          "and a form for exactly your kind of opportunity will reach us.")
pdf.output(f"{OUT_DIR}/opportunity-application-guide.pdf")


# 3. Guide Handbook -----------------------------------------------------------
pdf = new_pdf("Guide Handbook")
cover(pdf, "Walk-Along", "The Guide Handbook", "What SINGAWE Guides commit to, and how a mentorship cycle actually runs.")
body_page(pdf)
heading(pdf, "What a Guide commits to")
para(pdf, "A structured relationship, usually monthly contact over a programme cycle, inside our "
          "safeguarding framework. Guides are screened, briefed and supported. You are not asked to "
          "fund anyone  -  you are asked to be consistent.")
heading(pdf, "The walk, month by month")
for time, title, body in [
    ("Month 00", "The first conversation", "No forms first  -  a conversation about where your Journeyer is and what is in the way."),
    ("Month 01", "Matched", "You are introduced to a Journeyer in or near your field."),
    ("Monthly", "The session", "One structured hour: progress, obstacles, next steps  -  written down and followed up."),
    ("Ongoing", "The barriers", "Transport, data, documents, fees, confidence  -  named and reduced one by one."),
    ("The door", "The opportunity", "Your Journeyer applies prepared, not hopeful."),
    ("After", "They become a Guide", "Journeyers become Torchbearers  -  the walk continues, in the other direction."),
]:
    bullet(pdf, f"{time}  -  {title}: {body}")
heading(pdf, "Safeguarding expectations")
para(pdf, "Contact happens through recorded, accountable channels on a fixed schedule. You will "
          "never be asked to meet a Journeyer unsupervised outside of this structure, and any concern "
          "you notice should be raised with the Foundation immediately and confidentially.")
pdf.output(f"{OUT_DIR}/guide-handbook.pdf")


# 4. Journeyer Handbook --------------------------------------------------------
pdf = new_pdf("Journeyer Handbook")
cover(pdf, "For Journeyers", "The Journeyer Handbook", "What to expect once you reach out to SINGAWE  -  at no cost, ever.")
body_page(pdf)
heading(pdf, "There is no wrong time to reach out")
para(pdf, "You do not need to have everything figured out first. SINGAWE Foundation NPC never "
          "charges an individual for access to mentorship, guidance or opportunity support.")
heading(pdf, "What happens after you apply")
for b in [
    "We read your details and, if you are under 18, we bring in a parent or guardian from the start.",
    "We name the barriers together  -  documents, funding, transport, confidence.",
    "You are matched with a Guide for structured, monthly contact.",
    "You apply for real opportunities prepared, with someone in your corner.",
]:
    bullet(pdf, b)
heading(pdf, "Your rights as a Journeyer")
para(pdf, "You may raise a concern at any time, in confidence, without it affecting your place in a "
          "programme. All Guides are screened. Contact happens through recorded, accountable channels.")
pdf.output(f"{OUT_DIR}/journeyer-handbook.pdf")


# 5. Safeguarding Policy Summary -----------------------------------------------
pdf = new_pdf("Safeguarding Policy Summary")
cover(pdf, "Governance", "Safeguarding Policy Summary", "Our commitments to every Journeyer, Guide and Companion.")
body_page(pdf)
for title, body in [
    ("Screening, every time", "Every Guide and representative is screened and briefed before being matched with a Journeyer. No exceptions."),
    ("Structured, recorded contact", "Mentorship happens through accountable, recorded channels on a fixed schedule  -  never unsupervised private contact."),
    ("No cost, ever", "Journeyers are never asked to pay for access to mentorship, guidance or opportunity support."),
    ("Confidential reporting", "Concerns can be raised at any time, by anyone, in confidence, without affecting a Journeyer's place in a programme."),
    ("Charter-bound", "All Guides and representatives are bound by the Foundation Charter and this safeguarding policy, overseen by our governance Stewards."),
]:
    heading(pdf, title)
    para(pdf, body)
pdf.output(f"{OUT_DIR}/safeguarding-policy-summary.pdf")

print("done")
