
import { BadRequestException, Controller, Get, Inject, Param, Req, Put, Body, Query } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiImplicitParam, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { StatusResult, RulesResult, AnalyseRuleResult, TestRule, ResultTestRule, FakeGeoJSONEnvelopeInterface, ResultSetGeofencerDef, SimulationTestData, ResultSimulationTestData } from '../models/rest/rest-models';
import { IGeoJSONEnvelope } from './../models/avro_generated/eu/driver/model/geojson/standard_named_geojson-value';
import { EvaluateGeoFencerExpression } from './../models/geofencer/EvaluateGeoFencerExpression';
import { IItem } from 'src/models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';
import { ManagementService } from './management.service';
import { all } from 'bluebird';

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
  @Get('Rules')
  async GetRules(): Promise<RulesResult> {
    if (this.service === null) throw new Error('Not initialized (yet)');
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
    if (this.service === null) throw new Error('Not initialized (yet)');
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
  async SetGeoFencerDefinition(@Query('useKafka') useKafka: boolean, @Query() all: any, @Body() geofencerDefinition: FakeGeoJSONEnvelopeInterface /*GeoJSONEnvelopeInterface*/): Promise<ResultSetGeofencerDef | undefined> {
    if (this.service === null) throw new Error('Not initialized (yet)');
    try {
      const json = JSON.parse(geofencerDefinition.Message) as IGeoJSONEnvelope;
      this.service.SetGeofencerDefinition(json, (useKafka) ? (useKafka) : false);
      return new ResultSetGeofencerDef();
    } catch (e) {
      throw new BadRequestException('Geojson invalid: ' + e.message);
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
  async SendSimulationTestData(@Query('useKafka') useKafka: boolean, @Query() all: any, @Body() testData: SimulationTestData ): Promise<ResultSimulationTestData | undefined> {
    if (this.service === null) throw new Error('Not initialized (yet)');
    try {

      const json = JSON.parse(testData.JsonTextItemArray) as IItem[];
      this.service.ApplyTestData(json, useKafka);
      let result = new ResultSimulationTestData();
      result.Message = `Inserted ${json.length} test items.`;
      return result;
    } catch (e) {
      throw new Error('Invalid data');
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
      ErrorMsg: '',
      Substituded: '',
      HasError: false
    };
    try {
      const testData = JSON.parse(expression.Item) as IItem;
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

  /*************************************************************************************************************/
  @ApiOperation({
    title: 'Get server status',
    description: 'Get server status',
    operationId: 'GetStatus'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the status',
    type: StatusResult
  })
  @Get('Status')
  async GetStatus(): Promise<StatusResult> {
    if (this.service === null) throw new Error('Not initialized (yet)');
    return await this.service.GetStatus();

  }
}
