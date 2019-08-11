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
	public static readonly AND = 3;
	public static readonly OR = 4;
	public static readonly NOT = 5;
	public static readonly TRUE = 6;
	public static readonly FALSE = 7;
	public static readonly GT = 8;
	public static readonly GE = 9;
	public static readonly LT = 10;
	public static readonly LE = 11;
	public static readonly EQ = 12;
	public static readonly LIKE = 13;
	public static readonly IN = 14;
	public static readonly LPAREN = 15;
	public static readonly RPAREN = 16;
	public static readonly PROP_START = 17;
	public static readonly PROP_END = 18;
	public static readonly DECIMAL = 19;
	public static readonly IDENTIFIER = 20;
	public static readonly TEXTFIELD = 21;
	public static readonly WS = 22;
	public static readonly RULE_parse = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_propKey = 2;
	public static readonly RULE_propValue = 3;
	public static readonly RULE_comparator = 4;
	public static readonly RULE_binary = 5;
	public static readonly RULE_bool = 6;
	public static readonly RULE_arrayoftext = 7;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"parse", "expression", "propKey", "propValue", "comparator", "binary", 
		"bool", "arrayoftext",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'['", "','", "'AND'", "'OR'", "'NOT'", "'TRUE'", "'FALSE'", 
		"'>'", "'>='", "'<'", "'<='", "'='", "'LIKE'", "'IN'", "'('", "')'", "'PROP['", 
		"']'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "AND", "OR", "NOT", "TRUE", "FALSE", 
		"GT", "GE", "LT", "LE", "EQ", "LIKE", "IN", "LPAREN", "RPAREN", "PROP_START", 
		"PROP_END", "DECIMAL", "IDENTIFIER", "TEXTFIELD", "WS",
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
			this.state = 16;
			this.expression(0);
			this.state = 17;
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
			this.state = 37;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GeoFencerExpressionParser.LPAREN:
				{
				_localctx = new ParenExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 20;
				this.match(GeoFencerExpressionParser.LPAREN);
				this.state = 21;
				this.expression(0);
				this.state = 22;
				this.match(GeoFencerExpressionParser.RPAREN);
				}
				break;
			case GeoFencerExpressionParser.NOT:
				{
				_localctx = new NotExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 24;
				this.match(GeoFencerExpressionParser.NOT);
				this.state = 25;
				this.expression(9);
				}
				break;
			case GeoFencerExpressionParser.TEXTFIELD:
				{
				_localctx = new TextfieldExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 26;
				this.match(GeoFencerExpressionParser.TEXTFIELD);
				}
				break;
			case GeoFencerExpressionParser.PROP_START:
				{
				_localctx = new PropExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 27;
				this.match(GeoFencerExpressionParser.PROP_START);
				this.state = 28;
				(_localctx as PropExpressionContext)._propertyKey = this.propKey();
				this.state = 29;
				this.match(GeoFencerExpressionParser.PROP_END);
				this.state = 30;
				(_localctx as PropExpressionContext)._propertyOperator = this.comparator();
				this.state = 31;
				(_localctx as PropExpressionContext)._propertyValue = this.propValue();
				}
				break;
			case GeoFencerExpressionParser.TRUE:
			case GeoFencerExpressionParser.FALSE:
				{
				_localctx = new BoolExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 33;
				this.bool();
				}
				break;
			case GeoFencerExpressionParser.IDENTIFIER:
				{
				_localctx = new IdentifierExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 34;
				this.match(GeoFencerExpressionParser.IDENTIFIER);
				}
				break;
			case GeoFencerExpressionParser.DECIMAL:
				{
				_localctx = new DecimalExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 35;
				this.match(GeoFencerExpressionParser.DECIMAL);
				}
				break;
			case GeoFencerExpressionParser.T__0:
				{
				_localctx = new ArrayOfTextExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 36;
				this.arrayoftext();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 49;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 47;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new ComparatorExpressionContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as ComparatorExpressionContext)._leftside = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, GeoFencerExpressionParser.RULE_expression);
						this.state = 39;
						if (!(this.precpred(this._ctx, 8))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 8)");
						}
						this.state = 40;
						(_localctx as ComparatorExpressionContext)._expressionoperator = this.comparator();
						this.state = 41;
						(_localctx as ComparatorExpressionContext)._rightside = this.expression(9);
						}
						break;

					case 2:
						{
						_localctx = new BinaryExpressionContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as BinaryExpressionContext)._leftside = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, GeoFencerExpressionParser.RULE_expression);
						this.state = 43;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 44;
						(_localctx as BinaryExpressionContext)._expressionoperator = this.binary();
						this.state = 45;
						(_localctx as BinaryExpressionContext)._rightside = this.expression(8);
						}
						break;
					}
					}
				}
				this.state = 51;
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
	public propKey(): PropKeyContext {
		let _localctx: PropKeyContext = new PropKeyContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, GeoFencerExpressionParser.RULE_propKey);
		try {
			_localctx = new PropKeyExpressionContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 52;
			this.match(GeoFencerExpressionParser.TEXTFIELD);
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
	public propValue(): PropValueContext {
		let _localctx: PropValueContext = new PropValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, GeoFencerExpressionParser.RULE_propValue);
		try {
			_localctx = new PropValueExpressionContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.match(GeoFencerExpressionParser.TEXTFIELD);
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
	public comparator(): ComparatorContext {
		let _localctx: ComparatorContext = new ComparatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, GeoFencerExpressionParser.RULE_comparator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 56;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GeoFencerExpressionParser.GT) | (1 << GeoFencerExpressionParser.GE) | (1 << GeoFencerExpressionParser.LT) | (1 << GeoFencerExpressionParser.LE) | (1 << GeoFencerExpressionParser.EQ) | (1 << GeoFencerExpressionParser.LIKE) | (1 << GeoFencerExpressionParser.IN))) !== 0))) {
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
		this.enterRule(_localctx, 10, GeoFencerExpressionParser.RULE_binary);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 58;
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
		this.enterRule(_localctx, 12, GeoFencerExpressionParser.RULE_bool);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 60;
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
	public arrayoftext(): ArrayoftextContext {
		let _localctx: ArrayoftextContext = new ArrayoftextContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, GeoFencerExpressionParser.RULE_arrayoftext);
		let _la: number;
		try {
			this.state = 74;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 62;
				this.match(GeoFencerExpressionParser.T__0);
				this.state = 63;
				this.match(GeoFencerExpressionParser.TEXTFIELD);
				this.state = 68;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GeoFencerExpressionParser.T__1) {
					{
					{
					this.state = 64;
					this.match(GeoFencerExpressionParser.T__1);
					this.state = 65;
					this.match(GeoFencerExpressionParser.TEXTFIELD);
					}
					}
					this.state = 70;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 71;
				this.match(GeoFencerExpressionParser.PROP_END);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 72;
				this.match(GeoFencerExpressionParser.T__0);
				this.state = 73;
				this.match(GeoFencerExpressionParser.PROP_END);
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
			return this.precpred(this._ctx, 8);

		case 1:
			return this.precpred(this._ctx, 7);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x18O\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03(\n\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x032" +
		"\n\x03\f\x03\x0E\x035\v\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03" +
		"\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x07\tE\n\t\f" +
		"\t\x0E\tH\v\t\x03\t\x03\t\x03\t\x05\tM\n\t\x03\t\x02\x02\x03\x04\n\x02" +
		"\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x02\x05\x03\x02" +
		"\n\x10\x03\x02\x05\x06\x03\x02\b\t\x02Q\x02\x12\x03\x02\x02\x02\x04\'" +
		"\x03\x02\x02\x02\x066\x03\x02\x02\x02\b8\x03\x02\x02\x02\n:\x03\x02\x02" +
		"\x02\f<\x03\x02\x02\x02\x0E>\x03\x02\x02\x02\x10L\x03\x02\x02\x02\x12" +
		"\x13\x05\x04\x03\x02\x13\x14\x07\x02\x02\x03\x14\x03\x03\x02\x02\x02\x15" +
		"\x16\b\x03\x01\x02\x16\x17\x07\x11\x02\x02\x17\x18\x05\x04\x03\x02\x18" +
		"\x19\x07\x12\x02\x02\x19(\x03\x02\x02\x02\x1A\x1B\x07\x07\x02\x02\x1B" +
		"(\x05\x04\x03\v\x1C(\x07\x17\x02\x02\x1D\x1E\x07\x13\x02\x02\x1E\x1F\x05" +
		"\x06\x04\x02\x1F \x07\x14\x02\x02 !\x05\n\x06\x02!\"\x05\b\x05\x02\"(" +
		"\x03\x02\x02\x02#(\x05\x0E\b\x02$(\x07\x16\x02\x02%(\x07\x15\x02\x02&" +
		"(\x05\x10\t\x02\'\x15\x03\x02\x02\x02\'\x1A\x03\x02\x02\x02\'\x1C\x03" +
		"\x02\x02\x02\'\x1D\x03\x02\x02\x02\'#\x03\x02\x02\x02\'$\x03\x02\x02\x02" +
		"\'%\x03\x02\x02\x02\'&\x03\x02\x02\x02(3\x03\x02\x02\x02)*\f\n\x02\x02" +
		"*+\x05\n\x06\x02+,\x05\x04\x03\v,2\x03\x02\x02\x02-.\f\t\x02\x02./\x05" +
		"\f\x07\x02/0\x05\x04\x03\n02\x03\x02\x02\x021)\x03\x02\x02\x021-\x03\x02" +
		"\x02\x0225\x03\x02\x02\x0231\x03\x02\x02\x0234\x03\x02\x02\x024\x05\x03" +
		"\x02\x02\x0253\x03\x02\x02\x0267\x07\x17\x02\x027\x07\x03\x02\x02\x02" +
		"89\x07\x17\x02\x029\t\x03\x02\x02\x02:;\t\x02\x02\x02;\v\x03\x02\x02\x02" +
		"<=\t\x03\x02\x02=\r\x03\x02\x02\x02>?\t\x04\x02\x02?\x0F\x03\x02\x02\x02" +
		"@A\x07\x03\x02\x02AF\x07\x17\x02\x02BC\x07\x04\x02\x02CE\x07\x17\x02\x02" +
		"DB\x03\x02\x02\x02EH\x03\x02\x02\x02FD\x03\x02\x02\x02FG\x03\x02\x02\x02" +
		"GI\x03\x02\x02\x02HF\x03\x02\x02\x02IM\x07\x14\x02\x02JK\x07\x03\x02\x02" +
		"KM\x07\x14\x02\x02L@\x03\x02\x02\x02LJ\x03\x02\x02\x02M\x11\x03\x02\x02" +
		"\x02\x07\'13FL";
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
export class TextfieldExpressionContext extends ExpressionContext {
	public TEXTFIELD(): TerminalNode { return this.getToken(GeoFencerExpressionParser.TEXTFIELD, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitTextfieldExpression) {
			return visitor.visitTextfieldExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PropExpressionContext extends ExpressionContext {
	public _propertyKey: PropKeyContext;
	public _propertyOperator: ComparatorContext;
	public _propertyValue: PropValueContext;
	public PROP_START(): TerminalNode { return this.getToken(GeoFencerExpressionParser.PROP_START, 0); }
	public PROP_END(): TerminalNode { return this.getToken(GeoFencerExpressionParser.PROP_END, 0); }
	public propKey(): PropKeyContext {
		return this.getRuleContext(0, PropKeyContext);
	}
	public comparator(): ComparatorContext {
		return this.getRuleContext(0, ComparatorContext);
	}
	public propValue(): PropValueContext {
		return this.getRuleContext(0, PropValueContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitPropExpression) {
			return visitor.visitPropExpression(this);
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
export class ArrayOfTextExpressionContext extends ExpressionContext {
	public arrayoftext(): ArrayoftextContext {
		return this.getRuleContext(0, ArrayoftextContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitArrayOfTextExpression) {
			return visitor.visitArrayOfTextExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropKeyContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_propKey; }
	public copyFrom(ctx: PropKeyContext): void {
		super.copyFrom(ctx);
	}
}
export class PropKeyExpressionContext extends PropKeyContext {
	public TEXTFIELD(): TerminalNode { return this.getToken(GeoFencerExpressionParser.TEXTFIELD, 0); }
	constructor(ctx: PropKeyContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitPropKeyExpression) {
			return visitor.visitPropKeyExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropValueContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_propValue; }
	public copyFrom(ctx: PropValueContext): void {
		super.copyFrom(ctx);
	}
}
export class PropValueExpressionContext extends PropValueContext {
	public TEXTFIELD(): TerminalNode { return this.getToken(GeoFencerExpressionParser.TEXTFIELD, 0); }
	constructor(ctx: PropValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitPropValueExpression) {
			return visitor.visitPropValueExpression(this);
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
	public IN(): TerminalNode | undefined { return this.tryGetToken(GeoFencerExpressionParser.IN, 0); }
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


export class ArrayoftextContext extends ParserRuleContext {
	public TEXTFIELD(): TerminalNode[];
	public TEXTFIELD(i: number): TerminalNode;
	public TEXTFIELD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GeoFencerExpressionParser.TEXTFIELD);
		} else {
			return this.getToken(GeoFencerExpressionParser.TEXTFIELD, i);
		}
	}
	public PROP_END(): TerminalNode { return this.getToken(GeoFencerExpressionParser.PROP_END, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GeoFencerExpressionParser.RULE_arrayoftext; }
	// @Override
	public accept<Result>(visitor: GeoFencerExpressionVisitor<Result>): Result {
		if (visitor.visitArrayoftext) {
			return visitor.visitArrayoftext(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


