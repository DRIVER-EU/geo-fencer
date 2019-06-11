import { ApiModelProperty } from '@nestjs/swagger';


export class RuleFired {

    constructor(ruleId: string, simItemGuid: string, hit: boolean, initial: boolean ) {
        this.ruleId = ruleId;
        this.simItemGuid = simItemGuid;
        this.hit = hit;
        this.initial = initial;
    }

    @ApiModelProperty({ required: true })
    public ruleId: string;
    @ApiModelProperty({ required: true })
    public simItemGuid: string;
    @ApiModelProperty({ required: true })
    public hit: boolean;
    @ApiModelProperty({ required: true })
    public initial: boolean;
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

