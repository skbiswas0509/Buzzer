const verifyEmailtemplate = ({name, url}) => {
    return `
        <p>Dear ${name}</p>
        <p>Thank you for registering on Buzzer.</p>
        <a href=${url} style="color:white;background: #071263;margin-top: 10px;padding:20px,display:block">
        Verify Email
        </a>
    `
}

export default verifyEmailtemplate