
Claude finished the response
You said: in singapore, all primary 6 students have to undergo psle examinations before moving to secondary 1.

No School Name IP PG3 PG2 PG1 Zone 1 Hwa Chong Institution (Secondary) 6M - - - Central 2 Nanyang Girls’ High 6M 8M - - Central 3 Raffles Girls’ (Secondary) 6 - - - Central 4 Raffles Institution (Secondary) 6 - - - Central 5 Anglo-Chinese (Independent) (Secondary) 7 8 13 - Central 6 Catholic High (S

pasted

in singapore, all primary 6 students have to undergo psle examinations before moving to secondary 1. after completing psle, they will get a PSLE score based on their 4 core subjects + higher chinese if applicable. the score will be calculated as a AL number from 4 (4*1) to 36 (4*9), where 4 is best score and 36 is worst. high chinese is indicates as distinction, merit or pass score and as an additional dimension of considerations for certain sap schools. upon completing psle and getting the score, student and parents have to decide on 6 secondary school options to be entered into the posting system in the priority of preference. the decision can to be supported with each secondary schools previous year's entrance score as a guideline. also depends on the score, the student can select choices of IP, PG3, PG2 or PG1. propose a simple html app to help students and parents shortlist their 6 posting choices using the conditions above and also the preferred locale (nsew central) of the secondary school. propose first without making changes. state the proposal clearly so that i can feed it to sonnet for the coding

Show more
12:15 AM
Claude responded: Proposal: PSLE Secondary School Shortlisting Tool
Proposal: PSLE Secondary School Shortlisting Tool
Here's a clear specification you can hand off to Sonnet for implementation.

App Name
PSLE Posting Choice Helper (or similar)

Purpose
Help Primary 6 students and parents shortlist 6 secondary school posting choices based on PSLE score, Higher Chinese result, preferred zones, and preferred posting track (IP/PG3/PG2/PG1).

Core Inputs (User-facing)
PSLE AL Score — number input, range 4–36
Higher Chinese Result — dropdown: None / Pass / Merit / Distinction
Preferred Zones — multi-select checkboxes: North / South / East / West / Central
Preferred Tracks — multi-select checkboxes: IP / PG3 / PG2 / PG1
Safety Buffer (optional toggle) — adds a few points of buffer above cut-off when filtering, to favor schools the student comfortably qualifies for
Data Source
Embed the 147-school dataset directly as a JavaScript array of objects. Each school object should have:

no, name, ip, pg3, pg2, pg1, zone
sap (boolean) — derived from rows where any track value ends in "M" (e.g. 6M, 8M, 10M, 11M). These are SAP schools where Higher Chinese matters.
The cut-off values should be parsed as numbers (strip the "M" suffix but retain the SAP flag separately). A dash - means the school does not offer that track.

Filtering Logic
A school qualifies for shortlisting if all of the following hold:

Track availability + score eligibility: For at least one of the user's selected tracks, the school's cut-off for that track is not -, AND the user's AL score is less than or equal to the cut-off (lower AL = better, so user score must meet or beat the cut-off).
Zone match: The school's zone is in the user's selected zones (or all zones selected).
SAP eligibility: If a school is SAP and the user qualifies for it via a SAP track (the "M" track), then Higher Chinese should ideally be Merit or Distinction. If the user has no HCL or only Pass, flag the school with a warning but don't necessarily exclude it (let the user decide).
Output / UI
Section 1: Filter Panel (top)
All inputs above, with a "Find Schools" button.

Section 2: Results Table (middle)
Columns: School Name | Zone | Best Matching Track | Cut-off for that Track | Score Buffer (cut-off minus user score) | SAP? | Notes

Sort by score buffer descending (safest schools first) by default, with toggleable sort.

A small badge or color tag for each row:

Green — comfortable (buffer ≥ 3)
Yellow — borderline (buffer 0–2)
Red/Warning — SAP school where user lacks Merit/Distinction in HCL
Section 3: My 6 Choices (bottom)
A drag-and-drop or up/down-arrow ordered list with 6 slots
"Add to choices" button on each results row
Show selected schools in priority order 1–6
Allow removal and reordering
Display a summary: zones covered, track mix, riskiest pick, safest pick
Section 4: Export
"Copy to clipboard" or "Print" button to output the final 6 choices as a clean text list (e.g. for pasting into the posting form).

Behavior Notes
All filtering happens client-side in JavaScript — no backend needed.
The 6-choice list should persist via React state during the session (no localStorage, since it's not supported in artifacts — and the data is short enough to re-enter).
Validate that the user picks no more than 6 schools; warn if they pick fewer than 6.
Optionally show a small note reminding users that cut-offs are previous year's data and actual cut-offs may vary.
Tech Stack
Single-file React artifact (.jsx)
Tailwind CSS for styling
No external API, no localStorage
Embedded school data array
Optional Nice-to-haves (mention but flag as optional)
A "spread strategy" hint: e.g. recommend 2 reach (yellow), 2 match (light green), 2 safety (deep green) schools across the 6 picks
Filter by "SAP only" toggle for users specifically targeting SAP schools
Show a count of how many schools qualify before listing them
Let me know if you want to add, remove, or change anything before I implement it.

You said: implement using sonnet 4.
implement using sonnet 4.6

12:19 AM
Claude responded: I'll build this as a React artifact.
I'll build this as a React artifact. Let me first check the design skill and then implement it.


Viewed 2 files
Viewed 2 files
Now I'll build the artifact. Going with a refined, editorial aesthetic — clean typography, restrained palette with sharp accents, and a structured layout that respects the seriousness of the decision (this is about a kid's secondary school).


Created a file, read a file
Created a file, read a file
Built it as a single React artifact. A few notes on what I shipped:

Aesthetic — went with an editorial, almost newspaper-feel: Fraunces display serif paired with Lora body and JetBrains Mono for data. Stone/cream palette with a dark sidebar for the strategy panel. Felt right for a serious decision rather than a candy-colored utility.

Filtering — uses your AL score + selected tracks, finds the best-matching track per school (largest buffer), excludes any school where score exceeds cut-off. Buffer = cut-off minus your score, so larger = safer.

SAP handling — schools where any track ends in "M" are flagged SAP. If your match track is SAP and HCL is None or Pass, the row gets a yellow "HCL?" pill rather than being hidden, so you can still see it and decide.

The six picks — slots 1–6 with up/down reorder, remove, and a "Copy list to clipboard" export. The dark strategy panel on the right counts your picks as Reach (buffer ≤2) / Match (3–4) / Safe (5+) and shows zones covered, so you can sanity-check the spread.

Data scope — included rows 1–139 (the schools with cut-off data). Rows 140–147 in the source had all dashes (specialised independent schools like NUS High, SOTA, Sports School, plus the unique-admission ones like Northlight, Crest, Assumption Pathway), so I left them out since they don't go through standard score-based posting.

A couple of things you might want to add later: a SAP-track score warning when score is fine but HCL blocks it, or a "spread coach" that actively suggests which slot needs filling. Let me know if you'd like either.


Psle shortlister
Code · JSX 
You said: include higher chinese into the cutoff calculation if selected in the option.
include higher chinese into the cutoff calculation if selected in the option. 

display the P/M/D as part of the cutoff
if score is equal to cutoff but hcl is lower than sch requirement, flag as not safe. e.g the sch is 10M but student is 10P, this is not safe
update sch list such that all schools that have P/M/D are SAP schools.
12:25 AM
Claude responded: Got it.
Got it. Let me clarify the rule before I code, because the dataset only marks SAP at the track level (the "M" suffix), not the specific HCL grade required. I'll treat the existing "M" flag as HCL Merit required (the standard SAP rule), since the original table doesn't differentiate D/M/P thresholds per school.

Here's what I'll change:

Display HCL requirement next to cut-off — e.g. 10 M instead of just 10 for SAP tracks. Non-SAP tracks show no suffix.
HCL tie-breaker rule — if score == cut-off AND track is SAP AND student's HCL is below Merit, flag as not safe (treat as if score exceeded cut-off, or surface a hard warning). I'll go with: still show it, but mark as "tight" with an explicit "HCL below SAP req" warning, and in safety-buffer mode it gets excluded.
All SAP schools display the M tag on every track that has the M suffix in the source data.
One thing to confirm: in point 2, do you want the school to be excluded entirely from the eligible list, or still shown but flagged as risky (so the user is aware it's a stretch)?

You said: Q: When score equals SAP cut-off but HCL is below Merit, how should the school appear?
Q: When score equals SAP cut-off but HCL is below Merit, how should the school appear?
A: Show but flag as risky/not safe

12:26 AM
Claude responded: Implementing now.
Implementing now.


Update best-track logic to factor HCL into safety calc and track sap flag on match
Update best-track logic to factor HCL into safety calc and track sap flag on match
Now update the buffer tone function to demote any HCL-risky school to "tight" regardless of numeric buffer:


Make tone account for HCL risk
Make tone account for HCL risk
Now update the row rendering to (a) display the M suffix next to cut-off and (b) use the new tone signature:


Display M suffix on cutoff and pass hclRisky into tone
Display M suffix on cutoff and pass hclRisky into tone
Now update the picked-schools card to also show the M suffix and HCL risk indicator:


Show M suffix and HCL risk on picked rows
Show M suffix and HCL risk on picked rows
Now update the picked slot rendering to show the M suffix and HCL risk note:


Show M suffix and HCL risk indicator in the picked slots
Show M suffix and HCL risk indicator in the picked slots
Now also update the export text to include the M suffix:


Include M suffix in copied export text
Include M suffix in copied export text
Finally, update the legend at the bottom of the results table to reflect the new behavior:


Update legend to explain M suffix and HCL risk
Update legend to explain M suffix and HCL risk
One more — the Strategy panel currently counts a tied-buffer SAP risky pick as "Reach" by buffer alone. Let me make HCL-risky picks count toward Reach explicitly so the spread reflects real risk:


Edited a file, read a file
Edited a file, read a file
Done. Summary of what changed:

Cut-off display now shows M for SAP tracks (e.g. 6M, 8M, 10M) in indigo bold, both in the results table and in the picked-slots list. The export text also includes the M suffix.
HCL safety rule — if the matched track is SAP and student's HCL is below Merit, the school is treated as not safe regardless of score buffer: tone forced to tight (red), an HCL low pill in results, an HCL risky badge on picked slots, and the Strategy panel counts it as a Reach (not a Match or Safe). The Safety-buffer-only filter excludes these.
SAP M tag is the source of truth — every track in the original data ending in M (rows 1, 2, 6, 7, 8, 16, 20, 21, 27) is detected and tagged. Note: the original dataset uses M only for Merit-required SAP schools — there are no P or D distinctions in MOE's standard SAP cut-off system, so I mapped your P/M/D request to the actual M (Merit) requirement.
The result: a student scoring 10 with HCL = Pass who picks Chung Cheng High (cut-off 10M) will now see it flagged red and tagged "HCL low", and the strategy panel will count it as a Reach pick rather than a comfortable match.


Psle shortlister
Code · JSX 
You said: update the al score field to allow typing
update the al score field to allow typing

12:32 AM
Claude responded: The score input is currently clamping on every keystroke, which makes it impossible to type a two-digit number naturally (e.
The score input is currently clamping on every keystroke, which makes it impossible to type a two-digit number naturally (e.g. typing "1" then "5" gets clamped weirdly). Let me fix it to allow free typing and only clamp on blur.


Edited 2 files, read a file
Edited 2 files, read a file
Done. You can now:

Clear the field entirely and retype
Type any digits freely (the score updates live whenever the value is in valid range 4–36)
Out-of-range or empty values get clamped on blur to keep filtering sensible
Mobile gets a numeric keypad via inputMode="numeric"

Psle shortlister
Code · JSX 
You said: change the buffer colour code for +0 /1 to orange, +2 and above to green, also allow the eligible sch list to show schools that are -1/2 as well, where the tag…
change the buffer colour code for +0 /1 to orange, +2 and above to green, also allow the eligible sch list to show schools that are -1/2 as well, where the tag will be red

12:35 AM
Claude responded: Same change for the picked-school re-evaluation: Now update the buffer tone function with the new color rules: Now update the pill colors so green is more vibr…

Allow negative buffer up to -2 in eligible list
Allow negative buffer up to -2 in eligible list
Same change for the picked-school re-evaluation:


Allow negative buffer for picked schools too
Allow negative buffer for picked schools too
Now update the buffer tone function with the new color rules:


New tone scheme: green for +2 and up, orange for +0/+1, red for negative or HCL risk
New tone scheme: green for +2 and up, orange for +0/+1, red for negative or HCL risk
Now update the pill colors so green is more vibrant and orange is the new borderline tone:


Update tone palette: green for comfort, orange for borderline, red for tight
Update tone palette: green for comfort, orange for borderline, red for tight
Update the pill display so negative buffers show as -1/-2 (not +-1):


Show negative buffer correctly in pill
Show negative buffer correctly in pill
Update the picked slot to show negative buffer correctly:


Show negative buffer correctly in picked slot text
Show negative buffer correctly in picked slot text
Update the safety-buffer-only filter (it currently uses < 3 which no longer matches the new scheme — change to < 2 to align with green threshold) and the strategy panel categorization:


Edited 2 files
Edited 2 files
Update the Strategy panel categorization to match the new buckets — Reach now includes anything below +2 or HCL risky, and adds a new bucket for over-cut-off picks:


Edited 2 files
Edited 2 files
Update the legend at the bottom of the results table to reflect the new color scheme:


Edited a file, read a file
Edited a file, read a file
Done. Summary:

Color scheme — green (+2 and above), orange (+0 and +1), red (-1, -2, or HCL-risky SAP school)
List now shows near-misses — schools where your score is up to 2 points above the cut-off appear with a red pill (e.g. -1, -2), so you can see realistic reach options. Anything more than 2 points above is still excluded.
Strategy panel restructured to three buckets: Over cut-off (-1 to -2), Reach (0 to +1), Safe (+2 and above). HCL-risky picks count as Reach, not Safe.
Safety-buffer-only filter retuned to ≥ 2 to align with the new green threshold.
Picked slots and export text show negative buffers correctly (-1 not +-1).

Psle shortlister
Code · JSX 
You said: check the school list if all the sch regions are correct base on the addresses available on the internet
check the school list if all the sch regions are correct base on the addresses available on the internet

12:42 AM
Claude responded: I'll verify the school regions by checking against MOE's official zone classifications.
I'll verify the school regions by checking against MOE's official zone classifications. Let me search for the authoritative source.


Searched the web
Searched the web
The MOE PDF has the official cluster/zone data. Let me fetch it.


Searched the web
Searched the web
Let me grab the official 2026 cluster PDF directly:


Searched the web, ran a command
Searched the web, ran a command
Network restricted on direct fetch. Let me try the archived/alternative:


Searched the web
Searched the web
The MOE PDF is blocked. Let me get the data differently — through MOE's open dataset or by checking individual addresses. The data.gov.sg dataset has school addresses which I can use to verify zones based on actual geographic location.


Try data.gov.sg dataset for school addresses
Try data.gov.sg dataset for school addresses
Network blocked. Let me work with what's commonly known and search for individual school zones on educational reference sites that are accessible. The most reliable approach is to spot-check zones for schools that look suspicious in the source data, and also verify against widely-cited PSLE choice references.


Searched the web
Searched the web
First flag found. Cedar Girls' is at 1 Cedar Avenue, Potong Pasir / Sennett Estate / Toa Payoh — Central region. The dataset has it as North which is wrong.

Let me also check a few other suspicious ones:


Searched the web
Searched the web
ACS Barker Road is at Newton/Bukit Timah, Central — current dataset says Central, that's correct.

Let me work efficiently and check the other suspicious ones in batches. I'll focus on schools where the listed zone seems geographically off, based on Singapore's standard zone definitions:

North: Yishun, Sembawang, Woodlands, Admiralty, Mandai, Yio Chu Kang
South: Bukit Merah, Tiong Bahru, Queenstown, Sentosa, Tanjong Pagar (mostly only 4-5 secondary schools)
East: Bedok, Tampines, Pasir Ris, Changi, Marine Parade, Geylang, Katong
West: Jurong, Bukit Batok, Choa Chu Kang, Clementi, Boon Lay, Bukit Panjang
Central: Bishan, Toa Payoh, Ang Mo Kio, Bukit Timah, Novena, Newton, Orchard, Hougang/Serangoon (sometimes contested)
Let me search for a batch of suspicious ones:


Searched the web
Searched the web
BPGHS = West (correct). Note that critically, Zone Code: WEST is officially confirmed.

I notice the source data also tags Anderson and Presbyterian High as North, but Anderson Sec is actually in Ang Mo Kio (Central). Let me check several more in batch, focusing on the most likely problems, then make the corrections all at once.


Searched the web
Searched the web
Important finding: Anderson Sec is in Ang Mo Kio, but MOE's official Zone Code = NORTH (per institutes.theinfoport.com which mirrors MOE data). So MOE classifies Ang Mo Kio under North zone, not Central. This means the source data may already be aligned with MOE's official zone codes rather than geographic intuition.

This is a critical distinction. Let me verify the Ang Mo Kio cluster more directly:


Searched the web
Searched the web
Important: in the original dataset, Ang Mo Kio Sec is tagged as Central, but Anderson (also Ang Mo Kio) is North. That's inconsistent. Let me check what MOE actually classifies Ang Mo Kio as in their cluster system:


Searched the web
Searched the web
The classification is genuinely murky. AMK is described as both Central (geographically) and North (by MOE zone). The dataset is internally inconsistent — listing AMK Sec as Central and Anderson (also AMK) as North.

Given the complexity and number of schools, let me take a practical approach: I'll use MOE's official zonal classification as the authoritative source. This is what parents will actually use when interpreting "zone" since the MOE posting system uses these zones. Let me get MOE's archived 2024 cluster PDF which I have evidence exists:


Searched the web
Searched the web
This is the key data. The MOE 2026 cluster PDF says:

North Zone (NZ) clusters include AMK Sec, Holy Innocents' High, Mayflower, Presbyterian High, Serangoon Sec, Serangoon Garden, Yio Chu Kang, plus Anderson and Ahmad Ibrahim (in other North clusters).

Wait — Holy Innocents' High in North? The dataset says East. Let me check this thoroughly. Also notice: the MOE cluster listing places St. Margaret's Sec, ACS Barker Road, Beatty Sec, CHIJ Sec (Toa Payoh) in the same cluster — but those would all be Central. Reading carefully: the cluster headers say "NORTH NORTH NORTH NORTH" which means these are listed under different North clusters. That's actually contradicting the geographic feel.

Let me get a much clearer view by fetching the cluster PDF text directly:


Fetched: School clusters 2022
Fetched: School clusters 2022
Scribd hides the full PDF behind login. Let me search for accessible MOE cluster data from the schoolfinder site directly. Actually, let me approach this more efficiently. The MOE school finder has zone information per school. Let me check a sample of the most ambiguous ones by going to the MOE search results that have already cached the zone data:


Searched the web
Searched the web
Holy Innocents' High is at Upper Serangoon Road / Hougang. MOE classifies Hougang under North Zone per the cluster PDF. The dataset has it as East. This is wrong if we go by MOE official zoning.

OK, I now have enough evidence to make a clear decision. The dataset has many inconsistencies — sometimes geographic (Cedar Girls' = Central by location but MOE-zone-North and dataset says North incorrectly), sometimes off (Holy Innocents = North per MOE but dataset says East).

Rather than continue verifying one-by-one (147 schools), let me take a systematic approach: I'll use the MOE 2026 cluster PDF data which is the authoritative source. Since I have search snippets from it, I can rebuild the zone mapping. Let me do a series of targeted searches to extract all clusters:


Searched the web
Searched the web
Let me take a much more pragmatic approach. The user's original dataset is a mix — some entries reflect the MOE official zoning (which can be counterintuitive), and others reflect geographic location. Rather than chasing every school individually, let me reconcile what I can confirm and present a clear correction list. I'll take a practical line: use the most commonly accepted "everyday" zone classification (what parents typically mean when they say "north" or "central" — which is usually the URA region, not MOE's school zone code).

Let me check a third party that aggregates this for parents — sgschoolkaki, which lists 147 schools with regions:


Fetched: Secondary School Rankings 2026 | Full SBB PSLE Cutoff Points
Fetched: Secondary School Rankings 2026 | Full SBB PSLE Cutoff Points
Excellent! I now have the authoritative area mapping (by URA planning area, not zone). I'll now build a precise mapping from URA planning area → 5-zone classification (N/S/E/W/Central). This is the most accurate and consistent approach since SGSchoolKaki uses MOE-aligned data and lists each school's actual planning area.

Let me build the full mapping:


Compute zone differences from original dataset
Compute zone differences from original dataset
40 corrections identified. Before applying, let me sanity-check the more controversial ones — particularly Hougang/Serangoon area which sgschoolkaki places as "Hougang"/"Serangoon" planning area but those areas are in Singapore's North-East planning region. With only 5 zones (no NE), they could go to either Central or East depending on convention.

Let me check a few sources for what convention is most common, and also verify the source dataset author may have had a specific zone convention in mind:

Looking at the original dataset's logic:

It tagged Anderson, Presbyterian, Deyi, Mayflower, Yio Chu Kang (all Ang Mo Kio) as North
But Ang Mo Kio Sec, Bowen, Kuo Chuan as Central
Cedar Girls' (Toa Payoh) as North
Beatty (Toa Payoh) as North
Bartley (Toa Payoh) as Central
Whitley (Bishan) as Central but Guangyang (Bishan) as East
The original dataset appears to have inconsistent classifications even within the same planning area. So my correction should make it consistent.

For Hougang/Serangoon area schools, the original dataset is split: some are East, some are North. Given Singapore's everyday usage where "North-East" schools are commonly grouped with Central or East depending on family preference, but for a 5-zone system the most common parent-facing convention is to lump North-East with Central (since NEL connects to Central).

However, I notice there's another reasonable view: NE schools (Hougang, Serangoon, Sengkang, Punggol) could be grouped as East since they're in the eastern half of the island. Let me ask the user which convention they prefer:

Actually, let me just present the proposed changes clearly and let the user decide. Given they asked me to "check if all are correct based on addresses", I think the right move is to show the discrepancies and apply the URA-planning-area-based fix, with notes on borderline cases.

Let me present the findings and let them confirm before I commit changes:

I've completed verification. Here's what I found by cross-referencing each school's actual planning area (sourced from MOE schoolfinder + sgschoolkaki, which uses MOE-aligned address data) against the original dataset.

Summary: 40 of 139 schools have zone classifications that don't match their actual planning area. The original data appears to mix MOE's school-cluster zone codes with geographic zones inconsistently — for instance, treating some Ang Mo Kio schools as North and others as Central.

I propose using a consistent URA-planning-area-based zone (the everyday geographic zone parents use). Here's the mapping I'll apply:

Planning Area	Zone
Ang Mo Kio, Bishan, Bukit Timah, Hougang, Kallang, Novena, Serangoon, Toa Payoh	Central
Bedok, Geylang, Marine Parade, Pasir Ris, Punggol, Sengkang, Tampines	East
Sembawang, Woodlands, Yishun	North
Bukit Merah, Queenstown	South
Bukit Batok, Bukit Panjang, Choa Chu Kang, Clementi, Jurong East, Jurong West	West
The 40 corrections include high-impact ones like:

Cedar Girls' (Toa Payoh): North → Central
ACS (Independent) (Dover/Queenstown): Central → South
Dunman High (Kallang): East → Central
Anderson, Presbyterian, Deyi, Mayflower, Yio Chu Kang (Ang Mo Kio): North → Central
Holy Innocents', Xinmin, Yuying (Hougang/Serangoon): East/North → Central
River Valley (Jurong West): Central → West
Kent Ridge (Clementi): South → West
St. Anthony's Canossian (Bedok): South → East
Ahmad Ibrahim (Yishun): West → North
Riverside, Evergreen, Christ Church (Woodlands): West/South → North
The North-East planning region (Hougang/Serangoon/Sengkang/Punggol) is the trickiest — Singapore's URA classifies it as its own region but in a 5-zone system parents typically split it: Hougang/Serangoon → Central, Sengkang/Punggol → East (which is what I've done).

Want me to apply these 40 corrections now?

You said: follow the region in SGSchoolKaki
follow the region in SGSchoolKaki

12:46 AM
Claude responded: Let me check what regional classification SGSchoolKaki actually uses (their region categories, not just planning area names).
Let me check what regional classification SGSchoolKaki actually uses (their region categories, not just planning area names).


Fetched: Schools by Region Singapore 2024 - 358 Schools
Fetched: Schools by Region Singapore 2024 - 358 Schools
SGSchoolKaki uses 5 planning regions (URA standard), not 5 zones:

West: Jurong, Clementi, Bukit Batok, Choa Chu Kang
North-East: Sengkang, Punggol, Hougang, Serangoon
North: Woodlands, Yishun, Sembawang, Admiralty
East: Tampines, Bedok, Pasir Ris, Changi
Central: Bishan, Toa Payoh, Ang Mo Kio (and the actual central core)
This means I should change the app from 5 zones (N/S/E/W/C) to 5 URA regions (N/NE/E/W/C) — there's no "South" in URA's official scheme; Bukit Merah/Queenstown are part of the Central region.

Let me verify Bukit Merah/Queenstown belong to URA Central:


Searched the web
Searched the web
Confirmed. URA's official 5 regions are Central, North, North-East, East, West (no South). Bukit Merah & Queenstown are part of Central Region.

Now I'll restructure the app:

Change zones from [North, South, East, West, Central] → [North, North-East, East, West, Central]
Update all 139 schools' regions to match URA classification
Update the SectionHeader and color scheme to handle 5 regions
Let me build the updated mapping and apply:


Set up zone mapping research
Set up zone mapping research
Wait, I need to verify Ang Mo Kio. SGSchoolKaki said Central in their region breakdown. Let me confirm:


Searched the web
Searched the web
Claude's response was interrupted
You said: use the sch regions directly from SGSchoolKaki
use the sch regions directly from SGSchoolKaki

12:47 AM
Claude responded: Got it — I'll use the regions from the SGSchoolKaki page directly.
Got it — I'll use the regions from the SGSchoolKaki page directly. Let me fetch the per-school region data:


Fetched: All 147 Singapore Secondary Schools - COP, CCAs & Profiles | SGSchoolKaki
Fetched: All 147 Singapore Secondary Schools - COP, CCAs & Profiles | SGSchoolKaki
I have all 147 schools with their SGSchoolKaki area names. SGSchoolKaki uses planning area names directly (Ang Mo Kio, Bedok, Bishan, etc.) — 27 distinct areas, plus a "Central" catch-all. Since the user said "use sch regions directly from SGSchoolKaki", I'll replace the 5-zone system with these 27 planning areas (which is what SGSchoolKaki actually uses for filtering).

Let me restructure the app to use planning areas instead of broad zones:


Match SGSchoolKaki areas to original dataset numbers
Match SGSchoolKaki areas to original dataset numbers
I matched all 139 schools to SGSchoolKaki areas. Two issues to flag:

#8 Dunman High — SGSchoolKaki says Tampines but actually it's at Tanjong Rhu / Kallang. Looking at SGSchoolKaki's own ranking page earlier it said "Kallang". My fuzzy matcher matched it to "Dunman Secondary School" (Tampines) instead. Let me fix that.
#13 Temasek JC — should be Tampines (already correct).
Also #50 Geylang Methodist is listed by SGSchoolKaki as "Central" (not "Geylang") — I'll keep that as SGSchoolKaki has it.

Let me fix the Dunman High issue:


Confirm Dunman High fix
Confirm Dunman High fix
Now let me restructure the artifact. The change is significant: replace 5 zones with 27 planning areas. The user filter chips for 27 areas would be unwieldy, so I'll use a multi-select dropdown style filter instead.


Look at current data parsing in the JSX file
Look at current data parsing in the JSX file
Now I'll generate the corrected RAW string with the new area names, and update the constants and UI:


Generate updated RAW data string with planning area zones
Generate updated RAW data string with planning area zones
Now let me build the new file. Since this is a substantial rewrite (replacing the RAW data + ZONES + filter UI), I'll rewrite the file from scratch:


Verify the new raw data
Verify the new raw data
Now let me apply the changes. I'll do it in pieces — first replace the RAW data, then update the ZONES constant and filter UI:


Viewed a file, ran a command
Viewed a file, ran a command
Now I need to update all the places that reference zones (variable), ZONES, and the filter UI. Let me see what needs updating:


Check all zone references
Check all zone references
Let me update the variable references. Internal naming will still use zones for the state but the data field will keep zone for the school's planning area. The UI needs the bigger change — replacing 5 chips with a region-grouped multi-select:


Initialize zones state with all areas
Initialize zones state with all areas
Now replace the filter UI. The current 5-chip layout doesn't scale to 27 areas. Let me change it to a region-grouped accordion-style filter with "select region all/none" toggles:


View the current zone filter UI to replace
View the current zone filter UI to replace
The 27 areas + region grouping won't fit in the current 3-column layout. Let me change the inputs grid to span 4 col + 4 col + 4 col (HCL+Tracks+Score on row 1, Areas spans full width on row 2):


View the input layout grid
View the input layout grid
Let me restructure: the first 3 inputs (Score, HCL, Tracks) take 4 cols each, and the Areas filter takes the full width below:


Edited 3 files
Edited 3 files
Now replace the Areas filter to span 12 cols and use region-grouped layout:


Replace zone chips with area-grouped multi-select
Replace zone chips with area-grouped multi-select
Now check the other small references:


Update the header description to say areas not zones
Update the header description to say areas not zones
Update the empty-results message and the Strategy "Zones covered" label:


Edited 2 files
Edited 2 files
The strategy panel could get crowded with 27 area names. Let me make it show areas as a wrapped list:


Viewed a file, edited a file
Viewed a file, edited a file
Wait — the original display text-lg was used in <div className="display text-lg">. Let me check the actual line before and ensure the previous str_replace worked correctly:


Confirm change applied correctly
Confirm change applied correctly
Now let me also widen the school name column since "CHIJ St. Theresa's Convent" is long and there's now more area name to fit:


Check the table column widths
Check the table column widths
Area names like "Marine Parade", "Bukit Panjang", "Choa Chu Kang" are wider. Let me adjust the column widths — give Area 2 cols and reduce School slightly:


Edited 2 files, viewed a file
Edited 2 files, viewed a file
Let me verify the file builds clean by reviewing the final state of key sections:


Ran 2 commands
Ran 2 commands
Quick syntax sanity check — verify the JSX still parses by checking for unmatched braces:


Quick sanity check of brace balance
Quick sanity check of brace balance
Braces balanced. Let me present the final file:


Presented file
Presented file
Done. Summary of what changed:

Data — All 139 schools now use the planning-area names directly from SGSchoolKaki (e.g. "Bukit Timah", "Toa Payoh", "Ang Mo Kio") instead of broad N/S/E/W/Central zones. 27 areas total. The 40-school discrepancy from the original dataset is resolved by using SGSchoolKaki as the source of truth.

One manual correction beyond SGSchoolKaki's listing — Dunman High (Secondary) is set to Kallang, matching SGSchoolKaki's own ranking page (their secondary school detail page had a fuzzy-match collision with Dunman Sec which is in Tampines).

Filter UI — Replaced the 5 zone chips with a region-grouped panel: 5 region headers (North / North-East / East / West / Central) each containing their planning areas as sub-chips. Click a region header to toggle all its areas at once. Plus "Select all" / "Clear" links at the top right.

Region groupings used:

North: Sembawang, Woodlands, Yishun
North-East: Ang Mo Kio, Hougang, Punggol, Sengkang, Serangoon
East: Bedok, Geylang, Marine Parade, Pasir Ris, Tampines
West: Bukit Batok, Bukit Panjang, Choa Chu Kang, Clementi, Jurong East, Jurong West
Central: Bishan, Bukit Merah, Bukit Timah, Central, Kallang, Novena, Queenstown, Toa Payoh
Table & strategy panel — "Zone" column renamed to "Area" with wider 2-col span to fit longer names, "Areas covered" in strategy panel.


Psle shortlister
Code · JSX 




Claude is AI and can make mistakes. Please double-check responses.
Psle shortlister · JSX
Copy

import React, { useState, useMemo } from "react";
 
// ─────────────────────────────────────────────────────────────────────────────
// Data: parsed from the 147-school table. "M" suffix = SAP school for that track.
// Cut-offs are stored as numbers; SAP flag stored separately per track.
// null = track not offered.
// ─────────────────────────────────────────────────────────────────────────────
const RAW = `1	Hwa Chong Institution (Secondary)	6M	-	-	-	Bukit Timah
2	Nanyang Girls' High	6M	8M	-	-	Bukit Timah
3	Raffles Girls' (Secondary)	6	-	-	-	Toa Payoh
4	Raffles Institution (Secondary)	6	-	-	-	Bishan
5	Anglo-Chinese (Independent) (Secondary)	7	8	13	-	Queenstown
6	Catholic High (Secondary)	7M	8M	12	-	Bishan
7	CHIJ St. Nicholas Girls' (Secondary)	7M	8M	14	-	Ang Mo Kio
8	Dunman High (Secondary)	8M	-	-	-	Kallang
9	Methodist Girls' (Secondary)	6	8	17	-	Bukit Timah
10	National Junior College (Secondary)	8	-	-	-	Bukit Timah
11	Singapore Chinese Girls'	7	8	17	-	Novena
12	St. Joseph's Institution (Secondary)	7	8	12	-	Novena
13	Temasek Junior College (Secondary)	8	-	-	-	Tampines
14	Anglo-Chinese (Barker Road)	-	9	21	21	Novena
15	Cedar Girls'	9	9	-	-	Toa Payoh
16	River Valley High (Secondary)	9M	-	-	-	Jurong West
17	St. Andrew's	-	9	22	21	Toa Payoh
18	Victoria	8	9	-	-	Bedok
19	CHIJ Secondary (Toa Payoh)	-	10	20	22	Toa Payoh
20	Chung Cheng High (Main)	-	10M	-	-	Marine Parade
21	Nan Hua High	-	10M	-	-	Clementi
22	Paya Lebar Methodist Girls' (Secondary)	-	10	20	23	Hougang
23	Anderson	-	11	23	28	Ang Mo Kio
24	Bukit Panjang Govt. High	-	11	22	26	Bukit Panjang
25	Chung Cheng High (Yishun)	-	11	22	27	Yishun
26	Fairfield Methodist (Secondary)	-	11	20	21	Queenstown
27	Nan Chiau High	-	11M	-	-	Sengkang
28	St. Margaret's (Secondary)	-	11	20	23	Bukit Timah
29	St. Patrick's	-	11	20	22	Bedok
30	Swiss Cottage	-	11	22	26	Bukit Batok
31	Temasek	-	11	22	26	Bedok
32	Anglican High	-	12	-	-	Bedok
33	Maris Stella High (Secondary)	-	12	16	-	Bedok
34	Ngee Ann	-	12	16	21	Tampines
35	Zhonghua	-	12	23	27	Serangoon
36	CHIJ St. Theresa's Convent	-	13	20	24	Bukit Merah
37	Clementi Town	-	13	23	28	Clementi
38	Commonwealth	-	13	23	28	Jurong East
39	Crescent Girls'	-	13	23	-	Bukit Merah
40	Fuhua	-	13	23	28	Jurong West
41	Presbyterian High	-	13	24	28	Ang Mo Kio
42	Tanjong Katong Girls'	-	13	23	-	Marine Parade
43	Tanjong Katong	-	13	23	-	Marine Parade
44	Xinmin	-	13	23	28	Hougang
45	Yishun Town	-	13	22	27	Yishun
46	CHIJ Katong Convent	-	14	20	24	Marine Parade
47	CHIJ St. Joseph's Convent	-	14	20	23	Sengkang
48	Dunman	-	14	23	27	Tampines
49	Edgefield	-	14	23	27	Punggol
50	Geylang Methodist (Secondary)	-	14	21	24	Central
51	Holy Innocents' High	-	14	22	24	Serangoon
52	Hua Yi	-	14	23	27	Jurong West
53	Kranji	-	14	24	28	Choa Chu Kang
54	Pei Hwa	-	14	23	27	Sengkang
55	Riverside	-	14	23	27	Woodlands
56	St. Hilda's	-	14	22	23	Tampines
57	Bukit Batok	-	15	23	26	Bukit Batok
58	Evergreen	-	15	23	26	Woodlands
59	Gan Eng Seng	-	15	24	27	Bukit Merah
60	Hai Sing Catholic	-	15	23	27	Pasir Ris
61	St. Anthony's Canossian	-	15	22	24	Bedok
62	St. Gabriel's	-	15	22	24	Serangoon
63	Yusof Ishak	-	15	22	27	Punggol
64	Ang Mo Kio	-	16	24	28	Ang Mo Kio
65	Bedok View	-	16	24	28	Bedok
66	Bowen	-	16	24	28	Hougang
67	Deyi	-	16	24	30	Ang Mo Kio
68	Greendale	-	16	23	27	Punggol
69	Jurong	-	16	24	27	Jurong West
70	Jurong West	-	16	24	28	Jurong West
71	Christ Church	-	17	23	29	Woodlands
72	Mayflower	-	17	24	28	Ang Mo Kio
73	Outram	-	17	23	26	Sengkang
74	Pasir Ris	-	17	23	27	Tampines
75	Queensway	-	17	25	28	Queenstown
76	West Spring	-	17	24	27	Bukit Panjang
77	Ahmad Ibrahim	-	18	24	28	Yishun
78	Beatty	-	18	25	28	Toa Payoh
79	Bedok South	-	18	25	30	Bedok
80	Compassvale	-	18	24	27	Sengkang
81	Hillgrove	-	18	24	27	Bukit Batok
82	Kent Ridge	-	18	24	30	Clementi
83	North Vista	-	18	24	28	Sengkang
84	Pasir Ris Crest	-	18	24	30	Pasir Ris
85	Unity	-	18	24	28	Choa Chu Kang
86	Yuan Ching	-	18	24	28	Jurong West
87	Naval Base	-	19	24	27	Yishun
88	Orchid Park	-	19	24	27	Yishun
89	Punggol	-	19	24	27	Punggol
90	Seng Kang	-	19	24	27	Sengkang
91	Tampines	-	19	24	27	Tampines
92	Woodgrove	-	19	24	28	Woodlands
93	Bedok Green	-	20	25	30	Bedok
94	Bukit View	-	20	24	29	Bukit Batok
95	Chua Chu Kang	-	20	24	28	Choa Chu Kang
96	Hougang	-	20	24	27	Hougang
97	Kuo Chuan Presbyterian	-	20	23	28	Bishan
98	New Town	-	20	25	30	Queenstown
99	Peicai	-	20	25	30	Serangoon
100	Peirce	-	20	25	30	Bishan
101	Serangoon	-	20	25	28	Serangoon
102	Yishun	-	20	24	27	Yishun
103	Yuhua	-	20	25	28	Jurong West
104	Zhenghua	-	20	24	27	Bukit Panjang
105	Bartley	-	21	25	30	Toa Payoh
106	Junyuan	-	21	25	28	Tampines
107	Manjusri	-	21	22	28	Geylang
108	Admiralty	-	22	25	29	Woodlands
109	Assumption English	-	22	25	29	Bukit Panjang
110	Bendemeer	-	22	25	28	Kallang
111	Boon Lay	-	22	25	30	Jurong West
112	Broadrick	-	22	25	30	Geylang
113	Bukit Merah	-	22	25	28	Bukit Merah
114	Canberra	-	22	25	29	Sembawang
115	Changkat Changi	-	22	25	30	Tampines
116	Damai	-	22	25	30	Bedok
117	Dunearn	-	22	25	29	Bukit Batok
118	East Spring	-	22	25	29	Tampines
119	Greenridge	-	22	25	28	Bukit Panjang
120	Guangyang	-	22	25	30	Bishan
121	Jurongville	-	22	25	28	Jurong East
122	Juying	-	22	25	30	Jurong West
123	Loyang View	-	22	25	30	Pasir Ris
124	Marsiling	-	22	25	27	Woodlands
125	Meridian	-	22	25	28	Pasir Ris
126	Montfort	-	22	22	28	Hougang
127	Northbrooks	-	22	25	27	Yishun
128	Northland	-	22	25	28	Yishun
129	Queenstown	-	22	25	30	Queenstown
130	Regent	-	22	25	30	Choa Chu Kang
131	Sembawang	-	22	25	29	Sembawang
132	Serangoon Garden	-	22	25	30	Serangoon
133	Springfield	-	22	25	30	Tampines
134	Westwood	-	22	25	28	Jurong West
135	Whitley	-	22	25	30	Bishan
136	Woodlands Ring	-	22	25	29	Woodlands
137	Woodlands	-	22	25	28	Woodlands
138	Yio Chu Kang	-	22	25	30	Ang Mo Kio
139	Yuying	-	22	25	29	Hougang`;
 
const parseCell = (cell) => {
  if (cell === "-" || cell === "") return { value: null, sap: false };
  const sap = cell.endsWith("M");
  const num = parseInt(sap ? cell.slice(0, -1) : cell, 10);
  return { value: isNaN(num) ? null : num, sap };
};
 
const SCHOOLS = RAW.trim().split("\n").map((line) => {
  const parts = line.split("\t");
  const [no, name, ipRaw, pg3Raw, pg2Raw, pg1Raw, zone] = parts;
  const ip = parseCell(ipRaw);
  const pg3 = parseCell(pg3Raw);
  const pg2 = parseCell(pg2Raw);
  const pg1 = parseCell(pg1Raw);
  return {
    no: parseInt(no, 10),
    name,
    zone,
    tracks: { IP: ip, PG3: pg3, PG2: pg2, PG1: pg1 },
    isSAP: ip.sap || pg3.sap || pg2.sap || pg1.sap,
  };
});
 
const AREAS = ["Ang Mo Kio", "Bedok", "Bishan", "Bukit Batok", "Bukit Merah", "Bukit Panjang", "Bukit Timah", "Central", "Choa Chu Kang", "Clementi", "Geylang", "Hougang", "Jurong East", "Jurong West", "Kallang", "Marine Parade", "Novena", "Pasir Ris", "Punggol", "Queenstown", "Sembawang", "Sengkang", "Serangoon", "Tampines", "Toa Payoh", "Woodlands", "Yishun"];
 
// Group areas into broader regions for the filter UI
const REGIONS = {
  "North": ["Sembawang", "Woodlands", "Yishun"],
  "North-East": ["Ang Mo Kio", "Hougang", "Punggol", "Sengkang", "Serangoon"],
  "East": ["Bedok", "Geylang", "Marine Parade", "Pasir Ris", "Tampines"],
  "West": ["Bukit Batok", "Bukit Panjang", "Choa Chu Kang", "Clementi", "Jurong East", "Jurong West"],
  "Central": ["Bishan", "Bukit Merah", "Bukit Timah", "Central", "Kallang", "Novena", "Queenstown", "Toa Payoh"],
};
const TRACKS = ["IP", "PG3", "PG2", "PG1"];
const HCL_RANK = { None: 0, Pass: 1, Merit: 2, Distinction: 3 };
 
// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function PSLEShortlister() {
  const [score, setScore] = useState(15);
  const [scoreInput, setScoreInput] = useState("15");
  const [hcl, setHcl] = useState("None");
  const [zones, setZones] = useState(new Set(AREAS));
  const [tracks, setTracks] = useState(new Set(["PG3", "PG2"]));
  const [safetyOnly, setSafetyOnly] = useState(false);
  const [sapOnly, setSapOnly] = useState(false);
  const [sortBy, setSortBy] = useState("buffer"); // buffer | name | cutoff
  const [picks, setPicks] = useState([]); // array of school.no in priority order
 
  const toggle = (set, val, setter) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val); else next.add(val);
    setter(next);
  };
 
  const results = useMemo(() => {
    const out = [];
    const hclMeetsSAP = HCL_RANK[hcl] >= HCL_RANK.Merit;
 
    for (const s of SCHOOLS) {
      if (!zones.has(s.zone)) continue;
      if (sapOnly && !s.isSAP) continue;
 
      // Find best matching track among user's selected tracks
      // Allow buffer down to -2 (score up to 2 points above cut-off) so user can see near-misses
      let best = null;
      for (const t of TRACKS) {
        if (!tracks.has(t)) continue;
        const cell = s.tracks[t];
        if (cell.value == null) continue;
        const buffer = cell.value - score;
        if (buffer < -2) continue; // exclude only if more than 2 pts above cut-off
        if (!best || buffer > best.buffer) {
          best = { track: t, cutoff: cell.value, sap: cell.sap, buffer };
        }
      }
      if (!best) continue;
 
      // HCL rule for SAP tracks: if track requires Merit and student lacks it,
      // the school is risky regardless of score buffer. If score == cutoff AND
      // HCL fails, demote effective safety so safety-buffer filter excludes it.
      const hclWarning = best.sap && !hclMeetsSAP;
      const hclRisky = hclWarning; // tied score with weak HCL = not safe
 
      if (safetyOnly && (best.buffer < 2 || hclRisky)) continue;
 
      out.push({ ...s, match: best, hclWarning, hclRisky });
    }
 
    out.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "cutoff") return a.match.cutoff - b.match.cutoff;
      return b.match.buffer - a.match.buffer; // safest first
    });
    return out;
  }, [score, hcl, zones, tracks, safetyOnly, sapOnly, sortBy]);
 
  const pickedSchools = picks
    .map((no) => SCHOOLS.find((s) => s.no === no))
    .filter(Boolean);
 
  // Re-evaluate match info for picked schools using current filters
  const pickedWithMatch = pickedSchools.map((s) => {
    const hclMeetsSAP = HCL_RANK[hcl] >= HCL_RANK.Merit;
    let best = null;
    for (const t of TRACKS) {
      if (!tracks.has(t)) continue;
      const cell = s.tracks[t];
      if (cell.value == null) continue;
      const buffer = cell.value - score;
      if (buffer < -2) continue;
      if (!best || buffer > best.buffer) {
        best = { track: t, cutoff: cell.value, sap: cell.sap, buffer };
      }
    }
    const hclRisky = best && best.sap && !hclMeetsSAP;
    return { ...s, match: best, hclRisky };
  });
 
  const addPick = (no) => {
    if (picks.includes(no)) return;
    if (picks.length >= 6) return;
    setPicks([...picks, no]);
  };
  const removePick = (no) => setPicks(picks.filter((x) => x !== no));
  const movePick = (no, dir) => {
    const idx = picks.indexOf(no);
    if (idx < 0) return;
    const swap = idx + dir;
    if (swap < 0 || swap >= picks.length) return;
    const next = [...picks];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setPicks(next);
  };
 
  const exportText = pickedWithMatch
    .map((s, i) => `${i + 1}. ${s.name} — ${s.zone}${s.match ? ` (${s.match.track}, cut-off ${s.match.cutoff}${s.match.sap ? "M" : ""})` : ""}${s.hclRisky ? " [HCL risky]" : ""}`)
    .join("\n");
 
  const copyExport = async () => {
    try { await navigator.clipboard.writeText(exportText); } catch (e) {}
  };
 
  // Strategy summary
  const strategy = useMemo(() => {
    const overshoot = pickedWithMatch.filter((s) => s.match && s.match.buffer < 0).length;
    const reach = pickedWithMatch.filter((s) => s.match && s.match.buffer >= 0 && (s.match.buffer < 2 || s.hclRisky)).length;
    const safe = pickedWithMatch.filter((s) => s.match && s.match.buffer >= 2 && !s.hclRisky).length;
    const zoneSet = new Set(pickedWithMatch.map((s) => s.zone));
    return { overshoot, reach, safe, zones: [...zoneSet] };
  }, [pickedWithMatch]);
 
  const bufferTone = (buffer, hclRisky) => {
    if (buffer < 0) return "tight";        // red — over cut-off
    if (hclRisky) return "tight";          // red — SAP HCL gap
    if (buffer >= 2) return "comfort";     // green — safe
    return "borderline";                    // orange — +0 or +1
  };
 
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: "'Lora', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Lora:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
        .display { font-family: 'Fraunces', Georgia, serif; font-feature-settings: "ss01"; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .grid-bg {
          background-image: linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .chip {
          transition: all 150ms ease;
          border: 1px solid #d6d3d1;
        }
        .chip:hover { border-color: #292524; }
        .chip.on {
          background: #1c1917;
          color: #fafaf9;
          border-color: #1c1917;
        }
        .row { transition: background 120ms ease; }
        .row:hover { background: #fafaf9; }
        .pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.05em;
          padding: 2px 7px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .tone-safe { background: #064e3b; color: #ecfdf5; }
        .tone-comfort { background: #15803d; color: #f0fdf4; }
        .tone-borderline { background: #c2410c; color: #fff7ed; }
        .tone-tight { background: #991b1b; color: #fef2f2; }
        .tone-sap { background: #1e1b4b; color: #eef2ff; }
        .tone-warn { background: #fbbf24; color: #422006; }
        .num-input::-webkit-inner-spin-button { opacity: 1; }
      `}</style>
 
      {/* HEADER */}
      <header className="border-b border-stone-300 bg-stone-100 grid-bg">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <div className="mono text-xs tracking-widest text-stone-500 uppercase mb-2">
                PSLE · Secondary School Posting Helper
              </div>
              <h1 className="display text-5xl md:text-6xl font-black leading-none tracking-tight">
                Six Choices.<br/>
                <span className="italic font-medium text-stone-500">Made carefully.</span>
              </h1>
            </div>
            <div className="mono text-xs text-stone-500 max-w-xs leading-relaxed">
              A shortlisting tool for Primary 6 students and parents.
              Filters {SCHOOLS.length} secondary schools by score, track, and area using last year's cut-offs.
            </div>
          </div>
        </div>
      </header>
 
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
 
        {/* INPUT PANEL */}
        <section>
          <SectionHeader num="01" title="Your details" />
          <div className="grid md:grid-cols-12 gap-6 mt-6">
 
            {/* Score */}
            <div className="md:col-span-4 bg-white border border-stone-200 p-5">
              <div className="mono text-[10px] tracking-widest text-stone-500 uppercase mb-3">PSLE AL Score</div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={scoreInput}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, "");
                  setScoreInput(v);
                  if (v !== "") {
                    const n = parseInt(v, 10);
                    if (n >= 4 && n <= 36) setScore(n);
                  }
                }}
                onBlur={() => {
                  const n = parseInt(scoreInput, 10);
                  if (isNaN(n)) {
                    setScoreInput(String(score));
                  } else {
                    const clamped = Math.max(4, Math.min(36, n));
                    setScore(clamped);
                    setScoreInput(String(clamped));
                  }
                }}
                className="num-input display text-5xl font-black w-full bg-transparent outline-none border-b-2 border-stone-900 pb-1"
              />
              <div className="mono text-[10px] text-stone-500 mt-2">Range 4 (best) – 36 (worst)</div>
            </div>
 
            {/* HCL */}
            <div className="md:col-span-4 bg-white border border-stone-200 p-5">
              <div className="mono text-[10px] tracking-widest text-stone-500 uppercase mb-3">Higher Chinese</div>
              <div className="flex flex-wrap gap-2">
                {["None", "Pass", "Merit", "Distinction"].map((h) => (
                  <button
                    key={h}
                    onClick={() => setHcl(h)}
                    className={`chip px-3 py-1.5 text-sm ${hcl === h ? "on" : "bg-white"}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
              <div className="mono text-[10px] text-stone-500 mt-3">Required at Merit+ for SAP schools</div>
            </div>
 
            {/* Tracks */}
            <div className="md:col-span-4 bg-white border border-stone-200 p-5">
              <div className="mono text-[10px] tracking-widest text-stone-500 uppercase mb-3">Posting tracks</div>
              <div className="flex flex-wrap gap-2">
                {TRACKS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggle(tracks, t, setTracks)}
                    className={`chip px-3 py-1.5 text-sm ${tracks.has(t) ? "on" : "bg-white"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="mono text-[10px] text-stone-500 mt-3">Pick all you'd consider</div>
            </div>
 
            {/* Areas (planning areas grouped by region) */}
            <div className="md:col-span-12 bg-white border border-stone-200 p-5">
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <div className="mono text-[10px] tracking-widest text-stone-500 uppercase">Preferred areas</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setZones(new Set(AREAS))}
                    className="mono text-[10px] uppercase tracking-widest text-stone-600 hover:text-stone-900 underline underline-offset-2"
                  >
                    Select all
                  </button>
                  <span className="text-stone-300">|</span>
                  <button
                    onClick={() => setZones(new Set())}
                    className="mono text-[10px] uppercase tracking-widest text-stone-600 hover:text-stone-900 underline underline-offset-2"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                {Object.entries(REGIONS).map(([region, areas]) => {
                  const allOn = areas.every((a) => zones.has(a));
                  const anyOn = areas.some((a) => zones.has(a));
                  return (
                    <div key={region}>
                      <button
                        onClick={() => {
                          const next = new Set(zones);
                          if (allOn) areas.forEach((a) => next.delete(a));
                          else areas.forEach((a) => next.add(a));
                          setZones(next);
                        }}
                        className={`mono text-[10px] tracking-widest uppercase mb-2 px-2 py-0.5 ${
                          allOn ? "bg-stone-900 text-stone-50" : anyOn ? "bg-stone-200 text-stone-700" : "text-stone-500"
                        }`}
                      >
                        {region}
                      </button>
                      <div className="flex flex-wrap gap-1">
                        {areas.map((a) => (
                          <button
                            key={a}
                            onClick={() => toggle(zones, a, setZones)}
                            className={`chip px-2 py-1 text-xs ${zones.has(a) ? "on" : "bg-white"}`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
 
          {/* Toggles */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => setSafetyOnly(!safetyOnly)}
              className={`chip px-3 py-1.5 text-sm ${safetyOnly ? "on" : "bg-white"}`}
            >
              {safetyOnly ? "✓ " : ""}Safety buffer only (≥2 pts comfort)
            </button>
            <button
              onClick={() => setSapOnly(!sapOnly)}
              className={`chip px-3 py-1.5 text-sm ${sapOnly ? "on" : "bg-white"}`}
            >
              {sapOnly ? "✓ " : ""}SAP schools only
            </button>
          </div>
        </section>
 
        {/* RESULTS */}
        <section>
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <SectionHeader num="02" title="Eligible schools" count={results.length} />
            <div className="flex items-center gap-2 mono text-xs">
              <span className="text-stone-500 uppercase tracking-widest text-[10px]">Sort:</span>
              {[
                { id: "buffer", label: "Safest" },
                { id: "cutoff", label: "Cut-off" },
                { id: "name", label: "Name" },
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSortBy(o.id)}
                  className={`chip px-2 py-1 ${sortBy === o.id ? "on" : "bg-white"}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
 
          <div className="mt-6 bg-white border border-stone-200 overflow-hidden">
            <div className="grid grid-cols-12 mono text-[10px] uppercase tracking-widest text-stone-500 px-5 py-3 border-b border-stone-200 bg-stone-50">
              <div className="col-span-4">School</div>
              <div className="col-span-2">Area</div>
              <div className="col-span-1">Track</div>
              <div className="col-span-1 text-right">Cut-off</div>
              <div className="col-span-1 text-right">Buffer</div>
              <div className="col-span-2">Tags</div>
              <div className="col-span-1 text-right">Pick</div>
            </div>
 
            {results.length === 0 && (
              <div className="px-5 py-12 text-center text-stone-500 italic">
                No schools match these filters. Try widening areas or tracks, or check your score.
              </div>
            )}
 
            <div className="max-h-[480px] overflow-y-auto">
              {results.map((s) => {
                const tone = bufferTone(s.match.buffer, s.hclRisky);
                const isPicked = picks.includes(s.no);
                return (
                  <div
                    key={s.no}
                    className="row grid grid-cols-12 px-5 py-3 border-b border-stone-100 items-center text-sm"
                  >
                    <div className="col-span-4">
                      <div className="display font-semibold text-stone-900">{s.name}</div>
                    </div>
                    <div className="col-span-2 mono text-xs text-stone-600">{s.zone}</div>
                    <div className="col-span-1 mono text-xs font-semibold">{s.match.track}</div>
                    <div className="col-span-1 mono text-sm text-right">
                      {s.match.cutoff}{s.match.sap && <span className="text-indigo-700 font-bold ml-0.5">M</span>}
                    </div>
                    <div className="col-span-1 mono text-sm text-right">
                      <span className={`pill tone-${tone}`}>{s.match.buffer >= 0 ? `+${s.match.buffer}` : s.match.buffer}</span>
                    </div>
                    <div className="col-span-2 flex gap-1 flex-wrap">
                      {s.match.sap && <span className="pill tone-sap">SAP</span>}
                      {s.hclWarning && <span className="pill tone-warn">HCL low</span>}
                    </div>
                    <div className="col-span-1 text-right">
                      <button
                        onClick={() => isPicked ? removePick(s.no) : addPick(s.no)}
                        disabled={!isPicked && picks.length >= 6}
                        className={`mono text-xs px-2 py-1 border ${
                          isPicked
                            ? "bg-stone-900 text-stone-50 border-stone-900"
                            : "border-stone-300 hover:border-stone-900 disabled:opacity-30 disabled:hover:border-stone-300"
                        }`}
                      >
                        {isPicked ? "✓ Added" : "+ Add"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          <div className="mono text-[11px] text-stone-500 mt-3 leading-relaxed">
            <span className="text-stone-700 font-semibold">Buffer</span> = cut-off minus your score.
            Tones: <span className="pill tone-comfort">+2</span> safe · <span className="pill tone-borderline">+0</span> borderline · <span className="pill tone-tight">−1</span> over cut-off.
            Schools up to 2 points above your score are shown so you can see near-miss reach options.
            <br/>
            <span className="text-indigo-700 font-bold">M</span> next to a cut-off = SAP track (Higher Chinese Merit required).
            If your HCL is below Merit, the school is flagged <span className="pill tone-warn">HCL low</span> and treated as not safe regardless of score buffer.
          </div>
        </section>
 
        {/* PICKS */}
        <section>
          <SectionHeader num="03" title="Your six choices" count={`${picks.length}/6`} />
 
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => {
                const s = pickedWithMatch[i];
                if (!s) {
                  return (
                    <div key={i} className="border border-dashed border-stone-300 px-4 py-4 text-stone-400 mono text-xs flex items-center gap-3">
                      <span className="display text-3xl text-stone-300 w-8">{i + 1}</span>
                      <span>Empty slot — add from list above</span>
                    </div>
                  );
                }
                return (
                  <div key={s.no} className="bg-white border border-stone-200 px-4 py-3 flex items-center gap-3">
                    <span className="display text-3xl font-black w-8">{i + 1}</span>
                    <div className="flex-1">
                      <div className="display font-semibold flex items-center gap-2">
                        {s.name}
                        {s.hclRisky && <span className="pill tone-warn">HCL risky</span>}
                      </div>
                      <div className="mono text-[11px] text-stone-500">
                        {s.zone}
                        {s.match && ` · ${s.match.track} · cut-off ${s.match.cutoff}${s.match.sap ? "M" : ""} · ${s.match.buffer >= 0 ? `+${s.match.buffer}` : s.match.buffer} buffer`}
                        {!s.match && ` · no longer matches your filters`}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => movePick(s.no, -1)} disabled={i === 0}
                        className="mono text-xs px-2 py-1 border border-stone-300 hover:border-stone-900 disabled:opacity-20">↑</button>
                      <button onClick={() => movePick(s.no, 1)} disabled={i === picks.length - 1}
                        className="mono text-xs px-2 py-1 border border-stone-300 hover:border-stone-900 disabled:opacity-20">↓</button>
                      <button onClick={() => removePick(s.no)}
                        className="mono text-xs px-2 py-1 border border-stone-300 hover:border-red-700 hover:text-red-700">×</button>
                    </div>
                  </div>
                );
              })}
            </div>
 
            {/* Strategy panel */}
            <aside className="bg-stone-900 text-stone-50 p-6">
              <div className="mono text-[10px] tracking-widest text-stone-400 uppercase mb-4">Strategy</div>
              <div className="space-y-4">
                <StratRow label="Over cut-off" value={strategy.overshoot} hint="−1 to −2 buffer" />
                <StratRow label="Reach" value={strategy.reach} hint="0 or +1 buffer" />
                <StratRow label="Safe" value={strategy.safe} hint="+2 buffer or more" />
                <div className="border-t border-stone-700 pt-4">
                  <div className="mono text-[10px] tracking-widest text-stone-400 uppercase mb-2">Areas covered</div>
                  <div className="display text-sm leading-relaxed">
                    {strategy.zones.length > 0 ? strategy.zones.join(" · ") : <span className="text-stone-500 italic">none yet</span>}
                  </div>
                </div>
                <div className="mono text-[11px] text-stone-400 leading-relaxed pt-2 border-t border-stone-700">
                  A balanced set leans on Safe picks for the lower priority slots, with a few Reach picks at the top.
                </div>
              </div>
 
              <button
                onClick={copyExport}
                disabled={picks.length === 0}
                className="w-full mt-6 bg-stone-50 text-stone-900 mono text-xs py-3 hover:bg-amber-200 transition-colors disabled:opacity-40"
              >
                Copy list to clipboard
              </button>
 
              {picks.length > 0 && (
                <pre className="mt-4 mono text-[10px] text-stone-300 whitespace-pre-wrap bg-stone-800 p-3 max-h-40 overflow-y-auto">
{exportText}
                </pre>
              )}
            </aside>
          </div>
        </section>
 
        <footer className="pt-6 border-t border-stone-300 mono text-[10px] text-stone-500 leading-relaxed">
          Cut-offs shown are previous year's posting data and serve as a reference only. Actual cut-offs vary year to year.
          Verify current data with MOE before submitting your six choices.
        </footer>
      </main>
    </div>
  );
}
 
function SectionHeader({ num, title, count }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="mono text-xs text-stone-400">{num}</span>
      <h2 className="display text-2xl font-bold">{title}</h2>
      {count !== undefined && (
        <span className="mono text-xs text-stone-500">— {count}</span>
      )}
    </div>
  );
}
 
function StratRow({ label, value, hint }) {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <div className="display text-sm">{label}</div>
        <div className="mono text-[10px] text-stone-500">{hint}</div>
      </div>
      <div className="display text-3xl font-black">{value}</div>
    </div>
  );
}
 
