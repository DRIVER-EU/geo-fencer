// Generated from c:\development\driver-eu\GIT_GeoFencer\geo-fencer\packages\server\src\antlr\SandyLexer.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class SandyLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		NEWLINE=1, WS=2, VAR=3, PRINT=4, AS=5, INT=6, DECIMAL=7, INTLIT=8, DECLIT=9, 
		PLUS=10, MINUS=11, ASTERISK=12, DIVISION=13, ASSIGN=14, LPAREN=15, RPAREN=16, 
		ID=17;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"NEWLINE", "WS", "VAR", "PRINT", "AS", "INT", "DECIMAL", "INTLIT", "DECLIT", 
		"PLUS", "MINUS", "ASTERISK", "DIVISION", "ASSIGN", "LPAREN", "RPAREN", 
		"ID"
	};

	private static final String[] _LITERAL_NAMES = {
		null, null, null, "'var'", "'print'", "'as'", "'Int'", "'Decimal'", null, 
		null, "'+'", "'-'", "'*'", "'/'", "'='", "'('", "')'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "NEWLINE", "WS", "VAR", "PRINT", "AS", "INT", "DECIMAL", "INTLIT", 
		"DECLIT", "PLUS", "MINUS", "ASTERISK", "DIVISION", "ASSIGN", "LPAREN", 
		"RPAREN", "ID"
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


	public SandyLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "SandyLexer.g4"; }

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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\23\177\b\1\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\3\2\3\2\3\2\5\2)\n\2\3\3\6\3,\n\3\r\3\16\3-\3\3\3\3\3\4\3\4\3\4\3\4\3"+
		"\5\3\5\3\5\3\5\3\5\3\5\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\3\b"+
		"\3\b\3\b\3\b\3\t\3\t\3\t\7\tN\n\t\f\t\16\tQ\13\t\5\tS\n\t\3\n\3\n\3\n"+
		"\7\nX\n\n\f\n\16\n[\13\n\3\n\3\n\6\n_\n\n\r\n\16\n`\5\nc\n\n\3\13\3\13"+
		"\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3\21\3\21\3\22\7\22t\n"+
		"\22\f\22\16\22w\13\22\3\22\3\22\7\22{\n\22\f\22\16\22~\13\22\2\2\23\3"+
		"\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37"+
		"\21!\22#\23\3\2\t\4\2\f\ftt\4\2\13\13\"\"\3\2\63;\3\2\62;\3\2aa\3\2c|"+
		"\6\2\62;C\\aac|\2\u0087\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2"+
		"\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25"+
		"\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2"+
		"\2\2\2!\3\2\2\2\2#\3\2\2\2\3(\3\2\2\2\5+\3\2\2\2\7\61\3\2\2\2\t\65\3\2"+
		"\2\2\13;\3\2\2\2\r>\3\2\2\2\17B\3\2\2\2\21R\3\2\2\2\23b\3\2\2\2\25d\3"+
		"\2\2\2\27f\3\2\2\2\31h\3\2\2\2\33j\3\2\2\2\35l\3\2\2\2\37n\3\2\2\2!p\3"+
		"\2\2\2#u\3\2\2\2%&\7\17\2\2&)\7\f\2\2\')\t\2\2\2(%\3\2\2\2(\'\3\2\2\2"+
		")\4\3\2\2\2*,\t\3\2\2+*\3\2\2\2,-\3\2\2\2-+\3\2\2\2-.\3\2\2\2./\3\2\2"+
		"\2/\60\b\3\2\2\60\6\3\2\2\2\61\62\7x\2\2\62\63\7c\2\2\63\64\7t\2\2\64"+
		"\b\3\2\2\2\65\66\7r\2\2\66\67\7t\2\2\678\7k\2\289\7p\2\29:\7v\2\2:\n\3"+
		"\2\2\2;<\7c\2\2<=\7u\2\2=\f\3\2\2\2>?\7K\2\2?@\7p\2\2@A\7v\2\2A\16\3\2"+
		"\2\2BC\7F\2\2CD\7g\2\2DE\7e\2\2EF\7k\2\2FG\7o\2\2GH\7c\2\2HI\7n\2\2I\20"+
		"\3\2\2\2JS\7\62\2\2KO\t\4\2\2LN\t\5\2\2ML\3\2\2\2NQ\3\2\2\2OM\3\2\2\2"+
		"OP\3\2\2\2PS\3\2\2\2QO\3\2\2\2RJ\3\2\2\2RK\3\2\2\2S\22\3\2\2\2Tc\7\62"+
		"\2\2UY\t\4\2\2VX\t\5\2\2WV\3\2\2\2X[\3\2\2\2YW\3\2\2\2YZ\3\2\2\2Z\\\3"+
		"\2\2\2[Y\3\2\2\2\\^\7\60\2\2]_\t\5\2\2^]\3\2\2\2_`\3\2\2\2`^\3\2\2\2`"+
		"a\3\2\2\2ac\3\2\2\2bT\3\2\2\2bU\3\2\2\2c\24\3\2\2\2de\7-\2\2e\26\3\2\2"+
		"\2fg\7/\2\2g\30\3\2\2\2hi\7,\2\2i\32\3\2\2\2jk\7\61\2\2k\34\3\2\2\2lm"+
		"\7?\2\2m\36\3\2\2\2no\7*\2\2o \3\2\2\2pq\7+\2\2q\"\3\2\2\2rt\t\6\2\2s"+
		"r\3\2\2\2tw\3\2\2\2us\3\2\2\2uv\3\2\2\2vx\3\2\2\2wu\3\2\2\2x|\t\7\2\2"+
		"y{\t\b\2\2zy\3\2\2\2{~\3\2\2\2|z\3\2\2\2|}\3\2\2\2}$\3\2\2\2~|\3\2\2\2"+
		"\f\2(-ORY`bu|\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}