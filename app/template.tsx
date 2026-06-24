import styles from "./styles/template.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.fadeIn}>{children}</div>;
}
