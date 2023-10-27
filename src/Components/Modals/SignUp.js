import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const handleCreateAccountClick = () => {
        navigate('/Login1');
    };
    const [userfirst, setuserfirst] = useState("");
    const [userlast, setuserlast] = useState("");
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [usernumber, setusernumber] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [userconfirmpass, setuserconfirmpass] = useState("");
    let name,value;
    const submitData = () => {
    
};
    return (
        <>
            <div className="flex items-center justify-center px-6 py-10">
            <form>
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="bg-white justify-between p-8 rounded-md shadow-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Welcome to Code Connect</h2>
                        <p className="text-1xl font-bold mb-4">Create an Account</p>
                        <div className="mb-4 flex justify-between">
                            <button className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-1/2 mr-2">Teacher</button>
                            <button className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-1/2 ml-2">Student</button>
                        </div>
                        <div className="mb-4 flex">
                            <div className="mb-2">
                                <input className="w-full border border-gray-300 py-2 px-4 rounded-md" type="text" name="firstname" placeholder="First Name" value={userfirst} onChange={(e) => setuserfirst(e.target.value)}/>
                            </div>
                            <div className="mb-2">
                                <input className="w-full border border-gray-300 py-2 px-4 rounded-md" type="text" name="lastname" placeholder="Last Name" value={userlast} onChange={(e) => setuserlast(e.target.value)}/>
                            </div>

                        </div>

                        <div className="mb-4">
                            <input className="w-full border border-gray-300 py-2 px-4 rounded-md" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <input className="w-full border border-gray-300 py-2 px-4 rounded-md" type="email" name="email" placeholder="Email" value={useremail} onChange={(e) => setuseremail(e.target.value)}/>
                        </div>
                        <div className="mb-4 flex">
                            <span className="rounded-l-full bg-gray-200 p-2 px-4">+91</span>
                            <input className="flex-1 border border-gray-300 py-2 px-4 rounded-r-full" type="text" name="number" placeholder="Phone Number" value={usernumber} onChange={(e) => setusernumber(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <input className="w-full border border-gray-300 py-2 px-4 rounded-md" type="password" name="password" placeholder="Password" value={userpassword} onChange={(e) => setuserpassword(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <input className="w-full border border-gray-300 rounded-full py-2 px-4" type="confirmpass" name="confirmpass" placeholder="Confirm Password" value={userconfirmpass} onChange={(e) => setuserconfirmpass(e.target.value)}/>
                        </div>
                        <button className="text-white hover:bg-black/80 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7" onClick={submitData}>Sign Up</button>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-black transition-all duration-200 hover:underline" onClick={handleCreateAccountClick}>
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
                </form>
            </div>

        </>
    )
}


export default SignUp