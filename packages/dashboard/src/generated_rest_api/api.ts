/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Geo fencer
 * Geo fencer API description
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


import * as url from "url";
import * as portableFetch from "portable-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "http://localhost".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *  
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 * 
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration!: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = portableFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError" = "RequiredError";
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface AnalyseRuleResult
 */
export interface AnalyseRuleResult {
    /**
     * 
     * @type {Array<ItemState>}
     * @memberof AnalyseRuleResult
     */
    Items: Array<ItemState>;
}

/**
 * 
 * @export
 * @interface FakeGeoJSONEnvelopeInterface
 */
export interface FakeGeoJSONEnvelopeInterface {
    /**
     * 
     * @type {string}
     * @memberof FakeGeoJSONEnvelopeInterface
     */
    Message: string;
}

/**
 * 
 * @export
 * @interface GeoFencerRule
 */
export interface GeoFencerRule {
    /**
     * 
     * @type {string}
     * @memberof GeoFencerRule
     */
    UniqueSystemId: string;
    /**
     * 
     * @type {string}
     * @memberof GeoFencerRule
     */
    UserAssignedId: string;
    /**
     * 
     * @type {string}
     * @memberof GeoFencerRule
     */
    Rule: string;
    /**
     * 
     * @type {boolean}
     * @memberof GeoFencerRule
     */
    IsRuleValid: boolean;
    /**
     * 
     * @type {string}
     * @memberof GeoFencerRule
     */
    RuleError: string;
}

/**
 * 
 * @export
 * @interface ItemState
 */

    export interface ItemState {
    /* 
     * @type {string}
     * @memberof ItemState
     */
    ItemId: string;
    /**
     * 
     * @type {string}
     * @memberof ItemState
     */
    Substituted: string;
    /**
     * 
     * @type {boolean}
     * @memberof ItemState
     */
    InGeographicArea: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ItemState
     */
    IsExpressionValid: boolean;
}

/**
 * 
 * @export
 * @interface ResultTestRule
 */
export interface ResultTestRule {
    /**
     * 
     * @type {string}
     * @memberof ResultTestRule
     */
    Substituded: string;
    /**
     * 
     * @type {boolean}
     * @memberof ResultTestRule
     */
    ExpressionResult: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ResultTestRule
     */
    HasError: boolean;
    /**
     * 
     * @type {string}
     * @memberof ResultTestRule
     */
    ErrorMsg: string;
}

/**
 * 
 * @export
 * @interface RulesResult
 */
export interface RulesResult {
    /**
     * 
     * @type {Array<GeoFencerRule>}
     * @memberof RulesResult
     */
    Rules: Array<GeoFencerRule>;
}

/**
 * 
 * @export
 * @interface SimulationTestData
 */
export interface SimulationTestData {
    /**
     * 
     * @type {string}
     * @memberof SimulationTestData
     */
    JsonTextItemArray: string;
}

/**
 * 
 * @export
 * @interface TestRule
 */
export interface TestRule {
    /**
     * 
     * @type {string}
     * @memberof TestRule
     */
    Expression: string;
    /**
     * 
     * @type {string}
     * @memberof TestRule
     */
    Item: string;
}


/**
 * ManagementApi - fetch parameter creator
 * @export
 */
export const ManagementApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Test rule
         * @summary Test a rule evaluation (creating rules)
         * @param {TestRule} TestRule 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        doTestRule(TestRule: TestRule, options: any = {}): FetchArgs {
            // verify required parameter 'TestRule' is not null or undefined
            if (TestRule === null || TestRule === undefined) {
                throw new RequiredError('TestRule','Required parameter TestRule was null or undefined when calling doTestRule.');
            }
            const localVarPath = `/management/DoTestRule`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"TestRule" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(TestRule || {}) : (TestRule || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get current state of GeoFencer rule
         * @summary Analyse a rule with all current states from simulation items
         * @param {string} Id The rule ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAnalyseRule(Id: string, options: any = {}): FetchArgs {
            // verify required parameter 'Id' is not null or undefined
            if (Id === null || Id === undefined) {
                throw new RequiredError('Id','Required parameter Id was null or undefined when calling getAnalyseRule.');
            }
            const localVarPath = `/management/AnalyseRule/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(Id)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get active GeoFencer rules
         * @summary Get all rules from Geo Fencer service
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRules(options: any = {}): FetchArgs {
            const localVarPath = `/management`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Send simulation items to service (simulate kafka messages)
         * @param {SimulationTestData} SimulationTestData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendSimulationTestData(SimulationTestData: SimulationTestData, options: any = {}): FetchArgs {
            // verify required parameter 'SimulationTestData' is not null or undefined
            if (SimulationTestData === null || SimulationTestData === undefined) {
                throw new RequiredError('SimulationTestData','Required parameter SimulationTestData was null or undefined when calling sendSimulationTestData.');
            }
            const localVarPath = `/management/SendSimulationTestData`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"SimulationTestData" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(SimulationTestData || {}) : (SimulationTestData || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Upload geo fencer defintion file
         * @param {FakeGeoJSONEnvelopeInterface} FakeGeoJSONEnvelopeInterface 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setGeofencerDefinition(FakeGeoJSONEnvelopeInterface: FakeGeoJSONEnvelopeInterface, options: any = {}): FetchArgs {
            // verify required parameter 'FakeGeoJSONEnvelopeInterface' is not null or undefined
            if (FakeGeoJSONEnvelopeInterface === null || FakeGeoJSONEnvelopeInterface === undefined) {
                throw new RequiredError('FakeGeoJSONEnvelopeInterface','Required parameter FakeGeoJSONEnvelopeInterface was null or undefined when calling setGeofencerDefinition.');
            }
            const localVarPath = `/management/Definition`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"FakeGeoJSONEnvelopeInterface" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(FakeGeoJSONEnvelopeInterface || {}) : (FakeGeoJSONEnvelopeInterface || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ManagementApi - functional programming interface
 * @export
 */
export const ManagementApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Test rule
         * @summary Test a rule evaluation (creating rules)
         * @param {TestRule} TestRule 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        doTestRule(TestRule: TestRule, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ResultTestRule> {
            const localVarFetchArgs = ManagementApiFetchParamCreator(configuration).doTestRule(TestRule, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Get current state of GeoFencer rule
         * @summary Analyse a rule with all current states from simulation items
         * @param {string} Id The rule ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAnalyseRule(Id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AnalyseRuleResult> {
            const localVarFetchArgs = ManagementApiFetchParamCreator(configuration).getAnalyseRule(Id, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Get active GeoFencer rules
         * @summary Get all rules from Geo Fencer service
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRules(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<RulesResult> {
            const localVarFetchArgs = ManagementApiFetchParamCreator(configuration).getRules(options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary Send simulation items to service (simulate kafka messages)
         * @param {SimulationTestData} SimulationTestData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendSimulationTestData(SimulationTestData: SimulationTestData, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string> {
            const localVarFetchArgs = ManagementApiFetchParamCreator(configuration).sendSimulationTestData(SimulationTestData, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary Upload geo fencer defintion file
         * @param {FakeGeoJSONEnvelopeInterface} FakeGeoJSONEnvelopeInterface 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setGeofencerDefinition(FakeGeoJSONEnvelopeInterface: FakeGeoJSONEnvelopeInterface, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string> {
            const localVarFetchArgs = ManagementApiFetchParamCreator(configuration).setGeofencerDefinition(FakeGeoJSONEnvelopeInterface, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * ManagementApi - factory interface
 * @export
 */
export const ManagementApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * Test rule
         * @summary Test a rule evaluation (creating rules)
         * @param {TestRule} TestRule 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        doTestRule(TestRule: TestRule, options?: any) {
            return ManagementApiFp(configuration).doTestRule(TestRule, options)(fetch, basePath);
        },
        /**
         * Get current state of GeoFencer rule
         * @summary Analyse a rule with all current states from simulation items
         * @param {string} Id The rule ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAnalyseRule(Id: string, options?: any) {
            return ManagementApiFp(configuration).getAnalyseRule(Id, options)(fetch, basePath);
        },
        /**
         * Get active GeoFencer rules
         * @summary Get all rules from Geo Fencer service
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRules(options?: any) {
            return ManagementApiFp(configuration).getRules(options)(fetch, basePath);
        },
        /**
         * 
         * @summary Send simulation items to service (simulate kafka messages)
         * @param {SimulationTestData} SimulationTestData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendSimulationTestData(SimulationTestData: SimulationTestData, options?: any) {
            return ManagementApiFp(configuration).sendSimulationTestData(SimulationTestData, options)(fetch, basePath);
        },
        /**
         * 
         * @summary Upload geo fencer defintion file
         * @param {FakeGeoJSONEnvelopeInterface} FakeGeoJSONEnvelopeInterface 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setGeofencerDefinition(FakeGeoJSONEnvelopeInterface: FakeGeoJSONEnvelopeInterface, options?: any) {
            return ManagementApiFp(configuration).setGeofencerDefinition(FakeGeoJSONEnvelopeInterface, options)(fetch, basePath);
        },
    };
};

/**
 * ManagementApi - object-oriented interface
 * @export
 * @class ManagementApi
 * @extends {BaseAPI}
 */
export class ManagementApi extends BaseAPI {
    /**
     * Test rule
     * @summary Test a rule evaluation (creating rules)
     * @param {TestRule} TestRule 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ManagementApi
     */
    public doTestRule(TestRule: TestRule, options?: any) {
        return ManagementApiFp(this.configuration).doTestRule(TestRule, options)(this.fetch, this.basePath);
    }

    /**
     * Get current state of GeoFencer rule
     * @summary Analyse a rule with all current states from simulation items
     * @param {string} Id The rule ID.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ManagementApi
     */
    public getAnalyseRule(Id: string, options?: any) {
        return ManagementApiFp(this.configuration).getAnalyseRule(Id, options)(this.fetch, this.basePath);
    }

    /**
     * Get active GeoFencer rules
     * @summary Get all rules from Geo Fencer service
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ManagementApi
     */
    public getRules(options?: any) {
        return ManagementApiFp(this.configuration).getRules(options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary Send simulation items to service (simulate kafka messages)
     * @param {SimulationTestData} SimulationTestData 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ManagementApi
     */
    public sendSimulationTestData(SimulationTestData: SimulationTestData, options?: any) {
        return ManagementApiFp(this.configuration).sendSimulationTestData(SimulationTestData, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary Upload geo fencer defintion file
     * @param {FakeGeoJSONEnvelopeInterface} FakeGeoJSONEnvelopeInterface 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ManagementApi
     */
    public setGeofencerDefinition(FakeGeoJSONEnvelopeInterface: FakeGeoJSONEnvelopeInterface, options?: any) {
        return ManagementApiFp(this.configuration).setGeofencerDefinition(FakeGeoJSONEnvelopeInterface, options)(this.fetch, this.basePath);
    }

}

