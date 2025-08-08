import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

function LoginForm({handleLogin, usernameInputRef, passwordInputRef}) {
    return <form
        onSubmit={handleLogin}
        className="m-auto w-[50%] pt-5 flex flex-col gap-2"
    >
        <CustomInput ref={usernameInputRef} placeholder={"Nome de Usuário"} />
        <CustomInput ref={passwordInputRef} placeholder={"Senha"} type="password" />
        <CustomButton type="submit">ENTRAR</CustomButton>
    </form>;
}

export default LoginForm;