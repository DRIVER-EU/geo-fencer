// Generated from c:\development\driver-eu\GIT_GeoFencer\geo-fencer\packages\server\src\antlr\GeoFencerExpression.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class GeoFencerExpressionParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, AND=3, OR=4, NOT=5, TRUE=6, FALSE=7, GT=8, GE=9, LT=10, 
		LE=11, EQ=12, LIKE=13, LPAREN=14, RPAREN=15, PROP_START=16, PROP_END=17, 
		PROPNAME=18, DECIMAL=19, IDENTIFIER=20, STRING=21, WS=22;
	public static final int
		RULE_parse = 0, RULE_expression = 1, RULE_propKey = 2, RULE_propValue = 3, 
		RULE_comparator = 4, RULE_binary = 5, RULE_bool = 6, RULE_arrayofstring = 7;
	public static final String[] ruleNames = {
		"parse", "expression", "propKey", "propValue", "comparator", "binary", 
		"bool", "arrayofstring"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'['", "','", "'AND'", "'OR'", "'NOT'", "'TRUE'", "'FALSE'", "'>'", 
		"'>='", "'<'", "'<='", "'='", "'LIKE'", "'('", "')'", "'PROP['", "']'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, "AND", "OR", "NOT", "TRUE", "FALSE", "GT", "GE", "LT", 
		"LE", "EQ", "LIKE", "LPAREN", "RPAREN", "PROP_START", "PROP_END", "PROPNAME", 
		"DECIMAL", "IDENTIFIER", "STRING", "WS"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "GeoFencerExpression.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public GeoFencerExpressionParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class ParseContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode EOF() { return getToken(GeoFencerExpressionParser.EOF, 0); }
		public ParseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parse; }
	}

	public final ParseContext parse() throws RecognitionException {
		ParseContext _localctx = new ParseContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_parse);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(16);
			expression(0);
			setState(17);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ArrayOfStringsExpressionContext extends ExpressionContext {
		public ArrayofstringContext arrayofstring() {
			return getRuleContext(ArrayofstringContext.class,0);
		}
		public ArrayOfStringsExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class BinaryExpressionContext extends ExpressionContext {
		public ExpressionContext leftside;
		public BinaryContext expressionoperator;
		public ExpressionContext rightside;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public BinaryContext binary() {
			return getRuleContext(BinaryContext.class,0);
		}
		public BinaryExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class DecimalExpressionContext extends ExpressionContext {
		public TerminalNode DECIMAL() { return getToken(GeoFencerExpressionParser.DECIMAL, 0); }
		public DecimalExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class StringExpressionContext extends ExpressionContext {
		public TerminalNode STRING() { return getToken(GeoFencerExpressionParser.STRING, 0); }
		public StringExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class BoolExpressionContext extends ExpressionContext {
		public BoolContext bool() {
			return getRuleContext(BoolContext.class,0);
		}
		public BoolExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class PropExpressionContext extends ExpressionContext {
		public PropKeyContext propertyKey;
		public ComparatorContext propertyOperator;
		public PropValueContext propertyValue;
		public TerminalNode PROP_START() { return getToken(GeoFencerExpressionParser.PROP_START, 0); }
		public TerminalNode PROP_END() { return getToken(GeoFencerExpressionParser.PROP_END, 0); }
		public PropKeyContext propKey() {
			return getRuleContext(PropKeyContext.class,0);
		}
		public ComparatorContext comparator() {
			return getRuleContext(ComparatorContext.class,0);
		}
		public PropValueContext propValue() {
			return getRuleContext(PropValueContext.class,0);
		}
		public PropExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class IdentifierExpressionContext extends ExpressionContext {
		public TerminalNode IDENTIFIER() { return getToken(GeoFencerExpressionParser.IDENTIFIER, 0); }
		public IdentifierExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class NotExpressionContext extends ExpressionContext {
		public TerminalNode NOT() { return getToken(GeoFencerExpressionParser.NOT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public NotExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ParenExpressionContext extends ExpressionContext {
		public TerminalNode LPAREN() { return getToken(GeoFencerExpressionParser.LPAREN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(GeoFencerExpressionParser.RPAREN, 0); }
		public ParenExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ComparatorExpressionContext extends ExpressionContext {
		public ExpressionContext leftside;
		public ComparatorContext expressionoperator;
		public ExpressionContext rightside;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ComparatorContext comparator() {
			return getRuleContext(ComparatorContext.class,0);
		}
		public ComparatorExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 2;
		enterRecursionRule(_localctx, 2, RULE_expression, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(37);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LPAREN:
				{
				_localctx = new ParenExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(20);
				match(LPAREN);
				setState(21);
				expression(0);
				setState(22);
				match(RPAREN);
				}
				break;
			case NOT:
				{
				_localctx = new NotExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(24);
				match(NOT);
				setState(25);
				expression(9);
				}
				break;
			case PROP_START:
				{
				_localctx = new PropExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(26);
				match(PROP_START);
				setState(27);
				((PropExpressionContext)_localctx).propertyKey = propKey();
				setState(28);
				match(PROP_END);
				setState(29);
				((PropExpressionContext)_localctx).propertyOperator = comparator();
				setState(30);
				((PropExpressionContext)_localctx).propertyValue = propValue();
				}
				break;
			case TRUE:
			case FALSE:
				{
				_localctx = new BoolExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(32);
				bool();
				}
				break;
			case IDENTIFIER:
				{
				_localctx = new IdentifierExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(33);
				match(IDENTIFIER);
				}
				break;
			case DECIMAL:
				{
				_localctx = new DecimalExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(34);
				match(DECIMAL);
				}
				break;
			case STRING:
				{
				_localctx = new StringExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(35);
				match(STRING);
				}
				break;
			case T__0:
				{
				_localctx = new ArrayOfStringsExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(36);
				arrayofstring();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(49);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(47);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
					case 1:
						{
						_localctx = new ComparatorExpressionContext(new ExpressionContext(_parentctx, _parentState));
						((ComparatorExpressionContext)_localctx).leftside = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(39);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(40);
						((ComparatorExpressionContext)_localctx).expressionoperator = comparator();
						setState(41);
						((ComparatorExpressionContext)_localctx).rightside = expression(9);
						}
						break;
					case 2:
						{
						_localctx = new BinaryExpressionContext(new ExpressionContext(_parentctx, _parentState));
						((BinaryExpressionContext)_localctx).leftside = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(43);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(44);
						((BinaryExpressionContext)_localctx).expressionoperator = binary();
						setState(45);
						((BinaryExpressionContext)_localctx).rightside = expression(8);
						}
						break;
					}
					} 
				}
				setState(51);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class PropKeyContext extends ParserRuleContext {
		public PropKeyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propKey; }
	 
		public PropKeyContext() { }
		public void copyFrom(PropKeyContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class PropKeyExpressionContext extends PropKeyContext {
		public TerminalNode PROPNAME() { return getToken(GeoFencerExpressionParser.PROPNAME, 0); }
		public PropKeyExpressionContext(PropKeyContext ctx) { copyFrom(ctx); }
	}

	public final PropKeyContext propKey() throws RecognitionException {
		PropKeyContext _localctx = new PropKeyContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_propKey);
		try {
			_localctx = new PropKeyExpressionContext(_localctx);
			enterOuterAlt(_localctx, 1);
			{
			setState(52);
			match(PROPNAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PropValueContext extends ParserRuleContext {
		public PropValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propValue; }
	 
		public PropValueContext() { }
		public void copyFrom(PropValueContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class PropValueExpressionContext extends PropValueContext {
		public TerminalNode PROPNAME() { return getToken(GeoFencerExpressionParser.PROPNAME, 0); }
		public PropValueExpressionContext(PropValueContext ctx) { copyFrom(ctx); }
	}

	public final PropValueContext propValue() throws RecognitionException {
		PropValueContext _localctx = new PropValueContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_propValue);
		try {
			_localctx = new PropValueExpressionContext(_localctx);
			enterOuterAlt(_localctx, 1);
			{
			setState(54);
			match(PROPNAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ComparatorContext extends ParserRuleContext {
		public TerminalNode GT() { return getToken(GeoFencerExpressionParser.GT, 0); }
		public TerminalNode GE() { return getToken(GeoFencerExpressionParser.GE, 0); }
		public TerminalNode LT() { return getToken(GeoFencerExpressionParser.LT, 0); }
		public TerminalNode LE() { return getToken(GeoFencerExpressionParser.LE, 0); }
		public TerminalNode EQ() { return getToken(GeoFencerExpressionParser.EQ, 0); }
		public TerminalNode LIKE() { return getToken(GeoFencerExpressionParser.LIKE, 0); }
		public ComparatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comparator; }
	}

	public final ComparatorContext comparator() throws RecognitionException {
		ComparatorContext _localctx = new ComparatorContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_comparator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(56);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << GT) | (1L << GE) | (1L << LT) | (1L << LE) | (1L << EQ) | (1L << LIKE))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BinaryContext extends ParserRuleContext {
		public TerminalNode AND() { return getToken(GeoFencerExpressionParser.AND, 0); }
		public TerminalNode OR() { return getToken(GeoFencerExpressionParser.OR, 0); }
		public BinaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binary; }
	}

	public final BinaryContext binary() throws RecognitionException {
		BinaryContext _localctx = new BinaryContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_binary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(58);
			_la = _input.LA(1);
			if ( !(_la==AND || _la==OR) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BoolContext extends ParserRuleContext {
		public TerminalNode TRUE() { return getToken(GeoFencerExpressionParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(GeoFencerExpressionParser.FALSE, 0); }
		public BoolContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bool; }
	}

	public final BoolContext bool() throws RecognitionException {
		BoolContext _localctx = new BoolContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_bool);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(60);
			_la = _input.LA(1);
			if ( !(_la==TRUE || _la==FALSE) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ArrayofstringContext extends ParserRuleContext {
		public List<TerminalNode> STRING() { return getTokens(GeoFencerExpressionParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(GeoFencerExpressionParser.STRING, i);
		}
		public ArrayofstringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrayofstring; }
	}

	public final ArrayofstringContext arrayofstring() throws RecognitionException {
		ArrayofstringContext _localctx = new ArrayofstringContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_arrayofstring);
		int _la;
		try {
			setState(74);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(62);
				match(T__0);
				setState(63);
				match(STRING);
				setState(68);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__1) {
					{
					{
					setState(64);
					match(T__1);
					setState(65);
					match(STRING);
					}
					}
					setState(70);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(71);
				match(PROP_END);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(72);
				match(T__0);
				setState(73);
				match(PROP_END);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 1:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 8);
		case 1:
			return precpred(_ctx, 7);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\30O\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\3\2\3\2\3\2\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3("+
		"\n\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\7\3\62\n\3\f\3\16\3\65\13\3\3\4\3"+
		"\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\t\3\t\7\tE\n\t\f\t\16\tH"+
		"\13\t\3\t\3\t\3\t\5\tM\n\t\3\t\2\3\4\n\2\4\6\b\n\f\16\20\2\5\3\2\n\17"+
		"\3\2\5\6\3\2\b\t\2Q\2\22\3\2\2\2\4\'\3\2\2\2\6\66\3\2\2\2\b8\3\2\2\2\n"+
		":\3\2\2\2\f<\3\2\2\2\16>\3\2\2\2\20L\3\2\2\2\22\23\5\4\3\2\23\24\7\2\2"+
		"\3\24\3\3\2\2\2\25\26\b\3\1\2\26\27\7\20\2\2\27\30\5\4\3\2\30\31\7\21"+
		"\2\2\31(\3\2\2\2\32\33\7\7\2\2\33(\5\4\3\13\34\35\7\22\2\2\35\36\5\6\4"+
		"\2\36\37\7\23\2\2\37 \5\n\6\2 !\5\b\5\2!(\3\2\2\2\"(\5\16\b\2#(\7\26\2"+
		"\2$(\7\25\2\2%(\7\27\2\2&(\5\20\t\2\'\25\3\2\2\2\'\32\3\2\2\2\'\34\3\2"+
		"\2\2\'\"\3\2\2\2\'#\3\2\2\2\'$\3\2\2\2\'%\3\2\2\2\'&\3\2\2\2(\63\3\2\2"+
		"\2)*\f\n\2\2*+\5\n\6\2+,\5\4\3\13,\62\3\2\2\2-.\f\t\2\2./\5\f\7\2/\60"+
		"\5\4\3\n\60\62\3\2\2\2\61)\3\2\2\2\61-\3\2\2\2\62\65\3\2\2\2\63\61\3\2"+
		"\2\2\63\64\3\2\2\2\64\5\3\2\2\2\65\63\3\2\2\2\66\67\7\24\2\2\67\7\3\2"+
		"\2\289\7\24\2\29\t\3\2\2\2:;\t\2\2\2;\13\3\2\2\2<=\t\3\2\2=\r\3\2\2\2"+
		">?\t\4\2\2?\17\3\2\2\2@A\7\3\2\2AF\7\27\2\2BC\7\4\2\2CE\7\27\2\2DB\3\2"+
		"\2\2EH\3\2\2\2FD\3\2\2\2FG\3\2\2\2GI\3\2\2\2HF\3\2\2\2IM\7\23\2\2JK\7"+
		"\3\2\2KM\7\23\2\2L@\3\2\2\2LJ\3\2\2\2M\21\3\2\2\2\7\'\61\63FL";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}