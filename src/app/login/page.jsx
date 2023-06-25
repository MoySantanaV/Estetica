'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomButton from '@/components/customButton/CustomButton';
import CustomInput from '@/components/customInput/CustomInput';
import styles from './login.module.css';
import {RiFacebookLine, RiGoogleLine, RiLinkedinLine} from 'react-icons/ri'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.prevent.default()

    if (password === '' || email === '') {
      toast.error("Fill all fields!")
      return
  }

  if (password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
  }

  }

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <div className={styles.cardLogin}>
      <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`} id="container">
        <div className={`${styles.formContainer} ${styles.signupContainer}`}>
          <form action="#" className={styles.form}>
            <h1>Crear Cuenta</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}><RiFacebookLine/></a>
              <a href="#" className={styles.social}><RiGoogleLine/></a>
              <a href="#" className={styles.social}><RiLinkedinLine/></a>
            </div>
            <span>o usa tu cuenta para registrarte</span>
            <CustomInput type={'text'} placeholder={'Nombre'} required={true} />
            <CustomInput type={'email'} placeholder={'Email'} required={true} />
            <CustomInput type={'password'}placeholder={'Password'} required={true} />
            <CustomButton handleSubmit={handleSignUp} text={'Registrarse'} />
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signinContainer}`}>
          <form action="#" className={styles.form}>
            <h1>Login</h1>
            <div className={styles.socialContainer}>
            <a href="#" className={styles.social}><RiFacebookLine/></a>
              <a href="#" className={styles.social}><RiGoogleLine/></a>
              <a href="#" className={styles.social}><RiLinkedinLine/></a>
            </div>
            <span>o ingresa con tu correo</span>
            <CustomInput type={'email'} placeholder={'Email'} required={true} onChange={(e)=>{setEmail(e.target.value)}}/>
            <CustomInput type={'password'}placeholder={'Password'} required={true} onChange={(e)=>{setPassword(e.target.value)}}/>
            <a href="#">¿Olvidaste tu contraseña?</a>
            <CustomButton handleSubmit={handleSignIn} text={'Entrar'} />
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} `}>
              <h1>!Excelente decision!</h1>
              <p>Nos encanta que nos elijas, si ya eres parte de la app, no es necesario registrarse.</p>
              <CustomButton handleSubmit={handleSignIn} text={'Ya soy parte'} />
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>¡Hola!</h1>
              <p>Ingresa a tu cuenta, si aun no la tienes, aquí te ayudaremos.</p>
              <CustomButton handleSubmit={handleSignUp} text={'Quiero ser parte'} />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

