import Lottie from 'lottie-react';
import LoadingAnim from '../public/loadinganim';

function Loading() {
    return (
        <>
        <Lottie animationData={LoadingAnim} loop className='mx-auto w-25'/>
        </>
    )
}

export default Loading;