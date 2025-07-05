import React, { useEffect, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";


interface FormData {
    email: string;
    contact: string;
    residence: string;
    name: string;
}
const Registration: React.FC = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 810);
    const [data, setData] = useState({
        name: "",
        email: "",
        residence: "",
        contact: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }));
    }

    const isValidEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (!data.name || !data.email || !data.contact || !data.residence) {
                throw new Error('Validation failed. All fields are required');
            }

            if(!isValidEmail(data.email)) throw new Error('Please enter a valid email');
            
            const response = await fetch(`${process.env.REACT_APP_API_BASE}/registration/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${process.env.REACT_APP_TOKEN}` },
                body: JSON.stringify(data),
            });
            console.log('URL: '+`${process.env.REACT_APP_API_BASE}/api/registration/register`);

            console.log(response);
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

            const result = await response.json();
            toast.success(`Registration Successful! `);
            console.log('Success', result);

            setData({ email: "", contact: "", residence: "", name: "" });

        } catch (error: any) {
            console.log(`Error subitting form: ${error}`);
            toast.error(`Failed to register: ${error.message}`);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 810);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card mt-5">
                        <div className="row">
                            <div className={`left-pane ${isSmallScreen ? '' : 'col-md-6'}`}>
                                <div className="img-left"></div>
                            </div>
                            <div className={`${isSmallScreen ? 'col-md-12' : 'col-md-6'} col-sm-12 col-xs-6 col-lg-12 col-xl-6`}>
                                <div className="formcontent">
                                    <h4>Kindly fill this form to register</h4>
                                    <div className="row form mt-5">
                                        <input className="form-control" value={data.name} onChange={handleChange} name="name" type="text" placeholder="Enter Name" />
                                        {/* <label>Email:</label> */}
                                        <input className="form-control mt-3" value={data.email} onChange={handleChange} name="email" type="email" placeholder="Enter Email" />
                                        <input className="form-control mt-3" value={data.contact} onChange={handleChange} name="contact" type="text" placeholder="Enter Contact" />
                                        <input className="form-control mt-3" value={data.residence} onChange={handleChange} name="residence" type="text" placeholder="Enter Residence/Location" />
                                        <button className="btn btn-success mt-3" onClick={handleSubmit}>
                                        {loading ? (
                                            <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Submitting...
                                            </>
                                        ) : (
                                            'Submit'
                                        )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}

export default Registration;