import { ANTLRInputStream, CommonTokenStream, ANTLRErrorListener } from 'antlr4ts';
import { Recognizer } from 'antlr4ts/Recognizer';
import { RecognitionException } from 'antlr4ts/RecognitionException';

import { GeoFencerExpressionVisitorImpl } from './GeoFencerExpressionVisitorImpl';
import { GeoFencerExpressionParser, ParseContext } from '../../antlr/generated/GeoFencerExpressionParser';
import { GeoFencerExpressionLexer } from '../../antlr/generated/GeoFencerExpressionLexer';

import { IItem } from '../../models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';


// Base https://stackoverflow.com/questions/30976962/nested-boolean-expression-parser-using-antlr

/* Evaluate geo fencer expression against item simulation object */
export class EvaluateGeoFencerExpression {

  // The evaluation expression e.g. (NAME = "ABC" AND FORCE = "FRIENDLY")
  private expression: string;

  private parseErrors: string | null = null;

  private parseError: boolean = false;

  private evaluateErrors: string | null = null;

  private evaluateError: boolean = false;

  // The compiled expression (ANTLR)
  private parseTree: ParseContext;

  constructor(expressiontext: string) {
    this.expression = expressiontext; // expressiontext.replace(/'/g, '|');
    this.BuildAstTree();
  }

  public GetExpressionText(): string {
    return this.expression;
  }

  private BuildAstTree() {
    const chars = new ANTLRInputStream(this.expression);
    const lexer = new GeoFencerExpressionLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new GeoFencerExpressionParser(tokens);
    lexer.removeErrorListeners();
    parser.removeErrorListeners();
    lexer.addErrorListener(this);
    parser.addErrorListener(this);
    this.parseTree = parser.parse(); // Build AST tree

    // this.parseError = parser.buildParseTree;
  }

  // Implemention ANTLRErrorListener
  syntaxError(recognizer: Recognizer<any, any>, offendingSymbol: any | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined) {
    this.parseError = true;
    this.parseErrors += `- "${msg}" (line=${line} column=${charPositionInLine})\n`;
  }

  get ValidationsErrors(): string {
    const error1 = (this.parseError) ? this.parseErrors : '';
    const error2 = (this.evaluateError) ? this.evaluateErrors : '';
    return error1 + (((this.parseError) && (this.evaluateError))  ? '\n' : '') + error2;
  }

  // Is the syntax of the expression correct
  // Warning: the syntax can be correct, but the information inside AST can be wrong (e.g. invalid compare operator)
  get AstTreeIsValid() {
    return !this.parseError;
  }

  public IsGeoFencerExpressionValid(itemSim: IItem,
    errorCallback: (error: Error) => void,
    debugCallback?: (evaluatedExpression: string) => void): boolean {
    // Use the visitor entry point
    try {
      if (this.AstTreeIsValid) {
        const evaluateExpression = new GeoFencerExpressionVisitorImpl(itemSim);
        const result = evaluateExpression.visit(this.parseTree);
        if (debugCallback) debugCallback(evaluateExpression.SubstitutedExpression);
        return result;
      } else throw new Error('No AST tree; incorrect expression');
    }
    catch (e) {
      errorCallback(e);
      this.evaluateError = true;
      this.evaluateErrors = 'EvaluateGeofencerExpression:: ' + e;
      return false;
    }
  }

  get ExpressionText(): string {
    return this.expression;
  }

  get IsValidExpression(): boolean {
    return (!this.evaluateError) && (!this.parseError);
  }
}


