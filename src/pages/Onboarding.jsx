import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

function Onboarding() {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Redirect based on the user's role
        if (user && user.unsafeMetadata?.role) {
            navigate(user.unsafeMetadata.role === "candidate" ? "/jobs" : "/post-job");
        }
    }, [user, navigate]);

    useEffect(() => {
        // Clean up URL parameters
        const url = new URL(window.location.href);
        if (url.searchParams.has("__clerk_handshake")) {
            navigate("/onboarding", { replace: true });
        }
    }, [navigate]);

    if (!isLoaded) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
    }

    async function handleRoleSelection(role) {
        setLoading(true);
        try {
            await user.update({ unsafeMetadata: { role } });
            navigate(role === "candidate" ? "/jobs" : "/post-job");
        } catch (error) {
            console.error("Error updating user role:", error);
            alert("Failed to update role. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <h2 className="gradient-title font-extrabold text:7xl sm:text-8xl tracking-tighter">
                I am a...
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full md:px-40 mt-16">
                <Button
                    variant="blue"
                    className="h-36 text-2xl"
                    onClick={() => handleRoleSelection("candidate")}
                    disabled={loading}
                >
                    Candidate
                </Button>
                <Button
                    variant="destructive"
                    className="h-36 text-2xl"
                    onClick={() => handleRoleSelection("recruiter")}
                    disabled={loading}
                >
                    Recruiter
                </Button>
            </div>
        </div>
    );
}

export default Onboarding;
