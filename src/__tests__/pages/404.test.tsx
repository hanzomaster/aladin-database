import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Error from "@pages/404";

describe("404", () => {
  it("compare with snapshot", () => {
    const errorSnapshot = renderer.create(<Error />).toJSON();
    render(<Error />);
    expect(errorSnapshot).toMatchSnapshot();
  });
  it("should have a link to home page", () => {
    render(<Error />);
    const link = screen.getByRole("link", { name: /home/i });
    expect(link).toBeInTheDocument();
  });
});
