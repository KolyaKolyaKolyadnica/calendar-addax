import styled from "@emotion/styled";

const StyledSVG = styled.svg<{ rotation: string }>`
  transform: rotate(${(props) => props.rotation});
`;

type ChevronDirection = "up" | "down" | "left" | "right";

type ChevronIconProps = {
  direction?: ChevronDirection;
  size?: number;
  color?: string;
};

export const ChevronIcon = ({
  direction = "up",
  size = 16,
}: ChevronIconProps) => {
  const rotations: Record<ChevronDirection, string> = {
    right: "0deg",
    down: "90deg",
    left: "180deg",
    up: "270deg",
  };

  return (
    <StyledSVG
      rotation={rotations[direction]}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="9 18 15 12 9 6" />
    </StyledSVG>
  );
};
