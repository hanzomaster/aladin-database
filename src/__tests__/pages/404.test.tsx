import { render, screen } from "@testing-library/react";

import Error from "@pages/404";

describe("404", () => {
  it("renders a heading", () => {
    render(<Error />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
