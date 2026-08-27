import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Posters } from "../components/Posters";

describe("poster lightbox", () => {
  it("keeps image clicks interactive and closes from the surrounding image area", () => {
    render(<Posters />);

    fireEvent.click(screen.getByAltText("53 Visits"));
    const lightboxImage = screen.getAllByAltText("53 Visits")[0];

    fireEvent.click(lightboxImage);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();

    const imageArea = lightboxImage.parentElement?.parentElement;
    expect(imageArea).not.toBeNull();
    Object.defineProperty(imageArea!, "setPointerCapture", { value: () => undefined });

    fireEvent.pointerDown(lightboxImage, { pointerId: 1 });
    fireEvent.click(imageArea!);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();

    fireEvent.pointerDown(imageArea!, { pointerId: 2 });
    fireEvent.click(imageArea!);

    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
