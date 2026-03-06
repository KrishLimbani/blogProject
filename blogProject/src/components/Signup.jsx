import { useState } from 'react'
import service from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const createAccount = async (data) => {
        setError("")
        try {
            const sesstion = await service.createAccount(data)
            if (sesstion) {
                const userData = await service.getCurrentuser()
                dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg lbg-gray-100 rounded-xl p-10 border ☐ border-black/10 `}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create                     account</h2>
                <p className="mt-2_text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(createAccount)}>
                    <div className='space-y-5'>
                        <Input
                        label = "Name: "
                        placeholder = "Enter you full Name"
                        {...register("name", { required: true})}
                        />
                        <Input
                        label = "Email: "
                        type = "email"
                        placeholder = "Enter your email"
                        {...register("email", {required: true,
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be a valid address"
                            }
                        })}
                        />
                        {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
                        <Input
                        label = "Password: "
                        type = "password"
                        placeholder = "Enter your password"
                        {...register("password", {required: true})}
                        />
                        <Button type="submit">Create Account</Button>
                    </div>
                </form>
            </div>
        </div >
     );
}

export default Signup;