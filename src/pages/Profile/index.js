import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import {
    Container,
    Title,
    Form,
    FormInput,
    Separator,
    SubmitButton,
    LogoutButton,
} from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);
    const loading = useSelector(state => state.auth.loading);

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passowrdRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [passowrd, setPassowrd] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassowrd('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest(
                name,
                email,
                oldPassword,
                passowrd,
                confirmPassword
            )
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu Perfil</Title>

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome Completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha atual"
                        ref={oldPasswordRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passowrdRef.current.focus()}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua nova senha"
                        ref={passowrdRef}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                        value={passowrd}
                        onChangeText={setPassowrd}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme sua senha"
                        ref={confirmPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Salvar perfil
                    </SubmitButton>
                    <LogoutButton loading={loading} onPress={handleLogout}>
                        Sair do Meetapp
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

const tabBarIcon = ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon,
};
