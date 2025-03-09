import { Loader } from "lucide-react"

const LoadingPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin" />
        </div>
    );
};

export default LoadingPage;
