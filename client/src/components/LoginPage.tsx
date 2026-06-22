import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginPage() {
    return (
        <main className="flex min-h-[calc(100vh-3rem)] items-center justify-center px-4 pt-12">
            <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to continue to your account
                    </p>
                </div>

                <div className="flex justify-center">
                    <GoogleLoginButton />
                </div>
            </div>
        </main>
    );
}
