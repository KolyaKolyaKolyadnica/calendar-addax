# 🗓️ Calendar Addax

Test task for **Middle (Strong Junior) JavaScript (TypeScript) Full-stack Developer** position.

## ✅ Required Functionality

- [x] Create and edit tasks inside calendar cells (days) in an inline manner.
- [x] Reassign tasks between days (calendar cells) using drag and drop.
- [x] Reorder tasks within the same day using drag and drop.
- [x] Filter tasks in the calendar by searching text.
- [x] Show worldwide holidays for each day using [Nager.Date API](https://date.nager.at/).
- [x] Holiday name is fixed at the top of the cell and does not participate in task drag-and-drop.

## 🛠️ Technologies Used

- **TypeScript**
- **React + React Hooks**
- **Zustand** — for state management (tasks)
- **react-dnd** — for drag and drop functionality
- **Emotion** — CSS-in-JS for styling
- **Vite** — build tool

## Repo and GH-page

- [Repo](https://github.com/KolyaKolyaKolyadnica/calendar-addax)
- [Live](https://kolyakolyakolyadnica.github.io/calendar-addax/)

## Getting Started Locally

```bash
npm install
npm run dev
```

## Additional Notes

I listed some next steps that were not included in the **Required Functionality**, but are necessary or at least desirable from my perspective

- Save data (DB, localStorage or similar)
- Change country
- Responsive design
- Dark/Light mode
- Add more task fields (title, description, priority, etc.)
- Refactor / scale with new libs if necessary
