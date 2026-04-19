import React from "react";
import { BRAND } from "./brand";

type Props = {
  size?: number;
};

export const RecoveraMark: React.FC<Props> = ({ size = 22 }) => {
  const inner = size * (10 / 22);
  const stroke = size * (1.8 / 22);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * (6 / 22),
        background: BRAND.green,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          borderRadius: inner / 2,
          border: `${stroke}px solid ${BRAND.white}`,
          borderBottomColor: "transparent",
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
};
