import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ItemButton from '~/components/Button';
import { Container, Image, Box, Title, Info } from './styles';

export default function ItemMeetup({ data, onSubscribe, onCancel, isSubMode }) {
    const imagem = data.File.url.replace('localhost', '192.168.0.30');

    const dateFormatted = useMemo(
        () =>
            format(parseISO(data.date), "dd 'de' MMMM', às' H:mm'h'", {
                locale: pt,
            }),
        [data.date]
    );

    return (
        <Container>
            <Image
                source={{
                    uri: `${imagem}`,
                }}
            />
            <Title>{data.title}</Title>

            <Box>
                <Icon name="event" size={20} color="gray" />
                <Info>{dateFormatted}</Info>
            </Box>

            <Box>
                <Icon name="location-on" size={20} color="gray" />
                <Info>{data.location}</Info>
            </Box>

            <Box>
                <Icon name="person" size={20} color="gray" />
                <Info>Organizador: {data.User.name}</Info>
            </Box>

            {isSubMode ? (
                <ItemButton onPress={onSubscribe}>
                    Realizar inscrição
                </ItemButton>
            ) : (
                <ItemButton onPress={onCancel}>Cancelar inscrição</ItemButton>
            )}
        </Container>
    );
}

ItemMeetup.propTypes = {
    data: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        User: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        File: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }),
    }).isRequired,
    onSubscribe: PropTypes.func,
    onCancel: PropTypes.func,
    isSubMode: PropTypes.bool,
};

ItemMeetup.defaultProps = {
    onSubscribe: null,
    onCancel: null,
    isSubMode: false,
};
