# Push Notifications

An educational demo showcasing how **Web Push Notifications** work in modern browsers using **Service Workers**, the **Push API**, and the **Notifications API**.

This project is intentionally kept small and focused to help understand the core concepts behind web push — without unnecessary abstractions.

---

## ✨ What this project demonstrates

* Registering a **Service Worker**
* Requesting notification permission from the user
* Subscribing to push notifications via the **Push API**
* Sending push messages from a server using **VAPID**
* Receiving push events even when the browser tab is closed
* Displaying notifications using the **Notifications API**

---

## 🧠 Key Concepts

* **Service Worker** – Runs in the background and receives push events
* **Push API** – Enables server-to-browser messaging
* **Notifications API** – Displays system notifications to the user
* **VAPID** – Authenticates your server when sending push messages
* **Payload** – Data sent from the server to the service worker

Helpful MDN references:

* Service Worker API: [https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* Push API: [https://developer.mozilla.org/en-US/docs/Web/API/Push_API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
* Notifications API: [https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

---

## 🏗️ Project Structure (simplified)

* `app/` – UI and client-side logic
* `app/api/` – Server routes used to send push notifications
* `public/sw.js` – Service Worker handling push events
* `usePushNotifications.ts` – Custom hook managing permissions & subscriptions

---

## 🚀 How it works (high level)

1. The user grants notification permission
2. The browser creates a push subscription
3. The subscription is sent to the server
4. The server sends a push message using `web-push`
5. The browser wakes the service worker
6. The service worker displays a notification

> Push notifications are **server-initiated** and can arrive even when the tab is closed.

---

## 🛠️ Running the project

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

> HTTPS is required for push notifications (localhost is treated as secure).

---

## ⚠️ Important notes

* This project stores **only one subscription** for demonstration purposes
* No database is used (not production-ready)
* API routes are event-driven (no background loops)
* Designed for learning, not deployment at scale

---

## 📦 Tech Stack

* Next.js (App Router)
* TypeScript
* Web Push (`web-push`)
* Service Workers
* Tailwind CSS

---

## 🎯 Who is this for?

* Developers learning how web push works
* Anyone confused about Push API vs Notifications API
* People migrating from Express to Next.js
* Engineers wanting a minimal, honest example

---

## 📄 License

MIT

---

If you’re learning Web Push, this repo is meant to show **what actually happens** — no magic, no abstractions, just the core mechanics.
