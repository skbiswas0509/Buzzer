const forgotPasswordTemplate = ({name, otp})=>{
    return `
    <div>
        <p>Dear ${name}</p>
        <p>Please use this OTP for resetting password</p>
        <div style="background:yellow,font-size:14px;padding:20px;
        text-align:center;font-weight:800;">
            ${otp}
        </div>
        <p>This otp is valid for 1 hr only</p>
    </div>
    `
}

export default forgotPasswordTemplate