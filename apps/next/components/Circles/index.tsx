import { Container } from "@/components";
import styles from "./styles.module.scss";

type props = { test?: string };

export default function Circles({ test }: props) {
  return (
    <div className={`${styles.circles} `}>
      <Container>
        <div className={styles.circlesWrap}>
          <span className={styles.circle1} />
        </div>
      </Container>
    </div>
  );
}
