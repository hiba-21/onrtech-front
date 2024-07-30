import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

const ContactWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    

    .text-content {
        flex: 1;
        padding: 50px;
        

        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-size: 2rem;
            margin-top: 10px;
        }

        p {
            margin-top: 20px;
            font-size: 1rem;
        }
    }
    .form-div{
        display: flex;
        flex-direction: column;
    }
    .form-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 50px;
        margin: 20px;
        background: linear-gradient(135deg, rgb(0 152 255 / 27%), rgb(255, 255, 255));
     
        border-radius: 10px;
        backdrop-filter: blur(10px);

        input,
        textarea {
            margin-bottom: 20px;
            padding: 15px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
        }

        button {
            padding: 15px;
            background-color: rgb(188 228 255);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
        }

        button:hover {
            background-color: rgb(192 224 245);
        }
    }
`;

const Contact = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const form = useRef();
    const {
        register,
        formState: { errors },
    } = useForm();
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_yy49ssl', 'template_4p7j7bj', form.current, {
          publicKey: 'M2zBgsbvSJrGg-zHj',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };

    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);





    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <ContactWrapper ref={heroRef}>
                <div className="text-content">
                    <h1>You have a project ?</h1>
                    <h2>Contact us</h2>
                    <p>Send us a message and we'll get back to you as soon as possible.</p>
                </div>
                <div className="form-content">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-div">
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Name"
                            {...register("user_name", {
                                required: {
                                    value: true,
                                    message: "Name is required",
                                },
                            })}
                        />
                        <input
                            type="text"
                            name="user_subject"
                            placeholder="Subject"
                            {...register("user_subject", {
                                required: {
                                    value: true,
                                    message: "subject is required",
                                },
                            })}
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Email"
                            {...register("user_email", {
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                            })}
                        />
                        <input
                            type="tel"
                            name="user_phone"
                            placeholder="Phone"
                            {...register("user_phone", {
                                required: {
                                    value: true,
                                    message: "Phone is required",
                                },
                            })}
                        />
                        <textarea
                            name="message"
                            placeholder="How can help you"
                            {...register("message", {
                                required: {
                                    value: true,
                                    message: "Message is required",
                                },
                            })}
                        />
                        </div>
                        <button type="submit">Submit</button>
                        
                    </form>
                </div>
            </ContactWrapper>
        </>
    );
};

export default Contact;