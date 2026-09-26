import { useState, useCallback } from 'react';
import { sendCommand } from '../services/esp32Api';

export function useEsp32() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastResponse, setLastResponse] = useState<string | null>(null);
    const [speed, setSpeed] = useState(200);

    const send = useCallback(async (command: string) => {
        setLoading(true);
        setError(null);
        try {
        const res = await sendCommand(command, speed);
        setLastResponse(res);
        } catch (e: any) {
        setError(e.message);
        } finally {
        setLoading(false);
        }
    }, [speed]);

    return { send, loading, error, lastResponse, speed, setSpeed };
}