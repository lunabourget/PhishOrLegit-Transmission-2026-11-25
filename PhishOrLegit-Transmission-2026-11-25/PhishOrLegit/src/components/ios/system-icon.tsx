import type { SVGProps } from "react";

export type SystemIconName =
  | "back"
  | "camera"
  | "checkmark"
  | "ellipsis"
  | "envelope"
  | "globe"
  | "message"
  | "phone"
  | "shield"
  | "warning"
  | "xmark";

type SystemIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: SystemIconName;
  size?: number;
};

const paths: Record<SystemIconName, React.ReactNode> = {
  back: <path d="m14.5 4.75-7 7.25 7 7.25" />,
  camera: (
    <>
      <path d="M7.4 6.25 8.7 4.5h6.6l1.3 1.75H19A2.5 2.5 0 0 1 21.5 8.75v8A2.5 2.5 0 0 1 19 19.25H5a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 5 6.25h2.4Z" />
      <circle cx="12" cy="12.75" r="3.5" />
    </>
  ),
  checkmark: <path d="m4.75 12.5 4.25 4 10.25-10" />,
  ellipsis: (
    <>
      <circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17M12 3c2.4 2.4 3.6 5.4 3.6 9S14.4 18.6 12 21c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3Z" />
    </>
  ),
  message: (
    <>
      <path d="M20.5 11.2c0 4.5-4.1 8.1-9.2 8.1-1 0-2-.1-2.9-.4L4 21l1.4-3.7a7.6 7.6 0 0 1-3.1-6.1c0-4.5 4.1-8.1 9.2-8.1s9 3.6 9 8.1Z" />
    </>
  ),
  phone: (
    <path d="M7 3.5 4.5 6c-.9.9.1 4.2 3.7 7.8s6.9 4.6 7.8 3.7l2.5-2.5-4-3-1.7 1.7c-1.2-.5-2.5-1.5-3.7-2.7a13.2 13.2 0 0 1-2.7-3.7L8 5.5l-1-2Z" />
  ),
  shield: (
    <path d="M12 2.75c2.4 1.7 5 2.6 7.5 2.8v5.3c0 5.2-3.1 8.7-7.5 10.4-4.4-1.7-7.5-5.2-7.5-10.4V5.55c2.5-.2 5.1-1.1 7.5-2.8Z" />
  ),
  warning: (
    <>
      <path d="M12 3.4 21 20H3L12 3.4Z" />
      <path d="M12 9v5.2M12 17.4v.1" />
    </>
  ),
  xmark: <path d="m5.5 5.5 13 13m0-13-13 13" />,
};

export function SystemIcon({ name, size = 24, ...props }: SystemIconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}
