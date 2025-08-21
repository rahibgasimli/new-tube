import Image from "next/image"
import Link from "next/link"

import { SidebarTrigger } from "@/components/ui/sidebar"

// Components
import { AuthButton } from "@/modules/auth/ui/components/auth-button"
import { StudioUploadModal } from "../studio-upload-modal"

export const StudioNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">
            <div className="flex items-center gap-4 w-full">
                {/* Menu and Logo */}
                <div className="flex items-center flex-shrink-0">
                    <SidebarTrigger />
                    <Link href="/studio">
                        <div className="flex items-center p-4 gap-1">
                            <Image src="/logo.png" alt="NewTube" height={32} width={32} />
                            <p className="text-xl font-semibold tracking-tighter">Studio</p>
                        </div>
                    </Link>
                </div>
                {/* Spacer */}

                <div className="flex-1"></div>

                <div className="flex flex-shrink-0 items-center gap-4">
                    <StudioUploadModal />
                    <AuthButton />
                </div>
            </div>
        </nav>
    )
}

