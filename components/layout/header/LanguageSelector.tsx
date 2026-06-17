"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/types/locale";

const STORAGE_KEY = "locale";

type LanguageSelectorProps = {
  locales: Locale[];
};

const LanguageSelector = ({ locales }: LanguageSelectorProps) => {
  const defaultLocale = locales.find((l) => l.isDefault) ?? locales[0];
  const [selectedCode, setSelectedCode] = useState(defaultLocale?.code);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && locales.some((l) => l.code === stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCode(stored);
    }
  }, [locales]);

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  };

  if (!locales.length) return null;

  const selectedLocale = locales.find((l) => l.code === selectedCode) ?? defaultLocale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {selectedLocale?.code.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => handleSelect(l.code)}
            className="flex items-center justify-between gap-2"
          >
            {l.name}
            {l.code === selectedLocale?.code && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
