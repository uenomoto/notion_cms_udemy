// ダークモードライトモード変更ぼたんコンポーネント

import React, { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunLight, HalfMoon } from "iconoir-react";

const ChangeThemeButton: FC = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        className="xl:text-4xl md:text-xl md:text-white sm:text-sky-900"
        aria-label="DarkModeToggle"
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && <>{theme === "dark" ? <HalfMoon /> : <SunLight />}</>}
      </button>
    </>
  );
};

export default ChangeThemeButton;
