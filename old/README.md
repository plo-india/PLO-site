# Panini Linguistics Olympiad (PLO) Website

This is a static website for the **Panini Linguistics Olympiad (PLO)**.

### Technologies

* HTML
* CSS
* JavaScript

No backend or database is required.

---

## Project Structure

```text
PLO/
│
├── index.html
├── about.html
├── team.html
├── participants.html
├── results.html
├── resources.html
├── practice.html
├── centres.html
├── contact.html
├── faq.html
│
├── plo.html
├── lingistics.html
├── ilo.html
│
├── styles.css
├── script.js
│
├── images/
│   └── logos, images, etc.
│
└── README.md
```

---

# Updating Website Content

## 1. Home Page – `index.html`

### Add a new event to the timeline

Copy an existing timeline event and replace the values marked below.

```html
<div class="timeline-row left/right highlight" data-date="YYYY-MM-DD">

    <div class="timeline-dot">
        <span>DD</span>
    </div>

    <div class="timeline-content">

        <span class="timeline-date">
            MONTH YEAR
        </span>

        <span class="status-pill gold">(optional)
            EVENT STATUS
        </span>

        <h4>
            EVENT NAME
        </h4>

        <p>
            EVENT DESCRIPTION
        </p>

    </div>

</div>
```

Replace:

* `left` → use `left` or `right` for timeline position
* `YYYY-MM-DD` → event date
* `DD` → sequence number
* `MONTH YEAR` → displayed date
* `EVENT STATUS` → event status
* `EVENT NAME` → event/program name
* `EVENT DESCRIPTION` → short description

---

## 2. About Page – `about.html`

### Add a new event/program/section

Copy an existing section and replace the required information.

```html
<section class="card" style="background: var(--dark-navy); color: var(--accent-yellow); padding: 40px; margin-bottom: 50px;">

    <div class="grid-2" style="align-items: center;">

        <div>

            <h2>PROGRAM / EVENT NAME</h2>

            <p style="color: var(--white);">
                PROGRAM / EVENT DESCRIPTION
            </p>

            <a href="PAGE-OR-LINK.html" class="text-link">
                MORE INFORMATION ↗
            </a>

        </div>

        <div>

            <img src="images/IMAGE-FILE"
                 alt="IMAGE DESCRIPTION"
                 style="width: 100%; border-radius: var(--radius-md);">

        </div>

    </div>

</section>
```

Replace:

* `PROGRAM / EVENT NAME`
* `PROGRAM / EVENT DESCRIPTION`
* `PAGE-OR-LINK.html`
* `MORE INFORMATION`
* `IMAGE-FILE`
* `IMAGE DESCRIPTION`

---

## 3. Team Page – `team.html`

### Add a new team member

Copy an existing team member card.

```html
<div class="card" style="text-align: center;">

    <img src="IMAGE-URL"
         alt="MEMBER NAME"
         style="width: 90px; height: 90px; border-radius: 50%; margin-bottom: 12px;">

    <h3 style="margin-top: 8px;">
        MEMBER NAME
    </h3>

    <span class="badge badge-category">
        MEMBER ROLE
    </span>

    <p style="font-size: 0.85rem; color: var(--text-dark); margin-top: 6px;">
        MEMBER DESCRIPTION
    </p>

</div>
```

Replace:

* `IMAGE-URL`
* `MEMBER NAME`
* `MEMBER ROLE`
* `MEMBER DESCRIPTION`

---

## 4. FAQ Page – `faq.html`

### Add a new question

Copy an existing FAQ item.

```html
<div class="accordion-item">

    <div class="accordion-header">
        QUESTION
        <span>▼</span>
    </div>

    <div class="accordion-body">
        ANSWER
    </div>

</div>
```

Replace:

* `QUESTION`
* `ANSWER`

---

# 5. Results Page – `results.html`

## Add CAMP Results

Copy an existing CAMP results panel.

```html
<div class="year-panel" id="YEAR-camp">

    <table class="archive-table">

        <thead>
            <tr>
                <th>Name</th>
                <th></th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <td>PARTICIPANT NAME</td>
                <td>
                    <span class="medal gold">MEDAL</span>
                </td>
            </tr>

            <tr>
                <td>PARTICIPANT NAME</td>
                <td>
                    <span class="medal silver">MEDAL</span>
                </td>
            </tr>

            <tr>
                <td>PARTICIPANT NAME</td>
                <td>
                    <span class="medal bronze">MEDAL</span>
                </td>
            </tr>

        </tbody>

    </table>

</div>
```

Replace:

* `YEAR`
* `PARTICIPANT NAME`
* `MEDAL`

Available medal classes:

```text
gold
silver
bronze
hm
```

---

## Add IOL Results

```html
<div class="year-panel" id="YEAR-iol">

    <div class="team-heading">
        TEAM NAME
    </div>

    <table class="archive-table">

        <tbody>

            <tr>
                <td>PARTICIPANT NAME</td>
                <td>
                    <span class="medal gold">MEDAL</span>
                </td>
            </tr>

            <tr>
                <td>PARTICIPANT NAME</td>
                <td></td>
            </tr>

            <tr class="leader-row">
                <td colspan="2">
                    Team Leader: TEAM LEADER NAME
                </td>
            </tr>

        </tbody>

    </table>

</div>
```

Replace:

* `YEAR`
* `TEAM NAME`
* `PARTICIPANT NAME`
* `MEDAL`
* `TEAM LEADER NAME`

---

# 6. Resources Page – `resources.html`

### Add a new resource

Inside the resources table `<tbody>`, add:

```html
<tr data-difficulty="DIFFICULTY">

    <td>
        <a href="RESOURCE-LINK"
           class="table-title-link"
           target="_blank">
            RESOURCE NAME
        </a>
    </td>

    <td>CATEGORY</td>

    <td>
        <a href="SOLUTION-LINK"
           class="solution-link"
           target="_blank">
            Solution to RESOURCE NAME
        </a>
    </td>

    <td>AUTHOR NAME</td>

</tr>
```

Replace:

* `DIFFICULTY`
* `RESOURCE-LINK`
* `RESOURCE NAME`
* `CATEGORY`
* `SOLUTION-LINK`
* `AUTHOR NAME`

### Difficulty

Use only:

```text
easy
medium
hard
expert
```

### Category

Use:

```text
Junior
Senior
All
```

---

# 7. Practice Page – `practice.html`

### Add a new practice problem

Copy an existing practice card.

```html
<div class="card">

    <span class="badge badge-DIFFICULTY">
        DIFFICULTY
    </span>

    <span class="badge badge-category">
        CATEGORY
    </span>

    <h3 style="margin: 12px 0;">
        PROBLEM TITLE
    </h3>

    <p style="color: var(--text-muted); margin-bottom: 16px;">
        PROBLEM DESCRIPTION
    </p>

    <button class="btn-primary toggle-answer-btn"
            style="width: 100%; justify-content: center;">
        Show Answer & Explanation
    </button>

    <div class="answer-box">
        <strong>Answer:</strong> ANSWER<br>
        <strong>Explanation:</strong> EXPLANATION
    </div>

</div>
```

Replace:

* `DIFFICULTY`
* `CATEGORY`
* `PROBLEM TITLE`
* `PROBLEM DESCRIPTION`
* `ANSWER`
* `EXPLANATION`

Keep:

```html
class="toggle-answer-btn"
```

and:

```html
class="answer-box"
```

so the answer functionality continues to work.

---

# 8. Centres Page – `centres.html`

### Add a new centre

Add a new `<tr>` inside the centres table.

```html
<tr class="centre-item">

    <td>
        <strong>STATE</strong>
    </td>

    <td>CITY</td>

    <td>INSTITUTION NAME</td>

    <td>
        CENTRE ADDRESS
        <br>

        <em>
            <strong>Note:</strong>
            ADDITIONAL INFORMATION
        </em>
    </td>

</tr>
```

Replace:

* `STATE`
* `CITY`
* `INSTITUTION NAME`
* `CENTRE ADDRESS`
* `ADDITIONAL INFORMATION`

---

# 9. PLO / Linguistics / IOL Pages

The following pages contain information about specific programs:

```text
plo.html
lingistics.html
ilo.html
```

---

# 10. Images

Store website images inside:

```text
images/
```

#

---

# Quick Reference

| Page         | File                | Add / Update                    |
| ------------ | ------------------- | ------------------------------- |
| Home         | `index.html`        | Events, timeline, announcements |
| About        | `about.html`        | Programs / sections             |
| Team         | `team.html`         | Team members                    |
| Participants | `participants.html` | Participant information         |
| Results      | `results.html`      | IOL / Camp results              |
| Resources    | `resources.html`    | Resources and solutions         |
| Practice     | `practice.html`     | Practice problems               |
| Centres      | `centres.html`      | Exam centres                    |
| FAQ          | `faq.html`          | Questions and answers           |
| Contact      | `contact.html`      | Contact information             |
| PLO          | `plo.html`          | PLO information                 |
| Linguistics  | `lingistics.html`   | Linguistics information         |
| IOL          | `ilo.html`          | IOL information                 |
| CSS          | `styles.css`        | Appearance                      |
| JavaScript   | `script.js`         | Functionality                   |

---

## Important

For normal website updates:

```text
HTML       → Content
CSS        → Design / Appearance
JavaScript → Functionality
Images     → Photos / Logos
```

**To add new information, copy the relevant HTML template above and replace the placeholder values with the new information.**
