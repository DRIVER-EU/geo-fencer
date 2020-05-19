import { ApiModelProperty } from '@nestjs/swagger';

// This file is not generated and can be edited!

export class RuleFired {

    constructor(ruleId: string, simItemGuid: string, hit: boolean, initial: boolean, timestamp: Date ) {
        this.RuleId = ruleId;
        this.SimItemEntityId = simItemGuid;
        this.Hit = hit as boolean;
        this.Initial = initial as boolean;
        this.Timestamp = timestamp;
    }

    @ApiModelProperty({ required: true })
    public RuleId: string;
    @ApiModelProperty({ required: true })
    public SimItemEntityId: string;
    @ApiModelProperty({ required: true })
    public Hit: boolean;
    @ApiModelProperty({ required: true })
    public Initial: boolean;
    @ApiModelProperty({type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z'})
    public Timestamp: Date;
}
export class GeoFencerRule {


    @ApiModelProperty({ required: true })
    public UniqueSystemId: string;

    @ApiModelProperty({ required: true })
    public UserAssignedId: string;

    @ApiModelProperty({ required: true })
    public Rule: string;

    @ApiModelProperty({ required: true })
    public IsRuleValid: boolean;

    @ApiModelProperty({ required: true })
    public RuleError: string;



}

export class StatusResult {
    @ApiModelProperty({ required: true })
    public Description: String;
    @ApiModelProperty({ required: true })
    public Version: String;
    @ApiModelProperty({ required: true })
    public KafkaServer: String;
    @ApiModelProperty({ required: true })
    public SchemaRegistryUrl: String;
    @ApiModelProperty({ required: true })
    public ConnectedToKafka: boolean;
}

export class RulesResult {
    @ApiModelProperty({ required: true, isArray: true, type: GeoFencerRule })
    public Rules: GeoFencerRule[];
}

export class ItemState {

    @ApiModelProperty({ required: true })
    public ItemId: string;

    @ApiModelProperty({ required: true })
    public Substituted: string;

    @ApiModelProperty({ required: true })
    public InGeographicArea: boolean;

    @ApiModelProperty({ required: true })
    public IsExpressionValid: boolean;
}

// Debug information for rule
export class AnalyseRuleResult {
    @ApiModelProperty({ required: true, isArray: true, type: ItemState })
    public Items: ItemState[];
}

export class TestRule {
    @ApiModelProperty({ required: true })
    public Expression: string;

    @ApiModelProperty({ required: true })
    public Item: string;
}

export class SimulationTestData {
    @ApiModelProperty({ required: true })
    public JsonTextItemArray: string;
}

export class ResultSimulationTestData {
    @ApiModelProperty()
    public Message: string;
}

export class FakeGeoJSONEnvelopeInterface {
    @ApiModelProperty()
    public Message: string;
}
export class ResultSetGeofencerDef {
    @ApiModelProperty()
    public Message: string;
}

export class ResultTestRule {
    @ApiModelProperty({ required: true })
    public Substituded: string;

    @ApiModelProperty({ required: true })
    public ExpressionResult: boolean;

    @ApiModelProperty({ required: true })
    public HasError: boolean;

    @ApiModelProperty()
    public ErrorMsg: string;
}

