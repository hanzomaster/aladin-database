import Footer from "@/components/footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Footer", () => {
  it("compare with snapshot", () => {
    const footerSnapshot = renderer.create(<Footer />).toJSON();
    render(<Footer />);
    expect(footerSnapshot).toMatchSnapshot();
  });
  it("should have link to tailwind-elements", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Ecommerce fashion/i })).toHaveAttribute(
      "href",
      "https://tailwind-elements.com/"
    );
  });
});
