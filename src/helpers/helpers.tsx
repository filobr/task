export const setInterFont = (fontSize: number) => `
font-family: "Inter";
font-style: normal;
font-weight: 800;
font-size: ${fontSize}px;
line-height: 165%;
letter-spacing: 0.15em;
color: #000000;
`;

export const setLatoFont = (fontSize: number) => `
font-family: "Lato";
font-style: normal;
font-weight: 400;
font-size: ${fontSize}px;
line-height: 100%;
color: #000000;
`;

export const setButtonFont = () => `
font-family: "Lato";
font-style: italic;
font-weight: 400;
font-size: 30px;
line-height: 100%;
color: #ffffff;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
${width.mobile} {
  font-size: 14px;
}
`;

type Direction = "row" | "column" | "row-reverse";

export const flexDisplay = (
  width: string,
  height: string,
  direction: Direction
) => `display: flex;
flex-direction: ${direction};
width: ${width};
height: ${height};`;

export const width = {
  mobile: `@media (max-width: 640px)`,
  tablet: `@media (max-width: 1200px)`,
};
