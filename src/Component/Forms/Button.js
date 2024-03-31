import Spinner from '../Spinner';

export default function Button({ 'data-loading': isLoading, ...props }) {
    return (
        <>
            <button
                {...props}
                className={`group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${props.className}`}
                disabled={isLoading}
            >
                <>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        {isLoading ? <Spinner /> : props.icon}
                    </span>
                    {isLoading ? 'Please Wait . . .' : props.label}
                </>
            </button>
        </>
    );
}
