import styles from "./page.module.css";
import Campaign from "@/views/campaign";

export default function Home() {
  return (
    <main className={styles.main}>
      <Campaign />
    </main>
  );
}
