"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import usePushNotifications from "@/hooks/usePushNotifications";
import { cn } from "@/lib/utils";
import { Bell, Loader, Loader2 } from "lucide-react";

export default function PermissionPage() {

  const { permission, askPermission} = usePushNotifications()


  if(!permission){
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="animate-spin"/>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="font-medium text-2xl">Push Notifications</h1>
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <Badge variant={"secondary"} className={cn("text-green-500 rounded-sm py-1", permission === "denied" && "text-red-500 bg-red-950")}>
            Current state :<span className="font-medium">{permission[0].toUpperCase() + permission.slice(1)}</span>
          </Badge>

          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Turn On Notifications
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Notifications are <span className="font-medium">required</span> for this demo. Please enable them in your browser's permission prompt.
          </p>
          {
            permission === "denied" &&
            <p className="text-red-500">
              Notifications were not <span className="font-medium">granted</span>. Please allow them in your browser to continue with the demo.
            </p>
          }


        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button
            onClick={askPermission}
            disabled={permission !== "default"}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          >
            <Bell/>
            Turn on
          </Button>
          
        </div>
      </main>
    </div>
  );
}
