// Generated from src/antlr/GeoFencerExpression.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ParenExpressionContext } from "./GeoFencerExpressionParser";
import { NotExpressionContext } from "./GeoFencerExpressionParser";
import { ComparatorExpressionContext } from "./GeoFencerExpressionParser";
import { BinaryExpressionContext } from "./GeoFencerExpressionParser";
import { PropExpressionContext } from "./GeoFencerExpressionParser";
import { BoolExpressionContext } from "./GeoFencerExpressionParser";
import { IdentifierExpressionContext } from "./GeoFencerExpressionParser";
import { DecimalExpressionContext } from "./GeoFencerExpressionParser";
import { StringExpressionContext } from "./GeoFencerExpressionParser";
import { ArrayOfStringsExpressionContext } from "./GeoFencerExpressionParser";
import { PropValueExpressionContext } from "./GeoFencerExpressionParser";
import { PropKeyExpressionContext } from "./GeoFencerExpressionParser";
import { ParseContext } from "./GeoFencerExpressionParser";
import { ExpressionContext } from "./GeoFencerExpressionParser";
import { PropKeyContext } from "./GeoFencerExpressionParser";
import { PropValueContext } from "./GeoFencerExpressionParser";
import { ComparatorContext } from "./GeoFencerExpressionParser";
import { BinaryContext } from "./GeoFencerExpressionParser";
import { BoolContext } from "./GeoFencerExpressionParser";
import { ArrayofstringContext } from "./GeoFencerExpressionParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `GeoFencerExpressionParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface GeoFencerExpressionVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `parenExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenExpression?: (ctx: ParenExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `notExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpression?: (ctx: NotExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `comparatorExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparatorExpression?: (ctx: ComparatorExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `binaryExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryExpression?: (ctx: BinaryExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `propExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropExpression?: (ctx: PropExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `boolExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolExpression?: (ctx: BoolExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `identifierExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierExpression?: (ctx: IdentifierExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `decimalExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalExpression?: (ctx: DecimalExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `stringExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpression?: (ctx: StringExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrayOfStringsExpression`
	 * labeled alternative in `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayOfStringsExpression?: (ctx: ArrayOfStringsExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `propValueExpression`
	 * labeled alternative in `GeoFencerExpressionParser.propValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropValueExpression?: (ctx: PropValueExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `propKeyExpression`
	 * labeled alternative in `GeoFencerExpressionParser.propKey`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropKeyExpression?: (ctx: PropKeyExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.parse`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParse?: (ctx: ParseContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.propKey`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropKey?: (ctx: PropKeyContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.propValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropValue?: (ctx: PropValueContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.comparator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparator?: (ctx: ComparatorContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.binary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary?: (ctx: BinaryContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.bool`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBool?: (ctx: BoolContext) => Result;

	/**
	 * Visit a parse tree produced by `GeoFencerExpressionParser.arrayofstring`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayofstring?: (ctx: ArrayofstringContext) => Result;
}

