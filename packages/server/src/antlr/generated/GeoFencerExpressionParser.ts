// Generated from src/antlr/GeoFencerExpression.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { GeoFencerExpressionVisitor } from "./GeoFencerExpressionVisitor";


export class GeoFencerExpressionParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly AND = 4;
	public static readonly OR = 5;
	public static readonly NOT = 6;
	public static readonly TRUE = 7;
	public static readonly FALSE = 8;
	public static readonly GT = 9;
	public static readonly GE = 10;
	public static readonly LT = 11;
	public static readonly LE = 12;
	public static readonly EQ = 13;
	public static readonly LIKE = 14;
	public static readonly LPAREN = 15;
	public static readonly RPAREN = 16;
	public static readonly DECIMAL = 17;
	public static readonly IDENTIFIER = 18;
	public static readonly STRING = 19;
	public static readonly WS = 20;
	public static readonly RULE_parse = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_comparator = 2;
	public static readonly RULE_binary = 3;
	public static readonly RULE_bool = 4;
	public static readonly RULE_arrayofstring = 5;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"parse", "expression", "comparator", "binary", "bool", "arrayofstring",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'['", "','", "']'", "'AND'", "'OR'", "'NOT'", "'TRUE'", "'FALSE'", 
		"'>'", "'>='", "'<'", "'<='", "'='", "'LIKE'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, "AND", "OR", "NOT", "TRUE", 
		"FALSE", "GT", "GE", "LT", "LE", "EQ", "LIKE", "LPAREN", "RPAREN", "DECIMAL", 
		"IDENTIFIER", "STRING", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(GeoFencerExpressionParser._LITERAL_NAMES, GeoFencerExpressionParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return GeoFencerExpressionParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "GeoFencerExpression.g4"; }

	// @Override
	public get ruleNames(): string[] { return GeoFencerExpressionParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return GeoFencerExpressionParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(GeoFencerExpressionParser._ATN, this);
	}
	// @RuleVersion(0)
	public parse(): ParseContext {
		let _localctx: ParseContext = new ParseContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, GeoFencerExpressionParser.RULE_parse);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 12;
			this.expression(0);
			this.state = 13;
			this.match(GeoFencerExpressionParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, GeoFencerExpressionParser.RULE_expression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 27;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GeoFencerExpressionParser.LPAREN:
				{
				_localctx = new ParenExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 16;
				this.match(GeoFencerExpressionParser.LPAREN);
				this.state = 17;
				this.expression(0);
				this.state = 18;
				this.match(GeoFencerExpressionParser.RPAREN);
				}
				break;
			case GeoFencerExpressionParser.NOT:
				{
				_localctx = new NotExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 20;
				this.match(GeoFencerExpressionParser.NOT);
				this.state = 21;
				this.expression(8);
				}
				break;
			case GeoFencerExpressionParser.TRUE:
			case GeoFencerExpressionParser.FALSE:
				{
				_localctx = new BoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 22;
				this.bool();
				}
				break;
			case GeoFencerExpressionParser.IDENTIFIER:
				{
				_localctx = new IdentifierExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 23;
				this.match(GeoFencerExpressionParser.IDENTIFIER);
				}
				break;
			case GeoFencerExpressionParser.DECIMAL:
				{
				_localctx = new DecimalExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 24;
				this.match(GeoFencerExpressionParser.DECIMAL);
				}
				break;
			case GeoFencerExpressionParser.STRING:
				{
				_localctx = new StringExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 25;
				this.match(GeoFencerExpressionParser.STRING);
				}
				break;
			case GeoFencerExpressionParser.T__0:
				{
				_localctx = new ArrayOfStringsExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 26;
				this.arrayofstring();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 39;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 37;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new ComparatorExpressionContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as ComparatorExpressionContext)._leftside = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, GeoFencerExpressionParser.RULE_expression);
						this.state = 29;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 30;
						(_localctx as ComparatorExpressionContext)._expressionoperator = this.comparator();
						this.state = 31;
						(_localctx as ComparatorExpressionContext)._rightside = this.expression(8);
						}
						break;

					case 2:
						{
						_localctx = new BinaryExpressionContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as BinaryExpressionContext)._leftside = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, GeoFencerExpressionParser.RULE_expression);
						this.state = 33;
						if (!(this.precpred(this._ctx, 6))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 6)");
						}
						this.state = 34;
						(_localctx as BinaryExpressionContext)._expressionoperator = this.binary();
						this.state = 35;
						(_localctx as BinaryExpressionContext)._rightside = this.expression(7);
						}
						break;
					}
					}
				}
				this.state = 41;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparator(): ComparatorContext {
		let _localctx: ComparatorContext = new ComparatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, GeoFencerExpressionParser.RULE_comparator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 42;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GeoFencerExpressionParser.GT) | (1 << GeoFencerExpressionParser.GE) | (1 << GeoFencerExpressionParser.LT) | (1 << GeoFencerExpressionParser.LE) | (1 << GeoFencerExpressionParser.EQ) | (1 << GeoFencerExpressionParser.LIKE))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public binary(): BinaryContext {
		let _localctx: BinaryContext = new BinaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, GeoFencerExpressionParser.RULE_binary);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 44;
			_la = this._input.LA(1);
			if (!(_la === GeoFencerExpressionParser.AND || _la === GeoFencerExpressionParser.OR)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bool(): BoolContext {
		let _localctx: BoolContext = new BoolContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, GeoFencerExpressionParser.RULE_bool);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 46;
			_la = this._input.LA(1);
			if (!(_la === GeoFencerExpressionParser.TRUE || _la === GeoFencerExpressionParser.FALSE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayofstring(): ArrayofstringContext {
		let _localctx: ArrayofstringContext = new ArrayofstringContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, GeoFencerExpressionParser.RULE_arrayofstring);
		let _la: number;
		try {
			this.state = 60;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 48;
				this.match(GeoFencerExpressionParser.T__0);
				this.state = 49;
				this.match(GeoFencerExpressionParser.STRING);
				this.state = 54;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GeoFencerExpressionParser.T__1) {
					{
					{
					this.state = 50;
					this.match(GeoFencerExpressionParser.T__1);
					this.state = 51;
					this.match(GeoFencerExpressionParser.STRING);
					}
					}
					this.state = 56;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 57;
				this.match(GeoFencerExpressionParser.T__2);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 58;
				this.match(GeoFencerExpressionParser.T__0);
				this.state = 59;
				this.match(GeoFencerExpressionParser.T__2);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 7);

		case 1:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x16A\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x1E\n" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07" +
		"\x03(\n\x03\f\x03\x0E\x03+\v\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06" +
		"\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x07\x077\n\x07\f\x07\x0E\x07" +
		":\v\x07\x03\x07\x03\x07\x03\x07\x05\x07?\n\x07\x03\x07\x02\x02\x03\x04" +
		"\b\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x02\x05\x03\x02\v\x10\x03" +
		"\x02\x06\x07\x03\x02\t\n\x02D\x02\x0E\x03\x02\x02\x02\x04\x1D\x03\x02" +
		"\x02\x02\x06,\x03\x02\x02\x02\b.\x03\x02\x02\x02\n0\x03\x02\x02\x02\f" +
		">\x03\x02\x02\x02\x0E\x0F\x05\x04\x03\x02\x0F\x10\x07\x02\x02\x03\x10" +
		"\x03\x03\x02\x02\x02\x11\x12\b\x03\x01\x02\x12\x13\x07\x11\x02\x02\x13" +
		"\x14\x05\x04\x03\x02\x14\x15\x07\x12\x02\x02\x15\x1E\x03\x02\x02\x02\x16" +
		"\x17\x07\b\x02\x02\x17\x1E\x05\x04\x03\n\x18\x1E\x05\n\x06\x02\x19\x1E" +
		"\x07\x14\x02\x02\x1A\x1E\x07\x13\x02\x02\x1B\x1E\x07\x15\x02\x02\x1C\x1E" +
		"\x05\f\x07\x02\x1D\x11\x03\x02\x02\x02\x1D\x16\x03\x02\x02\x02\x1D\x18" +
		"\x03\x02\x02\x02\x1D\x19\x03\x02\x02\x02\x1D\x1A\x03\x02\x02\x02\x1D\x1B" +
		"\x03\x02\x02\x02\x1D\x1C\x03\x02\x02\x02\x1E)\x03\x02\x02\x02\x1F \f\t" +
		"\x02\x02 !\x05\x06\x04\x02!\"\x05\x04\x03\n\"(\x03\x02\x02\x02#$\f\b\x02" +
		"\x02$%\x05\b\x05\x02%&\x05\x04\x03\t&(\x03\x02\x02\x02\'\x1F\x03\x02\x02" +
		"\x02\'#\x03\x02\x02\x02(+\x03\x02\x02\x02)\'\x03\x02\x02\x02)*\x03\x02" +
		"\x02\x02*\x05\x03\x02\x02\x02+)\x03\x02\x02\x02,-\t\x02\x02\x02-\x07\x03" +
		"\x02\x02\x02./\t\x03\x02\x02/\t\x03\x02\x02\x0201\t\x04\x02\x021\v\x03" +
		"\x02\x02\x0223\x07\x03\x02\x0238\x07\x15\x02\x0245\x07\x04\x02\x0257\x07" +
		"\x15\x02\x0264\x03\x02\x02\x027:\x03\x02\x02\x0286\x03\x02\x02\x0289\x03" +
		"\x02\x02\x029;\x03\x02\x02\x02:8\x03\x02\x02\x02;?\x07\x05\x02\x02<=\x07" +
		"\x03\x02\x02=?\x07\x05\x02\x02>2\x03\x02\x02\x02><\x03\x02\x02\x02?\r" +
		"\x03\x02\x02\x02\x07\x1D\')8>";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!GeoFencerExpressionParser.__ATN) {
			GeoFencerExpressionParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(GeoFencerExpressionParser._serializedATN));
		}

		return GeoFencerExpressionParser.__ATN;
	}

}

export class ParseContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EOF(): TerminalNode { return this.getToken(GeoFencerExpressionParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_parse; }
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitParse) {
			return visitor.visitParse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenExpressionContext extends ExpressionContext {
	public LPAREN(): TerminalNode { return this.getToken(GeoFencerExpressionParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(GeoFencerExpressionParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitParenExpression) {
			return visitor.visitParenExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExpressionContext extends ExpressionContext {
	public NOT(): TerminalNode { return this.getToken(GeoFencerExpressionParser.NOT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitNotExpression) {
			return visitor.visitNotExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComparatorExpressionContext extends ExpressionContext {
	public _leftside: ExpressionContext;
	public _expressionoperator: ComparatorContext;
	public _rightside: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public comparator(): ComparatorContext {
		return this.getRuleContext(0, ComparatorContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitComparatorExpression) {
			return visitor.visitComparatorExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryExpressionContext extends ExpressionContext {
	public _leftside: ExpressionContext;
	public _expressionoperator: BinaryContext;
	public _rightside: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public binary(): BinaryContext {
		return this.getRuleContext(0, BinaryContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitBinaryExpression) {
			return visitor.visitBinaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolExpressionContext extends ExpressionContext {
	public bool(): BoolContext {
		return this.getRuleContext(0, BoolContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitBoolExpression) {
			return visitor.visitBoolExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdentifierExpressionContext extends ExpressionContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(GeoFencerExpressionParser.IDENTIFIER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitIdentifierExpression) {
			return visitor.visitIdentifierExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DecimalExpressionContext extends ExpressionContext {
	public DECIMAL(): TerminalNode { return this.getToken(GeoFencerExpressionParser.DECIMAL, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitDecimalExpression) {
			return visitor.visitDecimalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringExpressionContext extends ExpressionContext {
	public STRING(): TerminalNode { return this.getToken(GeoFencerExpressionParser.STRING, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitStringExpression) {
			return visitor.visitStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayOfStringsExpressionContext extends ExpressionContext {
	public arrayofstring(): ArrayofstringContext {
		return this.getRuleContext(0, ArrayofstringContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitArrayOfStringsExpression) {
			return visitor.visitArrayOfStringsExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparatorContext extends ParserRuleContext {
	public GT(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.GT, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.GE, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.LT, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.LE, 0); }
	public EQ(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.EQ, 0); }
	public LIKE(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.LIKE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_comparator; }
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitComparator) {
			return visitor.visitComparator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BinaryContext extends ParserRuleContext {
	public AND(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.OR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_binary; }
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitBinary) {
			return visitor.visitBinary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoolContext extends ParserRuleContext {
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.FALSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_bool; }
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitBool) {
			return visitor.visitBool(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayofstringContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GeoFencerExpressionParser.STRING);
		} else {
			return this.getToken(GeoFencerExpressionParser.STRING, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_arrayofstring; }
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitArrayofstring) {
			return visitor.visitArrayofstring(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


