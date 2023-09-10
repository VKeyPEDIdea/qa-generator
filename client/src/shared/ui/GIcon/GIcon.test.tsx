import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GIcon from "./GIcon";


describe('GIcon component', () => {
    it('should render brown Edit icon', () => {
        const { container } = render(<GIcon title="edit" color="brown" />);
        expect(container).toMatchSnapshot();
    });

    it('should render brown Edit icon 48px', () => {
        const { container } = render(<GIcon title="edit" color="brown" size={48} />);
        expect(container).toMatchSnapshot();
    });

    it('should render brown Hotel icon', () => {
        const { container } = render(<GIcon title="hotel" color="brown" />);
        expect(container).toMatchSnapshot();
    });

    it('should render brown House icon', () => {
        const { container } = render(<GIcon title="house" color="brown" />);
        expect(container).toMatchSnapshot();
    });
});
