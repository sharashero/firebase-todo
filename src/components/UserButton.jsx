import { useUser, handleSignIn, handleSignOut } from '../context/user';

function SignInButton() {
    return (
        <button
            className='p-2 bg-orange-500 hover:bg-orange-400 rounded-lg'
            onClick={handleSignIn}
        >
            Sign In
        </button>
    );
}

function SignOutButton() {
    return (
        <button
            className='p-2 bg-orange-500 hover:bg-orange-400 rounded-lg'
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
}

function UserButton() {
    const user = useUser();
    return (
        user ? <SignOutButton /> : <SignInButton />
    );
}

export default UserButton;
