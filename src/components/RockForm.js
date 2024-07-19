import * as React from 'react';
import { useState } from 'react';
import { Dimensions, Text, Modal, Image, StyleSheet, View, TextInput, ScrollView, TouchableWithoutFeedback } from "react-native";
import MaskInput, { Masks } from 'react-native-mask-input';
import { Button, RadioButton } from 'react-native-paper';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { Audio } from 'expo-av';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export function RockForm() {
    // inputs padrao (text, date, number, email)
    const [nome, setNome] = React.useState('');
    const [dataNasc, setDataNasc] = React.useState('');
    const [numTelefone, setNumTelefone] = React.useState('');
    const [email, setEmail] = React.useState('');

    // radioBox
    const [ehDoRockRadio, setehDoRockRadio] = React.useState('first');

    // checkboxSelectBox
    const [selected, setSelected] = React.useState([]);
    const selectBandas = [
        { key: '1', value: 'Metallica' },
        { key: '2', value: 'Iron Maiden' },
        { key: '3', value: 'Black Sabbath' },
        { key: '4', value: 'Led Zeppelin' },
        { key: '5', value: 'AC/DC' },
        { key: '6', value: 'Megadeth' },
        { key: '7', value: 'Slayer' },
        { key: '8', value: 'System of a Down' },
        { key: '9', value: 'Pantera' },
        { key: '10', value: 'Guns N\' Roses' }
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [currentSound, setCurrentSound] = useState(null);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const playSoundAndShowImage = async (image, sound) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(sound);
            await soundObject.playAsync();
            setCurrentSound(soundObject);
        } catch (error) {
            console.log('Erro ao carregar e tocar o som:', error);
        }

        setTimeout(() => {
            setModalImage(image);
            toggleModal();
        }, 500);
    };

    const stopCurrentSound = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            setCurrentSound(null);
        }
    };

    const handleCloseModal = async () => {
        await stopCurrentSound();
        toggleModal();
    };

    return (
        <View style={styles.form}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>

                    <View>
                        <Button style={styles.title}
                            icon="skull-outline"
                            textColor='black'
                            mode='text'
                            labelStyle={{ fontSize: 20, fontWeight: 'bold' }}
                            onPress={() => playSoundAndShowImage(require('../../assets/imgs/os_do_rock_sei_quem_sao.jpg'), require('../../assets/sounds/yeah_rock_guitar.mp3'))}>
                            OS DO ROCK EU SEI QUEM SÃO!
                        </Button>
                    </View>

                    <Text style={styles.label}>Nome completo</Text>
                    <TextInput style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        autoFocus={true}>
                    </TextInput>

                    <Text style={styles.label}>Data de Nascimento</Text>
                    <MaskInput
                        style={styles.input}
                        value={dataNasc}
                        onChangeText={setDataNasc}
                        mask={Masks.DATE_DDMMYYYY}
                        placeholder='DD/MM/AAAA'
                        placeholderTextColor="gray"
                    />

                    <Text style={styles.label}>Número de Telefone</Text>
                    <MaskInput
                        style={styles.input}
                        value={numTelefone}
                        onChangeText={setNumTelefone}
                        mask={Masks.BRL_PHONE}
                        placeholder='(99) 99999-9999'
                        placeholderTextColor="gray"
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="example@gmail.com"
                        placeholderTextColor='gray'>
                    </TextInput>

                    <View style={styles.boxes}>
                        <Text style={styles.question}>VOCÊ É DO ROCK?</Text>

                        <View style={styles.radioGroup}>
                            <View style={styles.radioButton}>
                                <RadioButton
                                    value="first"
                                    status={ehDoRockRadio === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setehDoRockRadio('first')}
                                    color="black"
                                />
                                
                                <Text style={styles.radioLabel}>Sim</Text>
                            </View>

                            <View style={styles.radioButton}>
                                <RadioButton
                                    value="second"
                                    status={ehDoRockRadio === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setehDoRockRadio('second')}
                                    color="black"
                                />
                                
                                <Text style={styles.radioLabel}>Claro</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.boxes}>
                        <Text style={styles.question}>
                            BANDAS DE ROCK
                        </Text>

                        <View style={{ width: 300 }}>
                            <MultipleSelectList
                                setSelected={(val) => setSelected(val)}
                                data={selectBandas}
                                save="value"
                                fontFamily='Roboto'
                                onSelect={() => console.log(selected)}
                                label="Bandas"
                                placeholder='Selecione as bandas que você conhece'
                                searchPlaceholder='Buscar nome da banda'
                                notFoundText='Não encontrado'
                                checkBoxStyles={{ borderColor: 'black' }}
                                badgeStyles={{ backgroundColor: 'black' }}
                                maxHeight={600}
                            />

                        </View>
                    </View>

                    <View>
                        <Button style={styles.submitButton}
                            icon="skull"
                            textColor='white'
                            buttonColor='black'
                            mode='contained-tonal'
                            rippleColor={'gray'}
                            labelStyle={{ fontSize: 20, fontWeight: 'bold', }}
                            onPress={() => playSoundAndShowImage(require('../../assets/imgs/vsfd_rock.jpeg'), require('../../assets/sounds/vsfd_sou_rock.mp3'))}>
                            AGORA EU SOU DO ROCK!
                        </Button>
                    </View>

                    <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={handleCloseModal}>
                        <TouchableWithoutFeedback onPress={handleCloseModal}>
                            <View style={styles.modalContainer}>
                                <Image source={modalImage} style={styles.image} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        height: 40,
    },
    radioLabel: {
        marginLeft: 5,
        fontSize: 16,
        color: '#333',
    },
    radioButton: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 8,
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    scrollContainer: {
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
    },
    question: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        margin: 20,
        alignItems: 'center',
        minWidth: 300,
        maxWidth: 600,
    },
    label: {
        fontSize: 18,
        marginTop: 5,
        marginLeft: 5,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 18,
        height: 40,
        width: '100%',
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    boxes: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});