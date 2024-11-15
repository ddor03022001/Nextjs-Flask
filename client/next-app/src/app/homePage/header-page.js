import Image from "next/image";
import logo from "../picture/logo.png";
import "./header-page.scss";

export default function HeaderPage() {
    return (
        <>
            <div className="container-header-page">
                <div className="header-page">
                    <div className="logo-header-page">
                        <Image
                            src={logo}
                            alt="Description of the image"
                            fill
                        />
                    </div>
                    <div className="section-header-page">
                        <div className="text-header-page">Home</div>
                        <div className="text-header-page">Product</div>
                        <div className="text-header-page">Blog</div>
                        <div className="text-header-page">contact</div>
                    </div>
                </div>
            </div>
        </>
    );
}
