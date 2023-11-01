"use client";
import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Image from "next/image";
import icon from "../../../public/doBemLogo.svg";
import { useRouter } from "next/navigation";
import APICaller from "../../utils/apiCaller";
import styles from "./styles.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginOnKeyEnter = async (key: string) => {
    if (key === "Enter") {
      await handleLogin();
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha o email e a senha");
      return;
    }
    try {
      setIsLoading(true);
      const requestData = { email, password };
      const response = await APICaller("/api/login", "POST", requestData);
      localStorage.setItem("token", response.token);
      if (response.success) {
        localStorage.setItem("token", response.token);
        router.push("/dashboard");
      } else {
        setError(response.error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao fazer login:", error);
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <Image
          src={icon}
          alt='Ícone'
          className={styles.logo}
        />
        <div className={styles.inputFields}>
          <InputField
            onChange={(value) => setEmail(value)}
            type='text'
            placeholder='Email'
          />
          <InputField
            onChange={(value) => setPassword(value)}
            type='password'
            placeholder='Senha'
            onKeyDown={(e) => { loginOnKeyEnter(e.key) }}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <Button
          onClick={handleLogin}
          label={isLoading ? 'Entrando...' : 'Entrar'}
          disabled={isLoading}
        />
        <a
          href='/register'
          className={styles.register}
        >
          Cadastre-se
        </a>
      </div>
    </div>
  );
}
