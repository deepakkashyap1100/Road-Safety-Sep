import React from 'react'
import { 
    useRouteError, 
    NavLink, 
    useNavigate,
} from 'react-router-dom'

const Errorpage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    
    const backFun = () => {
        navigate(-1);
    }

    // Handle different error types
    if (error?.status === 404 || error?.statusCode === 404) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 style={{ color: 'red', fontSize: '4rem' }}>404</h1>
                <h2 className="text-2xl font-bold mb-4">PAGE NOT FOUND</h2>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <div className="space-x-4">
                    <NavLink to="/" className="text-blue-600 hover:text-blue-800 underline">Back to Home</NavLink>
                    <button className='btn mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={backFun}>Go Back</button>
                </div>
            </div>
        )
    }
    
    if (error?.status === 401 || error?.statusCode === 401) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 style={{ color: 'red', fontSize: '4rem' }}>401</h1>
                <h2 className="text-2xl font-bold mb-4">UNAUTHORIZED</h2>
                <p className="text-gray-600 mb-6">You aren't authorized to see this page.</p>
                <NavLink to="/" className="text-blue-600 hover:text-blue-800 underline">Back to Home</NavLink>
            </div>
        )
    }
    
    if (error?.status === 503 || error?.statusCode === 503) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 style={{ color: 'red', fontSize: '4rem' }}>503</h1>
                <h2 className="text-2xl font-bold mb-4">SERVICE UNAVAILABLE</h2>
                <p className="text-gray-600 mb-6">Looks like our API is down. Please try again later.</p>
                <NavLink to="/" className="text-blue-600 hover:text-blue-800 underline">Back to Home</NavLink>
            </div>
        )
    }

    // Default error case
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 style={{ color: 'red', fontSize: '4rem' }}>Error</h1>
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">An unexpected error occurred.</p>
            <div className="space-x-4">
                <NavLink to="/" className="text-blue-600 hover:text-blue-800 underline">Back to Home</NavLink>
                <button className='btn mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={backFun}>Go Back</button>
            </div>
        </div>
    )
}

export default Errorpage