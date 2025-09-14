'use client'
import Form from 'next/form'
import SearchFormReset from '@/components/SearchFormReset'
import Link from 'next/link'
import { Search } from 'lucide-react'

const SearchForm = ({ query }: { query?: string }) => {

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset();
    }
    return (
        <Form action="/" scroll={false} className='search-form'>
            <input
                name='query'
                defaultValue=''
                className='search-input'
                placeholder='search startups'

            />
            <div className='flex gap-2'>
                {query && <SearchFormReset />}
                <button type='submit' className="search-btn text-white">
                    <Search/>
                </button>
            </div>
        </Form>
    )
}

export default SearchForm