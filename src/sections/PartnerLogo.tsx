// src/components/sections/PartnerLogo.tsx
import { useState } from "react";

export default function PartnerLogo({
                                        logo,
                                        logoText,
                                    }: {
    logo: string;
    logoText: string;
}) {
    const [failed, setFailed] = useState(false);

    if (failed || !logo) {
        return (
            <span className="inline-flex h-12 items-center rounded-2xl bg-navy-900 px-5 text-lg font-black text-white dark:bg-bolt-400 dark:text-navy-900">
        {logoText}
      </span>
        );
    }

    return (
        <span className="inline-flex h-12 items-center rounded-2xl bg-white px-4 shadow-sm ring-1 ring-navy-200 dark:bg-navy-800 dark:ring-navy-700">
      <img
          src={logo}
          alt={logoText}
          className="h-7 w-auto object-contain"
          onError={() => setFailed(true)}
      />
    </span>
    );
}