"use client"

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import usePushNotifications from "@/hooks/usePushNotifications";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { PushSubscription } from "web-push";

export type SubscriptionPayload = {
    title: string
    description: string
    subscription: PushSubscription
}

const data = [
    {
        title: "Thanks for Subscribing!",
        body: "Its great to have you here."
    },
    {
        title: "Flat 35% on Custom Mobile Cases",
        body: "Use code 'CUSTOMCASE'. Valid for today only"
    },
    {
        title: "New Feature Alert!",
        body: "Check out the latest update in your dashboard."
    },
    {
        title: "Reminder: Complete Your Profile",
        body: "Add your details to get personalized recommendations."
    },
    {
        title: "Weekly Digest is Here",
        body: "Catch up on everything you missed this week."
    },
    {
        title: "Limited Time Offer!",
        body: "Buy 1 Get 1 Free on all accessories. Today only!"
    },
    {
        title: "Security Alert",
        body: "We noticed a new login from an unrecognized device."
    },
    {
        title: "Event Starting Soon",
        body: "Your webinar will begin in 15 minutes. Join now!"
    },
    {
        title: "Congrats! You've Earned a Badge",
        body: "Your activity unlocked a new achievement."
    },
    {
        title: "Survey: Share Your Feedback",
        body: "Help us improve by completing this 2-minute survey."
    },
    {
        title: "Flash Sale!",
        body: "Extra 20% off on select items until midnight."
    },
    {
        title: "App Update Available",
        body: "Update now to enjoy new features and bug fixes."
    }
];

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function NotificationsPage(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const {subscription} = usePushNotifications()

    const handleDummyFill = () => {
        const randomNotification = data[Math.floor(Math.random() * data.length)]

        setTitle(randomNotification.title)
        setDescription(randomNotification.body)
    }

    const sendPushNotification = async () => {
        if(!subscription) return;

        const sub: PushSubscription = {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: {
                p256dh: arrayBufferToBase64Url(subscription.getKey("p256dh")!),
                auth: arrayBufferToBase64Url(subscription.getKey("auth")!)
            }
        };

        const payload: SubscriptionPayload = {
            subscription: sub,
            title,
            description
        }
        
        await fetch("/api/push/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).catch(err => console.log(err.message))
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <main className="w-full flex flex-col gap-10 min-h-screen bg-white py-24 dark:bg-black max-w-3xl px-6">
        
        {/* Header */}
        <div className="flex justify-between items-start gap-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
                    Push Notification Playground
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                    Create and send web push notifications to test how service workers
                    and push payloads behave, even when the tab is closed.
                </p>
            </div>

            {/* GitHub Button */}
            <a
                href="https://github.com/codingwithasim/push-notifications"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.623-5.48 5.92.43.37.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
            </a>
        </div>

        {/* Card */}
        <section className="rounded-xl border bg-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-black flex-1">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    Notification Content
                </h2>

                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleDummyFill}
                >
                    Random message
                </Button>
            </div>

            <form className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="title"
                        className="text-sm font-medium"
                    >
                        Title
                    </label>
                    <Input
                        id="title"
                        placeholder="e.g. Thanks for subscribing!"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="text-xs text-zinc-500">
                        This appears as the main notification title.
                    </p>
                </div>

                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium"
                    >
                        Description
                    </label>
                    <Input
                        id="description"
                        placeholder="e.g. It's great to have you here."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="text-xs text-zinc-500">
                        Short body text shown under the title.
                    </p>
                </div>
            </form>
        </section>

        {/* Footer */}
        <div className="flex flex-col space-y-2 justify-between items-end sm:flex-row  pt-6">
            <p className="text-xs text-zinc-500 max-w-md">
                <Link
                    href="https://developer.mozilla.org/fr/docs/Web/API/Push_API"
                    className="underline hover:text-zinc-400"
                    target='_blank'>
                        Push notifications</Link> are delivered via {" "}
                    <Link
                        href={"https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API"}
                        className="underline hover:text-zinc-400"
                        target="_blank">
                            service workers</Link> and can appear
                even when this tab is closed.
            </p>

            <Button
                onClick={sendPushNotification}
                className="bg-green-700 text-white hover:bg-green-600 flex items-center gap-2"
            >
                <BellIcon className="h-4 w-4" />
                Send Push Notification
            </Button>
        </div>
    </main>
</div>

    )
}