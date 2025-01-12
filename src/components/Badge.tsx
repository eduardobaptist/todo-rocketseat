import styles from "./Badge.module.css";

interface BadgeProps {
  content: string;
}

export function Badge({ content }: BadgeProps) {
  return <span className={styles.badge}>{content}</span>;
}
