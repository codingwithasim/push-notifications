"use client"

import NotificationsPage from "@/components/Notification";
import PermissionPage from "@/components/Permission";
import usePushNotifications from "@/hooks/usePushNotifications";
import { useState, createContext } from "react";

export const PermissionStateContext = createContext<any>(null);

export default function Home() {

  const {permission} = usePushNotifications()

  return (
    <PermissionStateContext.Provider value={{ permission}}>
      {
        permission === "granted" ? <NotificationsPage /> : <PermissionPage />
      }
    </PermissionStateContext.Provider>
  );
}
