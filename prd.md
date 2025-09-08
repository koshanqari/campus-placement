# PRD – Pre-Placement Talk Attendance Form Page

## 1. Objective
Create a new **web page** on the company website where students can register their attendance for **Pre-Placement Talks (PPTs)**. The form submissions will be stored in **Supabase** for secure access and management by the placement team.
You have to take insperation (UI) from the file 'Full Stack Venture Builder & Startup Accelerator in India.html'. Our attendence form page should look like a part of 'Full Stack Venture Builder & Startup Accelerator in India.html' which is our existing website
---

## 2. Goals & Success Metrics
- **Goals**
  - Provide a simple, mobile-friendly registration form.
  - Save student responses to Supabase DB in real-time.
  - Forms looks a part of 'Full Stack Venture Builder & Startup Accelerator in India.html' in UI

- **Success Metrics**
  - ≥ 95% successful submission rate.
  - All data securely stored and retrievable from Supabase.
  - Page loads in < 2s on standard broadband.
  - Forms looks a part of 'Full Stack Venture Builder & Startup Accelerator in India.html' in UI which is our existing website.

---

## 3. User Stories
- As a **student**, I want to submit my details for the pre-placement talk so that my attendance is recorded.
- As a **placement coordinator**, I want to view and export responses from Supabase so I can track participation.

---

## 4. Functional Requirements

### 4.1 Form Fields
| Field (UI Label)     | Database Field | Type       | Validation                                   | Required |
|-----------------------|----------------|------------|---------------------------------------------|----------|
| Full Name            | `name`         | Text       | Min 2 chars (cant have number)               | Yes |
| College Email ID     | `email`        | Email      | Must be valid                                | Yes |
| Mobile Number        | `phone`        | Number/Text| 10-digit (India format)                      | Yes |
| Any Questions?       | `questions`    | Textarea   | Optional                                     | No |
| college              | `college`      | Textarea   | this will be hardcoded in the code(wont display in form) | No |

### 4.2 Form Behavior
- **Validation**: Client-side (TypeScript) and server-side (Supabase).
- **On Submit**:
  - Validate inputs.
  - Insert record into Supabase table (`attendance_ppt`).
  - Show success message (`Thank you! Your attendance has been recorded.`).
- **On Error**:
  - Show error message (e.g., duplicate email, invalid phone number).

### 4.3 Database (Supabase)
**Table Name**: `attendance_ppt`

| Column Name | Type        | Constraints                   |
|-------------|-------------|-------------------------------|
| id          | UUID        | Primary Key, auto-generated   |
| name        | text        | not null                      |
| email       | text        | nullable                      |
| phone       | text        | not null                      |
| questions   | text        | nullable                      |
| college     | text        | nullable                      |
| created_at  | timestamptz | default now()                 |

### 4.4 Frontend Requirements
- Page should follow **existing company website branding** (colors, fonts, layout).
- Fully responsive (desktop, tablet, mobile).
- Include a **confirmation modal** or toast notification on successful submission.

### 4.5 Security & Privacy
- Prevent duplicate entries using email uniqueness.
- Store all data securely in Supabase with **Row-Level Security (RLS)** enabled.
- Data access limited to authorized placement team members.

---

## 5. Non-Functional Requirements
- **Performance**: Submission <1s with good internet.
- **Scalability**: Support up to 10,000 entries.
- **Accessibility**: Keyboard-navigable, ARIA labels for form fields.

---

## 6. Future Enhancements (Out of Scope for MVP)
- OTP verification for phone/email.
- Auto-send confirmation email upon submission.
- Export attendance list directly from website (admin panel).
- Analytics dashboard for attendance trends.

---

## 7. Acceptance Criteria
- User can successfully submit form with valid inputs.
- Data correctly stored in Supabase (`attendance_ppt`).
- Duplicate email entries are rejected.
- Works on both mobile and desktop layouts.
- Success and error messages are clearly displayed.

---

## 8. Tech Stack
- **Frontend**: (whatever you feel best)
- **Backend/Database**: Supabase
- **Hosting**: Existing company hosting setup


## 9. Phases
### Phase 1
- Make the front end similar to that of 'Full Stack Venture Builder & Startup Accelerator in India.html'
- Keep header and footer same

###Phase 2
- connect it with the database

###Phase 3
- connect it with whatsapp API