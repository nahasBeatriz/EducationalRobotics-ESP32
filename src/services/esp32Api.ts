const ESP32_BASE_URL = 'http://192.168.4.1';

export type Command = 'on' | 'off' | 'toggle' | string;

export async function sendCommand(command: Command): Promise<string> {
    const response = await fetch(`${ESP32_BASE_URL}/cmd?action=${command}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    return response.text();
    }

    export async function getStatus(): Promise<Record<string, unknown>> {
    const response = await fetch(`${ESP32_BASE_URL}/status`);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return response.json();
}