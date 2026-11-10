"use client";

import { I18nProvider } from "@/i18n/I18nProvider";
import { AppStoreProvider } from "@/store/AppStore";
import { ThemeProvider } from "./layout/ThemeProvider";
import { ToastProvider } from "./ui/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppStoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </AppStoreProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
