import axios from 'axios'
import * as React from 'react'
import { API } from './api'

class AuthAPIsHandle {

    loginAPI = axios.post(API+'login/', {'headers': ''}, {})

}

export default AuthHandle = AuthAPIsHandle()