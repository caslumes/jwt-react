import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

function LoginForm({ handleLogin, usernameInputRef, passwordInputRef }) {
    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col gap-2 w-full"
        >
            <CustomInput
                ref={usernameInputRef}
                label={"Nome de usuário:"}
                placeholder={"Nome de Usuário"}
            />
            <CustomInput
                ref={passwordInputRef}
                label={"Senha:"}
                placeholder={"Senha"}
                type="password"
            />
            <CustomButton type="submit">ENTRAR</CustomButton>
        </form>
    );
}

export default LoginForm;
