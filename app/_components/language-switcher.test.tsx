import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSwitcher from "./language-switcher";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

function clearCookies() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
  });
}

beforeEach(() => {
  refresh.mockClear();
  clearCookies();
});

describe("LanguageSwitcher", () => {
  it("marque la locale active via aria-pressed", () => {
    render(<LanguageSwitcher locale="fr" />);
    expect(screen.getByRole("button", { name: "FR" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "false");
  });

  it("pose le cookie NEXT_LOCALE et rafraîchit au clic sur une autre langue", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher locale="fr" />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("ne fait rien au clic sur la langue déjà active", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher locale="fr" />);

    await user.click(screen.getByRole("button", { name: "FR" }));

    expect(refresh).not.toHaveBeenCalled();
  });
});
