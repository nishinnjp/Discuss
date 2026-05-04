import React from 'react'

export default function PostShowLoading() {
    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <div className="animate-pulse">
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}