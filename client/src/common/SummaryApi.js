const baseURL = "http://localhost:8080"

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method: 'post'
    },
    forgot_password: {
        url : '/api/user/forgot-password',
        method : 'put'
    },
    verify_password_otp : {
        url : '/api/user/verify-password-otp',
        method : 'put',
    },
    resetPassword : {
        url : '/api/user/reset-password',
        method : 'put'
    },
    refreshToken :{
        url : '/api/user/refresh-token',
        method : 'post'
    },
    userDetails: {
        url : '/api/user/user-details',
        method : 'get'
    },
    logout: {
        url : "/api/user/logout",
        method : 'get'
    },
    uploadAvatar : {
        url : "/api/user/upload-avatar",
        method: 'put'
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        methhod : 'put'

    },
    addCategory: {
        url : "/api/cate/add-category",
        method: "post"
    }
}

export default {SummaryApi, baseURL}