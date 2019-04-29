import * as npmPackage from './../../package.json';
import { ItemState } from './../models/rest/rest-models';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { GeofencerProvider } from './../geofencer-provider';
import { StatusResult, GeoFencerRule, RulesResult, AnalyseRuleResult, ResultTestRule } from '../models/rest/rest-models';
import { GeoJSONEnvelopeInterface } from 'src/models/avro/eu/driver/model/geojson/GeoJSONEnvelope';
import { ItemInterface } from 'src/models/avro/eu/driver/model/sim/entity/Item';

@Injectable({ scope: Scope.DEFAULT })
export class ManagementService {

    constructor(@Inject('GeofencerProvider') private readonly provider: GeofencerProvider) {
        
    }

    SetGeofencerDefinition(definition : GeoJSONEnvelopeInterface) {
        this.provider.LogService.LogMessage('Received GeoFencer definition (REST call).');
        this.provider.GeoFencerService.LoadGeofencerRule(definition);
    }

    ApplyTestData(testData : ItemInterface[]) {
        this.provider.LogService.LogMessage('Test Data (REST call).');
        this.provider.SimulationService.InjectTestData(testData);
    }


    async GetAnalyseRule(ruleId : string): Promise<AnalyseRuleResult> {
        const rule = this.provider.GeoFencerService.GetRule(ruleId);
        if (rule) {
            const x : AnalyseRuleResult = { 
                Items: rule.Items.map(simItem => {
                    const item : ItemState = {
                        ItemId: simItem.key,
                        Substituted: simItem.value.SubstitudedExpression,
                        InGeographicArea: simItem.value.InGeographicArea,
                        IsExpressionValid: simItem.value.IsExpressionValid

                    }
                    return item;
                })
             };  
            return x;
        } else {
            const x : AnalyseRuleResult = { Items: [] };  
            return x;
        }
        
    }

    async GetRules(): Promise<RulesResult> {

        const rules = this.provider.GeoFencerService.GeoFencerDefintions
        .map(x => x.triggerAreas)
        .reduce((pn, u) => [ ...pn, ...u ] , []);
    
        const result = rules.map(rule => 
            
                   {
                    const item : GeoFencerRule = {
                        UniqueSystemId: rule.RuntimeUniqueID /* system assigned */,
                        UserAssignedId: rule.TriggerAreaId /* user assigned */,
                        IsRuleValid: rule.ExpressionIsValid,
                        Rule: rule.ExpressionText,
                        RuleError: rule.ExpressionError
                    }
                    return item;
                }
                );
        

        const x : RulesResult = { 
            Rules: result
         };  
        return x;
    }

    async GetStatus(): Promise<StatusResult> {
        const x : StatusResult = { 
            Description: npmPackage.description,
            Version:  npmPackage.version,
            KafkaServer: this.provider.TestBedKafkaService.settings.kafkaHost,
            SchemaRegistryUrl: this.provider.TestBedKafkaService.settings.schemaRegistryUrl,
         };  
        return x;
    }
}