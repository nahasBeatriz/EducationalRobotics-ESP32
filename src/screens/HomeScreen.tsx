import React from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import { useEsp32 } from '../hooks/useEsp32';

export default function HomeScreen() {
    const { send, loading, error, lastResponse } = useEsp32();

    const handleCommand = async (cmd: string) => {
        await send(cmd);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Controle ESP32</Text>

        {loading && <ActivityIndicator size="large" color="#4CAF50" />}
        {error && <Text style={styles.error}>{error}</Text>}
        {lastResponse && <Text style={styles.response}>Resposta: {lastResponse}</Text>}

        <TouchableOpacity style={[styles.btn, styles.btnOn]} onPress={() => handleCommand('on')}>
            <Text style={styles.btnText}>LIGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnOff]} onPress={() => handleCommand('off')}>
            <Text style={styles.btnText}>DESLIGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnToggle]} onPress={() => handleCommand('toggle')}>
            <Text style={styles.btnText}>TOGGLE</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e', gap: 12 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
    error: { color: '#f44336', marginBottom: 8 },
    response: { color: '#aaa', marginBottom: 8 },
    btn: { width: 200, padding: 16, borderRadius: 8, alignItems: 'center' },
    btnOn: { backgroundColor: '#4CAF50' },
    btnOff: { backgroundColor: '#f44336' },
    btnToggle: { backgroundColor: '#2196F3' },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    });