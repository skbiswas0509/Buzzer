import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';
import Axios from '../utils/Axios';

const Profile = () => {
    const user = useSelector(state => state.user);
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile
        });
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setUserData((preve) => { 
            return {
                ...preve,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({ 
                ...SummaryApi.updateUsersDetails,
                data: userData
            });

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message); 
                const userData = await fetchUserDetails();
                dispatch(setUserDetails(userData.data));
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <div className='w-18 h-18 bg-red-500 flex items-center justify-items-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user.avatar ? (
                        <img src={user.avatar} alt={user.name} className='w-full h-full' />
                    ) : (
                        <FaUserCircle size={55} />
                    )
                }
            </div>
            <button className='text-sm min-w-20 border border-primary-100 hover:border-x-primary-200 hover:bg-primary-100 
        px-3 py-1 rounded-full mt-3' onClick={() => setProfileAvatarEdit(true)}>Edit</button> {/* Added onClick handler */}

            {
                openProfileAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
                )
            }

            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter your name' className='p-2 bg-blue-50 outline-primary border
                 focus-within:border-x-primary-200 rounded'
                        value={userData.name} name='name' onChange={handleOnChange} required />
                </div>
                <div className='grid'>
                    <label htmlFor="email">Email</label>
                    <input id='email' type="email" placeholder='Enter your email' className='p-2 bg-blue-50 outline-primary border
                 focus-within:border-x-primary-200 rounded'
                        value={userData.email} name='email' onChange={handleOnChange} required /> {/* Corrected value to userData.email */}
                </div>
                <div className='grid'>
                    <label htmlFor="mobile">Mobile</label> {/* Corrected label */}
                    <input type="number" placeholder='Enter your mobile' className='p-2 bg-blue-50 outline-primary border
                 focus-within:border-x-primary-200 rounded'
                        value={userData.mobile} name='mobile' onChange={handleOnChange} required /> {/* Corrected value to userData.mobile */}
                </div>

                <button className='border px-4 py-2 font-semibold 
            hover:bg-primary-100 border-primary-100 text-purple-900 hover:text-neutral-800 rounded' type="submit"> {/* Added type="submit" */}
                    {
                        loading ? "Loading..." : "Submit"
                    }
                </button>
            </form>
        </div>
    );
};

export default Profile;