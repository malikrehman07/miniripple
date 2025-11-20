import React, { useEffect, useReducer, useState } from "react";
import InputField from "./InputField";
import SocialLoginButton from "./SocialLoginButton";
import SuccessModal from "./SuccessModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    getIdToken,
    getAuth,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../../firebase";
// const initialState = {
//     email: "",
//     password: "",
// };

import useSocialLogin from "../../helper/handleSocialLogin";
import SelectField from "./SelectField";
import { useNavigate } from "react-router-dom";
import useCountries from "@/hooks/useCountries";
import axios from "axios";
import { redirectToStripeCheckout } from "@/helper/useStripeCheckout";
import { checkSubscriptionAndRedirect } from "@/helper/subscriptionCheck";
import TermsAndConditionsContainer from "./TermsAndConditionsContainer";
import Modal from "../reusable/Modal";

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return { ...state, [action.name]: action.value };
        case "TOGGLE_TERMS":
            return { ...state, agreedToTerms: !state.agreedToTerms };
        // case "RESET":
        //     return initialState;
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

function SignUpForm() {
    const { handleSocialLogin } = useSocialLogin();
    const [formData, dispatch] = useReducer(reducer, initialState);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const navigate = useNavigate();
    const { countries, loading, error } = useCountries();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE", name, value });
    };

    const validateFormStep1 = () => {
        const {
            first_name,
            last_name,
            email,
            country,
            password,
            confirmPassword,
        } = formData;

        if (!email || !password || !country) {
            toast.error("All fields are required.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email format.");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }

        return true;
    };

    const validateFormStep2 = () => {
        if (!formData.agreedToTerms) {
            toast.error("You must agree to the Terms of Service.");
            return false;
        }
        return true;
    };

    const handleSubmitStep1 = (e) => {
        e.preventDefault();
        if (!validateFormStep1()) return;
        setStep(2);
    };

    const handleSubmitStep2 = async (e) => {
        e.preventDefault();
        if (!validateFormStep1() || !validateFormStep2()) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            );
            const user = userCredential.user;

            const fullName = `${formData.first_name} ${formData.last_name}`;
            await updateProfile(user, { displayName: fullName });

            await user.reload();
            const idToken = await user.getIdToken();

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/verify-token`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken, password: formData.password }),
                },
            );
            localStorage.setItem("token", idToken);

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success("Account created successfully!");
                localStorage.setItem("user", JSON.stringify(data?.user));
            } else {
                toast.error(data.error || "Signup failed.");
            }

            const isSubscribed = await checkSubscriptionAndRedirect(
                idToken,
                user,
            );

            if (isSubscribed) {
                toast.success("Account created and logged in successfully!");
                setSignupSuccess(true);
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
    };

    const handleSignInwithGoogle = async () => {
        handleSocialLogin(
            googleProvider,
            `${import.meta.env.VITE_API_URL}/api/v1/users/google`,
            "Logged in with Google!",
        );
    };

    const handleFacebookLogin = async () => {
        handleSocialLogin(
            facebookProvider,
            `${import.meta.env.VITE_API_URL}/api/v1/users/facebook`,
            "Logged in with Facebook!",
        );
    };

    return (
        <article className="overflow-hidden relative pb-10 mb-0 max-w-full rounded-xl shadow-sm bg-slate-50 w-[903px] max-md:mb-2.5">
            <header className="flex flex-col justify-center items-center p-6 w-full bg-blue-800 max-md:px-5 max-md:max-w-full">
                <img
                    src="/landing/logo.png"
                    alt="Logo"
                    className="object-contain max-w-full aspect-[3.88] w-[120px]"
                />
            </header>

            <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                <h1 className="text-3xl font-bold tracking-tighter leading-tight text-center font-['Amble'] text-slate-900 max-md:max-w-full">
                    Sign Up
                </h1>
                <p className="self-center mt-2.5 text-base text-zinc-600 font-['Jost']">
                    Fill the form below to sign up
                </p>
            </div>

            <form
                className="flex flex-col px-10 mt-6 w-full rounded-lg max-md:px-5 max-md:max-w-full"
                onSubmit={handleSubmitStep2}>
                <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
                    <InputField
                        label="First name"
                        icon="/auth/auth-1.svg"
                        placeholder="Enter first name"
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Last name"
                        icon="/auth/auth-1.svg"
                        placeholder="Enter last name"
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                    <InputField
                        label="Email"
                        icon="/auth/auth-2.svg"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Country"
                        icon="/auth/auth-3.svg"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        options={countries.map((c) => ({
                            label: `${c.name.common} (${c.cca2})`,
                            value: c.cca2,
                        }))}
                    />
                </div>

                <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                    <InputField
                        label="Password"
                        icon="/auth/auth-4.svg"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        toggleVisibility={() =>
                            setShowPassword((prev) => !prev)
                        }
                    />
                    <InputField
                        label="Confirm Password"
                        icon="/auth/auth-4.svg"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        toggleVisibility={() =>
                            setShowConfirmPassword((prev) => !prev)
                        }
                    />
                </div>

                <div className="flex gap-2 items-center mt-6">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreedToTerms}
                        onChange={() =>
                            dispatch({
                                type: "TOGGLE_TERMS",
                            })
                        }
                        className="mr-2"
                    />
                    <label htmlFor="terms">
                        I agree to the
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="hover:underline font-medium text-blue-600"
                    >
                        Terms and Conditions
                    </button>
                </div>

                <button
                    type="submit"
                    className="gap-2.5 self-stretch px-6 py-3.5 mt-8 w-full text-base font-semibold leading-none whitespace-nowrap rounded-md bg-slate-900 text-neutral-50 max-md:px-5 max-md:max-w-full hover:bg-slate-800 transition-colors">
                    Sign Up
                </button>
                <div className="flex gap-6 justify-center items-center mt-8 w-full text-base whitespace-nowrap text-slate-400 max-md:max-w-full">
                    <img
                        src="/auth/auth-7.svg"
                        alt="Divider"
                        className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[333.33] basis-0 min-w-60 stroke-[1px] stroke-neutral-300"
                    />
                    <span className="self-stretch my-auto">or</span>
                    <img
                        src="/auth/auth-7.svg"
                        alt="Divider"
                        className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[333.33] basis-0 min-w-60 stroke-[1px] stroke-neutral-300"
                    />
                </div>

                <div className="flex flex-wrap gap-6 items-start self-center mt-8 text-base text-zinc-600 max-md:max-w-full">
                    <SocialLoginButton
                        login={() => handleSignInwithGoogle()}
                        icon="/auth/auth-8.svg"
                        text="Google"
                    />
                    <SocialLoginButton
                        login={() => handleFacebookLogin()}
                        icon="/auth/auth-9.svg"
                        text="Facebook"
                    />
                </div>

                <div className="flex flex-wrap gap-1 justify-center items-center mt-8 w-full text-base max-md:max-w-full">
                    <p className="self-stretch my-auto text-zinc-600">
                        Already have an account?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="hover:underline font-medium text-blue-600">
                        Login
                    </button>
                </div>
            </form>
            {signupSuccess && (
                <Modal onClose={() => setSignupSuccess(false)}>
                    <SuccessModal message="Account created successfully!" />
                </Modal>
            )}
            {showTermsModal && (
                <Modal onClose={() => setShowTermsModal(false)}>
                    <div className="px-6 pb-10"><TermsAndConditionsContainer /></div>
                </Modal>
            )}
        </article>
    );
}

export default SignUpForm;
