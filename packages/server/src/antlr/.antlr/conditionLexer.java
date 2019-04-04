// Generated from c:\development\driver-eu\GIT_GeoFencer\geo-fencer\packages\server\src\antlr\condition.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class conditionLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		TRUE=1, FALSE=2, AND=3, OR=4, LT=5, GT=6, EQ=7, NEQ=8, PATHSEP=9, LBRACK=10, 
		RBRACK=11, LPAREN=12, RPAREN=13, INT=14, FLOAT=15, STRING=16, ID=17;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"TRUE", "FALSE", "AND", "OR", "LT", "GT", "EQ", "NEQ", "PATHSEP", "LBRACK", 
		"RBRACK", "LPAREN", "RPAREN", "INT", "FLOAT", "STRING", "ID"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'true'", "'false'", "'and'", "'or'", "'<'", "'>'", "'='", "'!='", 
		"'/'", "'['", "']'", "'('", "')'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "TRUE", "FALSE", "AND", "OR", "LT", "GT", "EQ", "NEQ", "PATHSEP", 
		"LBRACK", "RBRACK", "LPAREN", "RPAREN", "INT", "FLOAT", "STRING", "ID"
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


	public conditionLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "condition.g4"; }

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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\23k\b\1\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\5\3\5\3"+
		"\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3"+
		"\r\3\16\3\16\3\17\6\17L\n\17\r\17\16\17M\3\20\6\20Q\n\20\r\20\16\20R\3"+
		"\20\3\20\7\20W\n\20\f\20\16\20Z\13\20\3\21\3\21\7\21^\n\21\f\21\16\21"+
		"a\13\21\3\21\3\21\3\22\3\22\7\22g\n\22\f\22\16\22j\13\22\2\2\23\3\3\5"+
		"\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21"+
		"!\22#\23\3\2\5\6\2\"\"C\\aac|\5\2C\\aac|\6\2\62;C\\aac|\2o\2\3\3\2\2\2"+
		"\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2"+
		"\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2"+
		"\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\3%\3\2\2"+
		"\2\5*\3\2\2\2\7\60\3\2\2\2\t\64\3\2\2\2\13\67\3\2\2\2\r9\3\2\2\2\17;\3"+
		"\2\2\2\21=\3\2\2\2\23@\3\2\2\2\25B\3\2\2\2\27D\3\2\2\2\31F\3\2\2\2\33"+
		"H\3\2\2\2\35K\3\2\2\2\37P\3\2\2\2![\3\2\2\2#d\3\2\2\2%&\7v\2\2&\'\7t\2"+
		"\2\'(\7w\2\2()\7g\2\2)\4\3\2\2\2*+\7h\2\2+,\7c\2\2,-\7n\2\2-.\7u\2\2."+
		"/\7g\2\2/\6\3\2\2\2\60\61\7c\2\2\61\62\7p\2\2\62\63\7f\2\2\63\b\3\2\2"+
		"\2\64\65\7q\2\2\65\66\7t\2\2\66\n\3\2\2\2\678\7>\2\28\f\3\2\2\29:\7@\2"+
		"\2:\16\3\2\2\2;<\7?\2\2<\20\3\2\2\2=>\7#\2\2>?\7?\2\2?\22\3\2\2\2@A\7"+
		"\61\2\2A\24\3\2\2\2BC\7]\2\2C\26\3\2\2\2DE\7_\2\2E\30\3\2\2\2FG\7*\2\2"+
		"G\32\3\2\2\2HI\7+\2\2I\34\3\2\2\2JL\4\62;\2KJ\3\2\2\2LM\3\2\2\2MK\3\2"+
		"\2\2MN\3\2\2\2N\36\3\2\2\2OQ\4\62;\2PO\3\2\2\2QR\3\2\2\2RP\3\2\2\2RS\3"+
		"\2\2\2ST\3\2\2\2TX\7\60\2\2UW\4\62;\2VU\3\2\2\2WZ\3\2\2\2XV\3\2\2\2XY"+
		"\3\2\2\2Y \3\2\2\2ZX\3\2\2\2[_\7$\2\2\\^\t\2\2\2]\\\3\2\2\2^a\3\2\2\2"+
		"_]\3\2\2\2_`\3\2\2\2`b\3\2\2\2a_\3\2\2\2bc\7$\2\2c\"\3\2\2\2dh\t\3\2\2"+
		"eg\t\4\2\2fe\3\2\2\2gj\3\2\2\2hf\3\2\2\2hi\3\2\2\2i$\3\2\2\2jh\3\2\2\2"+
		"\b\2MRX_h\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}