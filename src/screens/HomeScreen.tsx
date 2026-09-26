import React from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator, StyleSheet
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useEsp32 } from '../hooks/useEsp32';

export default function HomeScreen() {
    const { send, loading, error, lastResponse, speed, setSpeed } = useEsp32();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Controle ESP32 — Motores</Text>

        {loading && <ActivityIndicator size="large" color="#4CAF50" />}
        {error && <Text style={styles.error}>{error}</Text>}
        {lastResponse && <Text style={styles.response}>↩ {lastResponse}</Text>}

        {/* D-pad */}
        <View style={styles.dpad}>
            <TouchableOpacity style={[styles.btn, styles.btnMove]} onPress={() => send('frente')}>
            <Text style={styles.btnText}>▲</Text>
            </TouchableOpacity>

            <View style={styles.dpadMiddle}>
            <TouchableOpacity style={[styles.btn, styles.btnMove]} onPress={() => send('esquerda')}>
                <Text style={styles.btnText}>◀</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnStop]} onPress={() => send('parar')}>
                <Text style={styles.btnText}>■</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnMove]} onPress={() => send('direita')}>
                <Text style={styles.btnText}>▶</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.btn, styles.btnMove]} onPress={() => send('tras')}>
            <Text style={styles.btnText}>▼</Text>
            </TouchableOpacity>
        </View>

        {/* Velocidade */}
        <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Velocidade: {speed}</Text>
            <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={255}
            step={1}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#555"
            thumbTintColor="#4CAF50"
            />
        </View>
        </View>
    );
}

const BTN_SIZE = 72;

const styles = StyleSheet.create({
    container:      { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e', gap: 16 },
    title:          { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    error:          { color: '#f44336' },
    response:       { color: '#aaa', fontSize: 13 },

    dpad:           { alignItems: 'center', gap: 8 },
    dpadMiddle:     { flexDirection: 'row', gap: 8 },

    btn:            { width: BTN_SIZE, height: BTN_SIZE, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    btnMove:        { backgroundColor: '#2196F3' },
    btnStop:        { backgroundColor: '#f44336' },
    btnText:        { color: '#fff', fontSize: 24, fontWeight: 'bold' },

    sliderContainer: { width: 280, alignItems: 'center', gap: 4 },
    sliderLabel:    { color: '#ccc', fontSize: 14 },
    slider:         { width: '100%' },
});