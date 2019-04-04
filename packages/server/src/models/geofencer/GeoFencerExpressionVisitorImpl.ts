import { GeoFencerExpressionVisitor } from '../../antlr/generated/GeoFencerExpressionVisitor'
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';

import {
  ParenExpressionContext,
  NotExpressionContext,
  ComparatorExpressionContext,
  BinaryExpressionContext,
  BoolExpressionContext,
  IdentifierExpressionContext,
  DecimalExpressionContext,
  ParseContext,
  ExpressionContext,
  ComparatorContext,
  BinaryContext,
  BoolContext,
  StringExpressionContext
} from "../../antlr/generated/GeoFencerExpressionParser";
import { ItemInterface } from '../avro/eu/driver/model/sim/entity/Item'
import { GeoFencerExpressionError } from './GeofencerExceptions';

enum ExpressionProperty {
  Unknown = "Unknown",
  Name = "Name",
  Guid = "Guid",
  ObjectType = "ObjectType"
}

const PropertyNames =
  [
    "Name",
    "Guid",
    "ObjectType"
  ];

enum ExpressionOperator {
  Unknown = "Unknown",
  Equals = "Equals",
  GreaterEquals = "GreaterEquals",
  Greater = "Greater",
  Less = "Less",
  LessEquals = "LessEquals",
  Like = "Like"

}

export class GeoFencerExpressionVisitorImpl extends AbstractParseTreeVisitor<any> implements GeoFencerExpressionVisitor<any> {




  private simItem: ItemInterface;

  private substitutedExpression: string = "";

  constructor(itemSim: ItemInterface) {
    super();
    this.simItem = itemSim;
  }


  defaultResult() {
    return true;
  }

  visitParenExpression(ctx: ParenExpressionContext): boolean {
    this.substitutedExpression += " ( ";
    let result = super.visitChildren(ctx);
    this.substitutedExpression += " ) ";
    return result;
  }

  visitNotExpression(ctx: NotExpressionContext) {
    this.substitutedExpression += " not ";
    return !(super.visit(ctx.expression()));
  }

  // Return the value of the literial string 
  visitStringExpression(ctx: StringExpressionContext) {
    // remove quates
    return ctx.text.substring(1, ctx.text.length - 1);
  }



  visitComparatorExpression(ctx: ComparatorExpressionContext): boolean {

    if (ctx._leftside instanceof IdentifierExpressionContext) {

      const propertyName = (this.visit(ctx._leftside)); // Get value of property
      let propertyEnum = this.GetPropertyEnum(propertyName);
      let operator = this.GetOperator(ctx._expressionoperator);
      switch (propertyEnum) {

        case ExpressionProperty.Name:
        case ExpressionProperty.Guid:
          switch (operator) {
            case ExpressionOperator.Equals:
              //case ExpressionOperator.Like:
              if (ctx._rightside instanceof StringExpressionContext) {
                const propertyValue = (this.visit(ctx._rightside));
                let result = this.ValidateProperty(propertyEnum, operator, propertyValue);
                return result;
              } else this.ThrowException(ctx, `Can only compare ${propertyName} with text value.`);
              break;
            default:
              this.ThrowException(ctx, `Operator '${operator}' not allowed for ${propertyName}.`);
              break;
          }
        case ExpressionProperty.ObjectType:
          switch (operator) {
            case ExpressionOperator.Equals:
              if (ctx._rightside instanceof StringExpressionContext) {
                const propertyValue = (this.visit(ctx._rightside));
                let result = this.ValidateProperty(propertyEnum, operator, propertyValue);
                return result;
              } else this.ThrowException(ctx, `Can only compare ${propertyName} with text value.`);
              break;
            default:
              this.ThrowException(ctx, `Operator '${ctx._expressionoperator}' not allowed for ${propertyName}.`);
              break;
          }
          break;
        case ExpressionProperty.Unknown:
        default:
          this.ThrowException(ctx, `The property name ${propertyName} is not recognised (allowed property names: [${PropertyNames.join(", ")}]).`);
          break;
      }
    }


    this.ThrowException(ctx, `Left side operator not implemented.`);
    return false;

  }



  // AND / OR 
  visitBinaryExpression(ctx: BinaryExpressionContext): boolean {
    if (ctx._expressionoperator.AND() != null) {
      let resultLeft = super.visit(ctx._leftside);
      this.substitutedExpression += " AND ";
      let resultRight = super.visit(ctx._rightside);
      return resultLeft && resultRight;
    }
    else if (ctx._expressionoperator.OR() != null) {
      let resultLeft = super.visit(ctx._leftside);
      this.substitutedExpression += " OR ";
      let resultRight = super.visit(ctx._rightside);
      return resultLeft || resultRight;
    }
    return false; // Should never happen

  }

  visitBoolExpression(ctx: BoolExpressionContext) {
    return true;
    //return Boolean.valueOf(ctx.getText());
  }

  // Return the identifier name (property name)
  visitIdentifierExpression(ctx: IdentifierExpressionContext) {
    return ctx.IDENTIFIER().toString();
  }


  visitDecimalExpression(ctx: DecimalExpressionContext) {
    console.log(`Value is = ${ctx.DECIMAL().toString()}.`);
    return false; // ctx.DECIMAL().toString();
    //return ctx.DECIMAL().getText();
  }

  // Called when start validation of expression
  visitParse(ctx: ParseContext): boolean {
    this.substitutedExpression = "";
    let result = super.visit(ctx.expression());
    this.substitutedExpression += "=> " + result;
    console.log(this.substitutedExpression);
    return result;
  }

  visitExpression(ctx: ExpressionContext) {
    return false;
  }

  visitComparator(ctx: ComparatorContext) {
    return false;
  }

  visitBinary(ctx: BinaryContext) {
    return false;
  }

  visitBool(ctx: BoolContext) {
    return false;
  }

  // all super.visit(ctx) must be true
  aggregateResult(aggregate: boolean, nextResult: boolean): boolean {
    return aggregate && nextResult;
  }

  private ThrowException(ctx: ParserRuleContext, msg: string) {
    throw new GeoFencerExpressionError(`${msg} (Line:${ctx.start.line} Column:${ctx.start.startIndex})`);
  }

  // Convert property id (string) to enum
  private GetPropertyEnum(propertyName: string): ExpressionProperty {
    if (this.stringEqualsIgnoreCase(propertyName, "Name")) return ExpressionProperty.Name;
    else if (this.stringEqualsIgnoreCase(propertyName, "Guid")) return ExpressionProperty.Guid;
    else if (this.stringEqualsIgnoreCase(propertyName, "ObjectType")) return ExpressionProperty.ObjectType;
    else return ExpressionProperty.Unknown;
  }

  private GetOperator(compareOperator: ComparatorContext): ExpressionOperator {
    if (compareOperator.EQ() != null) return ExpressionOperator.Equals;
    else if (compareOperator.GE() != null) return ExpressionOperator.GreaterEquals;
    else if (compareOperator.GT() != null) return ExpressionOperator.Greater;
    else if (compareOperator.LT() != null) return ExpressionOperator.Less;
    else if (compareOperator.LE() != null) return ExpressionOperator.LessEquals;
    else if (compareOperator.LIKE() != null) return ExpressionOperator.Like;
    else return ExpressionOperator.Unknown;
  }

  stringEqualsIgnoreCase(a: string, b: string) {
    return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
      : a === b;
  }

  get SubstitutedExpression() {
    return this.substitutedExpression;
  }


  private ValidateProperty(propertyName: ExpressionProperty,
    operator: ExpressionOperator,
    propertyValue: string): boolean {
    switch (propertyName) {
      case ExpressionProperty.Name:
        if (operator == ExpressionOperator.Equals) {
          const currentValue = this.simItem.name || "";
          this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
          return this.stringEqualsIgnoreCase(currentValue, propertyValue);
        }
        break;
      case ExpressionProperty.Guid:
        if (operator == ExpressionOperator.Equals) {
          const currentValue = this.simItem.guid || "";
          this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
          return this.stringEqualsIgnoreCase(currentValue, propertyValue);
        }
        break;
      case ExpressionProperty.ObjectType:
        const currentValue = "Vehicle";
        this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
        return this.stringEqualsIgnoreCase(currentValue, propertyValue);
      default:
        console.error(`No validator for property type ${propertyName}`)
        return false;
        break;
    }
    throw new GeoFencerExpressionError(`Combination ${propertyName} ${operator} ${propertyValue} not implemented`);
  }
}
