import { StyledFooter, Credits, Link } from "../style/footer-style";

export function Footer() {
  return (
    <StyledFooter>
      <Credits>
        Made with &#10084;&#65039; by{" "}
        <Link
          as="a"
          href="https://github.com/D-Antonelli/tic-tac-toe"
          target="_blank"
        >
          derya
        </Link>
      </Credits>
    </StyledFooter>
  );
}
