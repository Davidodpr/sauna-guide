# Growth Strategy: The 30-Day Sauna Reset

## Core Concept
Instead of selling a generic "newsletter subscription", we sell a **transformational outcome**: "Restore your baseline in 30 days."

This acts as the primary **Lead Magnet** and entry point (Hook) for the brand.

## The Funnel: Hook -> Challenge -> Habit

### 1. The Hook (Acquisition)
- **Landing Page:** `/challenge` (Primary entry point).
- **Value Prop:** "Modern life is stressful. Heat is the antidote. A guided 4-week protocol."
- **Low Friction:** "Rolling Challenge" model – users can start anytime or join the "Monthly Cohort" (e.g., starts 1st of every month).

### 2. The Viral Loop (Growth)
- **Mechanism:** Immediately after signup, the user is presented with a prompt: *"It is 80% more likely you will finish if you do it with a friend."*
- **Action:** One-click copy link / SMS invite template.
- **Goal:** Turn every single signup into 1.5 signups (Virality coefficient > 1 is the dream, but > 0.2 is good).

### 3. The Retention (Habit)
- **The Challenge Emails (Action):** Sent weekly (e.g., Sundays). specific protocols for the week ahead.
    - *Week 1: Foundation* (Heat tolerance, basic sessions).
    - *Week 2: Expansion* (Breathwork, duration).
    - *Week 3: Contrast* (Introducing cold/contrast).
    - *Week 4: Integration* (Lifestyle habits).
- **The Thursday Newsletter (Support):**
    - Acts as the "Science & Culture" support layer.
    - Validates *why* they are doing the challenge.
    - Continues indefinitely after the challenge ends.

## Technical Implementation

### Current Status (as of Dec 25, 2025)
- **Page:** `src/app/challenge/page.tsx` exists and is built.
- **Images:** Uses placeholder hero. Needs custom photography/AI art.
- **Signup Form:** Uses generic `NewsletterSignup` component.
    - *Next Step:* Needs to tag users in Beehiiv as `source: challenge` to trigger the correct automation workflow.

### Future Roadmap
1. **Homepage Integration:** Update `src/app/page.tsx` Hero section to point primarily to `/challenge`.
2. **Beehiiv Automation:** Configure the 4-week email sequence in Beehiiv.
3. **"Invite a Friend" Feature:** Build a dedicated post-signup view (state) in the `NewsletterSignup` component that facilitates sharing.
