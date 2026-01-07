import { SubscriptionPayload } from "@/components/Notification";
import { NextResponse } from "next/server";
import webpush from "web-push"

webpush.setVapidDetails(
        "mailto:" + process.env.VAPID_EMAIL,
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        process.env.VAPID_PRIVATE_KEY!
)

export async function POST(req: Request) {
    const body: SubscriptionPayload = await req.json()
    const subscription : PushSubscription = body.subscription

    const title = body.title.trim().length ? body.title : "New message"
    const description = body.description.trim().length ? body.description : "This is a body of the message"

    const payload = {
        title,
        body: description
    }

    await webpush.sendNotification(
        toWebPushSuscription(subscription),
        JSON.stringify(payload))
    .catch(err => console.error(err.message))

    return NextResponse.json({ok: true})
}


function toWebPushSuscription(sub: PushSubscription){
    return {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        keys: {
            p256dh: sub.getKey("p256dh")!.toString(),
            auth: sub.getKey("auth")!.toString(),
        }
    }
}