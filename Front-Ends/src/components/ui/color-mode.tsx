"use client";

import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

// 🔹 Tipagem para o `ColorModeProvider`
interface ColorModeProviderProps {
  children: React.ReactNode;
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

// 🔹 Tipagem para o hook `useColorMode`
export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return {
    colorMode: resolvedTheme as "light" | "dark" | undefined,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

// 🔹 Tipagem para `useColorModeValue`
export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

// 🔹 Componente `ColorModeIcon`
export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

// 🔹 Tipagem para `ColorModeButton`
export const ColorModeButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof IconButton>>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();

    return (
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
          size="sm"
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: "5",
              height: "5",
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    );
  }
);
