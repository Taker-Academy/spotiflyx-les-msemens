import router from '@/router'

export function authGuard(to){
    let token = localStorage.getItem('token')
    console.log(token)
    if(token){
        return false
    }
    router.push('/login')
}