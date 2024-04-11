import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container } from "@/components";
import styles from "./styles.module.scss";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface Props {
  data: {
    title: string;
    successMessage: string;
  };
}

export default function ContactForm({ data }: Props) {
  if (!data) return null;
  const { title, successMessage } = data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        console.log("Message sent!");
      } else {
        console.log(res, "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container isFluid={false}>
      <div className={styles.formWrap}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {title && <p>{title}</p>}
          <div className={styles.inputWrap}>
            <div className={styles.group}>
              <input type="text" {...register("name")} />
              <span className={styles.bar} />
              <label>Name</label>
            </div>
            <p className={styles.error}>{errors.name?.message}</p>
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.group}>
              <input type="text" {...register("email")} />
              <span className={styles.bar} />
              <label>Email</label>
            </div>
            <p className={styles.error}>{errors.email?.message}</p>
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.group}>
              <textarea rows={9} {...register("message")} />
              <span className={styles.bar} />
              <label>Message</label>
            </div>
            <p className={styles.error}>{errors.message?.message}</p>
          </div>

          <Button
            className={styles.btnSubmit}
            type="submit"
            variant="primary"
            withSvg
          >
            Send Message
          </Button>
        </form>
      </div>
    </Container>
  );
}
