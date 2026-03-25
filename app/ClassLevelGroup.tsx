"use client";

import { useState } from "react";
import type { ParallelClass } from "./Data";

type ClassLevelGroupProps = {
  classes: ParallelClass[];
  columnsClassName: string;
};

export default function ClassLevelGroup({
  classes,
  columnsClassName,
}: ClassLevelGroupProps) {
  const selectableClasses = classes.filter((item) => item.level !== "");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  return (
    <div className={`mt-3 grid gap-4 grid-cols-1 ${columnsClassName}`}>
      {classes.map((item) => {
        if (item.level === "") {
          return (
            <div
              key={`${item.level}-${item.label}-placeholder`}
              className="hidden h-full rounded-lg border border-dotted border-white/10 p-3 sm:block"
            />
          );
        }

        const isSelected = selectedLevel === item.level;
        const hasInfo = Boolean(item.info?.length);
        const isOnlyChoice = selectableClasses.length <= 1;

        return (
          <button
            key={item.level}
            type="button"
            onClick={() =>
              setSelectedLevel((current) =>
                current === item.level ? null : item.level
              )
            }
            className={`rounded-lg border border-white/15 p-3 text-left transition hover:border-white/30 hover:bg-white/5 hover:-translate-y-0.5 ${
              isSelected
                ? "col-span-full bg-white/6s border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "flex h-full flex-col"
            }`}
            aria-pressed={isSelected}
            disabled={!hasInfo && isOnlyChoice}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold">{item.label}</div>
            </div>

            <div className="mt-2 text-sm text-white/85">{item.detail}</div>

            {hasInfo && isSelected ? (
              <div className="mt-3 space-y-2 rounded-2xl p-3 text-sm text-white/80">
                {item.info?.map((line) => (
                  <p key={line} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="mt-auto flex justify-end items-end pt-2">
              <span className="text-xs skeuo-info-chip rounded-md px-2 py-0.5 text-white/80">
                {item.level}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
