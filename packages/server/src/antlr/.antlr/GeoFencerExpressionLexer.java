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
		T__0=1, T__1=2, T__2=3, AND=4, OR=5, NOT=6, TRUE=7, FALSE=8, GT=9, GE=10, 
		LT=11, LE=12, EQ=13, LIKE=14, LPAREN=15, RPAREN=16, DECIMAL=17, IDENTIFIER=18, 
		STRING=19, WS=20;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"T__0", "T__1", "T__2", "AND", "OR", "NOT", "TRUE", "FALSE", "GT", "GE", 
		"LT", "LE", "EQ", "LIKE", "LPAREN", "RPAREN", "DECIMAL", "IDENTIFIER", 
		"STRING", "WS"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'['", "','", "']'", "'AND'", "'OR'", "'NOT'", "'TRUE'", "'FALSE'", 
		"'>'", "'>='", "'<'", "'<='", "'='", "'LIKE'", "'('", "')'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, "AND", "OR", "NOT", "TRUE", "FALSE", "GT", "GE", 
		"LT", "LE", "EQ", "LIKE", "LPAREN", "RPAREN", "DECIMAL", "IDENTIFIER", 
		"STRING", "WS"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\26\u0083\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3"+
		"\5\3\5\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3\t\3\t"+
		"\3\t\3\t\3\n\3\n\3\13\3\13\3\13\3\f\3\f\3\r\3\r\3\r\3\16\3\16\3\17\3\17"+
		"\3\17\3\17\3\17\3\20\3\20\3\21\3\21\3\22\5\22^\n\22\3\22\6\22a\n\22\r"+
		"\22\16\22b\3\22\3\22\6\22g\n\22\r\22\16\22h\5\22k\n\22\3\23\3\23\7\23"+
		"o\n\23\f\23\16\23r\13\23\3\24\3\24\7\24v\n\24\f\24\16\24y\13\24\3\24\3"+
		"\24\3\25\6\25~\n\25\r\25\16\25\177\3\25\3\25\2\2\26\3\3\5\4\7\5\t\6\13"+
		"\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'"+
		"\25)\26\3\2\6\3\2\62;\5\2C\\aac|\6\2\62;C\\aac|\5\2\13\f\16\17\"\"\2\u0089"+
		"\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2"+
		"\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2"+
		"\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2"+
		"\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\3+\3\2\2\2\5-\3\2\2\2\7/\3\2\2"+
		"\2\t\61\3\2\2\2\13\65\3\2\2\2\r8\3\2\2\2\17<\3\2\2\2\21A\3\2\2\2\23G\3"+
		"\2\2\2\25I\3\2\2\2\27L\3\2\2\2\31N\3\2\2\2\33Q\3\2\2\2\35S\3\2\2\2\37"+
		"X\3\2\2\2!Z\3\2\2\2#]\3\2\2\2%l\3\2\2\2\'s\3\2\2\2)}\3\2\2\2+,\7]\2\2"+
		",\4\3\2\2\2-.\7.\2\2.\6\3\2\2\2/\60\7_\2\2\60\b\3\2\2\2\61\62\7C\2\2\62"+
		"\63\7P\2\2\63\64\7F\2\2\64\n\3\2\2\2\65\66\7Q\2\2\66\67\7T\2\2\67\f\3"+
		"\2\2\289\7P\2\29:\7Q\2\2:;\7V\2\2;\16\3\2\2\2<=\7V\2\2=>\7T\2\2>?\7W\2"+
		"\2?@\7G\2\2@\20\3\2\2\2AB\7H\2\2BC\7C\2\2CD\7N\2\2DE\7U\2\2EF\7G\2\2F"+
		"\22\3\2\2\2GH\7@\2\2H\24\3\2\2\2IJ\7@\2\2JK\7?\2\2K\26\3\2\2\2LM\7>\2"+
		"\2M\30\3\2\2\2NO\7>\2\2OP\7?\2\2P\32\3\2\2\2QR\7?\2\2R\34\3\2\2\2ST\7"+
		"N\2\2TU\7K\2\2UV\7M\2\2VW\7G\2\2W\36\3\2\2\2XY\7*\2\2Y \3\2\2\2Z[\7+\2"+
		"\2[\"\3\2\2\2\\^\7/\2\2]\\\3\2\2\2]^\3\2\2\2^`\3\2\2\2_a\t\2\2\2`_\3\2"+
		"\2\2ab\3\2\2\2b`\3\2\2\2bc\3\2\2\2cj\3\2\2\2df\7\60\2\2eg\t\2\2\2fe\3"+
		"\2\2\2gh\3\2\2\2hf\3\2\2\2hi\3\2\2\2ik\3\2\2\2jd\3\2\2\2jk\3\2\2\2k$\3"+
		"\2\2\2lp\t\3\2\2mo\t\4\2\2nm\3\2\2\2or\3\2\2\2pn\3\2\2\2pq\3\2\2\2q&\3"+
		"\2\2\2rp\3\2\2\2sw\7)\2\2tv\t\4\2\2ut\3\2\2\2vy\3\2\2\2wu\3\2\2\2wx\3"+
		"\2\2\2xz\3\2\2\2yw\3\2\2\2z{\7)\2\2{(\3\2\2\2|~\t\5\2\2}|\3\2\2\2~\177"+
		"\3\2\2\2\177}\3\2\2\2\177\u0080\3\2\2\2\u0080\u0081\3\2\2\2\u0081\u0082"+
		"\b\25\2\2\u0082*\3\2\2\2\n\2]bhjpw\177\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}