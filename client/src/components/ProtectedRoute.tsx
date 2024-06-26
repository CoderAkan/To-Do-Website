import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/protect-icon-2048x2005-b7lv6fef.png'

interface Props {
    children: JSX.Element
}
const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
    return (
        <>
            {isAuth ? (children) : 
                (<div className='flex flex-col justify-center items-center mt-20 gap-10'>
                    <h1 className='text-2'>To View this page you must logged in</h1>
                    <img className="w-1/3" src={img} alt="img" />
                </div>)}
        </>
    )
}

export default ProtectedRoute
