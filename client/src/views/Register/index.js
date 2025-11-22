import { palettes } from '@/common/palettes'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

function Register({ currencyList = [] }) {
    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 lg:w-1/3 p-4 mx-auto mt-20'>
                <div className='p-5 rounded-lg shadow-lg flex flex-col gap-8' style={{ background: palettes.dark[800], color: palettes.primary[400] }}>
                    <div className='flex flex-col gap-2 '>
                        <h2 className='text-2xl font-bold' style={{ color: palettes.primary[400] }} >Create a account</h2>
                        <h5 className='text-sm' style={{ color: palettes.light[50] }}>Please fill in the information below:</h5>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Form >
                            <div className='w-full'>
                                <Input
                                    type='text'
                                    placeholder='Full Name'
                                    className='w-full p-5 rounded-sm'
                                    style={{ background: palettes.dark[800], color: palettes.light[50] }}
                                />
                            </div>
                            <div className='w-full'>
                                <Input
                                    type='email'
                                    placeholder='Email Address'
                                    className='w-full p-5 rounded-sm'
                                    style={{ background: palettes.dark[800], color: palettes.light[50] }}

                                />
                            </div>
                            <div className='w-full'>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    className='w-full p-5 rounded-sm'
                                    style={{ background: palettes.dark[800], color: palettes.light[50] }}
                                />
                            </div>

                            <div className=' w-full '>
                                <Select className='w-full'>
                                    <SelectTrigger
                                        className='w-full p-5 rounded-sm '
                                        style={{ background: palettes.dark[800], color: palettes.light[50] }}>
                                        <SelectValue placeholder="Select the Currency" />
                                    </SelectTrigger>
                                    <SelectContent className='w-full'>
                                        <SelectGroup>
                                            {currencyList.map((currency) => (
                                                <SelectItem key={currency.code} value={currency.code}>
                                                    {currency.name} ({currency.code})
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Button type='submit' className='w-full font-bold' style={{
                                    backgroundColor: palettes.primary[400],
                                    color: palettes.slate[100]
                                }}>
                                    Register

                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register