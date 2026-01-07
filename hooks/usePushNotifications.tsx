"use client"

import { useEffect, useRef, useState } from "react"

export default function usePushNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>()
    const [subscription, setSubscription] = useState<PushSubscription>()

    const initialized = useRef<boolean>(false)

    const isSupported = (
        typeof window !== "undefined" &&
        "Notification" in window &&
        "PushManager" in window &&
        "serviceWorker" in navigator
    )

    useEffect(() => {

        if (!isSupported || initialized.current) return;
        
        initialized.current = true

        //Handles Push API subscription + registration to the service worker
        async function init() {

            setPermission(Notification.permission)

            const registration = await navigator.serviceWorker.register("/sw.js")
            const existing = await registration.pushManager.getSubscription()


            if (existing) {
                setSubscription(existing)
                return
            }

            if (Notification.permission === "granted") {

                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                })

                setSubscription(subscription)
            }
        }

        init()

    }, [])

    useEffect(() => {
        //Listens to permission changes from browser window

        if (!("permissions" in navigator)) return;

        let status: PermissionStatus;

        navigator.permissions
            .query({ name: "notifications" })
            .then(permissionStatus => {
                status = permissionStatus;

                const handler = () => {
                    setPermission(
                        status.state === "prompt"
                            ? "default"
                            : status.state
                    )
                }
                permissionStatus.addEventListener("change", handler)
            })


        return () => status?.removeEventListener("change", () => { })
    }, [])

    const askPermission = async (): Promise<NotificationPermission> => {
        if (!("Notification" in window)) return "denied"

        const result = await Notification.requestPermission()
        setPermission(result)

        return result
    }

    return {
        permission,
        subscription,
        isSupported: "serviceWorker" in navigator,
        askPermission,
    }
}