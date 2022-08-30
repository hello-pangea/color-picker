import React from "react";

type Props = {
  onClick?: () => void;
  label?: string;
  children?: React.ReactNode;
  active?: boolean;
};

export default function PhotoshopButton({
  onClick,
  label,
  children,
  active,
}: Props) {
  const styles: Record<string, React.CSSProperties> = {
    button: {
      backgroundImage: "linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)",
      border: "1px solid #878787",
      borderRadius: "2px",
      height: "20px",
      boxShadow: active ? "0 0 0 1px #878787" : "0 1px 0 0 #EAEAEA",
      fontSize: "14px",
      color: "#000",
      lineHeight: "20px",
      textAlign: "center",
      marginBottom: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.button} onClick={onClick}>
      {label || children}
    </div>
  );
}
