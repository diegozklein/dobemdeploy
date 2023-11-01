import styles from "./styles.module.css";

type skeletonProps = {
  height?: string;
  width?: string;
  borderRadius?: string
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export default function Skeleton({ height, width, borderRadius, minHeight, minWidth, maxHeight, maxWidth }: skeletonProps) {

  return (
    <div style={{ height, width, borderRadius, minHeight, minWidth, maxHeight, maxWidth }} className={styles.skeleton}></div>
  );
}
