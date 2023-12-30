declare class signalR {
    static LogLevel: any;
    onclose(callback: (error?: Error) => void): void;
    start(): Promise<void>;
    stop(): Promise<void>;
    invoke(methodName: string, ...args: any[]): Promise<any>;
    on(methodName: string, newMethod: (...args: any[]) => void): void;
    static HubConnectionBuilder: any;
    serverTimeoutInMilliseconds: number;
}

declare class SimplePeer {
    connected: boolean;
    _debug: any;
    on(eventName: "error" | "close" | "signal" | "connect" | "data", callback: (data: any) => void): void;
    signal(data: any): void;
    send(data: any): void;
    constructor(options: { initiator: boolean; trickle: boolean; config?: any });
}