"use client";
import ThemeProvider from "@/mui/provider/themeProvider";
import { Providers } from "@/reducers/provider";
export default ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <ThemeProvider>{children}</ThemeProvider>
    </Providers>
  );
};
