import LoginForm from '../../components/LoginForm';

export function UserLogin() {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', paddingBottom: '200px' }}>
                <LoginForm />
            </div>
        </>
    );
}
