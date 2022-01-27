export declare class PolygonBase {
    private api;
    protected client: import("@polygon.io/client-js").IRestClient;
    protected wsClient: import("@polygon.io/client-js").IWebsocketClient;
    protected referenceClient: import("@polygon.io/client-js").IReferenceClient;
    constructor(api: string);
}
