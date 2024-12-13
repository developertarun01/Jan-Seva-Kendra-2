import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">

                    {/* Developer Section */}
                    <div>

                        <h2 className="text-xl font-semibold mb-4">Website Developed By</h2>
                        <p>Developer Tarun</p>

                        <p>
                            <a href="tel:+918630739687" className="text-blue-200 hover:underline">
                                +91 86307 39687
                            </a>
                        </p>
                        <p>
                            <a href="mailto:tarunbusinessmail@gmail.com" className="text-blue-200 hover:underline">
                                tarunbusinessmail@gmail.com
                            </a>
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/developertarun/" target="blank" className="text-blue-200 hover:text-white">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="https://www.linkedin.com/in/tarun-%E2%80%8E-9891a9265/" target="blank" className="text-blue-200 hover:text-white">
                                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                            </a>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/tarun-%E2%80%8E-9891a9265/" target="blank" className="text-blue-200 hover:text-white">
                                <FontAwesomeIcon icon={faFacebookF} size="lg" />
                            </a>
                            <a href="https://www.linkedin.com/in/tarun-%E2%80%8E-9891a9265/" target="blank" className="text-blue-200 hover:text-white">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="https://www.linkedin.com/in/tarun-%E2%80%8E-9891a9265/" target="blank" className="text-blue-200 hover:text-white">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="https://www.linkedin.com/in/tarun-%E2%80%8E-9891a9265/" target="blank" className="text-blue-200 hover:text-white">
                                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                            </a>
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">About Us</h2>
                        <p>
                            Jan Seva Kendra provides a range of government services with a focus on customer convenience and reliability.
                        </p>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                        <p>Opp. ESI Hospital, New Sharda Nagar, Saharanpur, Uttar Pradesh, India 247001</p>
                        <p>
                            <a href="tel:+98630739687" className="text-blue-200 hover:underline">
                                +91 86307 39687
                            </a>
                        </p>
                        <p>
                            <a href="mailto:tarunbusinessmail@gmail.com" className="text-blue-200 hover:underline">
                                tarunbusinessmail@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Jan Seva Kendra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;