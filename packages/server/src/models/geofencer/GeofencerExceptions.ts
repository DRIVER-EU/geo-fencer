export class GeoFencerExpressionError extends Error {
    readonly name: "GeoFencerExpressionError"
    constructor(msg?: string) {
        super(msg);
    }
}