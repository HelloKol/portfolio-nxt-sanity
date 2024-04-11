import { useState } from "react";
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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        setSuccess(true);
      } else {
        console.log(res, "Failed to send message.");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container isFluid={false}>
      <div className={styles.formWrap}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {success ? (
            <>
              <div className={styles.successMessage}>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <p>{successMessage}</p>
              </div>
              <Button
                className={styles.btnSubmit}
                type="button"
                variant="primary"
                withSvg
                onClick={() => setSuccess(false)}
              >
                Send again
              </Button>
            </>
          ) : (
            <>
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
                disabled={loading}
              >
                {loading ? "Sending Message..." : "Send Message"}
              </Button>
            </>
          )}
        </form>
      </div>
    </Container>
  );
}
