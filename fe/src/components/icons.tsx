import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  height,
  width,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const WhatsappIcon: React.FC<IconSvgProps> = ({
  size = 24,
  height,
  width,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.004 2C6.49 2 2 6.21 2 11.588c0 2.038.676 3.924 1.818 5.454L2 22l5.195-1.657c1.46.801 3.124 1.245 4.81 1.245 5.514 0 10.004-4.21 10.004-9.588C22.01 6.21 17.518 2 12.004 2zm.001 17.517c-1.48 0-2.919-.393-4.173-1.137l-.299-.176-3.077.982.997-2.893-.195-.308c-1.004-1.587-1.532-3.175-1.532-4.885 0-4.423 3.735-8.018 8.279-8.018 2.21 0 4.287.843 5.847 2.372 1.56 1.53 2.423 3.568 2.423 5.646 0 4.423-3.735 8.017-8.27 8.017zm4.62-5.95c-.252-.126-1.492-.735-1.724-.819-.231-.084-.4-.126-.568.126-.168.252-.652.819-.8.986-.147.168-.294.189-.546.063-.252-.126-1.064-.39-2.026-1.243-.747-.662-1.25-1.478-1.397-1.73-.147-.252-.016-.389.11-.515.113-.112.252-.294.378-.441.126-.147.168-.252.252-.42.084-.168.042-.315-.021-.441-.063-.126-.568-1.366-.778-1.874-.205-.492-.414-.425-.568-.433l-.484-.008c-.168 0-.441.063-.672.315s-.883.862-.883 2.102c0 1.24.905 2.437 1.031 2.605.126.168 1.78 2.715 4.314 3.805.603.26 1.073.415 1.44.531.605.192 1.156.165 1.59.1.485-.072 1.492-.609 1.703-1.197.21-.588.21-1.092.147-1.197-.063-.105-.231-.168-.483-.294z" />
  </svg>
);

export const InstagramIcon: React.FC<IconSvgProps> = ({
  size = 24,
  height,
  width,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

export const TiktokIcon: React.FC<IconSvgProps> = ({
  size = 24,
  height,
  width,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.5 2h2.387c.152 1.325.85 2.49 1.885 3.237.716.512 1.598.786 2.493.788V8.4a6.17 6.17 0 01-3.403-1.03c-.472-.322-.896-.719-1.262-1.174v7.494c0 2.822-2.29 5.11-5.113 5.11-1.314 0-2.577-.523-3.507-1.452a4.949 4.949 0 01-1.463-3.51c0-2.822 2.29-5.11 5.113-5.11.18 0 .356.009.53.026v2.454a2.681 2.681 0 00-.53-.053c-1.482 0-2.683 1.2-2.683 2.683 0 .714.278 1.384.782 1.889a2.66 2.66 0 001.901.786c1.48 0 2.681-1.2 2.681-2.683V2z" />
  </svg>
);

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
