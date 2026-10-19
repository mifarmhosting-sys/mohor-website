# MOHOR Website Work Summary

This document summarizes the website updates made to the local static HTML, CSS, and JavaScript site.

## Navigation

- Replaced the original flat navigation with four grouped dropdown menus: **About Us**, **Services**, **Resources**, and **Get Involved**.
- Applied the grouped navigation consistently across all eight HTML pages.
- Removed the separate Home navigation tab. The MOHOR logo continues to link to the homepage.
- Desktop dropdowns open on hover and keyboard focus. Mobile dropdowns remain tap-to-open.
- Added a transparent hover bridge so dropdowns stay open while the pointer moves from a menu heading into its panel.

## Homepage

- Updated the hero heading to describe MOHOR's care and support for children with special needs.
- Added a donation popup that appears on homepage load and uses a local MOHOR photograph.
- Added a donation form in the popup with:
  - One-time or monthly frequency.
  - Preset amounts of ₹2,000, ₹3,000, ₹5,000, ₹10,000, ₹12,000, and ₹15,000.
  - A custom amount field with a ₹100 minimum.
- The popup's Continue button opens the MOHOR Friends registration form with the selected amount and frequency filled in.
- Added a “Maybe next time?” screen after the first close attempt. Closing again or choosing “No, thanks” fades the popup away.
- Added keyboard dismissal, focus handling, reduced-motion support, and responsive popup layouts.
- Replaced the homepage document-tab section with a dismissible MOHOR updates announcement bar linking to the Media page.
- Added Society Registration and Certificate of PWD links to the homepage footer.
- Updated the homepage About section to use the supplied “About MOHOR” copy and brightened its photo.

## Donation flow and payment limitations

- Added the **One-time** option to the MOHOR Friends registration form, alongside its existing recurring payment cycles.
- Donation amount and frequency selected in the homepage popup are passed to the registration page and prefilled in the form.
- **The website does not process online payments.** The popup continues to registration; no payment provider or checkout has been configured.
- The “Maybe next time?” screen does not collect email addresses or send reminders.

## Files updated

- [index.html](./index.html) — homepage navigation, hero, About section, announcement bar, footer links, donation popup.
- [about.html](./about.html), [what-we-do.html](./what-we-do.html), [media.html](./media.html), [contact.html](./contact.html), [donate.html](./donate.html), [event-detail.html](./event-detail.html), [project-detail.html](./project-detail.html) — shared navigation updates.
- [styles.css](./styles.css) — responsive menus, hover behavior, homepage announcement, popup, and image brightness.
- [script.js](./script.js) — menu interaction, popup flow, announcement dismissal, and donation form value passing.
- [donate.html](./donate.html) — one-time donation cycle option.

## Verification and Git status

- Checked edited files for editor diagnostics and Git whitespace errors.
- Tested desktop hover and mobile click behavior for dropdown menus in a browser.
- Tested popup display, first-close reminder, return-to-donation action, final dismissal/fade, and mobile layout.
- Tested preset/custom amount selection, minimum amount validation, and transfer of the chosen amount/frequency to the registration form.
- Tested announcement dismissal and the footer certificate links.
- The work was committed and pushed to the repository's `main` branch:
  - Commit: `6518933` — `feat: update homepage navigation and donation experience`
- The push was confirmed on `origin/main`. The site still needs to be deployed through Hostinger if automatic deployment is not enabled.
