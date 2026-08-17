import { useState, useCallback } from 'react';
import { sendCommand } from '../services/esp32Api';

export function useEsp32() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastResponse, setLastResponse] = useState<string | null>(null);

    const send = useCallback(async (command: string) => {
        setLoading(true);
        setError(null);
        try {
        const res = await sendCommand(command);
        setLastResponse(res);
        } catch (e: any) {
        setError(e.message);
        } finally {
        setLoading(false);
        }
    }, []);

    return { send, loading, error, lastResponse };
}