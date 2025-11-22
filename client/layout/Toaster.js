'use client'
import Interceptor from '@/common/Interceptor'
import { Toaster as Toast } from 'sonner'

export default function Toaster({ }) {
    Interceptor()

    return (
        <Toast />
    )
}