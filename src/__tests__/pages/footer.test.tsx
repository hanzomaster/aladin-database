// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { withMockAuth } from "@tomfreudenberg/next-auth-mock";
import Footer from "@/components/footer";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("compare with snapshot", () => {
    const footerSnapshot = renderer.create(<Footer />).toJSON();
    render(<Footer />);
    expect(footerSnapshot).toMatchSnapshot();
  });
  it("should have link to tailwind-elements", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Ecommerce fashion website/i })).toHaveAttribute(
      "href",
      "https://tailwind-elements.com/"
    );
  });
});
