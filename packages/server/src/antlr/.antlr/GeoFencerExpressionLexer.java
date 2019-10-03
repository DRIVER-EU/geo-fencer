// Generated from c:\development\driver-eu\GIT_GeoFencer\geo-fencer\packages\server\src\antlr\GeoFencerExpression.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class GeoFencerExpressionLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, AND=3, OR=4, NOT=5, TRUE=6, FALSE=7, GT=8, GE=9, LT=10, 
		LE=11, EQ=12, LIKE=13, IN=14, LPAREN=15, RPAREN=16, PROP_START=17, PROP_END=18, 
		DECIMAL=19, IDENTIFIER=20, TEXTFIELD=21, WS=22;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"T__0", "T__1", "AND", "OR", "NOT", "TRUE", "FALSE", "GT", "GE", "LT", 
		"LE", "EQ", "LIKE", "IN", "LPAREN", "RPAREN", "PROP_START", "PROP_END", 
		"DECIMAL", "IDENTIFIER", "TEXTFIELD", "WS"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'['", "','", "'AND'", "'OR'", "'NOT'", "'TRUE'", "'FALSE'", "'>'", 
		"'>='", "'<'", "'<='", "'='", "'LIKE'", "'IN'", "'('", "')'", "'PROP['", 
		"']'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, "AND", "OR", "NOT", "TRUE", "FALSE", "GT", "GE", "LT", 
		"LE", "EQ", "LIKE", "IN", "LPAREN", "RPAREN", "PROP_START", "PROP_END", 
		"DECIMAL", "IDENTIFIER", "TEXTFIELD", "WS"
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


	public GeoFencerExpressionLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "GeoFencerExpression.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\30\u0090\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\3\2\3\2\3\3\3"+
		"\3\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\6\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3\7\3\b"+
		"\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3\n\3\n\3\n\3\13\3\13\3\f\3\f\3\f\3\r\3\r"+
		"\3\16\3\16\3\16\3\16\3\16\3\17\3\17\3\17\3\20\3\20\3\21\3\21\3\22\3\22"+
		"\3\22\3\22\3\22\3\22\3\23\3\23\3\24\5\24k\n\24\3\24\6\24n\n\24\r\24\16"+
		"\24o\3\24\3\24\6\24t\n\24\r\24\16\24u\5\24x\n\24\3\25\3\25\7\25|\n\25"+
		"\f\25\16\25\177\13\25\3\26\3\26\7\26\u0083\n\26\f\26\16\26\u0086\13\26"+
		"\3\26\3\26\3\27\6\27\u008b\n\27\r\27\16\27\u008c\3\27\3\27\2\2\30\3\3"+
		"\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21"+
		"!\22#\23%\24\'\25)\26+\27-\30\3\2\7\3\2\62;\5\2C\\aac|\6\2\62;C\\aac|"+
		"\3\2))\5\2\13\f\16\17\"\"\2\u0096\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2"+
		"\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3"+
		"\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2"+
		"\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2"+
		"\2\2+\3\2\2\2\2-\3\2\2\2\3/\3\2\2\2\5\61\3\2\2\2\7\63\3\2\2\2\t\67\3\2"+
		"\2\2\13:\3\2\2\2\r>\3\2\2\2\17C\3\2\2\2\21I\3\2\2\2\23K\3\2\2\2\25N\3"+
		"\2\2\2\27P\3\2\2\2\31S\3\2\2\2\33U\3\2\2\2\35Z\3\2\2\2\37]\3\2\2\2!_\3"+
		"\2\2\2#a\3\2\2\2%g\3\2\2\2\'j\3\2\2\2)y\3\2\2\2+\u0080\3\2\2\2-\u008a"+
		"\3\2\2\2/\60\7]\2\2\60\4\3\2\2\2\61\62\7.\2\2\62\6\3\2\2\2\63\64\7C\2"+
		"\2\64\65\7P\2\2\65\66\7F\2\2\66\b\3\2\2\2\678\7Q\2\289\7T\2\29\n\3\2\2"+
		"\2:;\7P\2\2;<\7Q\2\2<=\7V\2\2=\f\3\2\2\2>?\7V\2\2?@\7T\2\2@A\7W\2\2AB"+
		"\7G\2\2B\16\3\2\2\2CD\7H\2\2DE\7C\2\2EF\7N\2\2FG\7U\2\2GH\7G\2\2H\20\3"+
		"\2\2\2IJ\7@\2\2J\22\3\2\2\2KL\7@\2\2LM\7?\2\2M\24\3\2\2\2NO\7>\2\2O\26"+
		"\3\2\2\2PQ\7>\2\2QR\7?\2\2R\30\3\2\2\2ST\7?\2\2T\32\3\2\2\2UV\7N\2\2V"+
		"W\7K\2\2WX\7M\2\2XY\7G\2\2Y\34\3\2\2\2Z[\7K\2\2[\\\7P\2\2\\\36\3\2\2\2"+
		"]^\7*\2\2^ \3\2\2\2_`\7+\2\2`\"\3\2\2\2ab\7R\2\2bc\7T\2\2cd\7Q\2\2de\7"+
		"R\2\2ef\7]\2\2f$\3\2\2\2gh\7_\2\2h&\3\2\2\2ik\7/\2\2ji\3\2\2\2jk\3\2\2"+
		"\2km\3\2\2\2ln\t\2\2\2ml\3\2\2\2no\3\2\2\2om\3\2\2\2op\3\2\2\2pw\3\2\2"+
		"\2qs\7\60\2\2rt\t\2\2\2sr\3\2\2\2tu\3\2\2\2us\3\2\2\2uv\3\2\2\2vx\3\2"+
		"\2\2wq\3\2\2\2wx\3\2\2\2x(\3\2\2\2y}\t\3\2\2z|\t\4\2\2{z\3\2\2\2|\177"+
		"\3\2\2\2}{\3\2\2\2}~\3\2\2\2~*\3\2\2\2\177}\3\2\2\2\u0080\u0084\7)\2\2"+
		"\u0081\u0083\n\5\2\2\u0082\u0081\3\2\2\2\u0083\u0086\3\2\2\2\u0084\u0082"+
		"\3\2\2\2\u0084\u0085\3\2\2\2\u0085\u0087\3\2\2\2\u0086\u0084\3\2\2\2\u0087"+
		"\u0088\7)\2\2\u0088,\3\2\2\2\u0089\u008b\t\6\2\2\u008a\u0089\3\2\2\2\u008b"+
		"\u008c\3\2\2\2\u008c\u008a\3\2\2\2\u008c\u008d\3\2\2\2\u008d\u008e\3\2"+
		"\2\2\u008e\u008f\b\27\2\2\u008f.\3\2\2\2\n\2jouw}\u0084\u008c\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}