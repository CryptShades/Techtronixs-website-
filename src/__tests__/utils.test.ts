import { describe, it, expect } from "vitest";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Inline cn so we test the actual utility behaviour
function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("removes duplicate tailwind classes (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "not-included", "included")).toBe("base included");
  });

  it("handles undefined and null gracefully", () => {
    expect(cn("a", undefined, null, "b")).toBe("a b");
  });

  it("merges responsive prefixes correctly", () => {
    expect(cn("text-sm", "md:text-base", "lg:text-lg")).toBe("text-sm md:text-base lg:text-lg");
  });
});
