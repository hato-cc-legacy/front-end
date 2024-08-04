import { SVGProps } from "react";

const HatoSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx="100" cy="120" rx="40" ry="50" fill="grey" />
    <circle cx="100" cy="70" r="20" fill="grey" />
    <circle cx="108" cy="65" r="5" fill="white" />
    <circle cx="108" cy="65" r="2" fill="black" />
    <polygon points="110,75 130,80 110,85" fill="orange" />
    <rect
      x="130"
      y="70"
      width="10"
      height="30"
      fill="lightblue"
      stroke="black"
    />
    <polygon points="135,60 140,70 130,70" fill="lightblue" stroke="black" />
    <line x1="130" y1="80" x2="140" y2="80" stroke="black" />
    <path d="M60,110 Q90,70 100,120 T140,110" fill="lightgrey" stroke="grey" />
    <line x1="85" y1="170" x2="80" y2="190" stroke="orange" strokeWidth="4" />
    <line
      x1="115"
      y1="170"
      x2="120"
      y2="190"
      stroke="orange"
      strokeWidth="4"
    />
  </svg>
);

export default HatoSVG;
