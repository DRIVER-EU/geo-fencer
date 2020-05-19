import { GeoFencerExpressionVisitor } from '../../antlr/generated/GeoFencerExpressionVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { getForceIdentifier, stringToForceIdentifier, ForceIdentifier } from './../extensions/eu/driver/model/sim/simulation_entity_item_extension';

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
  TextfieldExpressionContext,
  PropExpressionContext,
  PropValueExpressionContext,
  PropKeyExpressionContext,
  PropKeyContext, PropValueContext
} from '../../antlr/generated/GeoFencerExpressionParser';
import { IItem } from '../avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';
import { GeoFencerExpressionError } from './GeofencerExceptions';
import { get } from 'http';

enum ExpressionProperty {
  Unknown = 'Unknown',
  Name = 'Name',
  Id = 'Id',
  ObjectType = 'ObjectType',
  ForceIdentifier = 'ForceIdentifier'
}

const PropertyNames =
  [
    'Name',
    'Guid',
    'ObjectType',
    'ForceIdentifier'
  ];

enum ExpressionOperator {
  Unknown = 'Unknown',
  Equals = 'Equals',
  GreaterEquals = 'GreaterEquals',
  Greater = 'Greater',
  Less = 'Less',
  LessEquals = 'LessEquals',
  Like = 'Like'

}

export class GeoFencerExpressionVisitorImpl extends AbstractParseTreeVisitor<any> implements GeoFencerExpressionVisitor<any> {




  private simItem: IItem;

  private substitutedExpression: string = '';

  constructor(itemSim: IItem) {
    super();
    this.simItem = itemSim;
  }


  defaultResult() {
    return true;
  }

  private isNumber(text: string): boolean {
    return !isNaN(Number(text));
  }

  /** Returns true if the input is an integer */
  private isInt = (n: number | string | boolean) => Number(n) === n && n % 1 === 0;

  /** Returns true if the input is a float */
  private isFloat = (n: number | string | boolean) => Number(n) === n && n % 1 !== 0;

  // E.g. PROP['PLATE']='TEST'
  visitPropExpression(ctx: PropExpressionContext): boolean {
    if ((ctx._propertyKey instanceof PropKeyExpressionContext) &&
      (ctx._propertyValue instanceof PropValueExpressionContext)) {
      const propertyKey = (this.visit(ctx._propertyKey));
      const propertyValue = (this.visit(ctx._propertyValue));
      let operator = this.GetOperator(ctx._propertyOperator);
      // Chekc if property exist on simulation item
      if ((this.simItem.tags) && (this.simItem.tags[propertyKey] != null)) {
        const currentValue = this.simItem.tags[propertyKey] as string;

        switch (operator) {
          case ExpressionOperator.Equals:
            if ((this.isNumber(currentValue) && this.isNumber(propertyValue))) {
              // compare numbers (for now do text compare)
              this.substitutedExpression += `${currentValue} ${ctx._propertyOperator.text} ${propertyValue}`;
              return this.stringEqualsIgnoreCase(currentValue, propertyValue);
            } else {
              // compare text
              this.substitutedExpression += `${currentValue} ${ctx._propertyOperator.text} ${propertyValue}`;
              return this.stringEqualsIgnoreCase(currentValue, propertyValue);
            }
          case ExpressionOperator.Like:
            const regexp = new RegExp(`${propertyValue}`);
            this.substitutedExpression += `RegExp("${currentValue}" , "${propertyValue}")`;
            return regexp.test(currentValue as string);
            break;
          case ExpressionOperator.Greater:
          case ExpressionOperator.GreaterEquals:
          case ExpressionOperator.Less:
          case ExpressionOperator.LessEquals:

            if (this.isNumber(propertyValue)) {
              if (this.isNumber(currentValue)) {
                const propertyValueNumber = Number(propertyValue);
                const currentSimValueNumber = Number(currentValue);
                this.substitutedExpression += `${currentValue} ${ctx._propertyOperator.text} ${propertyValue}`;
                return this.compareNumbers(currentSimValueNumber, propertyValueNumber, operator);
              } return false; // Cannot compare
            } else this.ThrowException(ctx, `PROP['${propertyValue}'] must be a number]).`);
          default:
            this.ThrowException(ctx, `Compare operator '${operator}' not allowed for PROP['${propertyValue}']]).`);
            break;
            return true;
        }
      } else {
        this.substitutedExpression += `property ${propertyKey} not found on simitem`;
      }
      return false;
    } else return false;
  }

  private compareNumbers(value1: Number, value2: Number, operator: ExpressionOperator): boolean {
    switch (operator) {
      case ExpressionOperator.Greater:
        return value1 > value2;
      case ExpressionOperator.GreaterEquals:
        return value1 >= value2;
      case ExpressionOperator.Less:
        return value1 < value2;
      case ExpressionOperator.LessEquals:
        return value1 <= value2;
      case ExpressionOperator.Equals:
        return value1 === value2;

    }
    return false;
  }

  visitPropValueExpression(ctx: PropValueExpressionContext): string {
    return ctx.text.substring(1, ctx.text.length - 1);
  }


  visitPropKeyExpression(ctx: PropKeyExpressionContext): string {
    return ctx.text.substring(1, ctx.text.length - 1);
  }

  visitParenExpression(ctx: ParenExpressionContext): boolean {
    this.substitutedExpression += ' ( ';
    let result = super.visitChildren(ctx);
    this.substitutedExpression += ' ) ';
    return result;
  }

  visitNotExpression(ctx: NotExpressionContext) {
    this.substitutedExpression += ' not ';
    return !(super.visit(ctx.expression()));
  }

  // Return the value of the literial string
  visitTextfieldExpression(ctx: TextfieldExpressionContext) {
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
        case ExpressionProperty.Id:
          switch (operator) {
            case ExpressionOperator.Equals:
              if (ctx._rightside instanceof TextfieldExpressionContext) {
                const propertyValue = (this.visit(ctx._rightside));
                let result = this.ValidateProperty(propertyEnum, operator, propertyValue);
                return result;
              } else this.ThrowException(ctx, `Can only compare ${propertyName} with text value.`);
              break;
            case ExpressionOperator.Like:
              if (ctx._rightside instanceof TextfieldExpressionContext) {
                const propertyValue = (this.visit(ctx._rightside));
                let result = this.ValidateProperty(propertyEnum, operator, propertyValue);
                return result;
              } else this.ThrowException(ctx, `Can only like ${propertyName} with text value.`);
              break;
            default:
              this.ThrowException(ctx, `Operator '${operator}' not allowed for ${propertyName}.`);
              break;
          }
        case ExpressionProperty.ObjectType:
          switch (operator) {
            case ExpressionOperator.Equals:
              if (ctx._rightside instanceof TextfieldExpressionContext) {
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
        case ExpressionProperty.ForceIdentifier:
          switch (operator) {
            case ExpressionOperator.Equals:
              if (ctx._rightside instanceof TextfieldExpressionContext) {
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
          this.ThrowException(ctx, `The property name ${propertyName} is not recognised (allowed property names: [${PropertyNames.join(', ')}]).`);
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
      this.substitutedExpression += ' AND ';
      let resultRight = super.visit(ctx._rightside);
      return resultLeft && resultRight;
    }
    else if (ctx._expressionoperator.OR() != null) {
      let resultLeft = super.visit(ctx._leftside);
      this.substitutedExpression += ' OR ';
      let resultRight = super.visit(ctx._rightside);
      return resultLeft || resultRight;
    }
    return false; // Should never happen

  }

  visitBoolExpression(ctx: BoolExpressionContext) {
    return true;
    // return Boolean.valueOf(ctx.getText());
  }

  // Return the identifier name (property name)
  visitIdentifierExpression(ctx: IdentifierExpressionContext) {
    return ctx.IDENTIFIER().toString();
  }


  visitDecimalExpression(ctx: DecimalExpressionContext) {
    console.log(`Value is = ${ctx.DECIMAL().toString()}.`);
    return false; // ctx.DECIMAL().toString();
    // return ctx.DECIMAL().getText();
  }

  // Called when start validation of expression
  visitParse(ctx: ParseContext): boolean {
    // This is the root node of the tree
    this.substitutedExpression = '';
    let result = super.visit(ctx.expression());
    this.substitutedExpression += '=> ' + result;
    // console.log(this.substitutedExpression);
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
    if (this.stringEqualsIgnoreCase(propertyName, 'Name')) return ExpressionProperty.Name;
    else if (this.stringEqualsIgnoreCase(propertyName, 'Id')) return ExpressionProperty.Id;
    else if (this.stringEqualsIgnoreCase(propertyName, 'ObjectType')) return ExpressionProperty.ObjectType;
    else if (this.stringEqualsIgnoreCase(propertyName, 'ForceIdentifier')) return ExpressionProperty.ForceIdentifier;
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
        if (operator === ExpressionOperator.Equals) {
          const currentValue = this.simItem.name || '';
          this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
          return this.stringEqualsIgnoreCase(currentValue, propertyValue);
        }
        if (operator === ExpressionOperator.Like) {
          // TODO cache regex expression
          const regexp = new RegExp(`${propertyValue}`);
          const currentValue = this.simItem.name || '';
          this.substitutedExpression += `RegExp("${currentValue}" , "${propertyValue}")`;
          return regexp.test(currentValue);
        }
        break;
      case ExpressionProperty.Id:
        if (operator === ExpressionOperator.Equals) {
          const currentValue = this.simItem.id || '';
          this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
          return this.stringEqualsIgnoreCase(currentValue, propertyValue);
        }
        break;
      case ExpressionProperty.ObjectType:
        const currentValue = 'Vehicle';
        this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
        return this.stringEqualsIgnoreCase(currentValue, propertyValue);
      case ExpressionProperty.ForceIdentifier:
        if (operator === ExpressionOperator.Equals) {
          const currentValue = getForceIdentifier(this.simItem);
          const ruleValue = stringToForceIdentifier(propertyValue);
          if (currentValue === ForceIdentifier.Invalid) {
            throw new GeoFencerExpressionError(`Simulation item property '${propertyName} has invalid value ${propertyValue}, allowed values [${Object.keys(ForceIdentifier).join(', ')}] `);
          }
          if (ruleValue === ForceIdentifier.Invalid) {
            throw new GeoFencerExpressionError(`Rule property ${propertyName} has invalid value ${ruleValue}, allowed values [${Object.keys(ForceIdentifier).join(', ')}] `);
          }
          this.substitutedExpression += `"${currentValue}" = "${propertyValue}"`;
          return this.stringEqualsIgnoreCase(currentValue, propertyValue);
        }
      default:
        console.error(`No validator for property type ${propertyName}`);
        return false;
        break;
    }
    throw new GeoFencerExpressionError(`Combination ${propertyName} ${operator} ${propertyValue} not implemented`);
  }
}
