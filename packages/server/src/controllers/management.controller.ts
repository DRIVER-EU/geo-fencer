import { Controller, Get, Inject, Param, Req, Put, Body } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiImplicitParam, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { RulesResult, AnalyseRuleResult, TestRule, ResultTestRule, FakeGeoJSONEnvelopeInterface, ResultSetGeofencerDef, SimulationTestData, ResultSimulationTestData } from '../models/rest/rest-models';
import { GeoJSONEnvelopeInterface } from './../models/avro/eu/driver/model/geojson/GeoJSONEnvelope';
import { EvaluateGeoFencerExpression } from './../models/geofencer/EvaluateGeoFencerExpression';
import { ItemInterface } from 'src/models/avro/eu/driver/model/sim/entity/Item';
import { ManagementService } from './management.service';

/*

Entrypoint for all management REST calls (NEST.JS)

Annotations are for the swagger definition (the swagger component uses reflection)

*/


// REST controller
@ApiUseTags('management')
@Controller('management')
export class ManagementController {

  constructor(private readonly service: ManagementService) {
  }
/*************************************************************************************************************/
  @ApiOperation({
    title: 'Get all rules from Geo Fencer service',
    description: 'Get active GeoFencer rules',
    operationId: 'GetRules'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the rules',
    type: RulesResult
  })
  @Get('')
  async GetRules(): Promise<RulesResult> {
    if (this.service === null) throw new Error("Not initialized (yet)");
    return await this.service.GetRules();

  }
/*************************************************************************************************************/
  @ApiOperation({
    title: 'Analyse a rule with all current states from simulation items',
    description: 'Get current state of GeoFencer rule',
    operationId: 'GetAnalyseRule'
  })
  @ApiImplicitParam({
    name: 'id',
    description: 'The rule ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current state of rule',
    type: AnalyseRuleResult
  })
  @Get('AnalyseRule/:id')
  async GetRule(@Param('id') id: string): Promise<AnalyseRuleResult> {
    if (this.service === null) throw new Error("Not initialized (yet)");
    return await this.service.GetAnalyseRule(id);
  }
/*************************************************************************************************************/
  @ApiOperation({
    title: 'Upload geo fencer defintion file',
    description: '',
    operationId: 'SetGeofencerDefinition'
  })
  @ApiResponse({
    status: 200,
    description: '',
    type: String
  })
  @Put('Definition')
  async SetGeoFencerDefinition(@Body() geofencerDefinition: FakeGeoJSONEnvelopeInterface /*GeoJSONEnvelopeInterface*/): Promise<ResultSetGeofencerDef | undefined> {
    if (this.service === null) throw new Error("Not initialized (yet)");
    try {
      const json = JSON.parse(geofencerDefinition.Message) as GeoJSONEnvelopeInterface;
      this.service.SetGeofencerDefinition(json);
      return new ResultSetGeofencerDef();
    } catch (e) {
      throw new Error("Invalid data");
    }
  }
/*************************************************************************************************************/
  


  @ApiOperation({
    title: 'Send simulation items to service (simulate kafka messages), ONLY FOR TESTING, WILL BE REMOVED IN FUTURE',
    description: '',
    operationId: 'SendSimulationTestData'
  })
  @ApiResponse({
    status: 200,
    description: '',
    type: String
  })
  @Put('SendSimulationTestData')
  async SendSimulationTestData(@Body() testData: SimulationTestData ): Promise<ResultSimulationTestData | undefined> {
    if (this.service === null) throw new Error("Not initialized (yet)");
    try {

      const json = JSON.parse(testData.JsonTextItemArray) as ItemInterface[];
      this.service.ApplyTestData(json);
      let result = new ResultSimulationTestData();
      result.Message = `Inserted ${json.length} test items.`;
      return result;
    } catch (e) {
      throw new Error("Invalid data");
    }
  }  
  /*************************************************************************************************************/
  @ApiOperation({
    title: 'Test a rule evaluation (creating rules)',
    description: 'Test rule',
    operationId: 'DoTestRule'
  })
  /* Generate body def twice
  @ApiImplicitBody({
    name: 'expression',
    type: TestRule,
    description: "Test data",
    required: true
  }) */
  @ApiResponse({
    status: 200,
    description: 'Outcome of rule test',
    type: ResultTestRule
  })
  @Put('DoTestRule')
  async TestRule(@Body() expression: TestRule): Promise<ResultTestRule> {
    let result: ResultTestRule = {
      ExpressionResult: false,
      ErrorMsg: "",
      Substituded: "",
      HasError: false
    };
    try {
      const testData = JSON.parse(expression.Item) as ItemInterface;
      let evalExpression = new EvaluateGeoFencerExpression(expression.Expression); // Build AST tree
      if (evalExpression.IsValidExpression) {
        // Validate against AST tree
        result.ExpressionResult = (evalExpression.IsGeoFencerExpressionValid(testData,
          (error: Error) => {
            result.HasError = true;
            result.ErrorMsg = error.message;
          },
          debug => result.Substituded = debug));
      } else {
        result.HasError = true;
        result.ErrorMsg = evalExpression.ValidationsErrors;
      }
    } catch (error) {
      result.HasError = true;
      if (error instanceof  SyntaxError) {
          result.ErrorMsg = (error as SyntaxError).message;
      } else result.ErrorMsg = error;
    }
    return result;
  }
}
