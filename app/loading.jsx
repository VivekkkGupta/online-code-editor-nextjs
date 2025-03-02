import Image from "next/image";
import loader from "@/public/loader.gif";

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen w-[100vw]">
            <Image src={loader} alt="Loading..." height={150} width={150} />
        </div>
    );
};

export default LoadingPage;
